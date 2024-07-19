import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { drizzle } from "drizzle-orm/d1";
import { Env } from "./index";
import { Lucia } from "lucia";
import * as schema from "./schema";
import { D1Adapter } from "@lucia-auth/adapter-sqlite";

export function createLucia(D1: D1Database) {
  const adapter = new D1Adapter(D1, {
    user: "users",
    session: "sessions",
  });
  return new Lucia(adapter, {
    getUserAttributes: (attributes) => {
      return {
        email: attributes.email,
        username: attributes.username,
      };
    },
  });
}

export function createDrizzle(D1: D1Database) {
  return drizzle(D1, { schema });
}

export function createContext(env: Env) {
  const db = createDrizzle(env.DB);
  const lucia = createLucia(env.DB);

  return ({ req, resHeaders }: FetchCreateContextFnOptions) => ({
    req,
    resHeaders,
    db,
    lucia,
    env,
  });
}

export type Context = Awaited<ReturnType<typeof createContext>>;
export type Drizzle = ReturnType<typeof createDrizzle>;

declare module "lucia" {
  interface Register {
    Lucia: ReturnType<typeof createLucia>;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
  username: string;
}
