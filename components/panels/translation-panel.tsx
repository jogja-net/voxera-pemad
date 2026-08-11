"use client";

import { PrimaryButton } from "@/components/ui/buttons";
import { SelectField, StatRow } from "@/components/ui/form-fields";
import { UploadField } from "@/components/ui/upload-field";
import { PanelHeading } from "./panel-shell";
import { LANGUAGE_CODES } from "@/lib/config";
import { formatNumber } from "@/lib/estimate";
import { languageOptions } from "@/lib/i18n/languages";
import type { Dictionary } from "@/lib/i18n";
import type { useTranslationForm } from "@/lib/use-service-forms";

export function TranslationPanel({
  form,
  dict,
}: {
  form: ReturnType<typeof useTranslationForm>;
  dict: Dictionary;
}) {
  const t = dict.translation;
  const options = languageOptions(LANGUAGE_CODES, dict);
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
          id="translation-from"
          label={dict.common.fromLanguage}
          options={options}
          value={form.fromLang}
          onChange={(event) => form.setFromLang(event.target.value)}
        />
        <SelectField
          id="translation-to"
          label={dict.common.toLanguage}
          options={options}
          value={form.toLang}
          onChange={(event) => form.setToLang(event.target.value)}
        />
      </div>

      <UploadField
        label={dict.common.uploadDocument}
        file={form.file}
        onSelect={form.setFile}
        chooseLabel={dict.common.chooseFile}
        placeholder={dict.common.noFileChosen}
        accept=".txt,.pdf,.docx,.jpg,.jpeg,.png"
      />

      <UploadField
        variant="attachment"
        label={t.contextLabel}
        file={form.contextFile}
        onSelect={form.setContextFile}
        chooseLabel={dict.common.chooseFile}
        placeholder={dict.common.noFileChosen}
        helper={t.contextHelper}
      />

      <StatRow
        label={dict.common.wordCount}
        value={formatNumber(form.words, dict.locale)}
      />

      <PrimaryButton onClick={form.run} disabled={form.status === "running"}>
        {label}
      </PrimaryButton>
    </div>
  );
}
