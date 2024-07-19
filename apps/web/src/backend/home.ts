"use server";

import { z } from "zod";
import { revalidateTag } from "next/cache";
import { tFetch, tQuery } from "./fetch";
import { client } from "./trpc";

export async function getHomes() {
  const { error, failed, res } = await tQuery(client.home.getAll.query);
  if (failed) return { succ: false, error: "Can't fetch houses" };
  return { succ: true, data: res };
}

export async function deleteHome(fd: FormData) {
  const _res = await tFetch(client.home.delete.mutate, fd);
  revalidateTag("homes");
}
