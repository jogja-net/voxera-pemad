import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, hasLocale } from "./lib/i18n/config";
import { negotiateLocale } from "./lib/i18n/negotiate";

/**
 * Every page lives under /<locale>, so the only path that needs resolving is
 * the bare root. Keeping the matcher this narrow means the proxy never sits in
 * front of static assets or the locale routes themselves — a direct visit to
 * /en always serves English, cookie or not.
 *
 * Note: this replaces the `redirects` entry that used to live in
 * next.config.ts — those run *before* the proxy, so a "/" redirect there would
 * fire first and this would never see the request.
 */
export const config = {
  matcher: "/",
};

export function proxy(request: NextRequest) {
  // A manual choice from the header switcher outranks the browser's guess.
  const remembered = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    remembered && hasLocale(remembered)
      ? remembered
      : negotiateLocale(request.headers.get("accept-language"));

  const response = NextResponse.redirect(new URL(`/${locale}`, request.url));
  // The destination depends on a request header and a cookie, so caches must
  // not reuse one visitor's redirect for the next.
  response.headers.set("Vary", "Accept-Language, Cookie");

  return response;
}
