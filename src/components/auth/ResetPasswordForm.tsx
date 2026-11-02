"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/auth/AuthShell";
import { logger } from "@/lib/logger";
import { useI18n } from "@/lib/i18n";

export function ResetPasswordForm() {
  const { t } = useI18n();
  const copy = t.auth.reset;
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  const supabase = createClient();

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (active) setHasSession(Boolean(data.session));
    })();
    return () => {
      active = false;
    };
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 8) {
      setErrorMessage(copy.minLength);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage(copy.mismatch);
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        logger.error("Password update failed", error);
        setErrorMessage(error.message || "Failed to update password.");
      } else {
        logger.auth("password_reset_completed", undefined, true);
        setSuccessMessage(copy.success);
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 800);
      }
    } catch (error) {
      logger.error("Unexpected password update error", error);
      setErrorMessage(copy.unexpected);
    } finally {
      setIsLoading(false);
    }
  };

  if (hasSession === null) {
    return (
      <AuthShell
        title="Set a new password"
        subtitle="Loading…"
        footer={
          <Link
            href="/auth/login"
            className="text-foreground font-medium underline-offset-4 hover:underline"
          >
            {copy.footerLink}
          </Link>
        }
      >
        <div className="h-24" />
      </AuthShell>
    );
  }

  if (!hasSession) {
    return (
      <AuthShell
        title={copy.expiredTitle}
        subtitle={copy.expiredSubtitle}
        footer={
          <Link
            href="/auth/forgot-password"
            className="text-foreground font-medium underline-offset-4 hover:underline"
          >
            Request a new link
          </Link>
        }
      >
        <Button asChild variant="outline" className="w-full">
          <Link href="/auth/forgot-password">{copy.expiredCta}</Link>
        </Button>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={copy.title}
      subtitle={copy.subtitle}
      footer={
        <Link
          href="/auth/login"
          className="text-foreground font-medium underline-offset-4 hover:underline"
        >
          Back to sign in
        </Link>
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
          <Label htmlFor="password">{copy.newLabel}</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirm">{copy.confirmLabel}</Label>
          <Input
            id="confirm"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? copy.submitting : copy.submit}
        </Button>
      </form>
    </AuthShell>
  );
}
