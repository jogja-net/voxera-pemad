# Voxera — Interactive Services Landing

Next.js implementation of the Voxera interactive services page for PT PéMad
International Transearch. A single page whose main panel swaps between five
services — Validation, Generation, Translation, Sworn Translation, Interpreter —
without navigating away.

Built from `design_handoff_voxera_landing/` (see its `README.md` for the design
contract) and `prompt_implementasi_voxera.md`.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · lucide-react

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the WhatsApp number
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`.

## Layout

```
app/
  globals.css             design tokens (@theme), base styles, panel animation
  [lang]/
    layout.tsx            Inter + JetBrains Mono, per-locale metadata, <html lang>
    page.tsx              header + section intro + service section + footer
components/
  site-header.tsx         sticky nav + ID/EN switcher
  site-footer.tsx         dark corporate footer
  service-section.tsx     active-tab state; owns all five form states
  service-tabs.tsx        tab cards (roving focus, arrow-key navigation)
  panels/                 one component per service + shared panel shell
  ui/                     buttons, form fields, upload field
lib/
  config.ts               language codes, WhatsApp deep link
  estimate.ts             cost/word/page estimators (prototype — see below)
  use-service-forms.ts    one hook per service form
  i18n/                   locales, dictionaries, template formatting
```

Form state lives in `service-section.tsx` rather than inside each panel, so
switching tabs never discards a half-filled form.

## Languages (ID / EN)

The page is served per locale under `/id` and `/en`. Both routes are prerendered
at build time via `generateStaticParams`, and each gets its own `<title>`,
description, `<html lang>`, and `alternates` metadata.

`/` is resolved per visitor in `proxy.ts`, in this order:

1. the `voxera_locale` cookie, if it holds a supported locale;
2. otherwise `Accept-Language` — `negotiateLocale` in `lib/i18n/negotiate.ts`
   honours q-values and matches on the primary subtag, so `en-GB` → `en`;
3. otherwise `DEFAULT_LOCALE`.

It answers with a 307 and `Vary: Accept-Language, Cookie`, so a shared cache
cannot serve one visitor's redirect to the next. Keep this out of `redirects` in
`next.config.ts`: those run *before* the proxy and would shadow it. The proxy
does not run under static export.

A direct visit to `/id` or `/en` always serves that locale — the cookie only
resolves the bare root.

### The preference cookie

`voxera_locale` is written **only** by the header switcher's click handler
(`components/language-switcher.tsx`), never by locale detection and never by
merely landing on a locale URL. It holds a bare locale code, carries no
identifier, is never read for analytics, and expires after 180 days.

Those properties are what make it a UI-customisation cookie under ePrivacy
Art. 5(3) / WP29 Opinion 04/2012 §3.6, i.e. exempt from consent — see the
comment on `LOCALE_COOKIE` in `lib/i18n/config.ts` before changing it. Adding an
identifier, extending its use, or introducing analytics cookies alongside it
would make a consent banner mandatory. It should still be listed in the site's
privacy notice.

Without JavaScript the switcher still changes language; only the persistence is
lost.

All user-facing copy lives in `lib/i18n/dictionaries/`. `id.ts` is the source of
truth: `Dictionary` is derived from its shape, so a key added there fails the
build until `en.ts` provides it too. Dictionaries hold **plain strings only** —
they cross the Server → Client Component boundary as a prop, so runtime values
are interpolated at the call site with `formatTemplate` and `{placeholders}`.

Language *options* in the forms are stored as codes (`id`, `en`, `ja`, …) in
`lib/config.ts` and rendered through `dict.languageNames`, so switching locale
relabels the dropdowns without changing form state or any future API payload.

To add a locale: add it to `LOCALES`, add a dictionary file, and add its BCP 47
tag to `LOCALE_TAGS`.

## Before going live

The prototype's placeholder behaviour is deliberately confined to two files:

- **`lib/estimate.ts`** derives word counts and page counts from *file size*.
  Replace with real server-side parsing (text extraction, OCR page count). The
  pricing constants (`PRICE_PER_PAGE`, `HARD_COPY_FEE`) and the completion-time
  tiers in `etaForPages` should also be confirmed against current rates.
- **`useAsyncAction` in `lib/use-service-forms.ts`** fakes submission with a
  timeout. Swap in the real upload/submit calls, keeping the same
  `idle → running → done` status contract so the panels need no changes.

Nothing is uploaded anywhere yet — the file inputs only read `File` metadata in
the browser.
