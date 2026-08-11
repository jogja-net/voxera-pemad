"use client";

import Link from "next/link";
// Imported from the config module rather than the "@/lib/i18n" barrel so the
// dictionaries do not follow this Client Component into the browser bundle.
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  type Locale,
} from "@/lib/i18n/config";

export function LanguageSwitcher({
  current,
  alternate,
  label,
}: {
  current: Locale;
  alternate: Locale;
  label: string;
}) {
  /**
   * Writing the cookie here — in the click handler — is what keeps it a
   * "strictly necessary" preference cookie: it only ever records a choice the
   * visitor made deliberately. See LOCALE_COOKIE in lib/i18n/config.ts.
   *
   * Without JavaScript the link still switches language; only the persistence
   * is lost, which is the right way round to degrade.
   */
  function rememberChoice() {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${LOCALE_COOKIE}=${alternate}; Max-Age=${LOCALE_COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  }

  return (
    <Link
      href={`/${alternate}`}
      onClick={rememberChoice}
      aria-label={label}
      className="inline-flex h-10 items-center gap-1.5 rounded px-2 font-mono text-xs tracking-[0.08em] text-muted transition-colors hover:text-brand"
    >
      <span className="font-semibold text-brand uppercase">{current}</span>
      <span aria-hidden="true">/</span>
      <span className="uppercase">{alternate}</span>
    </Link>
  );
}
