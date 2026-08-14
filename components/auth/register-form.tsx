"use client";

import { useId, useState } from "react";
import { TextField } from "@/components/ui/form-fields";
import { PrimaryButton } from "@/components/ui/buttons";
import { GoogleButton } from "./google-button";
import { Divider } from "./login-form";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useAuthModal } from "@/lib/supabase/auth-store";
import type { Dictionary } from "@/lib/i18n";

function mapRegisterError(dict: Dictionary, error: { code?: string; message: string }) {
  if (error.code === "email_exists") return dict.auth.errors.emailInUse;
  if (/already registered/i.test(error.message)) return dict.auth.errors.emailInUse;
  return dict.auth.errors.generic;
}

export function RegisterForm({ dict }: { dict: Dictionary }) {
  const modal = useAuthModal();
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmId = useId();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "checkEmail">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setStatus("error");
      setErrorMessage(dict.auth.errors.passwordMismatch);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone_number: phoneNumber } },
    });

    if (error) {
      setStatus("error");
      setErrorMessage(mapRegisterError(dict, error));
      return;
    }

    setStatus("checkEmail");
  }

  if (status === "checkEmail") {
    return (
      <div className="flex flex-col items-center gap-2 py-4 text-center">
        <h3 className="text-lg font-semibold text-ink">{dict.auth.checkEmailTitle}</h3>
        <p className="text-sm text-body">{dict.auth.checkEmailBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField
        label={dict.auth.nameLabel}
        id={nameId}
        type="text"
        autoComplete="name"
        required
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
      />
      <TextField
        label={dict.auth.phoneLabel}
        id={phoneId}
        type="tel"
        autoComplete="tel"
        required
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
      />
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
        autoComplete="new-password"
        required
        minLength={8}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <TextField
        label={dict.auth.confirmPasswordLabel}
        id={confirmId}
        type="password"
        autoComplete="new-password"
        required
        minLength={8}
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
      />

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      )}

      <PrimaryButton type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? dict.auth.registerSubmitting : dict.auth.registerSubmit}
      </PrimaryButton>

      <Divider label={dict.auth.orDivider} />

      <GoogleButton dict={dict} />

      <p className="text-center text-sm text-body">
        {dict.auth.toggleToLoginBefore}
        <button
          type="button"
          onClick={() => modal.setView("login")}
          className="cursor-pointer font-semibold text-brand hover:underline"
        >
          {dict.auth.toggleToLoginLink}
        </button>
      </p>
    </form>
  );
}
