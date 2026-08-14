import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

/**
 * Service-role client — bypasses row-level security entirely. Server-only,
 * never import into a "use client" file. Two callers: the Xendit webhook
 * (no user session exists to derive an RLS-scoped client from) and the
 * billing admin flow in app/actions.ts, which reads/writes other users'
 * projects and invoices after its own isAdminEmail() check — this client
 * enforces nothing itself, the caller is responsible for authorization.
 */
export function createAdminSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
