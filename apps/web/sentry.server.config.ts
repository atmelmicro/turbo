// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://0a133d1d268aacc4a91900f73e9bb6bc@o4505648453582848.ingest.sentry.io/4506400411615232",
  enabled: process.env.NODE_ENV === "production",
  tracesSampleRate: 0.01,
  debug: false,
  tracePropagationTargets: [/^https:\/\/mat-development\.com\//],
});
