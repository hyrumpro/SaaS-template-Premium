"use client";

/**
 * Lightweight client-side i18n for the landing chrome (EN/ES).
 *
 * The locale lives in localStorage and is read through
 * useSyncExternalStore: the server snapshot is always "en" (no hydration
 * mismatch), the client snapshot upgrades to the stored choice right after
 * hydration, and storage events keep multiple tabs in sync. Translated
 * copy must be consumed from client components via useI18n().
 *
 * This demonstrates the translation pattern with a small dictionary. For
 * route-level i18n (/es/... URLs, localized blog posts, SEO hreflang),
 * adopt next-intl — this module is the floor, not the ceiling.
 */

import * as React from "react";

export type Locale = "en" | "es";

export interface Dictionary {
  nav: {
    features: string;
    stack: string;
    faq: string;
    blog: string;
    docs: string;
    signIn: string;
    getStarted: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    freeNote: string;
    checks: string[];
  };
  footer: {
    builtWith: string;
    rights: string;
  };
}

const STORAGE_KEY = "shipsaas.locale";

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      features: "Features",
      stack: "Stack",
      faq: "FAQ",
      blog: "Blog",
      docs: "Docs",
      signIn: "Sign in",
      getStarted: "Get started",
    },
    hero: {
      badge: "Next.js 16 · Supabase · Postgres + RLS",
      title: "A premium Next.js template for shipping your SaaS faster.",
      subtitle:
        "Supabase Auth on Postgres with row-level security, Stripe and LemonSqueezy payments, Mailgun email, and a real dashboard. Production-ready code, end-to-end types, and the architecture most templates make you build yourself.",
      ctaPrimary: "Create an account",
      ctaSecondary: "Browse components",
      freeNote: "Free to start. No credit card required.",
      checks: [
        "Supabase Auth + RLS",
        "Stripe & LemonSqueezy",
        "55+ components",
      ],
    },
    footer: {
      builtWith: "Built with Next.js, Supabase, and Stripe.",
      rights: "All rights reserved.",
    },
  },
  es: {
    nav: {
      features: "Características",
      stack: "Stack",
      faq: "FAQ",
      blog: "Blog",
      docs: "Documentación",
      signIn: "Iniciar sesión",
      getStarted: "Comenzar",
    },
    hero: {
      badge: "Next.js 16 · Supabase · Postgres + RLS",
      title: "Una plantilla premium de Next.js para lanzar tu SaaS más rápido.",
      subtitle:
        "Supabase Auth sobre Postgres con seguridad a nivel de fila, pagos con Stripe y LemonSqueezy, email con Mailgun y un dashboard real. Código listo para producción, tipos de extremo a extremo y la arquitectura que la mayoría de las plantillas te obligan a construir.",
      ctaPrimary: "Crear cuenta",
      ctaSecondary: "Ver componentes",
      freeNote: "Gratis para empezar. Sin tarjeta de crédito.",
      checks: [
        "Supabase Auth + RLS",
        "Stripe y LemonSqueezy",
        "Más de 55 componentes",
      ],
    },
    footer: {
      builtWith: "Construido con Next.js, Supabase y Stripe.",
      rights: "Todos los derechos reservados.",
    },
  },
};

let listeners: Array<() => void> = [];

function subscribe(listener: () => void) {
  listeners.push(listener);
  // Keep other tabs in sync when the locale changes elsewhere.
  window.addEventListener("storage", listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): Locale {
  return window.localStorage.getItem(STORAGE_KEY) === "es" ? "es" : "en";
}

function getServerSnapshot(): Locale {
  return "en";
}

/** Persist the choice, update <html lang>, and notify every consumer. */
export function setLocale(next: Locale) {
  window.localStorage.setItem(STORAGE_KEY, next);
  document.documentElement.lang = next;
  for (const listener of listeners) listener();
}

const LocaleContext = React.createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
} | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = React.useMemo(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useI18n() {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useI18n must be used within <LocaleProvider>");
  }
  return ctx;
}
