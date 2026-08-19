@AGENTS.md

## WhatsApp integration

`NEXT_PUBLIC_WHATSAPP_NUMBER` (see `.env.example`) drives `buildWhatsAppLink()` in
`lib/config.ts`. While it is unset the link falls back to `#contact` (the footer).
Today the only caller is the Interpreter panel CTA
(`components/panels/interpreter-panel.tsx`), which builds the message from the
`whatsapp*` template strings in both i18n dictionaries.

Pending work — not started yet, the user will follow up with details:

- A WhatsApp entry point beyond the Interpreter panel (shared button and/or a
  floating action button across panels).
- WhatsApp link in `components/site-footer.tsx` (phone is plain text today) and
  possibly in `components/bottom-nav.tsx`.
- Send form summaries from the other panels (Validation, Generation,
  Translation, Sworn) to WhatsApp the way the Interpreter panel does.

When picking this up: keep new message templates in `lib/i18n/dictionaries/`
(both `id.ts` and `en.ts`) rather than hardcoding strings in components.

## Accounts / auth (Phase 1, 2 & 3 done)

Real user accounts now exist, backed by a dedicated Supabase project
(`voxera-pemad`, id `ockdlwpbftsoqkqulxdq`, region `ap-southeast-1`). This is
separate from `swornaid`/`ocr.pemad.my.id`, which stays untouched and
unrelated — do not conflate the two.

**What's live:**
- `supabase/migrations/0001_profiles.sql` — `public.profiles` (full_name,
  phone_number) + a trigger that populates it from `signUp()`'s
  `options.data` on every new `auth.users` row. RLS restricts rows to their
  owner.
- `supabase/migrations/0002_projects.sql` — `public.projects` (id, user_id,
  service_type, title, description, metadata) to store project submissions from
  various panels. Includes RLS policies for owner access.
- `lib/supabase/` — `server.ts`/`client.ts` (Supabase clients for
  Server Components vs `"use client"` code), `middleware.ts` (session
  refresh, called from `proxy.ts`), `auth-store.ts` (client-side
  `useSupabaseUser()`/`useAuthModal()` — a `useSyncExternalStore` singleton,
  not React Context; see the comments there for why).
- `app/actions.ts` — Server Action `createProject` to persist form submissions
  from panels into the `public.projects` table.
- `components/auth/` — the Login/Register modal (`auth-modal.tsx` +
  `login-form.tsx`/`register-form.tsx`, Radix Dialog), plus
  `auth-trigger.tsx` (the header/bottom-nav Login-or-user-name button) and
  `auth-nav-extras.tsx` (Billing/Project nav items, now active for Projects).
- `app/[lang]/layout.tsx` — now contains `SiteHeader` and `BottomNav`, ensuring
  they appear across all pages, including the new dashboard.
- `app/[lang]/dashboard/projects/page.tsx` — the user's project dashboard,
  displaying a list of their submitted projects.
- Panel forms (`validation-panel.tsx`, `generation-panel.tsx`,
  `translation-panel.tsx`, `interpreter-panel.tsx`) now call `createProject`
  on submission (auth-gated: logged-out submit should open the auth modal).
- `components/site-header.tsx`/`components/bottom-nav.tsx` are auth-aware:
  logged out shows Layanan/Bantuan only, logged in adds Billing/Project as
  real links (both `dashboard/projects` and `dashboard/billing` render now —
  `lang` is threaded down from `app/[lang]/layout.tsx` through `SiteHeader`/
  `BottomNav` so the links can be locale-prefixed).
  Deliberately resolved client-side (not via a server-fetched prop) so the
  marketing page keeps its static/ISR rendering — see the comment in
  `site-header.tsx`.
- `dict.auth.*`, `dict.billing.*`, and `dict.nav.{billing,project}` in both
  dictionaries carry all the copy.
