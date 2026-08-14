"use client";

import { X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useAuthModal } from "@/lib/supabase/auth-store";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import type { Dictionary } from "@/lib/i18n";

export function AuthModal({ dict }: { dict: Dictionary }) {
  const modal = useAuthModal();
  const isLogin = modal.view === "login";

  return (
    <Dialog.Root open={modal.isOpen} onOpenChange={(open) => (open ? modal.open(modal.view) : modal.close())}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/50" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-line bg-panel p-7 shadow-panel focus:outline-none sm:p-8"
          onOpenAutoFocus={(event) => {
            // The first field is more useful to land on than the close button.
            event.preventDefault();
          }}
        >
          <Dialog.Close
            aria-label={dict.auth.closeModal}
            className="absolute top-5 right-5 cursor-pointer text-muted transition-colors hover:text-ink"
          >
            <X className="size-5" aria-hidden="true" />
          </Dialog.Close>

          <Dialog.Title className="mb-1 text-center text-xl font-bold text-ink">
            {isLogin ? dict.auth.loginTitle : dict.auth.registerTitle}
          </Dialog.Title>
          <Dialog.Description className="mb-6 text-center text-sm text-body">
            {isLogin ? dict.auth.loginIntro : dict.auth.registerIntro}
          </Dialog.Description>

          {isLogin ? <LoginForm dict={dict} /> : <RegisterForm dict={dict} />}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
