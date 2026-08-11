"use client";

import { MessageCircle } from "lucide-react";
import { SelectField, TextField } from "@/components/ui/form-fields";
import { PanelHeading } from "./panel-shell";
import {
  INTERPRETER_LANGUAGE_UNSET,
  LANGUAGE_CODES,
  buildWhatsAppLink,
  type LanguageCode,
} from "@/lib/config";
import { languageOptions } from "@/lib/i18n/languages";
import { formatTemplate, type Dictionary } from "@/lib/i18n";
import type { useInterpreterForm } from "@/lib/use-service-forms";

/** Indonesian is the client's own language, so it is never the target here. */
const INTERPRETER_LANGUAGE_CODES = LANGUAGE_CODES.filter(
  (code) => code !== "id",
);

export function InterpreterPanel({
  form,
  dict,
}: {
  form: ReturnType<typeof useInterpreterForm>;
  dict: Dictionary;
}) {
  const t = dict.interpreter;

  const options = [
    { value: INTERPRETER_LANGUAGE_UNSET, label: t.languagePlaceholder },
    ...languageOptions(INTERPRETER_LANGUAGE_CODES, dict),
  ];

  const serviceTypes = [
    { name: t.simultaneousName, description: t.simultaneousDescription },
    { name: t.consecutiveName, description: t.consecutiveDescription },
  ];

  const selectedLanguage =
    form.language === INTERPRETER_LANGUAGE_UNSET
      ? null
      : dict.languageNames[form.language as LanguageCode];

  const enquiry = [
    t.whatsappGreeting,
    selectedLanguage
      ? formatTemplate(t.whatsappLanguage, { language: selectedLanguage })
      : null,
    form.eventDate
      ? formatTemplate(t.whatsappDate, { date: form.eventDate })
      : null,
    form.duration
      ? formatTemplate(t.whatsappDuration, { duration: form.duration })
      : null,
  ]
    .filter(Boolean)
    .join(" ");

  // Falls back to the footer contact block until a WhatsApp number is configured.
  const href = buildWhatsAppLink(enquiry);
  const isExternal = href.startsWith("http");

  return (
    <div className="flex flex-col gap-[22px]">
      <PanelHeading title={t.title}>{t.intro}</PanelHeading>

      <div className="flex flex-col gap-3.5 rounded-r-lg border-l-[3px] border-brand bg-tint px-6 py-5">
        <span className="text-[15px] font-bold text-ink">{t.typesHeading}</span>
        {serviceTypes.map((type) => (
          <div key={type.name} className="flex flex-col gap-[5px]">
            <span className="text-[15px] font-semibold text-ink">{type.name}</span>
            <span className="text-sm leading-[22px] text-body">
              {type.description}
            </span>
          </div>
        ))}
      </div>

      <SelectField
        id="interpreter-language"
        label={t.languageLabel}
        options={options}
        value={form.language}
        onChange={(event) => form.setLanguage(event.target.value)}
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-[18px]">
        <TextField
          id="interpreter-date"
          label={t.dateLabel}
          type="date"
          value={form.eventDate}
          onChange={(event) => form.setEventDate(event.target.value)}
        />
        <TextField
          id="interpreter-duration"
          label={t.durationLabel}
          type="text"
          placeholder={t.durationPlaceholder}
          value={form.duration}
          onChange={(event) => form.setDuration(event.target.value)}
        />
      </div>

      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="flex h-[52px] items-center justify-center gap-2.5 rounded bg-success text-[15px] font-semibold text-white transition-colors hover:bg-success-dark"
      >
        <MessageCircle className="size-5" strokeWidth={1.6} />
        {t.whatsappCta}
      </a>
    </div>
  );
}
