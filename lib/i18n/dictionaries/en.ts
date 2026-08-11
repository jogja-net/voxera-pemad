import type { Dictionary } from "../types";

/** English copy carries over the wording from the design handoff verbatim. */
export const en: Dictionary = {
  locale: "en",

  meta: {
    title: "Voxera — Smart Language & Document Solutions",
    description:
      "AI-powered document validation, smart generation, sworn translation, and professional interpreters. Voxera by PT PéMad International Transearch.",
  },

  nav: {
    services: "Services",
    help: "Help & Support",
    clientPortal: "Client Portal",
    contact: "Contact Us",
    switchLanguage: "Switch language to Indonesian",
    menu: "Menu",
    themeToggle: "Toggle color theme",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
  },

  hero: {
    title: "Choose the service that fits your needs.",
    subtitle:
      "From AI-powered document validation and smart generation to sworn translation and professional interpreters. Voxera is your global partner for crossing the boundaries of language and document legality.",
  },

  languageNames: {
    id: "Indonesian",
    en: "English",
    ja: "Japanese",
    ko: "Korean",
    zh: "Mandarin",
    de: "German",
    ar: "Arabic",
  },

  tabs: {
    ariaLabel: "Voxera services",
    validation: {
      title: "Validation",
      subtitle: "Automatic Document Validation",
    },
    generation: {
      title: "Generation",
      subtitle: "Smart Document Generation",
    },
    translation: {
      title: "Translation",
      subtitle: "Document Translation Service",
    },
    sworn: {
      title: "Sworn Translation",
      subtitle: "Sworn Translation Request",
    },
    interpreter: {
      title: "Interpreter",
      subtitle: "Oral Translation Services",
    },
  },

  common: {
    wordCount: "WORD COUNT",
    fromLanguage: "FROM LANGUAGE",
    toLanguage: "TO LANGUAGE",
    uploadDocument: "Upload Document",
    chooseFile: "Choose File",
    noFileChosen: "No file chosen",
  },

  validation: {
    title: "Document Validation Service",
    intro:
      "Instantly analyze and validate your documents with the power of AI. Just drag and drop your file below.",
    uploadFirst: "Upload Document 1",
    uploadSecond: "Upload Document 2",
    scannedTitle: "My document is a scanned image",
    scannedHelper: "Enable for best results on scanned documents or images.",
    submitIdle: "Validate Now",
    submitRunning: "Validating…",
    resultTitle: "Validation complete",
    modeScanned: "OCR / SCANNED",
    modeNative: "NATIVE TEXT",
    resultLine:
      "MODE {mode} · FILES {files} · WORDS {words} · NO STRUCTURAL ISSUES DETECTED",
  },

  generation: {
    title: "Document Generation Service",
    intro:
      "Describe the document you need and fill out the form to automatically create your document.",
    promptLabel: "DOCUMENT DESCRIPTION (PROMPT)",
    promptPlaceholder:
      'Example: "Create a simple employment contract for a graphic designer..."',
    submitIdle: "Generate Document",
    submitRunning: "Generating…",
    resultLine:
      "DRAFT READY · FORMAT DOCX · {words} WORDS IN PROMPT · REVIEW BEFORE SIGNING",
  },

  translation: {
    title: "Document Translation Service",
    intro: "Upload a document (.txt, .pdf, .docx, .jpg, .png) to be translated.",
    contextLabel: "Context File (Optional)",
    contextHelper:
      "Provide a glossary or style reference. This file will not be translated or charged.",
    submitIdle: "Translate Now",
    submitRunning: "Translating…",
    submitDone: "Translation queued ✓",
  },

  sworn: {
    title: "Sworn Translation Request",
    intro:
      "Upload your document for a sworn translation. The final result will be sent to your email.",
    missingLanguageBefore: "If the target language is not available, ",
    missingLanguageLink: "please contact us",
    missingLanguageAfter: ".",
    uploadPlaceholder: "No files selected",
    uploadHelper:
      "Can upload PDF, DOCX, TXT, or Image. Maximum 15 pages per file. Ensure the file is clearly readable before submitting.",
    calculate: "Calculate Estimated Cost",
    totalPages: "Total Pages",
    pagesValue: "{count} pages",
    empty: "–",
    etaLabel: "Est. Completion",
    etaShort: "2–3 working days",
    etaMedium: "4–5 working days",
    etaLong: "6–8 working days",
    queueNoteBefore:
      "Completion time depends on translation order queue. Need faster processing? ",
    queueNoteLink: "Contact admin after ordering for priority service.",
    hardCopy: "Hard Copy Shipping",
    translationCost: "Translation Cost",
    totalCost: "Total Cost",
    submitIdle: "Submit Request",
    submitRunning: "Submitting…",
    submitDone: "Request submitted ✓",
  },

  interpreter: {
    title: "Interpreter Services",
    intro:
      "We provide professional oral translation services to support your cross-language communication in real-time. Suitable for conferences, business meetings, legal support, or technical visits. Please consult your specific language pairing, duration, and location needs directly with our team.",
    typesHeading: "Available Service Types:",
    simultaneousName: "Simultaneous Interpretation",
    simultaneousDescription:
      "Interpreter translates into the target language as quickly as possible while the source speaker keeps speaking.",
    consecutiveName: "Consecutive Interpretation",
    consecutiveDescription:
      "Interpreter speaks after the source speaker has finished speaking.",
    languageLabel: "REQUIRED LANGUAGE",
    languagePlaceholder: "-- Select Language --",
    dateLabel: "START DATE / EVENT DATE",
    durationLabel: "DURATION",
    durationPlaceholder: "E.g., 4 Hours, 2 Days, 1 Week",
    whatsappCta: "Contact Our Team via WhatsApp",
    whatsappGreeting: "Hello Voxera, I would like to ask about interpreter services.",
    whatsappLanguage: "Language: {language}.",
    whatsappDate: "Date: {date}.",
    whatsappDuration: "Duration: {duration}.",
  },

  footer: {
    tagline: "Smart Language & Document Solutions",
    quickLinksHeading: "QUICK LINKS",
    linkHome: "Home",
    linkAbout: "About Us",
    linkServices: "Services",
    linkContact: "Contact Us",
    addressHeading: "OUR ADDRESS",
    phone: "Phone: (0274) 7377040",
    hours: "Opening Hours: Open until 4:00 PM WIB",
    hoursNote: "(On-site and online services available)",
    badge: "MADE FOR GLOBAL DOCUMENTS",
  },
};
