import type { ReactNode } from "react";

export function PanelHeading({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink sm:text-[30px]">
        {title}
      </h2>
      <p className="text-base leading-6 text-body text-pretty">{children}</p>
    </div>
  );
}

/** Tinted confirmation card shown after an action completes. */
export function ResultCard({
  title,
  children,
}: {
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="animate-panel-in rounded-lg border border-brand-ring bg-[rgba(0,71,187,0.04)] px-[22px] py-[18px]">
      {title && <div className="mb-2 flex items-center gap-2.5">{title}</div>}
      <p className="font-mono text-xs leading-5 text-body">{children}</p>
    </div>
  );
}
