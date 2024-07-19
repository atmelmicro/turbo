import { Drizzle, createContext, createDrizzle, createLucia } from "./context";
import { appRouter } from "./router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { devices } from "./schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { devicesSchema } from "./devices";
import { Lucia } from "lucia";
import { isPartOfHome } from "./utils";

export interface Env {
  MY_DURABLE_OBJECT: DurableObjectNamespace;
  DB: D1Database;
  RESEND_KEY: string;
}

const rxSchema = z.object({
  to: z.string(),
  data: z.union([
    z.object({
      type: z.literal("cmd"),
      data: z.any(),
    }),
    z.object({
      type: z.literal("new_state"),
      data: z.any(),
    }),
    z.object({
      type: z.literal("up"),
    }),
  ]),
});

const txSchema = z.object({
  to: z.string(),
  from: z.string(),
  data: z.union([
    z.object({
      type: z.literal("cmd"),
      data: z.any(),
    }),
    z.object({
      type: z.literal("new_state"),
      data: z.any(),
    }),
  ]),
});

async function getIdAndVaraint(
  db: Drizzle,
  lucia: Lucia,
  header: string,
  homeId: string
) {
  const tokenVariant = header.substring(7, 10);
  const token = header.substring(11);

  let type: "device" | "user" = "device";
  if (tokenVariant === "dev") {
    type = "device";
    const device = await db.query.devices.findFirst({
      where: eq(devices.token, token),
    });
    if (!device) return null;
    if (device.homeId !== homeId) return null;
    return { varaint: "device", id: device.id, type: "user" } as const;
  } else if (tokenVariant === "usr") {
    type = "user";
    const { session, user } = await lucia.validateSession(token);
    if (!session || !user) return null;
    const home = await isPartOfHome(db, user.id, homeId);
    console.log(home, homeId, user);
    if (!home) return null;
    return { id: user.id, varaint: "user", type: "user" } as const;
  }
  return null;
}

export class MyDurableObject {
  state: DurableObjectState;
  env: Env;
  sessions: Map<
    WebSocket,
    { id: string; varaint: "device" | "user"; type: string }
  >;
  db: Drizzle;
  lucia: Lucia;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;

    this.sessions = new Map();
    this.state.getWebSockets().forEach((webSocket) => {
      const meta = webSocket.deserializeAttachment();
      this.sessions.set(webSocket, meta);
    });
    this.db = createDrizzle(env.DB);
    this.lucia = createLucia(env.DB);
  }

  async fetch(request: Request): Promise<Response> {
    if (request.headers.get("Upgrade") != "websocket") {
      return new Response("expected websocket", { status: 400 });
    }
    const header = request.headers.get("Authorization");
    if (!header || !header.startsWith("Bearer ")) {
      return new Response("expected bearer token", { status: 400 });
    }
    const room = new URL(request.url).pathname.split("/").at(2);
    if (!room) return new Response("no room", { status: 400 });
    const res = await getIdAndVaraint(this.db, this.lucia, header, room);
    if (!res) return new Response("invalid token", { status: 400 });
    let pair = new WebSocketPair();

    await this.handleSession(pair[1], res.id, res.type, res.varaint);

    return new Response(null, { status: 101, webSocket: pair[0] });
  }

  async handleSession(
    webSocket: WebSocket,
    id: string,
    type: string,
    varaint: "device" | "user"
  ) {
    this.state.acceptWebSocket(webSocket);

    // this has to be sent from the client, not the server
    setInterval(() => {
      webSocket.send(
        JSON.stringify({
          to: id,
          from: "server",
          data: {
            type: "keep-alive",
          },
        })
      );
    }, 10000);

    // webSocket.serializeAttachment(webSocket.deserializeAttachment()); ?? why
    this.sessions.set(webSocket, { id, type, varaint });
  }

  async webSocketMessage(webSocket: WebSocket, msg: any) {
    let session = this.sessions.get(webSocket);
    if (!session) return;
    const message = rxSchema.parse(JSON.parse(msg));
    console.log(message);

    if (message.data.type === "new_state") {
      // this will crash if a user sents a new_state command
      const verifyData = devicesSchema[
        session.type as keyof typeof devicesSchema
      ].parse(message.data);

      await this.db
        .update(devices)
        .set({
          state: verifyData,
        })
        .where(eq(devices.id, session.id));
      this.broadcast({ from: session.id, to: message.to, data: message.data }); // this should only be for the users, not devices
      return;
    }

    if (message.data.type === "cmd") {
      this.send({ from: session.id, to: message.to, data: message.data });
      return;
    }
  }

  async send(msg: z.infer<typeof txSchema>) {
    for (const [webSocket, session] of this.sessions) {
      if (session.id === msg.to) {
        webSocket.send(JSON.stringify(msg));
        return;
      }
    }
  }

  async broadcast(msg: z.infer<typeof txSchema>) {
    this.sessions.forEach((session, webSocket) => {
      if (session.id !== msg.from) webSocket.send(JSON.stringify(msg));
    });
  }
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const pathname = new URL(request.url).pathname;
    if (pathname.startsWith("/do")) {
      const room = new URL(request.url).pathname.split("/").at(1);
      if (!room) return new Response("no room", { status: 400 });
      let id: DurableObjectId = env.MY_DURABLE_OBJECT.idFromName(room);
      let stub: DurableObjectStub = env.MY_DURABLE_OBJECT.get(id);
      let response = await stub.fetch(request);

      return response;
    }
    return fetchRequestHandler({
      endpoint: "/trpc",
      req: request,
      router: appRouter,
      createContext: createContext(env),
    });
  },
};
