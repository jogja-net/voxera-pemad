"use client";

import { useSyncExternalStore } from "react";
import { createBrowserSupabaseClient } from "./client";

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
};

type Listener = () => void;

/**
 * Module-level singleton, not React Context — this repo has no app-wide
 * Context provider (see theme-toggle.tsx/language-switcher.tsx, which use the
 * same "external store" shape via DOM class / cookie side effects instead).
 * `SiteHeader`/`BottomNav` stay Server Components computing `initialUser` for
 * a correct first paint; only this hook's consumers re-render reactively.
 */
let currentUser: AuthUser | null = null;
const userListeners = new Set<Listener>();
let userStoreInitialized = false;

function notifyUsers() {
  userListeners.forEach((listener) => listener());
}

function setCurrentUser(user: AuthUser | null) {
  currentUser = user;
  notifyUsers();
}

async function loadProfile(id: string, email: string): Promise<AuthUser> {
  const supabase = createBrowserSupabaseClient();
  const { data } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", id)
    .single();
  return { id, email, fullName: data?.full_name ?? "" };
}

function ensureUserStoreInitialized(initialUser: AuthUser | null) {
  if (userStoreInitialized) return;
  userStoreInitialized = true;
  currentUser = initialUser;

  const supabase = createBrowserSupabaseClient();
  supabase.auth.onAuthStateChange((_event, session) => {
    const authUser = session?.user;
    if (!authUser?.email) {
      setCurrentUser(null);
      return;
    }
    // INITIAL_SESSION fires with the same user the server already rendered —
    // skip the redundant profile fetch so login doesn't flash "no name".
    if (currentUser?.id === authUser.id) return;
    void loadProfile(authUser.id, authUser.email).then(setCurrentUser);
  });
}

function subscribeUser(initialUser: AuthUser | null) {
  return (listener: Listener) => {
    ensureUserStoreInitialized(initialUser);
    userListeners.add(listener);
    return () => userListeners.delete(listener);
  };
}

function getUserSnapshot() {
  return currentUser;
}

/**
 * `initialUser` is the Server-Component-rendered value (correct on first
 * paint, no flash-of-wrong-nav); after mount this reacts instantly to
 * sign-in/sign-out via Supabase's own `onAuthStateChange` listener.
 */
export function useSupabaseUser(initialUser: AuthUser | null): AuthUser | null {
  return useSyncExternalStore(
    subscribeUser(initialUser),
    getUserSnapshot,
    () => initialUser,
  );
}

export type AuthModalView = "login" | "register";
type AuthModalState = { isOpen: boolean; view: AuthModalView };

const CLOSED_MODAL_STATE: AuthModalState = { isOpen: false, view: "login" };
let modalState: AuthModalState = CLOSED_MODAL_STATE;
const modalListeners = new Set<Listener>();

function setModalState(next: AuthModalState) {
  modalState = next;
  modalListeners.forEach((listener) => listener());
}

function subscribeModal(listener: Listener) {
  modalListeners.add(listener);
  return () => modalListeners.delete(listener);
}

function getModalSnapshot() {
  return modalState;
}

function getModalServerSnapshot() {
  return CLOSED_MODAL_STATE;
}

/** Lets any component (header CTA, bottom-nav item, a panel's submit handler) open the auth modal without prop-drilling a setter. */
export function useAuthModal() {
  const state = useSyncExternalStore(
    subscribeModal,
    getModalSnapshot,
    getModalServerSnapshot,
  );

  return {
    isOpen: state.isOpen,
    view: state.view,
    open(view: AuthModalView = "login") {
      setModalState({ isOpen: true, view });
    },
    close() {
      setModalState({ isOpen: false, view: state.view });
    },
    setView(view: AuthModalView) {
      setModalState({ isOpen: state.isOpen, view });
    },
  };
}
