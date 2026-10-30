/**
 * Next.js instrumentation hook — runs once when a server instance starts.
 * Fails fast in production when required environment variables are missing
 * or still set to placeholder values. CI builds set SKIP_ENV_VALIDATION=1
 * because `next build` runs in production mode with placeholder secrets.
 */
export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.SKIP_ENV_VALIDATION !== "1"
  ) {
    const { validateRequiredEnvVars } = await import("./lib/env-validation");
    validateRequiredEnvVars();
  }
}
