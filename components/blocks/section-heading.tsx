export function SectionHeading({
  eyebrow,
  title,
  intro,
  titleId,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  titleId?: string;
}) {
  return (
    <div className="flex max-w-[720px] flex-col gap-3">
      <span className="font-mono text-xs tracking-[0.12em] text-brand">
        {eyebrow}
      </span>
      <h2
        id={titleId}
        className="text-2xl font-bold tracking-[-0.02em] text-ink text-balance sm:text-[30px] sm:leading-[38px]"
      >
        {title}
      </h2>
      {intro && (
        <p className="text-base leading-6 text-body text-pretty">{intro}</p>
      )}
    </div>
  );
}