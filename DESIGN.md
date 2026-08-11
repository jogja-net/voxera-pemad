---
name: Voxera Corporate Core
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434653'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737685'
  outline-variant: '#c3c6d6'
  surface-tint: '#2156ca'
  primary: '#00328a'
  on-primary: '#ffffff'
  primary-container: '#0047bb'
  on-primary-container: '#afc1ff'
  inverse-primary: '#b3c5ff'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fc'
  on-secondary-container: '#57657a'
  tertiary: '#31394e'
  on-tertiary: '#ffffff'
  tertiary-container: '#485066'
  on-tertiary-container: '#bbc2dc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#00174a'
  on-primary-fixed-variant: '#003ea6'
  secondary-fixed: '#d5e3fc'
  secondary-fixed-dim: '#b9c7df'
  on-secondary-fixed: '#0d1c2e'
  on-secondary-fixed-variant: '#3a485b'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  button:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is engineered for a high-stakes corporate environment where precision, global communication, and technological intelligence are paramount. The target audience includes enterprise stakeholders, legal professionals, and document managers who require a UI that feels reliable, authoritative, and frictionless.

The aesthetic follows a **Corporate / Modern** style with a focus on "Precision Minimalism." It avoids decorative flourishes in favor of structured data visualization and clear information hierarchy. The interface should evoke a sense of quiet confidence through generous whitespace, high-contrast typography, and a "Technological Blue" foundation.

## Colors

The palette is rooted in a spectrum of professional blues and grays to establish trust and technological prowess.

- **Primary (#0047BB):** A deep, vibrant blue used for critical actions and brand presence. It signifies intelligence and stability.
- **Secondary / Slate (#475569):** Used for supporting text and UI elements that require distinction without the weight of the primary color.
- **Tertiary / Midnight (#0F172A):** The strongest dark value, reserved for headlines and primary navigation to ensure maximum readability and a premium feel.
- **Neutral (#F8FAFC):** A clean, cool-toned white used for page backgrounds to reduce eye strain during long-form document review.
- **Semantic Colors:** Clear Red (#DC2626) for AI validation errors and Emerald (#059669) for successful processing.

## Typography

The typography system relies on **Inter** for its exceptional legibility and systematic appearance. It scales from a bold Display style for marketing presence down to highly readable body text for document previews.

For technical metadata and AI validation logs, **JetBrains Mono** is introduced to provide a distinct visual cue for "machine-generated" or "structured" data. This contrast between the humanist Inter and the technical JetBrains Mono reinforces the "Smart Language" narrative. All headlines use tighter letter-spacing to appear more cohesive and authoritative.

## Layout & Spacing

This design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile devices. The rhythm is based on a 4px baseline shift, ensuring all elements align to a consistent mathematical scale.

- **Desktop (1440px+):** 64px side margins, 24px gutters.
- **Tablet (768px - 1439px):** 32px side margins, 20px gutters.
- **Mobile (<767px):** 16px side margins, 16px gutters.

Large sections (like service grids) should use `lg` (48px) spacing between them to maintain the professional, airy feel of the brand.

## Elevation & Depth

To maintain a "Tech-Forward" and "Corporate" persona, this design system avoids heavy shadows and skeuomorphism. Instead, it uses **Tonal Layering** and **Low-Contrast Outlines**.

1.  **Level 0 (Background):** Neutral (#F8FAFC).
2.  **Level 1 (Cards/Containers):** Pure White (#FFFFFF) with a 1px solid border in Slate-100 (#E2E8F0).
3.  **Level 2 (Active States/Modals):** Pure White with a soft, ultra-diffused shadow (Blur: 20px, Y: 10px, Opacity: 4% Black) to suggest focus without breaking the flat corporate aesthetic.

Interactive elements use a subtle 1px inset border on hover to provide tactile feedback without shifting the layout.

## Shapes

The shape language is "Soft Professional." Elements use subtle rounding to appear modern and accessible, but not overly "bubbly" or consumer-grade.

- **Standard (4px):** Used for input fields, checkboxes, and small buttons.
- **Large (8px):** Used for cards and primary service containers.
- **Extra Large (12px):** Used for large AI upload zones and prominent feature hero blocks.

## Components

### Cards for Services
Service cards must use a white background with a Slate-100 border. Icons should be monochrome Primary Blue. Text alignment is left-aligned for readability, with a "Body-MD" description and a clear "Button-Text" link.

### AI Upload Area
The upload zone is a dashed-border container (Primary Blue, 2px stroke, 4px dash). It should feature a "Body-LG" call to action. Upon dragging a file, the background should transition to a subtle 5% Primary Blue tint.

### Buttons
- **Primary:** Solid Primary Blue background, White text.
- **Secondary:** Transparent background, 1px Primary Blue border, Primary Blue text.
- **Tertiary:** Slate-600 text with no border, used for less critical actions.

### Input Fields
Inputs use a 1px Slate-200 border. On focus, the border transitions to 2px Primary Blue. Labels are always "Label-MD" in Slate-500, positioned above the field.

### Structured Footer
The footer uses the Tertiary (Midnight) background with White or Slate-300 text. Information is organized into high-density columns: Company, Services, Legal, and Global Offices. A small PT PéMad International Transearch attribution sits at the very bottom in "Body-SM."