"use client";

import { useEffect, useState } from "react";
import { CircleHelp, IdCard, LayoutGrid, Send } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

type NavKey = "services" | "help" | "clientPortal" | "contact";

const ICONS = {
  services: LayoutGrid,
  help: CircleHelp,
  clientPortal: IdCard,
  contact: Send,
} as const;

/** The anchor targets on the page we watch to drive the active highlight. */
const SECTIONS = ["top", "services", "contact"] as const;

export function BottomNav({ dict }: { dict: Dictionary }) {
  const [active, setActive] = useState<NavKey>("services");

  const items: { key: NavKey; label: string; target: string }[] = [
    { key: "services", label: dict.nav.services, target: "#services" },
    { key: "help", label: dict.nav.help, target: "#contact" },
    { key: "clientPortal", label: dict.nav.clientPortal, target: "#top" },
    { key: "contact", label: dict.nav.contact, target: "#contact" },
  ];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (sectionId === "contact") {
                setActive("contact");
              } else if (sectionId === "services") {
                setActive("services");
              } else {
                setActive("clientPortal");
              }
            }
          });
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <nav
      aria-label={dict.nav.menu}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-[12px] md:hidden"
    >
      <div className="grid grid-cols-4">
        {items.map((item) => {
          const Icon = ICONS[item.key];
          const isActive = active === item.key;

          return (
            <a
              key={item.key}
              href={item.target}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                isActive ? "text-brand" : "text-body hover:text-brand"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.2 : 1.8}
                aria-hidden="true"
              />
              <span className="line-clamp-1 px-1">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
