"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

export const THEME_STORAGE_KEY = "voxera-theme";

/**
 * The active theme lives in a class on <html>, written by THEME_INIT_SCRIPT
 * before React exists and by `toggle` afterwards — an external store in the
 * `useSyncExternalStore` sense, so this watches it rather than mirroring it into
 * component state.
 */
function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getThemeSnapshot = () =>
  document.documentElement.classList.contains("dark");

/**
 * The server cannot know the visitor's theme, so it renders the light state and
 * React re-reads the real one right after hydrating. Deriving the first render
 * from the DOM instead would disagree with the server payload and fail
 * hydration — which used to wipe the `dark` class off <html> entirely.
 */
const getThemeServerSnapshot = () => false;

export function ThemeToggle({
  label,
  darkLabel,
  lightLabel,
}: {
  label: string;
  darkLabel: string;
  lightLabel: string;
}) {
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );

  function toggle() {
    // The class is the source of truth — the inline script sets it before this
    // component renders — and mutating it is what notifies the store above.
    const next = !document.documentElement.classList.contains("dark");
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
      {/*
        Swapped in CSS rather than off `isDark`, so the right icon is painted
        immediately instead of one render after hydration.
      */}
      <Moon
        size={20}
        strokeWidth={1.8}
        aria-hidden="true"
        className="dark:hidden"
      />
      <Sun
        size={20}
        strokeWidth={1.8}
        aria-hidden="true"
        className="hidden dark:block"
      />
      <span className="sr-only">{label}</span>
    </button>
  );
}
