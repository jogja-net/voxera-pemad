import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, hasLocale } from "./lib/i18n/config";
import { negotiateLocale } from "./lib/i18n/negotiate";
import { updateSession } from "./lib/supabase/middleware";

/**
 * Every page lives under /<locale>, so "/" is the only path that needs the
 * locale redirect. The matcher is wider than just "/" so every other route
 * still passes through `updateSession` below to keep the Supabase session
 * cookie fresh — Server Components can't write cookies themselves (see
 * lib/supabase/server.ts), so this is the only place a near-expiry session
 * actually gets renewed. Static assets are excluded so neither concern runs
 * in front of them.
 *
 * Note: the "/" redirect replaces the `redirects` entry that used to live in
 * next.config.ts — those run *before* the proxy, so a "/" redirect there would
 * fire first and this would never see the request.
 */
export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
};

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
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

  return updateSession(request);
}
