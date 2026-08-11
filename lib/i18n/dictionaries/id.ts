import type { LanguageCode } from "@/lib/config";
import type { Locale } from "../config";

/**
 * Indonesian is the source dictionary: `Dictionary` is derived from its shape,
 * so every key added here must also be added to `en.ts`.
 *
 * Values are plain strings only — a dictionary is passed from Server to Client
 * Components as a prop, so it has to stay serializable. Runtime values are
 * interpolated with `{placeholders}` and `formatTemplate`.
 */
export const id = {
  locale: "id" as Locale,

  meta: {
    title: "Voxera — Solusi Bahasa & Dokumen Cerdas",
    description:
      "Validasi dokumen bertenaga AI, smart generation, penerjemahan tersumpah, hingga interpreter profesional. Voxera by PT PéMad International Transearch.",
  },

  nav: {
    services: "Layanan",
    help: "Bantuan & Dukungan",
    clientPortal: "Portal Klien",
    contact: "Hubungi Kami",
    switchLanguage: "Ganti bahasa ke Bahasa Inggris",
    menu: "Menu",
    themeToggle: "Ganti tema warna",
    themeLight: "Beralih ke tema terang",
    themeDark: "Beralih ke tema gelap",
  },

  hero: {
    title: "Pilih layanan yang sesuai kebutuhan Anda.",
    subtitle:
      "Mulai dari validasi dokumen bertenaga AI, smart generation, penerjemahan tersumpah, hingga interpreter profesional. Voxera hadir untuk menjadi mitra global Anda dalam menembus batas bahasa dan legalitas dokumen.",
  },

  languageNames: {
    id: "Indonesia",
    en: "Inggris",
    ja: "Jepang",
    ko: "Korea",
    zh: "Mandarin",
    de: "Jerman",
    ar: "Arab",
  } satisfies Record<LanguageCode, string>,

  tabs: {
    ariaLabel: "Layanan Voxera",
    validation: {
      title: "Validasi",
      subtitle: "Validasi Dokumen Otomatis",
    },
    generation: {
      title: "Generasi",
      subtitle: "Pembuatan Dokumen Cerdas",
    },
    translation: {
      title: "Terjemahan",
      subtitle: "Layanan Terjemahan Dokumen",
    },
    sworn: {
      title: "Terjemahan Tersumpah",
      subtitle: "Permintaan Terjemahan Tersumpah",
    },
    interpreter: {
      title: "Interpreter",
      subtitle: "Layanan Penerjemahan Lisan",
    },
  },

  common: {
    wordCount: "JUMLAH KATA",
    fromLanguage: "DARI BAHASA",
    toLanguage: "KE BAHASA",
    uploadDocument: "Unggah Dokumen",
    chooseFile: "Pilih Berkas",
    noFileChosen: "Belum ada berkas dipilih",
  },

  validation: {
    title: "Layanan Validasi Dokumen",
    intro:
      "Analisis dan validasi dokumen Anda secara instan dengan kekuatan AI. Cukup unggah berkas Anda di bawah ini.",
    uploadFirst: "Unggah Dokumen 1",
    uploadSecond: "Unggah Dokumen 2",
    scannedTitle: "Dokumen saya berupa hasil pindaian",
    scannedHelper:
      "Aktifkan untuk hasil terbaik pada dokumen hasil pindaian atau gambar.",
    submitIdle: "Validasi Sekarang",
    submitRunning: "Memvalidasi…",
    resultTitle: "Validasi selesai",
    modeScanned: "OCR / PINDAIAN",
    modeNative: "TEKS ASLI",
    resultLine:
      "MODE {mode} · BERKAS {files} · KATA {words} · TIDAK DITEMUKAN MASALAH STRUKTUR",
  },

  generation: {
    title: "Layanan Pembuatan Dokumen",
    intro:
      "Jelaskan dokumen yang Anda butuhkan, lalu isi formulir untuk membuat dokumen secara otomatis.",
    promptLabel: "DESKRIPSI DOKUMEN (PROMPT)",
    promptPlaceholder:
      'Contoh: "Buatkan kontrak kerja sederhana untuk seorang desainer grafis..."',
    submitIdle: "Buat Dokumen",
    submitRunning: "Membuat…",
    resultLine:
      "DRAF SIAP · FORMAT DOCX · {words} KATA DALAM PROMPT · PERIKSA SEBELUM DITANDATANGANI",
  },

  translation: {
    title: "Layanan Terjemahan Dokumen",
    intro:
      "Unggah dokumen (.txt, .pdf, .docx, .jpg, .png) yang ingin diterjemahkan.",
    contextLabel: "Berkas Konteks (Opsional)",
    contextHelper:
      "Lampirkan glosarium atau acuan gaya bahasa. Berkas ini tidak diterjemahkan dan tidak dikenai biaya.",
    submitIdle: "Terjemahkan Sekarang",
    submitRunning: "Menerjemahkan…",
    submitDone: "Terjemahan masuk antrean ✓",
  },

  sworn: {
    title: "Permintaan Terjemahan Tersumpah",
    intro:
      "Unggah dokumen Anda untuk diterjemahkan secara tersumpah. Hasil akhir akan dikirim ke email Anda.",
    missingLanguageBefore: "Jika bahasa tujuan belum tersedia, ",
    missingLanguageLink: "silakan hubungi kami",
    missingLanguageAfter: ".",
    uploadPlaceholder: "Belum ada berkas dipilih",
    uploadHelper:
      "Dapat mengunggah PDF, DOCX, TXT, atau Gambar. Maksimal 15 halaman per berkas. Pastikan berkas terbaca jelas sebelum dikirim.",
    calculate: "Hitung Estimasi Biaya",
    totalPages: "Total Halaman",
    pagesValue: "{count} halaman",
    empty: "–",
    etaLabel: "Estimasi Selesai",
    etaShort: "2–3 hari kerja",
    etaMedium: "4–5 hari kerja",
    etaLong: "6–8 hari kerja",
    queueNoteBefore:
      "Waktu pengerjaan bergantung pada antrean pesanan terjemahan. Butuh lebih cepat? ",
    queueNoteLink: "Hubungi admin setelah memesan untuk layanan prioritas.",
    hardCopy: "Pengiriman Hard Copy",
    translationCost: "Biaya Terjemahan",
    totalCost: "Total Biaya",
    submitIdle: "Kirim Permintaan",
    submitRunning: "Mengirim…",
    submitDone: "Permintaan terkirim ✓",
  },

  interpreter: {
    title: "Layanan Interpreter",
    intro:
      "Kami menyediakan layanan penerjemahan lisan profesional untuk mendukung komunikasi lintas bahasa Anda secara real-time. Cocok untuk konferensi, pertemuan bisnis, pendampingan hukum, maupun kunjungan teknis. Silakan konsultasikan kebutuhan pasangan bahasa, durasi, dan lokasi Anda langsung dengan tim kami.",
    typesHeading: "Jenis Layanan yang Tersedia:",
    simultaneousName: "Interpretasi Simultan",
    simultaneousDescription:
      "Interpreter menerjemahkan ke bahasa sasaran secepat mungkin sementara pembicara terus berbicara.",
    consecutiveName: "Interpretasi Konsekutif",
    consecutiveDescription:
      "Interpreter berbicara setelah pembicara selesai menyampaikan bagiannya.",
    languageLabel: "BAHASA YANG DIBUTUHKAN",
    languagePlaceholder: "-- Pilih Bahasa --",
    dateLabel: "TANGGAL MULAI / TANGGAL ACARA",
    durationLabel: "DURASI",
    durationPlaceholder: "Mis. 4 Jam, 2 Hari, 1 Minggu",
    whatsappCta: "Hubungi Tim Kami via WhatsApp",
    whatsappGreeting: "Halo Voxera, saya ingin menanyakan layanan interpreter.",
    whatsappLanguage: "Bahasa: {language}.",
    whatsappDate: "Tanggal: {date}.",
    whatsappDuration: "Durasi: {duration}.",
  },

  footer: {
    tagline: "Solusi Bahasa & Dokumen Cerdas",
    quickLinksHeading: "TAUTAN CEPAT",
    linkHome: "Beranda",
    linkAbout: "Tentang Kami",
    linkServices: "Layanan",
    linkContact: "Hubungi Kami",
    addressHeading: "ALAMAT KAMI",
    phone: "Telp: (0274) 7377040",
    hours: "Jam Operasional: Buka hingga 16.00 WIB",
    hoursNote: "(Melayani layanan di tempat dan online)",
    badge: "DIBUAT UNTUK DOKUMEN GLOBAL",
  },
};
