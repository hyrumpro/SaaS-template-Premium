"use client";

import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: string;
  popular?: boolean;
  features: string[];
};

const formatPrice = (cents: number, currency: string) => {
  if (cents === 0) return "Free";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
};

/**
 * Client body of the pricing page — the copy follows the navbar language
 * switcher. Plan names/descriptions/features come from
 * src/config/payments.ts (buyer-editable content, kept as configured).
 */
export const PricingBody = ({ plans }: { plans: Plan[] }) => {
  const { t } = useI18n();
  const { pricing } = t;
  const totalCards = 1 + plans.length; // Free + configured paid plans
  const gridClass =
    totalCards <= 2
      ? "grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2"
      : "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3";

  return (
    <main>
      <section className="border-border border-b">
        <div className="mx-auto w-full max-w-6xl px-6 pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="max-w-3xl">
            <p className="eyebrow">{pricing.eyebrow}</p>
            <h1 className="text-display-xl text-balance text-foreground mt-4">
              {pricing.title}
            </h1>
            <p className="text-foreground/70 mt-6 max-w-2xl text-lg leading-relaxed md:text-xl">
              {pricing.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
          <div className={gridClass}>
            <div className="card-quiet flex flex-col">
              <h2 className="text-foreground text-lg font-semibold tracking-tight">
                {pricing.free.name}
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                {pricing.free.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-foreground text-4xl font-semibold tracking-tight">
                  $0
                </span>
                <span className="text-muted-foreground text-sm">
                  {pricing.free.period}
                </span>
              </div>
              <ul className="mt-8 space-y-3 text-sm">
                {pricing.free.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/auth/register">{pricing.free.cta}</Link>
                </Button>
              </div>
            </div>

            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`card-quiet relative flex flex-col ${
                  plan.popular ? "ring-foreground/15 ring-1" : ""
                }`}
              >
                {plan.popular && (
                  <Badge
                    variant="default"
                    className="absolute -top-3 right-6 rounded-full shadow-sm"
                  >
                    <Sparkles className="size-3" aria-hidden />
                    {pricing.popularBadge}
                  </Badge>
                )}
                <h2 className="text-foreground text-lg font-semibold tracking-tight">
                  {plan.name}
                </h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  {plan.description}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-foreground text-4xl font-semibold tracking-tight">
                    {formatPrice(plan.price, plan.currency)}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    /{plan.interval}
                  </span>
                </div>
                <ul className="mt-8 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="text-foreground mt-0.5 size-4 shrink-0" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Button asChild className="w-full">
                    <Link href={`/auth/register?plan=${plan.id}`}>
                      {pricing.choosePrefix} {plan.name}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Every plan includes */}
          <div className="border-border bg-muted/30 mt-16 rounded-lg border p-8 md:p-10">
            <h2 className="text-center text-lg font-semibold tracking-tight">
              {pricing.includes.title}
            </h2>
            <p className="text-muted-foreground mx-auto mt-2 max-w-xl text-center text-sm leading-relaxed">
              {pricing.includes.subtitle}
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {pricing.includes.items.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-foreground/80"
                >
                  <Check className="text-primary mt-0.5 size-4 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-sm">
              {pricing.contact.text}{" "}
              <Link
                href="mailto:hello@shipsaas.dev"
                className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
              >
                {pricing.contact.link}
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
