"use client";

import { useSupabaseUser, useAuthModal } from "@/lib/supabase/auth-store";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import type { Dictionary } from "@/lib/i18n";

/**
 * Occupies the header's gold CTA slot (previously "Contact Us") and its
 * bottom-nav equivalent. Logged out: opens the auth modal. Logged in: shows
 * the account's name and signs out on click — the only affordance for
 * logging out in Phase 1 (no dashboard/settings page yet).
 */
export function AuthTrigger({ dict, className }: { dict: Dictionary; className: string }) {
  const user = useSupabaseUser(null);
  const modal = useAuthModal();

  if (user) {
    return (
      <button
        type="button"
        title={dict.auth.logoutCta}
        onClick={() => createBrowserSupabaseClient().auth.signOut()}
        className={className}
      >
        {user.fullName || user.email}
      </button>
    );
  }

  return (
    <button type="button" onClick={() => modal.open("login")} className={className}>
      {dict.auth.loginCta}
    </button>
  );
}
