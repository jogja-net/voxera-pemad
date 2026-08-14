"use client";

import { useSupabaseUser } from "@/lib/supabase/auth-store";
import type { Dictionary, Locale } from "@/lib/i18n";

/**
 * Billing/Project only show once logged in. No auth is known server-side
 * (auth-store.ts resolves it client-side from the browser's own Supabase
 * session, keeping the marketing page's static/ISR rendering intact — see
 * the note in site-header.tsx), so this renders nothing until then and
 * never causes a mismatch: server and pre-hydration client both render null.
 */
export function AuthNavExtras({
  dict,
  lang,
  className,
}: {
  dict: Dictionary;
  lang: Locale;
  className: string;
}) {
  const user = useSupabaseUser(null);
  if (!user) return null;

  return (
    <>
      <a href={`/${lang}/dashboard/projects`} className={className}>
        {dict.nav.project}
      </a>
      <a href={`/${lang}/dashboard/billing`} className={className}>
        {dict.nav.billing}
      </a>
    </>
  );
}
