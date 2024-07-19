import { and, eq } from "drizzle-orm";
import { Drizzle } from "./context";
import { homes, members } from "./schema";
import { blake3 } from "@noble/hashes/blake3";

export async function isPartOfHome(
  db: Drizzle,
  userId: string,
  homeId: string
) {
  const home = await db
    .select()
    .from(homes)
    .innerJoin(members, eq(homes.id, members.homeId))
    .where(and(eq(members.userId, userId), eq(homes.id, homeId)));

  return home.at(0);
}

export function hash(input: string, salt: string) {
  return blake3(input, {
    dkLen: 256,
    context: salt,
  });
}

export function sendEmail(
  text: string,
  to: string,
  subject: string,
  key: string
) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      from: "support@noreply.mat-development.com",
      to,
      subject,
      text,
    }),
  });
}
