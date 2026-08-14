import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { AuthNavExtras } from "./auth/auth-nav-extras";
import { AuthTrigger } from "./auth/auth-trigger";
import { otherLocale, type Dictionary } from "@/lib/i18n";

const navLinkClass =
  "text-sm font-medium text-body transition-colors hover:text-brand";

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
          <a href="#contact" className={navLinkClass}>
            {dict.nav.help}
          </a>
          {/*
            Not server-known — auth-store.ts resolves the session client-side
            so this page can stay statically rendered (ISR) rather than
            opting the whole route into per-request dynamic rendering just to
            know who's logged in.
          */}
          <AuthNavExtras dict={dict} className={navLinkClass} />
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
            Must appear at the same breakpoint the bottom nav disappears at
            (md) — bottom-nav.tsx renders its own AuthTrigger for mobile, so
            showing both at once would duplicate the control.
          */}
          <AuthTrigger
            dict={dict}
            className="hidden h-10 cursor-pointer items-center rounded bg-brand px-[18px] text-sm font-semibold text-white transition-colors hover:bg-brand-dark md:inline-flex"
          />
        </div>
      </div>
    </header>
  );
}
