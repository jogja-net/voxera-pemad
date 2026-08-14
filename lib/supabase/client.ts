import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";

/**
 * Used only inside "use client" components (the auth modal, the auth-state
 * listener) — Server Components/Actions use `./server.ts` instead so cookies
 * are read/written through `next/headers`.
 *
 * Memoized to a single instance: separate `createBrowserClient` calls each
 * run their own in-memory GoTrueClient, so a login in one instance wouldn't
 * be seen by another's `onAuthStateChange` listener until a page reload.
 */
let browserClient: ReturnType<typeof createBrowserClient<Database>> | undefined;

export function createBrowserSupabaseClient() {
  browserClient ??= createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
  return browserClient;
}
