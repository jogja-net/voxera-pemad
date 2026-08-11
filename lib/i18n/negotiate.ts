import { DEFAULT_LOCALE, LOCALES, type Locale } from "./config";

/**
 * Legacy/alternate primary subtags that mean one of our locales. Indonesian was
 * coded `in` before ISO 639 renamed it to `id`, and some older Java/Android
 * stacks still send the old tag.
 */
const ALIASES: Record<string, Locale> = { in: "id" };

type Range = { primary: string; quality: number; order: number };

/**
 * Picks the best supported locale from an `Accept-Language` header, honouring
 * q-values and falling back to DEFAULT_LOCALE when nothing matches.
 *
 * Only the primary subtag is compared, so `en-GB`, `en-US` and `en` all resolve
 * to `en` — we do not serve regional variants.
 */
export function negotiateLocale(header: string | null | undefined): Locale {
  if (!header) return DEFAULT_LOCALE;

  const ranges: Range[] = [];

  header.split(",").forEach((part, order) => {
    const [tag, ...params] = part.trim().split(";");
    if (!tag) return;

    const qParam = params.find((param) => param.trim().startsWith("q="));
    const quality = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
    // A malformed or zero q-value means "not acceptable".
    if (!Number.isFinite(quality) || quality <= 0) return;

    ranges.push({
      primary: tag.trim().toLowerCase().split("-")[0],
      quality,
      order,
    });
  });

  // Higher q first; equal q keeps the order the client listed them in.
  ranges.sort((a, b) => b.quality - a.quality || a.order - b.order);

  for (const { primary } of ranges) {
    if (primary === "*") return DEFAULT_LOCALE;

    const match =
      LOCALES.find((locale) => locale === primary) ?? ALIASES[primary];
    if (match) return match;
  }

  return DEFAULT_LOCALE;
}
