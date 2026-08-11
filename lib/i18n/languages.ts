import type { LanguageCode } from "@/lib/config";
import type { Dictionary } from "./types";

/** Turns language codes into `<option>` data with names in the active locale. */
export function languageOptions(
  codes: readonly LanguageCode[],
  dict: Dictionary,
) {
  return codes.map((code) => ({ value: code, label: dict.languageNames[code] }));
}
