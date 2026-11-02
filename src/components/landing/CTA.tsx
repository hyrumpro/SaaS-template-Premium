"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export const CTA = () => {
  const { t } = useI18n();
  const { cta } = t.sections;

  return (
    <section className="border-border border-t">
      <div className="section">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-display text-balance">{cta.title}</h2>
          <p className="text-foreground/70 mt-4 text-base leading-relaxed md:text-lg">
            {cta.subtitle}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="xl">
              <Link href="/auth/register">
                {cta.ctaPrimary}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/docs">{cta.ctaSecondary}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
