"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

/**
 * Below `md` the header collapses to this toggle. Everything the desktop bar
 * offers lives in the panel, so the bar itself must hide those links at the
 * same breakpoint — see SiteHeader.
 */
export function MobileNav({ dict }: { dict: Dictionary }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    function closeOnOutsidePress(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    // The panel is CSS-hidden at md and up, but the open state would survive
    // and pop the menu back the moment the viewport narrowed again.
    const desktop = window.matchMedia("(min-width: 768px)");
    function closeOnDesktop(event: MediaQueryListEvent) {
      if (event.matches) setIsOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePress);
    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <div ref={containerRef} className="md:hidden">
      <button
        type="button"
        aria-label={dict.nav.menu}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex size-10 cursor-pointer items-center justify-center rounded text-ink transition-colors hover:bg-tint"
      >
        {isOpen ? (
          <X size={24} strokeWidth={1.8} />
        ) : (
          <Menu size={24} strokeWidth={1.8} />
        )}
      </button>

      {/*
        Always rendered so `aria-controls` above always resolves; `hidden`
        (display:none) also keeps the links out of the tab order while closed.
      */}
      <div
        id="mobile-menu"
        className={`absolute top-full right-0 left-0 border-b border-line bg-white shadow-lg ${
          isOpen ? "" : "hidden"
        }`}
      >
        <nav aria-label={dict.nav.menu} className="flex flex-col gap-1 p-4">
          <a
            href="#services"
            onClick={close}
            className="rounded-lg px-4 py-3 text-sm font-semibold text-body transition-colors hover:bg-surface hover:text-brand"
          >
            {dict.nav.services}
          </a>
          <a
            href="#contact"
            onClick={close}
            className="rounded-lg px-4 py-3 text-sm font-medium text-body transition-colors hover:bg-surface hover:text-brand"
          >
            {dict.nav.help}
          </a>
          <div className="my-2 border-t border-line" />
          <a
            href="#top"
            onClick={close}
            className="flex h-10 items-center justify-center rounded border border-brand text-sm font-semibold text-brand transition-colors hover:bg-[rgba(0,71,187,0.06)]"
          >
            {dict.nav.clientPortal}
          </a>
          <a
            href="#contact"
            onClick={close}
            className="flex h-10 items-center justify-center rounded bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            {dict.nav.contact}
          </a>
        </nav>
      </div>
    </div>
  );
}
