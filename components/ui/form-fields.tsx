import type { ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { InputHTMLAttributes } from "react";

export const controlClass =
  "rounded border border-line bg-white text-[15px] text-ink transition-colors focus:border-brand focus:outline-none focus:shadow-[inset_0_0_0_1px_#0047bb]";

export function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-mono text-xs tracking-[0.05em] text-muted"
    >
      {children}
    </label>
  );
}

export function Field({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

/** Option values stay language-independent; only `label` is translated. */
export type SelectOption = { value: string; label: string };

export function SelectField({
  label,
  id,
  options,
  ...props
}: {
  label: string;
  id: string;
  options: readonly SelectOption[];
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <select
        id={id}
        className={`${controlClass} h-[46px] cursor-pointer px-[14px]`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function TextField({
  label,
  id,
  ...props
}: { label: string; id: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input id={id} className={`${controlClass} h-[46px] px-[14px]`} {...props} />
    </Field>
  );
}

export function TextAreaField({
  label,
  id,
  ...props
}: { label: string; id: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <textarea
        id={id}
        className={`${controlClass} w-full resize-y p-4 leading-6`}
        {...props}
      />
    </Field>
  );
}

/** Mono label + right-aligned brand-coloured value, e.g. the WORD COUNT row. */
export function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-tint px-5 py-4">
      <span className="font-mono text-xs tracking-[0.08em] text-muted">
        {label}
      </span>
      <span className="font-mono text-lg font-medium text-brand">{value}</span>
    </div>
  );
}
