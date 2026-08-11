"use client";

import { useId, useRef } from "react";
import { Folder, Paperclip } from "lucide-react";

type UploadFieldProps = {
  label: string;
  file: File | null;
  onSelect: (file: File | null) => void;
  /** Localized "Choose File" call to action. */
  chooseLabel: string;
  /** Shown in mono type while nothing is selected. */
  placeholder: string;
  helper?: string;
  accept?: string;
  variant?: "dropzone" | "attachment";
};

export function UploadField({
  label,
  file,
  onSelect,
  chooseLabel,
  placeholder,
  helper,
  accept,
  variant = "dropzone",
}: UploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const isDropzone = variant === "dropzone";

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-ink">{label}</span>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => onSelect(event.target.files?.[0] ?? null)}
      />

      <button
        type="button"
        aria-describedby={helper ? `${inputId}-helper` : undefined}
        onClick={() => inputRef.current?.click()}
        className={
          isDropzone
            ? "flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-brand bg-[rgba(0,71,187,0.03)] p-5 text-left transition-colors hover:bg-[rgba(0,71,187,0.08)]"
            : "flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-white px-5 py-4 text-left transition-colors hover:border-brand-ring"
        }
      >
        {isDropzone ? (
          <Folder className="size-[22px] shrink-0 text-brand" strokeWidth={1.5} />
        ) : (
          <Paperclip className="size-5 shrink-0 text-muted" strokeWidth={1.5} />
        )}
        <span className="flex flex-col gap-1">
          <span
            className={`text-[15px] font-semibold ${isDropzone ? "text-brand" : "text-ink"}`}
          >
            {chooseLabel}
          </span>
          <span className="font-mono text-xs break-all text-muted">
            {file ? file.name : placeholder}
          </span>
        </span>
      </button>

      {helper && (
        <span id={`${inputId}-helper`} className="text-[13px] leading-5 text-muted">
          {helper}
        </span>
      )}
    </div>
  );
}
