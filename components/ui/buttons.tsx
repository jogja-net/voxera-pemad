import type { ButtonHTMLAttributes } from "react";

export function PrimaryButton({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`h-[52px] w-full cursor-pointer rounded bg-brand text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      {...props}
    />
  );
}

export function OutlineButton({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`h-12 w-full cursor-pointer rounded border border-brand bg-white text-[15px] font-semibold text-brand transition-colors hover:bg-[rgba(0,71,187,0.06)] ${className}`}
      {...props}
    />
  );
}
