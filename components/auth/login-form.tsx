"use client";

import { useId, useState } from "react";
import { TextField } from "@/components/ui/form-fields";
import { PrimaryButton } from "@/components/ui/buttons";
import { GoogleButton } from "./google-button";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useAuthModal } from "@/lib/supabase/auth-store";
import type { Dictionary } from "@/lib/i18n";

function mapLoginError(dict: Dictionary, error: { code?: string; message: string }) {
  if (error.code === "invalid_credentials") return dict.auth.errors.invalidCredentials;
  if (/invalid login credentials/i.test(error.message)) {
    return dict.auth.errors.invalidCredentials;
  }
  return dict.auth.errors.generic;
}

export function LoginForm({ dict }: { dict: Dictionary }) {
  const modal = useAuthModal();
  const emailId = useId();
  const passwordId = useId();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      setErrorMessage(mapLoginError(dict, error));
      return;
    }

    setStatus("idle");
    modal.close();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField
        label={dict.auth.emailLabel}
        id={emailId}
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        label={dict.auth.passwordLabel}
        id={passwordId}
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      )}

      <PrimaryButton type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? dict.auth.loginSubmitting : dict.auth.loginSubmit}
      </PrimaryButton>

      <Divider label={dict.auth.orDivider} />

      <GoogleButton dict={dict} />

      <p className="text-center text-sm text-body">
        {dict.auth.toggleToRegisterBefore}
        <button
          type="button"
          onClick={() => modal.setView("register")}
          className="cursor-pointer font-semibold text-brand hover:underline"
        >
          {dict.auth.toggleToRegisterLink}
        </button>
      </p>
    </form>
  );
}

export function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-line" />
      <span className="font-mono text-xs tracking-[0.08em] text-muted">{label}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
