import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_TAGS,
  getDictionary,
  hasLocale,
  otherLocale,
} from "@/lib/i18n";
import { SITE_URL } from "@/lib/config";
import { AuthModal } from "@/components/auth/auth-modal";
import { SiteHeader } from "@/components/site-header";
import { BottomNav } from "@/components/bottom-nav";


const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem("voxera-theme"),d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}`;

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

/** Both locales are prerendered at build time. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return {
    // Without a base, the relative URLs below are emitted verbatim and
    // `og:url` becomes an unresolvable "/id".
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...Object.fromEntries(
          LOCALES.map((locale) => [LOCALE_TAGS[locale], `/${locale}`]),
        ),
        // Indonesian is the fallback the proxy sends unmatched visitors to.
        "x-default": `/${DEFAULT_LOCALE}`,
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${lang}`,
      siteName: dict.org.name,
      type: "website",
      locale: LOCALE_TAGS[lang],
      alternateLocale: LOCALE_TAGS[otherLocale(lang)],
    },
    twitter: {
      card: "summary",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      /*
        THEME_INIT_SCRIPT adds `dark` to this element before the first paint, so
        the class list never matches what the server rendered. Without this,
        React treats it as a hydration error and rebuilds the DOM from the
        server payload — which strips `dark` again and leaves a light page with
        the toggle stuck claiming dark. See the Next.js guide "Preventing flash
        before hydration".
      */
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <SiteHeader dict={dict} lang={lang} />
        <main id="top">
          {children}
        </main>
        <AuthModal dict={dict} />
        <BottomNav dict={dict} lang={lang} />
      </body>
    </html>
  );
}
