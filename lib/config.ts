/**
 * Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local to the team's WhatsApp number in
 * international format without "+" (e.g. 6281234567890). While it is unset the
 * interpreter CTA falls back to the footer contact anchor, as in the prototype.
 */
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

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
