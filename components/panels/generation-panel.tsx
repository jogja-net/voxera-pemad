"use client";

import { PrimaryButton } from "@/components/ui/buttons";
import { StatRow, TextAreaField } from "@/components/ui/form-fields";
import { PanelHeading, ResultCard } from "./panel-shell";
import { formatNumber } from "@/lib/estimate";
import { formatTemplate, type Dictionary } from "@/lib/i18n";
import type { useGenerationForm } from "@/lib/use-service-forms";

export function GenerationPanel({
  form,
  dict,
}: {
  form: ReturnType<typeof useGenerationForm>;
  dict: Dictionary;
}) {
  const t = dict.generation;
  const label = form.status === "running" ? t.submitRunning : t.submitIdle;

  return (
    <div className="flex flex-col gap-[22px]">
      <PanelHeading title={t.title}>{t.intro}</PanelHeading>

      <TextAreaField
        id="generation-prompt"
        label={t.promptLabel}
        rows={7}
        value={form.prompt}
        onChange={(event) => form.setPrompt(event.target.value)}
        placeholder={t.promptPlaceholder}
      />

      <StatRow
        label={dict.common.wordCount}
        value={formatNumber(form.words, dict.locale)}
      />

      <PrimaryButton onClick={form.run} disabled={form.status === "running"}>
        {label}
      </PrimaryButton>

      {form.status === "done" && (
        <ResultCard>
          {formatTemplate(t.resultLine, {
            words: formatNumber(form.words, dict.locale),
          })}
        </ResultCard>
      )}
    </div>
  );
}
