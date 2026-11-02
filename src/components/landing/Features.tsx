"use client";

import {
  CreditCard,
  Database,
  Mail,
  Palette,
  Search,
  Shield,
  Code2,
  Gauge,
  Lock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Features = () => {
  const { t } = useI18n();
  const { features } = t.sections;

  const icons: Array<LucideIcon> = [
    Shield,
    CreditCard,
    Database,
    Mail,
    Search,
    Palette,
    Code2,
    Lock,
  ];

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="border-border border-t"
    >
      <div className="section">
        <div className="max-w-2xl">
          <p className="eyebrow">{features.eyebrow}</p>
          <h2 id="features-heading" className="text-display mt-3 text-balance">
            {features.title}
          </h2>
          <p className="text-foreground/70 mt-4 text-base leading-relaxed md:text-lg">
            {features.subtitle}
          </p>
        </div>

        <div
          role="list"
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.items.map(({ title, description }, i) => {
            const Icon = icons[i] ?? Shield;
            return (
              <div
                key={title}
                role="listitem"
                className="hover:bg-accent/40 bg-card group flex flex-col gap-3 p-6 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="border-border bg-background text-foreground group-hover:border-foreground/20 inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors">
                  <Icon className="size-4" aria-hidden />
                </div>
                <h3 className="text-foreground text-base font-semibold">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm">
          <Gauge className="text-muted-foreground size-4" aria-hidden />
          <p className="text-muted-foreground">{features.note}</p>
        </div>
      </div>
    </section>
  );
};
