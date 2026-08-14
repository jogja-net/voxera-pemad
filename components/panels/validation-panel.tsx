"use client";

import { createProject } from "@/app/actions";
import { Check } from "lucide-react";
import { PrimaryButton } from "@/components/ui/buttons";
import { StatRow } from "@/components/ui/form-fields";
import { UploadField } from "@/components/ui/upload-field";
import { PanelHeading, ResultCard } from "./panel-shell";
import { formatNumber } from "@/lib/estimate";
import { formatTemplate, type Dictionary } from "@/lib/i18n";
import type { useValidationForm } from "@/lib/use-service-forms";

export function ValidationPanel({
  form,
  dict,
}: {
  form: ReturnType<typeof useValidationForm>;
  dict: Dictionary;
}) {
  const t = dict.validation;
  const label = form.status === "running" ? t.submitRunning : t.submitIdle;

  return (
    <div className="flex flex-col gap-[22px]">
      <PanelHeading title={t.title}>{t.intro}</PanelHeading>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-[18px]">
        <UploadField
          label={t.uploadFirst}
          file={form.fileA}
          onSelect={form.setFileA}
          chooseLabel={dict.common.chooseFile}
          placeholder={dict.common.noFileChosen}
        />
        <UploadField
          label={t.uploadSecond}
          file={form.fileB}
          onSelect={form.setFileB}
          chooseLabel={dict.common.chooseFile}
          placeholder={dict.common.noFileChosen}
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-surface px-5 py-[18px] transition-colors hover:border-brand-ring">
        <input
          type="checkbox"
          checked={form.scanned}
          onChange={(event) => form.setScanned(event.target.checked)}
          className="mt-0.5 size-[18px] accent-brand"
        />
        <span className="flex flex-col gap-1">
          <span className="text-[15px] font-semibold text-ink">
            {t.scannedTitle}
          </span>
          <span className="text-[13px] leading-5 text-muted">
            {t.scannedHelper}
          </span>
        </span>
      </label>

      <StatRow
        label={dict.common.wordCount}
        value={formatNumber(form.words, dict.locale)}
      />

      <PrimaryButton

        onClick={() => {
          form.run();
          createProject(
            "validation",
            "Validation Project", // You might want to make this dynamic
            null,
            { fileA: form.fileA?.name, fileB: form.fileB?.name, scanned: form.scanned, words: form.words }
          );
        }}
        disabled={form.status === "running" || !form.canSubmit}

      >
        {label}
      </PrimaryButton>

      {form.status === "done" && (
        <ResultCard
          title={
            <>
              <Check className="size-[18px] text-success" strokeWidth={1.8} />
              <span className="text-[15px] font-semibold text-ink">
                {t.resultTitle}
              </span>
            </>
          }
        >
          {formatTemplate(t.resultLine, {
            mode: form.scanned ? t.modeScanned : t.modeNative,
            files: form.fileCount,
            words: formatNumber(form.words, dict.locale),
          })}
        </ResultCard>
      )}
    </div>
  );
}
