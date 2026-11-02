"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/auth/AuthShell";
import { validateForm, CommonRules, hasErrors } from "@/lib/validation";
import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

export function RegisterForm() {
  const { t } = useI18n();
  const copy = t.auth.register;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const validationErrors = validateForm(
      { email, password },
      {
        email: CommonRules.email,
        password: CommonRules.password,
      }
    );

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = copy.mismatch;
    }

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      logger.info("Registration attempt", { email });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      });

      if (error) {
        logger.error("Registration failed", error, { email });

        if (error.message.includes("already registered")) {
          setErrorMessage(copy.alreadyRegistered);
        } else if (error.message.includes("weak password")) {
          setErrors({
            password: copy.weakPassword,
          });
        } else {
          setErrorMessage(error.message || copy.unexpected);
        }
        return;
      }

      logger.auth("register", data.user?.id, true);

      if (data.user && !data.session) {
        setSuccessMessage(copy.success);
      } else {
        setSuccessMessage(copy.success);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
    } catch (err) {
      logger.error("Unexpected registration error", err);
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

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">{copy.emailLabel}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: "" }));
              }
            }}
            disabled={isLoading}
            className={cn(errors.email && "border-destructive")}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <p id="email-error" className="text-destructive text-xs">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">{copy.passwordLabel}</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: "" }));
              }
            }}
            disabled={isLoading}
            className={cn(errors.password && "border-destructive")}
            required
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            autoComplete="new-password"
          />
          {errors.password && (
            <p id="password-error" className="text-destructive text-xs">
              {errors.password}
            </p>
          )}
          <p className="text-muted-foreground text-xs">{copy.passwordHelper}</p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">{copy.confirmLabel}</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) {
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }
            }}
            disabled={isLoading}
            className={cn(errors.confirmPassword && "border-destructive")}
            required
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={
              errors.confirmPassword ? "confirm-password-error" : undefined
            }
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <p id="confirm-password-error" className="text-destructive text-xs">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? copy.submitting : copy.submit}
        </Button>
      </form>
    </AuthShell>
  );
}
