/**
 * Environment Variables Validation
 * Validates required environment variables at startup
 * Fails fast in production if critical variables are missing
 */

import { validatePaymentConfig } from "@/config/payments";
import { logger } from "./logger";

/**
 * Showcase deployments set SHOWCASE_MODE=true to serve the public pages
 * as a frontend-only demo with no database, auth, payment, or email
 * configuration. Never enable it on a deployment that should handle
 * real sign-ups or payments.
 */
export function isShowcaseMode() {
  return process.env.SHOWCASE_MODE === "true";
}

export function validateRequiredEnvVars() {
  if (isShowcaseMode()) {
    logger.warn(
      "SHOWCASE_MODE=true - skipping environment validation; auth, database, payments, and email are disabled"
    );
    return { valid: true, errors: [], showcase: true };
  }

  const errors: string[] = [];

  // Required for all deployments
  const required = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  };

  // Check required variables
  Object.entries(required).forEach(([key, value]) => {
    if (!value || value.includes("placeholder") || value.includes("your_")) {
      errors.push(`${key} is not configured or contains placeholder value`);
    }
  });

  // Validate payment provider configuration
  const paymentValidation = validatePaymentConfig();
  if (!paymentValidation.valid) {
    errors.push(...paymentValidation.errors);
  }

  // Check Mailgun (warn only, not critical)
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    logger.warn("Mailgun is not configured - emails will not be sent");
  }

  // In production, fail fast if critical vars are missing
  if (process.env.NODE_ENV === "production" && errors.length > 0) {
    console.error("❌ CRITICAL: Missing required environment variables:");
    errors.forEach((error) => console.error(`  - ${error}`));
    throw new Error(
      "Application cannot start with missing environment variables"
    );
  }

  // In development, just warn
  if (process.env.NODE_ENV === "development" && errors.length > 0) {
    console.warn("⚠️  WARNING: Some environment variables are not configured:");
    errors.forEach((error) => console.warn(`  - ${error}`));
  }

  return { valid: errors.length === 0, errors };
}

// Validation is invoked from src/instrumentation.ts at server startup.
