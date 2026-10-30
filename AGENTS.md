# AGENTS.md

Operational notes for AI coding agents (and humans) working in this repo.

## Stack

- Next.js 16 with App Router, Turbopack, React 19
- TypeScript 5 strict
- Tailwind CSS 3 + Radix UI primitives
- Supabase (Auth, Postgres, RLS)
- Drizzle ORM 0.45
- Stripe + LemonSqueezy behind a unified `src/lib/checkout.ts` switch
- Mailgun for transactional email
- TanStack Query 5 for client data
- Framer Motion 12 for animation
- CI: GitHub Actions on Postgres 16

## Ground rules

1. **Server by default.** Components are RSC unless they need state, effects, or browser APIs. Add `"use client"` only when necessary.
2. **Database access.** Use the helpers in `src/db/queries.ts`. They use `onConflictDoNothing` on every create so webhook retries are safe. Raw SQL goes in `supabase/migrations/`.
3. **Webhooks.** Every webhook handler in `src/app/api/*/webhook/route.ts` must verify the provider signature before parsing the body, and early-return on duplicate `event_id`. Both Stripe and LemonSqueezy use real provider ids; do not fabricate them.
4. **Env vars.** Add new variables to `.env.example` with inline comments. Never commit a real `.env*` file. Server-only secrets must be read on the server, not imported into client code.
5. **Theme tokens.** Use the CSS variables in `src/app/globals.css` (`--background`, `--foreground`, `--primary`, etc.) — never hardcode colors.
6. **Lazy server clients.** `src/db/index.ts`, `src/utils/stripe.ts`, and `src/lib/supabase/admin.ts` are `Proxy`-wrapped so the build doesn't need `DATABASE_URL`, `STRIPE_SECRET_KEY`, or `SUPABASE_SERVICE_ROLE_KEY` in CI. Keep them that way: never instantiate `Pool`, `new Stripe(...)`, or `createClient(...)` at module top level.
7. **Rate limit.** Anything user-callable in `src/app/api/*` that isn't idempotent should call `rateLimit()` from `src/lib/rate-limit.ts` first.
8. **Logging.** Use `src/lib/logger.ts`. The `info`/`warn`/`error` helpers walk objects and redact PII keys (`email`, `password`, `token`, `apiKey`, `secret`, `authorization`, `cookie`) before logging.
9. **Observability.** Use the shim in `src/lib/observability.ts` (`trackEventServer`, `trackEventClient`, `captureError`). It is a no-op unless the env var is set AND the package is installed. Never call `posthog-js` / `@sentry/nextjs` directly.
10. **Design system.** The visual system is `modern-minimal` (Stripe / Linear school): quiet palette, hairline borders, no glow / glassmorphism / gradient orbs. Use the design tokens and component utilities in `src/app/globals.css`:
    - Containers: `.section` (`max-w-6xl px-6 py-20 md:py-28`), `.section-sm` (`max-w-3xl px-6 py-16 md:py-20`)
    - Typography: `.text-display`, `.text-display-xl`, `.eyebrow` (uppercase muted label), `.text-balance`, `.text-pretty`
    - Surfaces: `.card-quiet` (`border bg-card rounded-lg p-6`), `.hairline`
    - Long-form (blog posts, docs, legal): wrap content in `.prose`
    - Use the shared `<Logo />` from `src/components/Logo.tsx` in any nav, footer, or auth shell
    - Button variants are restricted to the names in `src/components/ui/button.tsx`. `hero` and `glass` are quiet aliases for `default` and `outline`; do not invent new variants
    - Avoid `text-gradient`, `font-black`, `border-primary/20`, `bg-gradient-to-br`, and `backdrop-blur-xl` on shell chrome. The showcase components under `src/components/playground/*` are exempt (they exist to demonstrate alternative styles).

## Local commands

```bash
npm install              # install
npm run dev              # dev server with Turbopack
npm run lint             # eslint .
npx tsc --noEmit         # typecheck
npm run build            # production build (verifies lazy init works)
npm run db:push          # apply schema to DATABASE_URL
npm run db:studio        # Drizzle Studio
npm run db:generate      # generate migrations from src/db/schema.ts
npm run db:init          # run scripts/init-db.ts
```

CI runs lint + typecheck + build on every PR. The build must pass with no environment variables set except the placeholders in `.github/workflows/ci.yml`.

