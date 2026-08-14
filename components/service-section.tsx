"use client";

import { useState } from "react";
import { ServiceTabs, panelId, tabId, type ServiceKey } from "./service-tabs";
import { ValidationPanel } from "./panels/validation-panel";
import { GenerationPanel } from "./panels/generation-panel";
import { TranslationPanel } from "./panels/translation-panel";
import { SwornPanel } from "./panels/sworn-panel";
import { InterpreterPanel } from "./panels/interpreter-panel";
import {
  useGenerationForm,
  useInterpreterForm,
  useSwornForm,
  useTranslationForm,
  useValidationForm,
} from "@/lib/use-service-forms";
import type { Dictionary } from "@/lib/i18n";

export function ServiceSection({ dict }: { dict: Dictionary }) {
  const [active, setActive] = useState<ServiceKey>("validation");

  // Form state lives here so switching tabs never discards a half-filled form.
  const validation = useValidationForm();
  const generation = useGenerationForm();
  const translation = useTranslationForm();
  const sworn = useSwornForm();
  const interpreter = useInterpreterForm();

  return (
    <section id="services">
      <ServiceTabs active={active} onSelect={setActive} dict={dict} />

      <div
        // Remounting on tab change replays the fade/slide-in.
        key={active}
        id={panelId(active)}
        role="tabpanel"
        aria-labelledby={tabId(active)}
        tabIndex={0}
        className="animate-panel-in mt-7 rounded-xl border border-line bg-panel p-5 shadow-panel sm:p-8 lg:px-11 lg:py-10"
      >
        {active === "validation" && (
          <ValidationPanel form={validation} dict={dict} />
        )}
        {active === "generation" && (
          <GenerationPanel form={generation} dict={dict} />
        )}
        {active === "translation" && (
          <TranslationPanel form={translation} dict={dict} />
        )}
        {active === "sworn" && <SwornPanel form={sworn} dict={dict} />}
        {active === "interpreter" && (
          <InterpreterPanel form={interpreter} dict={dict} />
        )}
      </div>
    </section>
  );
}
