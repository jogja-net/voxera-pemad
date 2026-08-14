"use client";

import { useEffect, useState } from "react";
import {
  CircleHelp,
  FolderKanban,
  LayoutGrid,
  LogIn,
  Receipt,
  type LucideIcon,
} from "lucide-react";
import { useAuthModal, useSupabaseUser } from "@/lib/supabase/auth-store";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import type { Dictionary } from "@/lib/i18n";

type SectionKey = "services" | "help";

/** The anchor targets on the page we watch to drive the active highlight. */
const SECTIONS: SectionKey[] = ["services", "help"];
const SECTION_TARGETS: Record<SectionKey, string> = {
  services: "#services",
  help: "#contact",
};

const itemClass =
  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors cursor-pointer";

export function BottomNav({ dict }: { dict: Dictionary }) {
  const [active, setActive] = useState<SectionKey | null>("services");
  const user = useSupabaseUser(null);
  const modal = useAuthModal();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((sectionId) => {
      const element = document.getElementById(
        sectionId === "help" ? "contact" : sectionId,
      );
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(sectionId);
          });
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const columns = user ? 5 : 3;

  return (
    <nav
      aria-label={dict.nav.menu}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-[12px] md:hidden"
    >
      <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        <NavLink
          icon={LayoutGrid}
          label={dict.nav.services}
          href={SECTION_TARGETS.services}
          isActive={active === "services"}
        />
        <NavLink
          icon={CircleHelp}
          label={dict.nav.help}
          href={SECTION_TARGETS.help}
          isActive={active === "help"}
        />

        {user && (
          <>
            <NavPlaceholder icon={FolderKanban} label={dict.nav.project} title={dict.nav.comingSoon} />
            <NavPlaceholder icon={Receipt} label={dict.nav.billing} title={dict.nav.comingSoon} />
          </>
        )}

        <button
          type="button"
          title={user ? dict.auth.logoutCta : undefined}
          onClick={() =>
            user ? createBrowserSupabaseClient().auth.signOut() : modal.open("login")
          }
          className={`${itemClass} text-body hover:text-brand`}
        >
          <LogIn size={22} strokeWidth={1.8} aria-hidden="true" />
          <span className="line-clamp-1 px-1">
            {user ? user.fullName || user.email : dict.auth.loginCta}
          </span>
        </button>
      </div>
    </nav>
  );
}

function NavLink({
  icon: Icon,
  label,
  href,
  isActive,
}: {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
}) {
  return (
    <a
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`${itemClass} ${isActive ? "text-brand" : "text-body hover:text-brand"}`}
    >
      <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} aria-hidden="true" />
      <span className="line-clamp-1 px-1">{label}</span>
    </a>
  );
}

/** Project/Billing pages don't exist yet (Phase 2/3) — disabled, not a dead link. */
function NavPlaceholder({
  icon: Icon,
  label,
  title,
}: {
  icon: LucideIcon;
  label: string;
  title: string;
}) {
  return (
    <span aria-disabled title={title} className={`${itemClass} cursor-not-allowed text-faint opacity-60`}>
      <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
      <span className="line-clamp-1 px-1">{label}</span>
    </span>
  );
}