Local dev: `cp .env.example .env.local` first. With `SKIP_EMAILS=true`, outgoing emails are logged to the server console. `next start` fails fast via `src/instrumentation.ts` when required env vars are missing; CI builds set `SKIP_ENV_VALIDATION=1`.

## File map

```
src/
  app/                    # App Router: routes, layouts, metadata, route handlers
  components/
    landing/              # home page sections (Navbar, Hero, Features, TechStack, FAQ, CTA, Footer)
    playground/           # 55+ themed showcase components for /playground (intentionally varied styles)
    blog/                 # blog post + list components (server-friendly)
    auth/                 # AuthShell, LoginForm, RegisterForm
    dashboard/            # dashboard shell, sidebar, page header, forms
    ui/                   # base Radix primitives + status-badge + Logo
  config/                 # app, payments, themes (24 presets)
  db/                     # Drizzle schema, queries, lazy client
  lib/
    checkout.ts           # unified Stripe + LemonSqueezy switch
    webhooks/             # idempotent webhook handlers
    supabase/             # client / server / admin tiers
    mailgun.ts            # lazy Mailgun client + send helpers (logs to email_log)
    email-templates.ts    # 10 Hallmark modern-minimal templates
    rate-limit.ts         # in-memory token bucket (see SUGGESTIONS.md for Redis swap)
    logger.ts             # PII-redacting logger
    observability.ts      # opt-in PostHog + Sentry shim
  hooks/                  # TanStack Query hooks (useAuth uses lazy Supabase client)
  providers/              # QueryProvider, ObservabilityProvider (PageviewTracker inside Suspense)
  utils/                  # stripe (Proxy), mailgun helpers
  config/
    email.ts              # brand config (env-driven) used by every template
content/blog/             # markdown posts (frontmatter required)
supabase/migrations/      # 001 schema, 002 RLS, 003 RLS optim, 004 waitlist, 005 email_log, 006 webhook processing
src/proxy.ts              # proxy/middleware (public paths, webhook allowlist) - must live in src/, not the repo root
src/instrumentation.ts   # env validation at server startup (SKIP_ENV_VALIDATION=1 skips in CI)
scripts/init-db.ts        # db:init script
scripts/test-email.ts     # `npm run email:test -- <template> <email>` to send a real email
app/dev/emails/           # dev-only template preview (404 in production)
app/api/unsubscribe/      # RFC 8058 one-click unsubscribe
```

## Patterns

### Adding a new API route

```ts
// src/app/api/example/route.ts
import { NextResponse } from "next/server";
import { rateLimit, getClientIp, rateLimitResponse } from "~/lib/rate-limit";
import { logger } from "~/lib/logger";
import { captureError } from "~/lib/observability";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit({
    key: `example:${ip}`,
    limit: 10,
    windowMs: 60_000,
  });
  if (!limit.allowed) return rateLimitResponse(limit);

  try {
    // ...
    return NextResponse.json({ ok: true });
  } catch (err) {
    logger.error("example route failed", { err });
    void captureError(err, { tags: { route: "example" } });
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
```

### Adding a database column

1. Edit `src/db/schema.ts`
2. Add a new migration file in `supabase/migrations/` with the matching DDL
3. Update any query helpers in `src/db/queries.ts`
4. Run `npm run db:generate` to confirm types match

### Adding a theme

Add a new entry to the `THEME_PRESETS` record in `src/config/theme.ts` (each preset is `{ name, primary: {h,s,l}, accent: {h,s,l} }`). At runtime, `applyTheme()` writes `--primary`, `--accent`, `--ring`, `--gradient-primary`, and `--shadow-glow` to `<html>` and persists the choice in localStorage. The dropdown `ThemeSwitcher` is playground-scoped (`src/components/playground/ui/ThemeSwitcher.tsx`) — there is no global provider or navbar switcher; dark variants live under a `.dark` class (Tailwind `class` strategy) with no built-in toggle.

## Things to avoid

- Hardcoded colors in components
- `"use client"` at the top of a page component
- Top-level `new Pool(...)`, `new Stripe(...)`, `new Mailgun(...)`, or `createClient(...)` instantiation
- Webhook handlers that don't early-return on duplicate `event_id`
- Logging raw request bodies or user input
- Adding env vars without updating `.env.example`
- Importing server-only modules from `"use client"` files
- Calling `posthog-js` / `@sentry/nextjs` directly — go through the observability shim
- Using `useSearchParams()` at the top of a client component without wrapping it in `<Suspense>` (it will break prerendering)
- Moving `proxy.ts` out of `src/` - Next.js silently stops loading it
