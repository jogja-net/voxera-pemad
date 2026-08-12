import { Building2, ChevronRight, Scale, User, type LucideIcon } from "lucide-react";
import { SectionHeading } from "./section-heading";
import type { Dictionary } from "@/lib/i18n";

const GROUP_ICONS: LucideIcon[] = [User, Building2, Scale];

export function DocTypes({ dict }: { dict: Dictionary }) {
  const t = dict.docTypes;

  const groups = [
    { title: t.personalTitle, items: t.personalItems },
    { title: t.corporateTitle, items: t.corporateItems },
    { title: t.legalTitle, items: t.legalItems },
  ];

  return (
    <section
      id="documents"
      aria-labelledby="documents-title"
      className="mt-16 sm:mt-20"
    >
      <SectionHeading eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-[18px]">
        {groups.map((group, index) => {
          const Icon = GROUP_ICONS[index];
          return (
            <div
              key={group.title}
              className="flex flex-col gap-4 rounded-xl border border-line bg-panel p-6 shadow-panel"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-[10px] bg-[rgba(0,71,187,0.08)] dark:bg-brand-light/15">
                  <Icon className="size-5 text-brand" strokeWidth={1.6} />
                </span>
                <h3 className="text-lg font-semibold text-ink">{group.title}</h3>
              </div>
              <ul className="flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-5 text-body"
                  >
                    <ChevronRight
                      className="mt-0.5 size-4 shrink-0 text-faint"
                      strokeWidth={2}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}