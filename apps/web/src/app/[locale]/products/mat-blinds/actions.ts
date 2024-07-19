"use server";

import { Next } from "@/backend/auth";
import { tFetch } from "@/backend/fetch";
import { client } from "@/backend/trpc";

export default async function registerEmail(
  next: { error: boolean } | null,
  fd: FormData,
) {
  const { error, failed, res } = await tFetch(client.addEmail.mutate, fd);
  if (failed || !res?.success) return { error: true };
  return {
    error: false,
  };
}
