import { en } from "./dictionaries/en";
import { id } from "./dictionaries/id";
import type { Locale } from "./config";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = { id, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS, hasLocale, otherLocale } from "./config";
export type { Locale } from "./config";
export type { Dictionary } from "./types";
export { formatTemplate } from "./format";
