import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { otherLocale, type Dictionary } from "@/lib/i18n";

export function SiteHeader({ dict }: { dict: Dictionary }) {
  const alternate = otherLocale(dict.locale);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/85 backdrop-blur-[12px]">
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <a
          href="#top"
          className="shrink-0 text-[20px] font-bold tracking-[-0.03em] text-brand sm:text-[22px]"
        >
          Voxera
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          <a
            href="#services"
            className="border-b-2 border-brand pb-1 text-sm font-semibold text-brand"
          >
            {dict.nav.services}
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-body transition-colors hover:text-brand"
          >
            {dict.nav.help}
          </a>
        </nav>

        <div className="flex items-center gap-2.5">
          <LanguageSwitcher
            current={dict.locale}
            alternate={alternate}
            label={dict.nav.switchLanguage}
          />
          <ThemeToggle
            label={dict.nav.themeToggle}
            darkLabel={dict.nav.themeDark}
            lightLabel={dict.nav.themeLight}
          />
          {/*
            These two must appear at the same breakpoint the bottom nav
            disappears at (md) — the bottom nav repeats them, so showing both
            at once duplicates the CTAs.
          */}
          <a
            href="#top"
            className="hidden h-10 items-center rounded border border-brand px-[18px] text-sm font-semibold text-brand transition-colors hover:bg-[rgba(0,71,187,0.06)] dark:hover:bg-brand-light/15 md:inline-flex"
          >
            {dict.nav.clientPortal}
          </a>
          <a
            href="#contact"
            className="hidden h-10 items-center rounded bg-brand px-[18px] text-sm font-semibold text-white transition-colors hover:bg-brand-dark md:inline-flex"
          >
            {dict.nav.contact}
          </a>
        </div>
      </div>
    </header>
  );
}
