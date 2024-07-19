import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../worker/src/router";
import { cookies } from "next/headers";
import { getBackendUrl } from "./fetch";

export const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: getBackendUrl() + "/trpc",
      async headers() {
        return {
          authorization: "Bearer " + cookies().get("token")?.value,
        };
      },
    }),
  ],
});
