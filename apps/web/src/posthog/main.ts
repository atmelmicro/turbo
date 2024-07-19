import { PostHog } from "posthog-node";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- env attribute
export const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  flushAt: 1,
  flushInterval: 0,
  enable: process.env.NODE_ENV === "production",
});
