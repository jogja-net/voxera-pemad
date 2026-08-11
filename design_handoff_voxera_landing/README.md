# Handoff: Voxera Interactive Services Landing Page

## Overview
A single-page landing page for Voxera, a language/document-services startup. The core interaction is a 5-tab service switcher — clicking a tab swaps the form panel below it (no page navigation) to match the selected service: Validation, Generation, Translation, Sworn Translation, Interpreter.

## About the Design Files
The bundled file (`Voxera Landing.dc.html`) is a **design reference built in HTML** — a working prototype of layout, styling and interaction, not production code to copy verbatim. Recreate this design as a **Next.js** app (per the user's stack choice) using React components, Tailwind CSS (or CSS modules — Tailwind is what the interactive-panel spec assumed) and your own component/state conventions. Treat all copy, colors, spacing and interaction behavior below as the source of truth; treat the HTML/inline-style markup only as a reference for structure.

## Fidelity
**High-fidelity.** Colors, type, spacing and copy are final. Recreate pixel-close using Tailwind utility classes or CSS-in-JS equivalents to the values below.

## Screens / Views
Single page, four stacked regions: Header, Service Tabs + Dynamic Panel, (no separate hero — the section title lives directly above the tabs), Footer.

### 1. Header (sticky)
- Sticky top nav, `72px` tall, white background at 88% opacity + `backdrop-filter: blur(12px)`, `1px solid #e2e8f0` bottom border.
- Max width 1240px, centered, `40px` side padding.
- Left: "Voxera" wordmark, 22px/700, `#0047bb`, letter-spacing -0.03em.
- Center nav: "Services" (active — 14px/600 `#0047bb` with 2px bottom border) and "Help & Support" (14px/500 `#475569`, hover `#0047bb`).
- Right: two buttons — "Client Portal" (outline, 1px `#0047bb` border, `#0047bb` text, 40px tall, 4px radius, hover bg `rgba(0,71,187,.06)`) and "Contact Us" (filled `#0047bb`, white text, hover `#00328a`).

### 2. Section intro (static, above tabs)
- Centered, max-width 680px.
- H1 "Pilih layanan yang sesuai kebutuhan Anda." — 34px/700, `#0f172a`, letter-spacing -0.02em.
- Paragraph: "Mulai dari validasi dokumen bertenaga AI, smart generation, penerjemahan tersumpah, hingga interpreter profesional. Voxera hadir untuk menjadi mitra global Anda dalam menembus batas bahasa dan legalitas dokumen." — 16px/26px, `#475569`.

### 3. Service tabs (5-up grid, wraps to fewer columns / stacks on mobile)
Each tab is a card button: white bg, `1px solid #e2e8f0` border, 8px radius, 18px/20px padding, icon (24px Lucide-style stroke, `#0047bb`, stroke-width 1.5) + title (16px/600 `#0f172a`) + subtitle (13px `#64748b`). Active tab gets an inset 2px `#0047bb` ring + soft shadow; hover lifts `translateY(-2px)`.
1. Validation — "Automatic Document Validation" (document/check icon)
2. Generation — "Smart Document Generation" (pen icon)
3. Translation — "Document Translation Service" (globe icon)
4. Sworn Translation — "Sworn Translation Request" (scales icon)
5. Interpreter — "Oral Translation Services" (speech bubble icon)

### 4. Dynamic panel
White card, `1px solid #e2e8f0`, 12px radius, soft shadow (`0 10px 20px rgba(15,23,42,.04)`), 40px/44px padding. Content swaps per active tab (fade-in, ~280ms, translateY(8px)→0). See **Panels** below for each one's exact fields and copy.

### 5. Footer
Dark `#0f172a` background, white/light-gray text, 3-column grid (min 240px per column), 72px/40px padding, max-width 1240px.
- Col 1 — "VOXERA" (24px/700 white) + "Smart Language & Document Solutions" (15px `#94a3b8`).
- Col 2 — "QUICK LINKS" label (12px mono, `#64748b`) + Home / About Us / Services / Contact Us links (15px `#e2e8f0`, hover `#b3c5ff`).
- Col 3 — "OUR ADDRESS" label +:
  ```
  PT PéMad International Transearch
  Ruko Trimukti Square
  Jl. Kaliurang Km. 10, Jl. Ngalangan Raya No. 8-10
  Telp: (0274) 7377040
  Jam Operasional: Buka hingga 16.00 WIB
  (Melayani layanan di tempat dan online)
  ```
- Bottom bar: copyright line + "MADE FOR GLOBAL DOCUMENTS" mono label, separated by a `1px` top border at 12% white opacity.

## Panels (exact content per tab)

**Validation** — H2 "Document Validation Service"; subtitle "Instantly analyze and validate your documents with the power of AI. Just drag and drop your file below."; two upload buttons ("Upload Document 1" / "Upload Document 2", 2px dashed `#0047bb` border, 12px radius, filename shown in JetBrains Mono below the "Choose File" label); checkbox "My document is a scanned image" with helper text "Enable for best results on scanned documents or images."; "WORD COUNT" stat row (mono, right-aligned value in `#0047bb`); full-width primary button "Validate Now" → "Validating…" → success card "Validation complete" with a mono detail line (mode, file count, word count).

**Generation** — H2 "Document Generation Service"; subtitle "Select a document type and fill out the form to automatically create your document."; textarea labeled "DOCUMENT DESCRIPTION (PROMPT)" with placeholder `Example: "Create a simple employment contract for a graphic designer..."`; word-count stat row; primary button "Generate Document" → "Generating…" → draft-ready result card.

**Translation** — H2 "Document Translation Service"; subtitle "Upload a document (.txt, .pdf, .docx, .jpg, .png) to be translated."; From Language / To Language selects (Indonesian, English, Japanese, Korean, Mandarin, German, Arabic); "Upload Document" dashed upload button; "Context File (Optional)" upload with helper "Provide a glossary or style reference. This file will not be translated or charged."; word-count stat row; primary button "Translate Now" → "Translating…" → "Translation queued ✓".

**Sworn Translation** — H2 "Sworn Translation Request"; subtitle "Upload your document for a sworn translation. The final result will be sent to your email."; From/To Language selects; helper line "If the target language is not available, please contact us." (link to #contact); "Upload Document" with helper "Can upload PDF, DOCX, TXT, or Image. Maximum 15 pages per file. Ensure the file is clearly readable before submitting."; outline button "Calculate Estimated Cost"; result block showing Total Pages, Est. Completion (with a note "Completion time depends on translation order queue. Need faster processing? Contact admin after ordering for priority service."), a "Hard Copy Shipping" checkbox (+Rp 50.000), Translation Cost / Total Cost rows in a `#f2f4f6` tinted box; primary button "Submit Request" → "Submitting…" → "Request submitted ✓".

**Interpreter** — H2 "Interpreter Services"; body copy: "We provide professional oral translation services to support your cross-language communication in real-time. Suitable for conferences, business meetings, legal support, or technical visits. Please consult your specific language pairing, duration, and location needs directly with our team."; info box (left accent border `#0047bb`, `#f2f4f6` fill) titled "Available Service Types:" listing "Simultaneous Interpretation" and "Consecutive Interpretation" each with a one-line definition; "Required Language" select (placeholder "-- Select Language --"); "Start Date / Event Date" date input and "Duration" text input (placeholder "E.g., 4 Hours, 2 Days, 1 Week") side by side; full-width green (`#059669`, hover `#047857`) button with WhatsApp icon: "Contact Our Team via WhatsApp".

## Interactions & Behavior
- Tab click sets active tab index (0–4); only the matching panel renders; switching plays a fade/slide-in (280ms ease).
- File "upload" buttons trigger a hidden native `<input type="file">`; selected filename replaces "No file chosen" placeholder text.
- Word count is derived live from selected file size (prototype heuristic) or textarea content (split on whitespace) — replace with real word/OCR extraction from the backend.
- "Calculate Estimated Cost" (Sworn panel) computes Total Pages from file size (prototype heuristic — replace with real page-count extraction), Est. Completion tiers by page count (≤3 pages: 2–3 days, ≤8: 4–5 days, else 6–8 days), and Total Cost = pages × Rp120,000 + Rp50,000 if Hard Copy Shipping is checked.
- All primary action buttons ("Validate Now", "Generate Document", "Translate Now", "Submit Request") go through a `running → done` state (prototype uses a 1.2–1.4s `setTimeout`; replace with real async submit/upload calls) and update their own label while running.
- WhatsApp button should link to a real `wa.me/<number>?text=...` deep link in production (prototype points at `#contact`).
- Focus states: form inputs/textarea get a `#0047bb` border + inset ring on focus; all interactive elements should have visible `:focus-visible` outlines for accessibility.

## State Management
Suggested state (per active service, can be one form-state object keyed by tab, or 5 independent hook states):
- `activeTab: number` (0–4)
- Validation: `fileA, fileB, isScanned, status ('idle'|'running'|'done')`
- Generation: `prompt: string, status`
- Translation: `fromLang, toLang, file, contextFile, status`
- Sworn: `fromLang, toLang, file, hardCopyShipping, costCalculated, pages, totalCost, status`
- Interpreter: `language, eventDate, duration`

Real implementation should replace the prototype's file-size-based word/page-count estimates with actual server-side document parsing (word count, OCR page count) called on file select or on "Calculate"/"Validate".

## Design Tokens
- **Colors:** Primary blue `#0047bb` (hover/pressed `#00328a`), dark text `#0f172a`, secondary text `#475569`, muted text `#64748b`, borders `#e2e8f0`, tinted fill `#f2f4f6` / `#f7f9fb`, success green `#059669` (hover `#047857`), light blue tint `rgba(0,71,187,.03–.08)`.
- **Typography:** Inter (400/500/600/700) for all UI text; JetBrains Mono (500) for stat labels, word/page counts and small mono tags. H2 panel titles: 30px/700, -0.02em. Body: 16px/24–26px.
- **Radius:** 4px (buttons, inputs), 8px (footer info box, small cards), 12px (upload dropzones, main panel).
- **Shadow:** `0 10px 20px rgba(15,23,42,.04)` on the main panel card; `0 8px 18px rgba(15,23,42,.07)` on the active tab ring.
- **Spacing:** Page gutter 40px; max content width 1240px; panel padding 40/44px; form field gaps 18–22px.

## Assets
No raster images. Icons are inline SVGs in a thin-stroke (1.5px) Lucide-style line-icon set (document, pen, globe, scales, speech-bubble, upload, checkmark, link/paperclip, WhatsApp glyph) — swap in your icon library's equivalents (e.g. `lucide-react`) rather than copying the raw SVG paths.

## Files
- `Voxera Landing.dc.html` — the full design reference (structure, inline styles, and interaction logic for all 5 panels). Open in a browser to see live behavior.
- `screenshots/01-validation.png` — header + tab row + intro copy.
- `screenshots/02-validation-panel.png` through `06-interpreter-panel.png` — each tab's panel in its active state.
