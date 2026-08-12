import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

export function ServiceInfo({ dict }: { dict: Dictionary }) {
  const t = dict.info;

  return (
    <section
      id="about-service"
      aria-labelledby="about-service-title"
      className="mt-16 sm:mt-20"
    >
      <div className="flex flex-col gap-5 rounded-xl border border-line bg-panel p-6 shadow-panel sm:p-10">
        <span className="font-mono text-xs tracking-[0.12em] text-brand">
          {t.eyebrow}
        </span>
        <h2
          id="about-service-title"
          className="text-2xl font-bold tracking-[-0.02em] text-ink text-balance sm:text-[30px] sm:leading-[38px]"
        >
          {t.title}
        </h2>
        <p className="text-base leading-[26px] text-body text-pretty">
          {t.body1}
        </p>
        <p className="text-base leading-[26px] text-body text-pretty">
          {t.body2}
        </p>
        <div className="mt-1">
          <a
            href="#services"
            className="inline-flex items-center gap-2 font-semibold text-brand transition-colors hover:text-brand-dark"
          >
            {t.ctaLabel}
            <ArrowRight className="size-4" strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}