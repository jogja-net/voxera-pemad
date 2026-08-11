"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  countWords,
  estimatePages,
  estimateWords,
  etaForPages,
  swornCost,
} from "./estimate";
import { INTERPRETER_LANGUAGE_UNSET } from "./config";

export type ActionStatus = "idle" | "running" | "done";

/**
 * Stands in for a real submit/upload call. The prototype simply waits, so the
 * button can show its running label; swap the timeout for the API call and keep
 * the same `status` contract.
 */
function useAsyncAction(delay = 1200) {
  const [status, setStatus] = useState<ActionStatus>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const run = useCallback(() => {
    if (timer.current) return; // already running
    setStatus("running");
    timer.current = setTimeout(() => {
      timer.current = null;
      setStatus("done");
    }, delay);
  }, [delay]);

  const reset = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    setStatus("idle");
  }, []);

  return { status, run, reset };
}

export function useValidationForm() {
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);
  const [scanned, setScanned] = useState(true);
  const { status, run } = useAsyncAction();

  const files = [fileA, fileB].filter((file): file is File => Boolean(file));

  return {
    fileA,
    setFileA,
    fileB,
    setFileB,
    scanned,
    setScanned,
    fileCount: files.length,
    words: estimateWords(files),
    status,
    run,
  };
}

export function useGenerationForm() {
  const [prompt, setPrompt] = useState("");
  const { status, run, reset } = useAsyncAction(1400);

  const updatePrompt = useCallback(
    (value: string) => {
      setPrompt(value);
      reset();
    },
    [reset],
  );

  return { prompt, setPrompt: updatePrompt, words: countWords(prompt), status, run };
}

export function useTranslationForm() {
  const [fromLang, setFromLang] = useState("id");
  const [toLang, setToLang] = useState("en");
  const [file, setFile] = useState<File | null>(null);
  const [contextFile, setContextFile] = useState<File | null>(null);
  const { status, run } = useAsyncAction();

  return {
    fromLang,
    setFromLang,
    toLang,
    setToLang,
    file,
    setFile,
    contextFile,
    setContextFile,
    words: estimateWords([file]),
    status,
    run,
  };
}

export function useSwornForm() {
  const [fromLang, setFromLang] = useState("id");
  const [toLang, setToLang] = useState("ko");
  const [file, setFile] = useState<File | null>(null);
  const [hardCopy, setHardCopy] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const { status, run } = useAsyncAction();

  // A new file invalidates the previous estimate.
  const selectFile = useCallback((next: File | null) => {
    setFile(next);
    setCalculated(false);
  }, []);

  const pages = calculated ? estimatePages(file) : 0;
  const { translation, total } = swornCost(pages, hardCopy);

  return {
    fromLang,
    setFromLang,
    toLang,
    setToLang,
    file,
    setFile: selectFile,
    hardCopy,
    setHardCopy,
    calculate: () => setCalculated(true),
    pages,
    etaTier: etaForPages(pages),
    translationCost: translation,
    totalCost: total,
    status,
    run,
  };
}

export function useInterpreterForm() {
  const [language, setLanguage] = useState(INTERPRETER_LANGUAGE_UNSET);
  const [eventDate, setEventDate] = useState("");
  const [duration, setDuration] = useState("");

  return {
    language,
    setLanguage,
    eventDate,
    setEventDate,
    duration,
    setDuration,
  };
}