- `.env.local` (gitignored) has the real `NEXT_PUBLIC_SUPABASE_URL`/
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`; `.env.example` has the placeholders.
- `supabase/migrations/0003_invoices.sql` — `public.invoices` (one row per
  project, `unique(project_id)`), RLS is select-only for the owner — all
  writes go through the service-role client (`lib/supabase/admin.ts`),
  bypassing RLS, since neither the Xendit webhook nor the admin billing flow
  has an owner-scoped session to write with.
- `lib/pricing.ts` — `PRICE_PER_UNIT` is **placeholder data**, not the real
  price list (the user hasn't provided final rates yet — see the `TODO`
  comments in the file). `calculateInvoiceAmounts()` applies PPN at a flat
  11% (`PPN_RATE`). `SERVICE_UNIT` maps validation/translation → word,
  generation → page, interpreter → hour. `sworn` is deliberately excluded
  (`isBillableServiceType`) — it lives on the external OCR.pemad.my.id portal
  and never reaches `createProject`, so it never reaches this billing flow
  either.
- `lib/admin.ts` — `isAdminEmail()`, the entire authorization mechanism for
  the billing admin flow. There is no roles table in this codebase; it just
  checks the logged-in user's email against the comma-separated
  `ADMIN_EMAILS` env var. Server-side only.
- `app/actions.ts` — `createInvoice(projectId, quantity, lang)`: admin-gated,
  looks up the project via the service-role client, calls Xendit's Create
  Invoice REST API (`POST https://api.xendit.co/v2/invoices`, HTTP Basic Auth
  with `XENDIT_SECRET_KEY`), then inserts the `invoices` row. The **admin
  types the quantity by hand** — it is not derived from the client-side
  word/page estimates in `lib/estimate.ts`, which are file-size heuristics,
  not reliable enough to bill from (see that file's docblock). This is a
  single-step flow: confirming the quantity and creating the invoice happen
  in the same action call, there's no separate "confirmed but not yet
  invoiced" state.
- `app/api/webhooks/xendit/route.ts` — the first Route Handler in this
  codebase. Verifies the `x-callback-token` header against
  `XENDIT_WEBHOOK_TOKEN` (Xendit's callback verification, not HMAC), then
  updates the matching `invoices` row's `status`/`paid_at`/`xendit_payload`.
- `app/[lang]/dashboard/billing/page.tsx` — customer view lists their own
  invoices (pay link when `status === "pending"`) plus their own billable
  projects still awaiting admin confirmation. The admin section (visible only
  to `isAdminEmail()` users) lists every unbilled billable project across all
  users, each with an inline `components/billing/admin-invoice-form.tsx`
  quantity input that live-previews the subtotal/PPN/total before submitting.
- Env vars added: `SUPABASE_SERVICE_ROLE_KEY` (bypasses RLS — needed by the
  webhook and the admin flow), `XENDIT_SECRET_KEY`, `XENDIT_WEBHOOK_TOKEN`,
  `ADMIN_EMAILS`. All server-only, none prefixed `NEXT_PUBLIC_`.

**Gotchas hit during Phase 1 (don't rediscover these):**
- Supabase's built-in test-mode email sender caps out around 2 emails/hour —
  expect "email rate limit exceeded" during heavy manual signup testing.
  Configure custom SMTP in the Supabase dashboard before real users sign up.
- Manually inserting a row into `auth.users` via SQL (e.g. to test login
  without burning the email quota) needs `confirmation_token`,
  `recovery_token`, `email_change_token_new`, and `email_change` set to `''`
  explicitly — they default to `NULL`, which makes GoTrue's Go scanner fail
  with a generic "Database error querying schema" on the next sign-in.
- `@supabase/ssr`'s current cookie interface is `getAll()`/`setAll()` (the
  old `get`/`set`/`remove` trio is deprecated) — `next/headers`'s `cookies()`
  already implements `getAll()` natively, no need to round-trip through
  `parseCookieHeader`.

**Pending work — not started, planned but deliberately deferred:**
- **Real pricing**: `lib/pricing.ts`'s `PRICE_PER_UNIT` is still placeholder
  data — swap in the real Rp/kata, Rp/halaman, Rp/jam rates before any
  invoice reaches a paying customer.
- **Xendit account doesn't exist yet** (as of 2026-08-14) — the user doesn't
  have a Xendit account at all, so `XENDIT_SECRET_KEY`/`XENDIT_WEBHOOK_TOKEN`
  in `.env.local` are still blank. Deliberately deferred: this project is
  still in staging, so it's low priority for now. Don't invent placeholder
  values for these. When picking this up: sign up at dashboard.xendit.co,
  grab the **test/sandbox** secret key from Settings > API Keys (available
  immediately, no business verification needed for dev/testing) and the
  callback verification token from Settings > Webhooks. Until then,
  `createInvoice` will fail at the Xendit `fetch()` call — everything else in
  the billing flow (schema, `/dashboard/billing`, the admin quantity-confirm
  UI) works and can be tested without it. `ADMIN_EMAILS` is already set to
  the user's own email (`jafranfran@gmail.com`) in `.env.local`.
- **Invoice reissue**: `invoices.project_id` is `unique`, so a project can
  only ever get one invoice. If a Xendit invoice expires or fails there's
  currently no "try again" path without a schema change (e.g. dropping the
  unique constraint and always querying "latest invoice per project," or a
  small "void + reissue" action).
- **Generation quantity has no prefill**: the generation panel only ever
  captures `words` in `metadata` (never a page count), and there's no
  reliable words→pages ratio to synthesize one — the admin enters a page
  count from scratch on the billing page. Revisit if `useGenerationForm`
  starts capturing pages directly.
- **Google OAuth — code wired, blocked on credentials (as of 2026-08-19)**:
  `components/auth/google-button.tsx` now calls
  `supabase.auth.signInWithOAuth({ provider: "google" })` and
  `app/auth/callback/route.ts` exchanges the code for a session. Clicking
  the button currently redirects to Supabase's authorize endpoint and gets
  rejected, because no Google OAuth Client ID/Secret has been created yet
  and the Google provider isn't enabled in the Supabase dashboard for the
  `voxera-pemad` project. To finish: create an OAuth 2.0 Client ID (Web
  application) in Google Cloud Console with authorized redirect URI
  `https://ockdlwpbftsoqkqulxdq.supabase.co/auth/v1/callback`, paste the
  Client ID/Secret into Supabase dashboard → Authentication → Providers →
  Google, and add `http://localhost:3000/auth/callback` +
  `https://voxera-pemad.vercel.app/auth/callback` under Authentication →
  URL Configuration → Redirect URLs.
