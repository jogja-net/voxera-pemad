import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

/**
 * Used inside Server Components, Server Actions, and Route Handlers. `setAll`
 * throwing here is expected when called from a Server Component (cookies are
 * read-only there) — `proxy.ts` refreshes the session cookie on every
 * request instead, so this is safe to ignore.
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component — ignored, proxy.ts refreshes instead.
          }
        },
      },
    },
  );
}
