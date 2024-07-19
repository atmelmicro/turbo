import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "./context";
import { isPartOfHome } from "./utils";
import { z } from "zod";
import { devices, members, rooms } from "./schema";
import { eq } from "drizzle-orm";

export const router = initTRPC.context<Context>().create();
export const procedure = router.procedure;

export const withAuth = router.procedure.use(
  async ({ next, ctx: { lucia, req } }) => {
    const sessionId = lucia.readBearerToken(
      req.headers.get("Authorization") ?? ""
    );
    if (!sessionId)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You're not logged in",
      });

    const { session, user } = await lucia.validateSession(sessionId);
    if (!session || !user)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You're not logged in",
      });

    return next({
      ctx: { session, user },
    });
  }
);

export const withHome = withAuth
  .input(z.object({ homeId: z.string() }))
  .use(async ({ ctx: { user, db }, next, input: { homeId } }) => {
    const home = await isPartOfHome(db, user.id, homeId);
    if (!home)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You're not part of this home",
      });
    return next({
      ctx: { home },
    });
  });

export const withDevice = withAuth
  .input(z.object({ deviceId: z.string() }))
  .use(async ({ ctx: { db }, next, input: { deviceId } }) => {
    const dbRes = await db
      .select()
      .from(devices)
      .innerJoin(members, eq(members.homeId, devices.homeId))
      .where(eq(devices.id, deviceId));
    if (!dbRes || dbRes.length !== 1)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You can't do anything to this device",
      });
    return next({
      ctx: { device: dbRes[0].devices, member: dbRes[0].members },
    });
  });

export const withRoom = withAuth
  .input(z.object({ roomId: z.string() }))
  .use(async ({ ctx: { db }, next, input: { roomId } }) => {
    const dbRes = await db
      .select()
      .from(rooms)
      .innerJoin(members, eq(members.homeId, rooms.homeId))
      .where(eq(rooms.id, rooms));
    if (!dbRes || dbRes.length !== 1)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You can't do anything to this device",
      });
    return next({
      ctx: { room: dbRes[0].rooms, member: dbRes[0].members },
    });
  });
