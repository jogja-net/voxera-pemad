"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export const THEME_STORAGE_KEY = "voxera-theme";

export function ThemeToggle({
  label,
  darkLabel,
  lightLabel,
}: {
  label: string;
  darkLabel: string;
  lightLabel: string;
}) {
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* private mode / storage unavailable — theme still applies for the session */
    }
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? lightLabel : darkLabel}
      title={isDark ? lightLabel : darkLabel}
      onClick={toggle}
      className="inline-flex size-10 cursor-pointer items-center justify-center rounded text-body transition-colors hover:bg-tint hover:text-brand"
    >
      {isDark ? (
        <Sun size={20} strokeWidth={1.8} aria-hidden="true" />
      ) : (
        <Moon size={20} strokeWidth={1.8} aria-hidden="true" />
      )}
      <span className="sr-only">{label}</span>
    </button>
  );
}
