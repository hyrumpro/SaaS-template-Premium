"use client";

import { useI18n, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LOCALES: Array<{ value: Locale; label: string; name: string }> = [
  { value: "en", label: "EN", name: "English" },
  { value: "es", label: "ES", name: "Español" },
];

/**
 * Segmented EN/ES locale toggle for the navbar. Same visual pattern as the
 * sign-in mode switcher on /auth/login.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "border-border bg-card flex items-center rounded-md border p-0.5",
        className
      )}
    >
      {LOCALES.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => setLocale(item.value)}
          aria-pressed={locale === item.value}
          aria-label={item.name}
          title={item.name}
          className={cn(
            "rounded-sm px-2 py-1 text-xs font-medium transition-colors",
            locale === item.value
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
