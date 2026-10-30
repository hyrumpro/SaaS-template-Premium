import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { DashboardMockup } from "./HeroMockup";

/**
 * Hero — premium-but-quiet Stripe/Linear showcase.
 * Display headline + two CTAs, then a dashboard-style product mockup built
 * entirely from theme tokens (no images, no glass, no loud glow). A soft
 * `--gradient-fade` mesh adds depth without breaking the design system.
 *
 * Server component; the mockup carries a lightweight scroll-reveal.
 */
export const Hero = () => {
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
              Next.js 16 · Supabase · Postgres + RLS
            </span>
          </Badge>

          <h1 className="text-display-xl text-balance text-foreground">
            A premium Next.js template for shipping your SaaS faster.
          </h1>

          <p className="text-foreground/70 mt-6 max-w-2xl text-lg leading-relaxed md:text-xl">
            Supabase Auth on Postgres with row-level security, Stripe and
            LemonSqueezy payments, Mailgun email, and a real dashboard.
            Production-ready code, end-to-end types, and the architecture most
            templates make you build yourself.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl">
              <Link href="/auth/register">
                Create an account
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/playground">Browse components</Link>
            </Button>
          </div>

          <p className="text-muted-foreground mt-6 text-sm">
            Free to start. No credit card required.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {[
              "Supabase Auth + RLS",
              "Stripe & LemonSqueezy",
              "55+ components",
            ].map((item) => (
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
