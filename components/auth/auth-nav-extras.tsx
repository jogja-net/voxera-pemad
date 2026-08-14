"use client";

import { useSupabaseUser } from "@/lib/supabase/auth-store";
import type { Dictionary } from "@/lib/i18n";

/**
 * Billing/Project only show once logged in. No auth is known server-side
 * (auth-store.ts resolves it client-side from the browser's own Supabase
 * session, keeping the marketing page's static/ISR rendering intact — see
 * the note in site-header.tsx), so this renders nothing until then and
 * never causes a mismatch: server and pre-hydration client both render null.
 *
 * Both routes are Phase 2/3 work — not built yet — so these are disabled
 * placeholders rather than links to a page that doesn't exist.
 */
export function AuthNavExtras({
  dict,
  className,
}: {
  dict: Dictionary;
  className: string;
}) {
  const user = useSupabaseUser(null);
  if (!user) return null;

  return (
    <>
      <span aria-disabled className={`${className} cursor-not-allowed opacity-50`} title={dict.nav.comingSoon}>
        {dict.nav.project}
      </span>
      <span aria-disabled className={`${className} cursor-not-allowed opacity-50`} title={dict.nav.comingSoon}>
        {dict.nav.billing}
      </span>
    </>
  );
}
