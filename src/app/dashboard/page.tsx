import * as React from "react";
import Link from "next/link";
import {
  CreditCard,
  Sparkles,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  Receipt,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import {
  getUserByEmail,
  getActiveSubscription,
  getUserPayments,
} from "@/db/queries";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { PageHeader, Section } from "@/components/dashboard/PageHeader";
import { DashboardOverviewGreeting } from "@/components/dashboard/DashboardOverviewGreeting";
import {
  formatDate,
  formatMoney,
  formatRelativeTime,
  paymentStatusLabel,
  subscriptionStatusLabel,
  type SubscriptionStatus,
  type PaymentStatus,
} from "@/lib/format";

function subscriptionTone(status: SubscriptionStatus) {
  switch (status) {
    case "active":
    case "trialing":
      return "positive" as const;
    case "past_due":
    case "unpaid":
      return "warning" as const;
    case "canceled":
    case "incomplete_expired":
      return "negative" as const;
    case "paused":
    case "incomplete":
      return "muted" as const;
    default:
      return "neutral" as const;
  }
}

function paymentTone(status: string) {
  switch (status) {
    case "succeeded":
    case "paid":
      return "positive" as const;
    case "refunded":
      return "info" as const;
    case "failed":
      return "negative" as const;
    case "pending":
      return "warning" as const;
    default:
      return "neutral" as const;
  }
}

export default async function DashboardOverviewPage() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [dbUser, subscription, payments] = await Promise.all([
    getUserByEmail(user.email ?? ""),
    getActiveSubscription(user.id),
    getUserPayments(user.id),
  ]);

  const totalSpentCents = payments
    .filter((p) => p.status === "succeeded" || p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const lastPayment = payments[0];
  const fullName =
    (user.user_metadata?.full_name as string | undefined) ?? null;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Account overview"
        description="A snapshot of your subscription, recent payments, and quick actions."
        actions={
          <Button asChild variant="outline" className="gap-2">
            <Link href="/dashboard/billing">
              Manage billing
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <DashboardOverviewGreeting
        email={user.email ?? null}
        fullName={fullName}
        hasActiveSubscription={Boolean(subscription)}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Current plan</CardDescription>
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-2xl tabular-nums">
              {subscription ? subscription.planName : "Free"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {subscription ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <StatusBadge
                    tone={subscriptionTone(
                      subscription.status as SubscriptionStatus
                    )}
                    label={subscriptionStatusLabel(
                      subscription.status as SubscriptionStatus
                    )}
                    pulse={
                      subscription.status === "active" ||
                      subscription.status === "trialing"
                    }
                  />
                  {subscription.cancelAtPeriodEnd && (
                    <StatusBadge tone="warning" label="Cancels at period end" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    {subscription.cancelAtPeriodEnd ? "Ends" : "Renews"}{" "}
                    {formatDate(subscription.currentPeriodEnd)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  You are on the free tier. Upgrade to unlock all features.
                </p>
                <Button asChild size="sm" className="gap-2">
                  <Link href="/#pricing">
                    View plans
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Total spent</CardDescription>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl tabular-nums">
              {formatMoney(totalSpentCents)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Across {payments.length} payment
              {payments.length === 1 ? "" : "s"} since you joined
            </p>
            {dbUser?.createdAt && (
              <p className="mt-1 text-xs text-muted-foreground">
                Customer since {formatDate(dbUser.createdAt)}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Last payment</CardDescription>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl tabular-nums">
              {lastPayment
                ? formatMoney(lastPayment.amount, lastPayment.currency)
                : "—"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lastPayment ? (
              <div className="space-y-2">
                <StatusBadge
                  tone={paymentTone(lastPayment.status)}
                  label={paymentStatusLabel(
                    lastPayment.status as PaymentStatus
                  )}
                />
                <p className="text-sm text-muted-foreground">
                  {formatRelativeTime(lastPayment.createdAt)}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No payments yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Section
        title="Recent payments"
        description="Your last few charges, newest first."
        actions={
          payments.length > 0 && (
            <Button asChild variant="ghost" size="sm" className="gap-1">
              <Link href="/dashboard/billing">
                View all
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          )
        }
      >
        {payments.length === 0 ? (
          <EmptyPaymentsState />
        ) : (
          <Card>
            <ul className="divide-y divide-border">
              {payments.slice(0, 5).map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-4 px-5 py-3.5"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                      <Receipt className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {p.billingReason
                          ? p.billingReason
                              .split("_")
                              .map(
                                (w) => w.charAt(0).toUpperCase() + w.slice(1)
                              )
                              .join(" ")
                          : "Payment"}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {p.provider === "stripe" ? "Stripe" : "LemonSqueezy"} ·{" "}
                        {formatDate(p.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge
                      tone={paymentTone(p.status)}
                      label={paymentStatusLabel(p.status as PaymentStatus)}
                    />
                    <span className="text-sm font-medium tabular-nums">
                      {formatMoney(p.amount, p.currency)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </Section>
    </div>
  );
}

function EmptyPaymentsState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground">
          <Receipt className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">No payments yet</p>
          <p className="max-w-sm text-xs text-muted-foreground">
            When you make a purchase, your receipts and payment history will
            appear here.
          </p>
        </div>
        <Button asChild size="sm" variant="outline" className="mt-1 gap-2">
          <Link href="/#pricing">
            See plans
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
