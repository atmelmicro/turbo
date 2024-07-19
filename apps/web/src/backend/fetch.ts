import { z } from "zod";

export const getPageUrl = () =>
  process.env.NODE_ENV === "production"
    ? "https://mat-development.com"
    : "http://localhost:3000";

export const getBackendUrl = () =>
  process.env.NODE_ENV === "production"
    ? "https://worker.mat-development.com"
    : "http://localhost:8787";

export async function handleError(res: Response) {
  const json = await res.json().catch(() => ({}));
  const data = z.object({ error: z.string() }).safeParse(json);
  return {
    succ: false,
    error: data.success ? data.data.error : "Server error",
  } as const;
}

export type SafeTypeReturnType<A, B> =
  | { succ: true; data: A }
  | { succ: false; error: B };

export async function tFetch<TReturn>(
  func: (input: any) => Promise<TReturn>,
  formData?: FormData,
): Promise<
  | { error: null; res: TReturn; failed: false }
  | { error: string; res: null; failed: true }
> {
  try {
    const res = await func(formData ? Object.fromEntries(formData) : {});
    return { error: null, res, failed: false };
  } catch (e) {
    console.log(e);
    // @ts-expect-error - todo better typechecks
    return { error: e?.message ?? "Failed", res: null, failed: true };
  }
}

export async function tQuery<TReturn>(
  func: () => Promise<TReturn>,
): Promise<
  | { error: null; res: TReturn; failed: false }
  | { error: string; res: null; failed: true }
> {
  try {
    const res = await func();
    return { error: null, res, failed: false };
  } catch (e) {
    return { error: "Failed", res: null, failed: true };
  }
}
