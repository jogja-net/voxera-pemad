/**
 * Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local to the team's WhatsApp number in
 * international format without "+" (e.g. 6281234567890). While it is unset the
 * interpreter CTA falls back to the footer contact anchor, as in the prototype.
 */
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

/**
 * Absolute origin used as `metadataBase`. Open Graph requires fully qualified
 * URLs — without this, `openGraph.url` ships as a bare "/id" and no scraper
 * (WhatsApp, Facebook, LinkedIn) can resolve it.
 *
 * `VERCEL_PROJECT_PRODUCTION_URL` is the project's production domain and is set
 * on every Vercel deployment, previews included, so share cards always point at
 * production. Set NEXT_PUBLIC_SITE_URL to override it with a custom domain.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/** Sworn translation requests are handled on the client portal. */
export const SWORN_PORTAL_URL = "https://ocr.pemad.my.id/login";

export function buildWhatsAppLink(message: string): string {
  if (!WHATSAPP_NUMBER) return "#contact";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Languages are identified by a stable code so form state and any future API
 * payload stay the same in both locales; only the label is translated (see
 * `languageNames` in the dictionaries).
 */
export const LANGUAGE_CODES = [
  "id",
  "en",
  "ja",
  "ko",
  "zh",
  "de",
  "ar",
] as const;

export type LanguageCode = (typeof LANGUAGE_CODES)[number];

/** Sworn translation is offered on a narrower set of language pairs. */
export const SWORN_LANGUAGE_CODES = [
  "id",
  "en",
  "ja",
  "ko",
  "zh",
  "de",
] as const satisfies readonly LanguageCode[];

/** Empty value = the "-- Select Language --" row in the interpreter form. */
export const INTERPRETER_LANGUAGE_UNSET = "";
