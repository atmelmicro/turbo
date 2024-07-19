import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://0a133d1d268aacc4a91900f73e9bb6bc@o4505648453582848.ingest.sentry.io/4506400411615232",
  tracesSampleRate: 0.01,
  enabled: process.env.NODE_ENV === "production",
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  tracePropagationTargets: [/^https:\/\/mat-development\.com\//],
});
