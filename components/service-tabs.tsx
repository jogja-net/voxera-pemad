"use client";

import { useRef } from "react";
import {
  ArrowUpRight,
  FileCheck2,
  Globe,
  MessageSquareText,
  PenLine,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { SWORN_PORTAL_URL } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";

export type ServiceKey =
  | "validation"
  | "generation"
  | "translation"
  | "sworn"
  | "interpreter";

/**
 * Tabs with an in-page panel — everything but Sworn Translation, which is a
 * link to the team's OCR portal (`SWORN_PORTAL_URL`) rather than a panel here.
 * `ServiceKey` keeps "sworn" as a member so `active` state and the (currently
 * unreachable) SwornPanel branch in ServiceSection still type-check.
 */
export const SERVICE_KEYS: Exclude<ServiceKey, "sworn">[] = [
  "validation",
  "generation",
  "translation",
  "interpreter",
];

const SERVICE_ICONS: Record<ServiceKey, LucideIcon> = {
  validation: FileCheck2,
  generation: PenLine,
  translation: Globe,
  sworn: Scale,
  interpreter: MessageSquareText,
};

/**
 * CSS `order` per card, so the Sworn link keeps its original 4th slot in the
 * grid even though it renders outside the tablist markup below (see the
 * `display: contents` note on that wrapper).
 */
const CARD_ORDER: Record<ServiceKey, number> = {
  validation: 1,
  generation: 2,
  translation: 3,
  sworn: 4,
  interpreter: 5,
};

export function tabId(key: ServiceKey) {
  return `service-tab-${key}`;
}

export function panelId(key: ServiceKey) {
  return `service-panel-${key}`;
}

const cardClass =
  "flex cursor-pointer items-start gap-3.5 rounded-lg border border-line bg-panel px-5 py-[18px] text-left transition-[box-shadow,transform] duration-150 hover:-translate-y-0.5";

export function ServiceTabs({
  active,
  onSelect,
  dict,
}: {
  active: ServiceKey;
  onSelect: (key: Exclude<ServiceKey, "sworn">) => void;
  dict: Dictionary;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  function focusTab(index: number) {
    const next = SERVICE_KEYS[(index + SERVICE_KEYS.length) % SERVICE_KEYS.length];
    onSelect(next);
    listRef.current?.querySelector<HTMLButtonElement>(`#${tabId(next)}`)?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent, index: number) {
    if (event.key === "ArrowRight") focusTab(index + 1);
    else if (event.key === "ArrowLeft") focusTab(index - 1);
    else if (event.key === "Home") focusTab(0);
    else if (event.key === "End") focusTab(SERVICE_KEYS.length - 1);
    else return;
    event.preventDefault();
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(190px,100%),1fr))] gap-4">
      {/*
        `display: contents` keeps this element's role="tablist" while letting
        its buttons lay out as direct items of the grid above, so the ARIA
        relationship stays "tablist contains exactly these tab elements" —
        the Sworn link below is a sibling, not a fifth tab that never opens.
      */}
      <div
        ref={listRef}
        role="tablist"
        aria-label={dict.tabs.ariaLabel}
        className="contents"
      >
        {SERVICE_KEYS.map((key, index) => {
          const isActive = key === active;
          const Icon = SERVICE_ICONS[key];
          const service = dict.tabs[key];

          return (
            <button
              key={key}
              id={tabId(key)}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={isActive ? panelId(key) : undefined}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelect(key)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              style={{ order: CARD_ORDER[key] }}
              className={`${cardClass} ${isActive ? "shadow-tab-active" : "shadow-tab"}`}
            >
              <Icon
                className="mt-0.5 size-[22px] shrink-0 text-brand"
                strokeWidth={1.5}
              />
              <span className="flex flex-col gap-1">
                <span className="text-base font-semibold text-ink">
                  {service.title}
                </span>
                <span className="text-[13px] leading-[19px] text-muted">
                  {service.subtitle}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/*
        Leaves the site entirely, so this is a real link — not a tab standing
        in for a panel that will never open — styled to match its neighbours.
      */}
      <a
        href={SWORN_PORTAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ order: CARD_ORDER.sworn }}
        aria-label={`${dict.tabs.sworn.title} ${dict.tabs.sworn.opensNewTab}`}
        className={`${cardClass} shadow-tab`}
      >
        <Scale className="mt-0.5 size-[22px] shrink-0 text-brand" strokeWidth={1.5} />
        <span className="flex flex-1 flex-col gap-1">
          <span className="text-base font-semibold text-ink">
            {dict.tabs.sworn.title}
          </span>
          <span className="text-[13px] leading-[19px] text-muted">
            {dict.tabs.sworn.subtitle}
          </span>
        </span>
        <ArrowUpRight
          className="mt-0.5 size-4 shrink-0 text-muted"
          strokeWidth={2}
          aria-hidden="true"
        />
      </a>
    </div>
  );
}
