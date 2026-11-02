"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { DashboardMockup } from "./HeroMockup";
import { useI18n } from "@/lib/i18n";

/**
 * Hero — premium-but-quiet Stripe/Linear showcase.
 * Display headline + two CTAs, then a dashboard-style product mockup built
 * entirely from theme tokens (no images, no glass, no loud glow). A soft
 * `--gradient-fade` mesh adds depth without breaking the design system.
 *
 * Client component; the copy follows the navbar language switcher.
 */
export const Hero = () => {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden">
      {/* Soft token-based backdrop mesh */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-fade" />
        <div className="bg-primary/[0.04] absolute -top-32 right-[-10%] h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-chart-2/10 absolute -bottom-24 left-[-6%] h-80 w-80 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-3xl">
          <Badge variant="outline" className="mb-6 rounded-full px-3 py-1">
            <span className="text-muted-foreground text-xs font-medium">
              {t.hero.badge}
            </span>
          </Badge>

          <h1 className="text-display-xl text-balance text-foreground">
            {t.hero.title}
          </h1>

          <p className="text-foreground/70 mt-6 max-w-2xl text-lg leading-relaxed md:text-xl">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl">
              <Link href="/auth/register">
                {t.hero.ctaPrimary}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/playground">{t.hero.ctaSecondary}</Link>
            </Button>
          </div>

          <p className="text-muted-foreground mt-6 text-sm">
            {t.hero.freeNote}
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {t.hero.checks.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 text-sm text-foreground/70"
              >
                <Check className="size-4 text-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <DashboardMockup />
      </div>

      <div className="border-border relative border-t" />
    </section>
  );
};
