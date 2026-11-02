"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/auth/AuthShell";
import { logger } from "@/lib/logger";
import { useI18n } from "@/lib/i18n";

export function ForgotPasswordForm() {
  const { t } = useI18n();
  const copy = t.auth.forgot;
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
        window.location.origin;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${siteUrl}/auth/reset-password`,
      });

      if (error) {
        logger.error("Password reset request failed", error);
        setErrorMessage(error.message || copy.failed);
      } else {
        logger.auth("password_reset_requested", email, true);
        setSuccessMessage(copy.success);
      }
    } catch (error) {
      logger.error("Unexpected password reset error", error);
      setErrorMessage(copy.unexpected);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title={copy.title}
      subtitle={copy.subtitle}
      footer={
        <p className="text-muted-foreground">
          {copy.footerText}{" "}
          <Link
            href="/auth/login"
            className="text-foreground font-medium underline-offset-4 hover:underline"
          >
            {copy.footerLink}
          </Link>
        </p>
      }
    >
      {successMessage && (
        <div className="border-border bg-muted text-foreground mb-4 rounded-md border p-3 text-sm">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="border-destructive/20 bg-destructive/5 text-destructive mb-4 rounded-md border p-3 text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">{copy.emailLabel}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? copy.sending : copy.submit}
        </Button>
      </form>
    </AuthShell>
  );
}
