/**
 * Prototype estimators carried over from the design reference.
 *
 * Word and page counts are derived from file size alone — this is a stand-in so
 * the UI has something to show. Replace every file-based function here with real
 * server-side document parsing (text extraction + OCR page count) before going
 * live; see design_handoff_voxera_landing/README.md ("Interactions & Behavior").
 */

import { LOCALE_TAGS, type Locale } from "./i18n/config";

export const PRICE_PER_PAGE = 120_000;
export const HARD_COPY_FEE = 50_000;
export const MAX_PAGES = 15;

/** Prototype heuristic: ~6.4 bytes per word. Replace with real extraction. */
export function estimateWords(files: (File | null)[]): number {
  return files
    .filter((file): file is File => Boolean(file))
    .reduce((total, file) => total + Math.max(1, Math.round(file.size / 6.4)), 0);
}

/** Real word count for user-typed text (whitespace split). */
export function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

/** Prototype heuristic: ~2400 bytes per page, capped at MAX_PAGES. */
export function estimatePages(file: File | null): number {
  if (!file) return 0;
  return Math.max(1, Math.min(MAX_PAGES, Math.ceil(file.size / 2400)));
}

/** Dictionary key for the completion estimate — the wording is localized. */
export type EtaTier = "none" | "short" | "medium" | "long";

export function etaForPages(pages: number): EtaTier {
  if (!pages) return "none";
  if (pages <= 3) return "short";
  if (pages <= 8) return "medium";
  return "long";
}

export function swornCost(pages: number, hardCopy: boolean) {
  const translation = pages * PRICE_PER_PAGE;
  return { translation, total: translation + (hardCopy ? HARD_COPY_FEE : 0) };
}

export function formatNumber(value: number, locale: Locale): string {
  return value.toLocaleString(LOCALE_TAGS[locale]);
}

export function formatRupiah(value: number, locale: Locale): string {
  return `Rp ${value.toLocaleString(LOCALE_TAGS[locale])}`;
}
