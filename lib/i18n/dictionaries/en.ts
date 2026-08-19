import type { Dictionary } from "../types";

/** English copy carries over the wording from the design handoff verbatim. */
export const en: Dictionary = {
  locale: "en",

  meta: {
    title: "Voxera — Smart Language & Document Solutions",
    description:
      "Sworn translation service, document legalization, official document translation, AI-powered validation, smart generation, and professional interpreters. Voxera by PT PéMad International Transearch.",
    keywords: [
      "sworn translation service",
      "sworn translator",
      "document legalization",
      "official document translation",
      "document translation service",
      "certified translator",
      "interpreter service",
      "AI document validation",
    ],
  },

  org: {
    name: "Voxera",
    company: "PT PéMad International Transearch",
    streetAddress:
      "Ruko Trimukti Square, Jl. Kaliurang Km. 10, Jl. Ngalangan Raya No. 8-10",
    telephone: "(0274) 7377040",
  },

  nav: {
    services: "Services",
    help: "Help & Support",
    billing: "Billing",
    project: "Project",
    comingSoon: "Coming soon",
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
      /** Suffixed onto the accessible name; the link opens the OCR portal in a new tab. */
      opensNewTab: "(opens in a new tab)",
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

  info: {
    eyebrow: "OFFICIAL & CERTIFIED SERVICE",
    title: "About Voxera's Sworn Translation Service",
    body1:
      "Legal and official documents such as diplomas, birth certificates, company establishment deeds, and official decrees must be translated by a sworn translator. Voxera's team holds official certification, so your translation is ready for document legalization, applications to educational institutions, and visa or permit processing at embassies.",
    body2:
      "Every sworn translation is handled carefully to follow legal standards and official terminology. Simply upload your document, calculate the estimated cost automatically, and receive the final result directly in your email without visiting our office.",
    ctaLabel: "Submit a Sworn Translation Request",
  },

  docTypes: {
    eyebrow: "DOCUMENTS WE HANDLE",
    title: "Official Documents for Every Need",
    intro:
      "We handle sworn and regular translation for a wide range of personal, corporate, and legal documents that require official approval.",
    personalTitle: "Personal Documents",
    personalItems: [
      "Diploma & Transcripts",
      "Birth & Divorce Certificates",
      "Family Card & ID Card",
      "Marriage Certificate & Book",
      "Police Clearance Certificate",
    ],
    corporateTitle: "Corporate Documents",
    corporateItems: [
      "Company Establishment Deeds",
      "NIB, SIUP & TDP",
      "Employment Contracts & Agreements",
      "Official Decrees & Permits",
      "Notarial & Corporate Documents",
    ],
    legalTitle: "Legal Documents",
    legalItems: [
      "Court Decisions",
      "Power of Attorney",
      "Certificates & Licenses",
      "Legal Agreements",
      "Other Legal Documents",
    ],
  },

  whyUs: {
    eyebrow: "WHY CHOOSE VOXERA",
    title: "Trusted Partner for Your Global Documents",
    intro:
      "We combine AI technology with the expertise of professional translators to keep your documents accurate, official, and recognized.",
    certifiedTitle: "Officially Certified Team",
    certifiedBody:
      "Our translators hold official certification, so the results are recognized for legalization and official purposes.",
    emailTitle: "Delivered Straight to Your Email",
    emailBody:
      "Completed documents are sent directly to your email, so there is no need to visit the office.",
    priorityTitle: "Priority Service",
    priorityBody:
      "In a hurry? Contact the admin after ordering to unlock faster priority processing.",
    onlineTitle: "Online & Offline",
    onlineBody:
      "Service is accessible from anywhere — ideal for clients at home and abroad.",
  },

  faq: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    title: "Questions Our Clients Often Ask",
    items: [
      {
        q: "How long does sworn translation take?",
        a: "Completion depends on page count and the order queue — typically 2–3 working days for short documents up to 6–8 working days for longer ones. You can also request priority service through the admin.",
      },
      {
        q: "How is the translation cost calculated?",
        a: "Upload your document in the Sworn Translation panel and click Calculate Estimated Cost. The price is based on the number of pages at a per-page rate, and a hard copy fee can be added if needed.",
      },
      {
        q: "Do I receive a physical (hard copy) result?",
        a: "The digital result is sent to your email. You may choose the hard copy shipping option, which incurs an additional fee.",
      },
      {
        q: "Is the sworn translation officially recognized?",
        a: "Yes. Sworn translations are produced by an officially certified team and are generally accepted by embassies, educational institutions, and government agencies for document legalization.",
      },
      {
        q: "Which languages are supported for translation?",
        a: "We provide regular and sworn translation for languages such as English, Japanese, Korean, Mandarin, and German. If your target language is unavailable, contact us for a consultation.",
      },
      {
        q: "What if my target language is not available?",
        a: "Please reach out through the contact section or WhatsApp. We will do our best to help with your language pairing.",
      },
    ],
  },

  billing: {
    title: "Billing",
    emptyState: "No invoices yet.",
    pendingProjectsHeading: "Projects awaiting invoicing",
    awaitingConfirmation: "Awaiting admin confirmation",
    statusPending: "Awaiting payment",
    statusPaid: "Paid",
    statusExpired: "Expired",
    statusFailed: "Failed",
    payCta: "Pay now",
    adminSectionTitle: "Confirm quantity & create invoice",
    quantityLabel: "Quantity",
    unitWord: "words",
    unitPage: "pages",
    unitHour: "hours",
    createInvoiceCta: "Create Invoice",
    createInvoiceError: "Failed to create invoice.",
    subtotalLabel: "Subtotal",
    taxLabel: "VAT (11%)",
    totalLabel: "Total",
  },

  auth: {
    loginTitle: "Login to Your Account",
    loginIntro: "Please log in to continue using the service.",
    registerTitle: "Create a New Account",
    registerIntro: "Please register to continue using the service.",
    nameLabel: "Name",
    phoneLabel: "Phone Number",
    emailLabel: "Email",
    passwordLabel: "Password",
    confirmPasswordLabel: "Confirm Password",
    loginSubmit: "Login to Your Account",
    loginSubmitting: "Signing in…",
    registerSubmit: "Create a New Account",
    registerSubmitting: "Creating account…",
    orDivider: "OR",
    googleButton: "Login with Google",
    toggleToRegisterBefore: "Don't have an account? ",
    toggleToRegisterLink: "Register here",
    toggleToLoginBefore: "Already have an account? ",
    toggleToLoginLink: "Login here",
    closeModal: "Close",
    checkEmailTitle: "Check your email",
    checkEmailBody:
      "We've sent a confirmation link to your email. Click it to activate your account, then log in here.",
    loginCta: "Login",
    logoutCta: "Logout",
    errors: {
      invalidCredentials: "Incorrect email or password.",
      emailInUse: "This email is already registered.",
      passwordMismatch: "Password confirmation doesn't match.",
      generic: "Something went wrong. Please try again.",
    },
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
