# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-10-30

### Fixed and hardened

- **Proxy moved to `src/`** — Next.js silently ignores `proxy.ts` at the repo root, so route gating and session refresh never executed. `/playground` and `/waitlist` are now public routes; unauthenticated API calls return JSON 401s.
- **Fail-fast environment validation** — `src/instrumentation.ts` runs `validateRequiredEnvVars()` at server startup; CI builds set `SKIP_ENV_VALIDATION=1`.
- **Timestamps aligned to `timestamptz`** in `src/db/schema.ts` and migrations 004/005.
- **Removed the deprecated `crypto` stub dependency** (Node's builtin `crypto` is used).
- Docs: AGENTS.md/CLAUDE.md completed and corrected (theme system, 006 migration, instrumentation, proxy-location warning).

### Email integration (production-ready)

- **Email log table** (`email_log`) — one row per send, updated by the Mailgun inbound webhook on delivery events. Soft FK to `users.id` so the log survives user hard-delete. See `supabase/migrations/005_email_log.sql` and `src/db/queries.ts`.
- **Three new transactional templates** matching the modern-minimal design system:
  - `subscriptionRenewalUpcoming` — "Your subscription renews on <date>" reminder
  - `trialEnding` — "Your trial ends in 3 days" reminder
  - `refundIssued` — "We've refunded $X to your card" confirmation
- **New triggers wired into Stripe** (`src/lib/webhooks/stripe-handler.ts`):
  - `invoice.upcoming` → renewal reminder email
  - `customer.subscription.trial_will_end` → trial ending email
  - `charge.refunded` → refund email (was DB-only, now sends too)
- **New triggers wired into LemonSqueezy** (`src/lib/webhooks/lemonsqueezy-handler.ts`):
  - `subscription_payment_success` → receipt email (was DB-only)
  - `subscription_payment_failed` → payment-failed email (was DB-only)
  - `order_refunded` → refund email (was DB-only)
- **Mailgun inbound webhook** (`/api/mailgun/webhook`) now dispatches between two flows:
  - **Delivery events** (`delivered`, `bounced`, `complained`, `unsubscribed`, `failed`) — updates `email_log.status` by Mailgun message id
  - **Inbound messages** — forward to `MAILGUN_FORWARD_TO` (existing behavior, moved into a sub-handler)
  - Accepts both form-encoded (Mailgun default) and JSON payloads (e.g. Resend events API)
- **One-click unsubscribe** (RFC 8058) at `/api/unsubscribe` — POST for one-click (Gmail/Outlook), GET for link-click. Tags notifications as `marketing` so `sendEmail()` adds the `List-Unsubscribe` headers automatically. Transactional emails never carry an unsubscribe link.
- **Dev preview route** at `/dev/emails` — every template rendered with sample data, side-by-side HTML iframe + plain-text. 404 in production.
- **Test send script** at `scripts/test-email.ts` — `npm run email:test -- <template> <email>` to send a real email through Mailgun (or log-only with `SKIP_EMAILS=true`).
- **All send functions** now accept an optional `userId` and write to `email_log` with the Mailgun provider message id, enabling delivery tracking end-to-end.

### Documentation

- **`LICENSE`** — professional commercial template license
- **`SUGGESTIONS.md`** — production hardening ideas the template intentionally doesn't include (Redis, observability providers, background jobs, file storage, etc.) with reasoning and links
- **`README.md`** — full rewrite as a professional sell-page

### Added

- 24 themed color presets with live switching and dark mode
- 55+ playground components catalog at `/playground`
- In-app documentation at `/docs` (auth, database, email, payments, seo, styling, observability)
- Idempotency on Stripe and LemonSqueezy webhooks (early-return on duplicate `event_id` plus `onConflictDoNothing` on every create)
- Real LemonSqueezy invoice and subscription ids in webhook handler
- Row-level security policies wrapped in `(SELECT auth.uid())` / `(SELECT auth.jwt()->>'role')` for planner hoisting
- Lazy-initialised server clients (Stripe, Drizzle, Supabase admin) so the production build no longer requires `STRIPE_SECRET_KEY`, `DATABASE_URL`, or `SUPABASE_SERVICE_ROLE_KEY`
- Health probe at `/api/health` with database ping, marked `force-dynamic` so it never runs at build time
- In-memory rate limiter at `src/lib/rate-limit.ts` applied to `/api/checkout`, `/api/stripe/portal`, `/api/account/delete`
- PII redaction in `src/lib/logger.ts` (`PII_KEYS` set + `redactValue()` walker)
- Middleware (`proxy.ts`) short-circuits webhook paths so Supabase middleware never sees Stripe / LemonSqueezy / Mailgun traffic
- CI workflow (`.github/workflows/ci.yml`): lint, typecheck, and build on every PR with a Postgres service
- Docker compose for development and production with PostgreSQL and MongoDB variants
- Supabase auth sync webhook handler with `timingSafeEqual` signature verification and a required `SUPABASE_WEBHOOK_SECRET` in production
- **Dashboard** at `/dashboard` with persistent sidebar, mobile drawer, and framer-motion active-link indicator
  - `/dashboard` — overview with plan, total spent, last payment, and recent payments
  - `/dashboard/profile` — name, email, password, account meta, danger zone
  - `/dashboard/billing` — current plan, history, payment history table with invoice links
  - `/dashboard/activity` — unified timeline of payments, subscriptions, and sign-in events
  - `/dashboard/settings/danger` — type-to-confirm account deletion
- **API endpoints:** `POST /api/stripe/portal` (Stripe billing portal), `POST /api/account/delete` (cancel subs + cascade delete)
- **Observability shim** at `src/lib/observability.ts` — opt-in PostHog analytics and Sentry error tracking. No-op until you install the package and set the env var
  - `ObservabilityProvider` captures pageviews on route change and identifies signed-in users
  - `app/error.tsx` and `app/global-error.tsx` report to Sentry
  - `handleApiError()` reports 5xx errors to Sentry automatically
  - `trackEventServer` / `trackEventClient` / `identifyUserClient` / `resetClient` / `captureError`
  - Server events: `user_signed_up`, `checkout_started`, `account_deleted`
- **RSS 2.0 feed** at `/rss.xml` with 1-hour cache, linked from `<head>` via `alternates.types`
- **Branded 404 page** at `app/not-found.tsx`
- **AGENTS.md** operational notes for AI coding agents
- **Husky + lint-staged** pre-commit hook (ESLint + Prettier on staged files)
- **Issue and PR templates** under `.github/ISSUE_TEMPLATE/` and `.github/PULL_REQUEST_TEMPLATE.md`
- **`.editorconfig`** for cross-editor consistency
- **`CONTRIBUTING.md`** with workflow, conventions, and conventional commits
- **Hallmark modern-minimal design system** — quiet palette, hairline borders, no glow / glassmorphism / gradient orbs
  - Rewrote `src/app/globals.css` with light + dark tokens and component utilities (`.section`, `.section-sm`, `.text-display`, `.text-display-xl`, `.eyebrow`, `.card-quiet`, `.hairline`, redesigned `.prose`)
  - Restrained `button.tsx` variants with `hero` / `glass` quiet aliases for playground compatibility
  - Default theme set to `slate` (Stripe / Linear / ElevenLabs school)
  - Extracted `Logo` component to `src/components/Logo.tsx` for reuse
  - Landing page rewritten: `Navbar`, `Hero`, `Features` (8-card bento), `TechStack` (4-column `<dl>`), `FAQ` (8 honest Q&As), `CTA`, `Footer` (5-column)
  - Auth: `AuthShell` extracted, `LoginForm` and `RegisterForm` rewritten with token classes, inline `aria-invalid` / `aria-describedby`, Google SVG, segmented password / magic-link control
  - Blog: editorial `<ul>` list with `divide-y` rows, `BlogPostContent` is a server component with plain `<a>` share buttons, `BlogNavbar` and `BlogFooter` use sticky hairline chrome
  - Docs layout: sticky hairline top header, 2-column sticky `<aside>` with 7-item nav (added Observability)
  - Legal: `privacy-policy` and `tos` use `Logo` header + `.prose` body
  - Error pages (`not-found`, `error`, `global-error`) use the `Button` component and `eyebrow` pattern
  - Playground page header rewired to use the new system (Logo, no gradient glyph, hairline cards)
  - Removed all `text-gradient`, `glass-*` utility, `font-black`, and `border-primary/20` decorative patterns from shell chrome
  - Removed invented metrics from docs ("3 hours saved", "5 hours saved", "~10x speedup") and corrected theme count to 24
- **Production-hardening pass** for sell-readiness
  - Added `export const viewport: Viewport` to `src/app/layout.tsx` with `device-width`, `themeColor` for light/dark, and `colorScheme: "light dark"`
  - Generated static brand assets via `scripts/generate-assets.mjs` (pure-Node, no new deps) — `og-image.png` (1200x630), `og-image-dark.png`, `logo.png`, `favicon.ico` (32x32 PNG-in-ICO), `apple-touch-icon.png` (180x180); new `npm run assets:generate` script
  - **`/pricing`** page backed by `pricingPlans` config — Free tier + Premium plan with feature lists, badges, and CTAs to register
  - **`/changelog`** page that parses `CHANGELOG.md` server-side into structured releases with versioned headings and grouped bullets (Added / Changed / Fixed / Removed / Security)
  - Added `prefers-reduced-motion` media query to `globals.css` — animates and smooth-scrolls are disabled when the user has the OS preference set
  - Added `overflow-x: hidden` on `html` and `body` to defend against horizontal scroll on mobile
  - Bumped TypeScript `target` from `ES2017` to `ES2018` (named capturing groups used by the changelog parser)
  - Bumped mobile tap targets to ≥ 44 × 44 px: `Button` `sm` and `icon` sizes, `Navbar` mobile menu button, `Tabs` triggers, all gated on `sm:` breakpoint so desktop density is preserved
  - Added `aria-label` to the `ThemeSwitcher` trigger and each dropdown item (active theme is named in the label)
  - Added `aria-label="Component categories"` to the playground `TabsList` for screen readers
  - `Layout` `icons` now exposes `favicon.ico`, `logo.png`, and `apple-touch-icon.png` for tab and home-screen
- **Email templates redesigned** to match the Hallmark modern-minimal design system — quiet palette, hairline borders, no emoji marketing. Brand colors and copy live in `src/config/email.ts` (overridable via env vars). Templates: `welcome`, `passwordReset`, `paymentSuccess`, `paymentFailed`, `subscriptionCancelled`, `emailVerification`, `notification`
- **Receipt email** is now sent automatically by the Stripe webhook on `invoice.payment_succeeded` (was: never sent). Includes plan name, formatted amount, hosted-invoice link
- **Payment-failed email** is now sent automatically by the Stripe webhook on `invoice.payment_failed` (was: missing). Includes reason and a link to update the payment method
- **Cancellation email** is now sent automatically by the Stripe webhook on `customer.subscription.deleted` (was: never sent)
- **Password reset flow** at `/auth/forgot-password` and `/auth/reset-password`. The forgot-password form calls Supabase's `resetPasswordForEmail`; the reset-password page (wrapped in `<Suspense>` because of `useSearchParams`) lets the user set a new password once Supabase's email link has opened a session
- **"Forgot your password?"** link added to the LoginForm (both password and magic-link modes)
- **`.cursorrules` and `CLAUDE.md`** at the repo root so AI-agent-native buyers (Cursor, Claude Code) get the same operational notes that `AGENTS.md` documents — short, high-signal, no duplication
- **`/waitlist` pre-launch page** (env-gated, off by default) with editable copy in `src/config/waitlist.ts`. Set `NEXT_PUBLIC_WAITLIST_ENABLED=true` and run `supabase/migrations/004_waitlist.sql` to enable
- **`POST /api/waitlist`** endpoint with rate limiting (5/min/IP), idempotent on email conflict, and a graceful 404 when the feature is disabled. GET returns 405

### Changed

- README rewritten to match the actual shipped code (npm, real theme/component counts, in-app docs links, production checklist)
- Brand cleanup: removed all ShipFree / idee8 / gopump references across Docker, env files, and blog
- Privacy and Terms pages are generic English boilerplate clearly marked as placeholder
- `useAuth()` now lazy-creates the Supabase client inside `queryFn` so the dashboard layout can pre-render without env vars
- Bumped `next` to `^16.2.7` and `drizzle-orm` to `^0.45.2` for security advisories
- Removed unused `next-auth` dependency, `packageManager: pnpm`, and `pnpm.overrides` block
- Old landing `Enhanced*` / `WhyShip*` components removed in favor of the new sections

### Security

- All webhook handlers verify provider signatures before parsing the body
- Auth webhook requires `SUPABASE_WEBHOOK_SECRET` outside development
- Rate-limited `/api/checkout` (10/min), `/api/stripe/portal` (10/min), `/api/account/delete` (3/hour) per IP
- Production logs redact PII keys (`email`, `password`, `token`, `apiKey`, `secret`, `authorization`, `cookie`)
- Observability shim never throws — analytics and error reporting cannot break a request
- npm audit reduced from 9 to 6 vulnerabilities (all dev-only moderate; no high or critical)

## [1.0.0] - 2026-01-08

### Added

- Initial release
- Next.js 16 with App Router and Turbopack
- Supabase auth (email, magic link, Google OAuth)
- Stripe and LemonSqueezy payment integration
- Mailgun transactional email
- Drizzle ORM with PostgreSQL and row-level security
- Markdown blog with Open Graph, sitemap, and JSON-LD
- Theme system with light/dark CSS variables
- Docker compose for local development and production
