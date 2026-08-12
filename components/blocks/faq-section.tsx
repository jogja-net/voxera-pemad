"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "./section-heading";
import type { Dictionary } from "@/lib/i18n";

export function FaqSection({ dict }: { dict: Dictionary }) {
  const t = dict.faq;
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="mt-16 sm:mt-20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} />

      <div className="mt-7 flex flex-col gap-3">
        {t.items.map((item, index) => {
          const isOpen = open === index;
          return (
            <div
              key={item.q}
              className="rounded-lg border border-line bg-panel"
            >
              <h3>
                <button
                  type="button"
                  id={`faq-button-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-[15px] font-semibold text-ink">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-brand transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    strokeWidth={1.8}
                  />
                </button>
              </h3>
              {isOpen && (
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  className="border-t border-line px-5 pt-3 pb-5"
                >
                  <p className="text-sm leading-[22px] text-body">{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}