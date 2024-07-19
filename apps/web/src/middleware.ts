import { createI18nMiddleware } from "next-international/middleware";
import { type NextRequest } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import * as Sentry from "@sentry/nextjs";

const locales = ["en", "cs", "de"];
const defaultLocale = "en";

const I18nMiddleware = createI18nMiddleware({
  locales,
  defaultLocale,
  resolveLocaleFromRequest(req: NextRequest) {
    const langs = new Negotiator({
      headers: { "accept-language": req.headers.get("accept-language") ?? "" },
    }).languages();

    let res: string | null = null;

    try {
      res = match(langs, locales, defaultLocale);
    } catch (error) {
      Sentry.captureException(error, { extra: { langs } });
    }

    return res ?? defaultLocale;
  },
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt|monitoring|ingest|lang|not-found).*)",
  ],
};
