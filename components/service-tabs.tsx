"use client";

import { useRef } from "react";
import {
  FileCheck2,
  Globe,
  MessageSquareText,
  PenLine,
  Scale,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

export type ServiceKey =
  | "validation"
  | "generation"
  | "translation"
  | "sworn"
  | "interpreter";

/** Tab order; the labels for each key live in `dict.tabs`. */
export const SERVICE_KEYS: ServiceKey[] = [
  "validation",
  "generation",
  "translation",
  "sworn",
  "interpreter",
];

const SERVICE_ICONS: Record<ServiceKey, LucideIcon> = {
  validation: FileCheck2,
  generation: PenLine,
  translation: Globe,
  sworn: Scale,
  interpreter: MessageSquareText,
};

export function tabId(key: ServiceKey) {
  return `service-tab-${key}`;
}

export function panelId(key: ServiceKey) {
  return `service-panel-${key}`;
}

export function ServiceTabs({
  active,
  onSelect,
  dict,
}: {
  active: ServiceKey;
  onSelect: (key: ServiceKey) => void;
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
    <div
      id="services"
      ref={listRef}
      role="tablist"
      aria-label={dict.tabs.ariaLabel}
      className="grid grid-cols-[repeat(auto-fit,minmax(min(190px,100%),1fr))] gap-4"
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
            aria-controls={panelId(key)}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(key)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`flex cursor-pointer items-start gap-3.5 rounded-lg border border-line bg-white px-5 py-[18px] text-left transition-[box-shadow,transform] duration-150 hover:-translate-y-0.5 ${
              isActive ? "shadow-tab-active" : "shadow-tab"
            }`}
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
  );
}
