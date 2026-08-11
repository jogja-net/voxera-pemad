export const LOCALES = ["id", "en"] as const;

export type Locale = (typeof LOCALES)[number];

/** Indonesian is the default: most PéMad clients land here first. */
export const DEFAULT_LOCALE: Locale = "id";

export function hasLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** The other locale, for the header switcher. */
export function otherLocale(locale: Locale): Locale {
  return locale === "id" ? "en" : "id";
}

/** BCP 47 tags used for number formatting and the <html lang> attribute. */
export const LOCALE_TAGS: Record<Locale, string> = {
  id: "id-ID",
  en: "en-US",
};

/**
 * Remembers a manual choice from the header switcher so "/" honours it on the
 * next visit.
 *
 * This is a UI-customisation cookie in the sense of ePrivacy Art. 5(3) / WP29
 * Opinion 04/2012 §3.6, so it needs no consent banner — but only while it keeps
 * all of these properties:
 *
 *   - written ONLY on an explicit user action (the switcher click), never from
 *     Accept-Language detection or from merely landing on a locale URL;
 *   - holds a bare locale code, no identifier of any kind;
 *   - never read for analytics or joined with other data;
 *   - kept no longer than necessary.
 *
 * Putting an id in it, or reusing it for tracking, moves it out of the
 * exemption and makes consent mandatory. It should still be disclosed in the
 * privacy notice.
 */
export const LOCALE_COOKIE = "voxera_locale";

/** 180 days — long enough for a returning client, short of "indefinite". */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;
