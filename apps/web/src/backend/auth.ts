"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { client } from "./trpc";
import { tFetch, tQuery } from "./fetch";

export type Next =
  | {
      next?: string;
      message?: string;
      error?: string;
    }
  | undefined;

export async function login(
  nextPath: Next,
  fd: FormData,
): Promise<Next | undefined> {
  const { error, res, failed } = await tFetch(client.user.login.mutate, fd);
  if (failed) return { error: error };
  cookies().set("token", res.sessionId);
  nextPath?.next ? redirect(nextPath.next) : redirect("/");
}

export async function register(
  nextPath: Next,
  fd: FormData,
): Promise<Next | undefined> {
  const { error, failed, res } = await tFetch(
    client.user.createUser.mutate,
    fd,
  );

  if (failed) return { error: error };
  cookies().set("token", res.sessionId);
  nextPath?.next ? redirect(nextPath.next) : redirect("/");
}

export async function reset(_next: Next, fd: FormData): Promise<Next> {
  const { error, failed, res } = await tFetch(
    client.user.resetPassword.mutate,
    fd,
  );
  if (failed) return { error };
  if (!res.ok) return { error: "Something went wrong" };
  return { message: "Email sent!" };
}

export async function resetToken(_next: Next, fd: FormData): Promise<Next> {
  const { error, failed, res } = await tFetch(
    client.user.useResetToken.mutate,
    fd,
  );
  if (failed) return { error };
  if (!res.ok) return { error: "Something went wrong" };
  redirect("/auth/login");
}

export async function logout(_next: Next, fd: FormData): Promise<Next> {
  const { error, failed } = await tQuery(client.user.logout.mutate);
  if (failed) return { error };
  redirect("/");
}

export async function edit(_nextPath: Next, fd: FormData): Promise<Next> {
  const { error, failed } = await tFetch(client.user.editUser.mutate, fd);
  if (failed) return { error };
  revalidateTag("me");
  return { message: "Saved!" };
}
export async function useAuth() {
  const auth = await getAuth();

  if (!auth) redirect("/login");
  return auth;
}

export async function deleteAccount(fd: FormData): Promise<Next> {
  const { error, failed, res } = await tFetch(client.user.deleteUser.mutate);
  if (failed) return { error };
  revalidateTag("me");
  redirect("/");
}

export async function changePassword(_next: Next, fd: FormData): Promise<Next> {
  const { error, failed, res } = await tFetch(
    client.user.changePassword.mutate,
    fd,
  );

  if (failed) return { error };
  return { message: "Password changed!" };
}

export async function getAuth() {
  const user = await client.user.me.query().catch(() => null);

  return user;
}
