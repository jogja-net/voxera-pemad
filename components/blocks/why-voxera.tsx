import { BadgeCheck, Globe, MailCheck, Zap, type LucideIcon } from "lucide-react";
import { SectionHeading } from "./section-heading";
import type { Dictionary } from "@/lib/i18n";

const POINT_ICONS: LucideIcon[] = [BadgeCheck, MailCheck, Zap, Globe];

export function WhyVoxera({ dict }: { dict: Dictionary }) {
  const t = dict.whyUs;

  const points = [
    { title: t.certifiedTitle, body: t.certifiedBody },
    { title: t.emailTitle, body: t.emailBody },
    { title: t.priorityTitle, body: t.priorityBody },
    { title: t.onlineTitle, body: t.onlineBody },
  ];

  return (
    <section
      id="why-voxera"
      aria-labelledby="why-voxera-title"
      className="mt-16 sm:mt-20"
    >
      <SectionHeading eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-[18px]">
        {points.map((point, index) => {
          const Icon = POINT_ICONS[index];
          return (
            <div
              key={point.title}
              className="flex flex-col gap-3 rounded-xl border border-line bg-panel p-6 shadow-panel"
            >
              <span className="flex size-10 items-center justify-center rounded-[10px] bg-[rgba(0,71,187,0.08)] dark:bg-brand-light/15">
                <Icon className="size-5 text-brand" strokeWidth={1.6} />
              </span>
              <h3 className="text-base font-semibold text-ink">{point.title}</h3>
              <p className="text-sm leading-[22px] text-body">{point.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}