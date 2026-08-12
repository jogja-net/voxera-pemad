"use client";

import { OutlineButton, PrimaryButton } from "@/components/ui/buttons";
import { SelectField } from "@/components/ui/form-fields";
import { UploadField } from "@/components/ui/upload-field";
import { PanelHeading } from "./panel-shell";
import { SWORN_LANGUAGE_CODES } from "@/lib/config";
import { HARD_COPY_FEE, formatRupiah, type EtaTier } from "@/lib/estimate";
import { languageOptions } from "@/lib/i18n/languages";
import { formatTemplate, type Dictionary } from "@/lib/i18n";
import type { useSwornForm } from "@/lib/use-service-forms";

export function SwornPanel({
  form,
  dict,
}: {
  form: ReturnType<typeof useSwornForm>;
  dict: Dictionary;
}) {
  const t = dict.sworn;
  const options = languageOptions(SWORN_LANGUAGE_CODES, dict);

  const eta: Record<EtaTier, string> = {
    none: t.empty,
    short: t.etaShort,
    medium: t.etaMedium,
    long: t.etaLong,
  };

  const label =
    form.status === "running"
      ? t.submitRunning
      : form.status === "done"
        ? t.submitDone
        : t.submitIdle;

  return (
    <div className="flex flex-col gap-[22px]">
      <PanelHeading title={t.title}>{t.intro}</PanelHeading>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-[18px]">
        <SelectField
          id="sworn-from"
          label={dict.common.fromLanguage}
          options={options}
          value={form.fromLang}
          onChange={(event) => form.setFromLang(event.target.value)}
        />
        <SelectField
          id="sworn-to"
          label={dict.common.toLanguage}
          options={options}
          value={form.toLang}
          onChange={(event) => form.setToLang(event.target.value)}
        />
      </div>

      <p className="text-[13px] text-muted">
        {t.missingLanguageBefore}
        <a href="#contact" className="font-semibold text-brand hover:text-brand-dark">
          {t.missingLanguageLink}
        </a>
        {t.missingLanguageAfter}
      </p>

      <UploadField
        label={dict.common.uploadDocument}
        file={form.file}
        onSelect={form.setFile}
        chooseLabel={dict.common.chooseFile}
        placeholder={t.uploadPlaceholder}
        accept=".pdf,.docx,.txt,image/*"
        helper={t.uploadHelper}
      />

      <OutlineButton onClick={form.calculate} disabled={!form.canCalculate}>
        {t.calculate}
      </OutlineButton>

      <div className="flex flex-col gap-4 rounded-lg border border-line px-6 py-[22px]">
        <div className="flex justify-between gap-4">
          <span className="text-[15px] font-semibold text-ink">
            {t.totalPages}
          </span>
          <span className="font-mono text-[15px] text-ink">
            {form.pages
              ? formatTemplate(t.pagesValue, { count: form.pages })
              : t.empty}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-[15px] text-body">{t.etaLabel}</span>
          <span className="font-mono text-[15px] text-ink">
            {eta[form.etaTier]}
          </span>
        </div>

        <p className="text-[13px] leading-5 text-muted">
          {t.queueNoteBefore}
          <a
            href="#contact"
            className="font-semibold text-brand hover:text-brand-dark"
          >
            {t.queueNoteLink}
          </a>
        </p>

        <label className="flex cursor-pointer items-center gap-3 border-t border-dashed border-line pt-4">
          <input
            type="checkbox"
            checked={form.hardCopy}
            onChange={(event) => form.setHardCopy(event.target.checked)}
            className="size-[18px] accent-brand"
          />
          <span className="text-[15px] font-semibold text-ink">
            {t.hardCopy}
          </span>
          <span className="text-[13px] text-muted">
            + {formatRupiah(HARD_COPY_FEE, dict.locale)}
          </span>
        </label>

        <div className="flex flex-col gap-2.5 rounded-lg bg-tint px-5 py-4">
          <div className="flex justify-between gap-4">
            <span className="text-sm text-body">{t.translationCost}</span>
            <span className="font-mono text-sm text-body">
              {formatRupiah(form.translationCost, dict.locale)}
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-base font-bold text-ink">{t.totalCost}</span>
            <span className="font-mono text-xl font-medium text-brand">
              {formatRupiah(form.totalCost, dict.locale)}
            </span>
          </div>
        </div>
      </div>

      <PrimaryButton
        onClick={form.run}
        disabled={form.status === "running" || !form.canSubmit}
      >
        {label}
      </PrimaryButton>
    </div>
  );
}
