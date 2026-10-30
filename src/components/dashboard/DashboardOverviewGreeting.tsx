"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function greetingForHour(hour: number) {
  if (hour < 5) return "Working late";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 22) return "Good evening";
  return "Working late";
}

export function DashboardOverviewGreeting({
  email,
  fullName,
  hasActiveSubscription,
}: {
  email: string | null;
  fullName: string | null;
  hasActiveSubscription: boolean;
}) {
  const [now] = React.useState(() => new Date());

  const hour = now.getHours();
  const greeting = greetingForHour(hour);
  const name = fullName || email?.split("@")[0] || "there";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="overflow-hidden border-border/60 bg-card">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {greeting}
              </p>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Welcome back, {name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {hasActiveSubscription
                  ? "Your subscription is active. Manage it any time from Billing."
                  : "You're on the free tier. Upgrade to unlock the full experience."}
              </p>
            </div>
          </div>
          <Button asChild className="shrink-0 gap-2">
            <Link
              href={hasActiveSubscription ? "/dashboard/billing" : "/#pricing"}
            >
              {hasActiveSubscription ? "Open billing" : "View plans"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
