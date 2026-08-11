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
