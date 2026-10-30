# ShipSaaS

> Production-minded Next.js 16 SaaS foundation. **The plumbing, the design, the
> boring stuff — done. You ship the product.**

Most templates sell you a fresh `create-next-app` with a landing page and
wish you luck. ShipSaaS is the template you wish you'd had on your last
project: auth wired, payments wired, retry-safe webhooks, emails branded,
rate limits in place, design system enforced, and every "oh, I forgot about
that" problem already solved.

Built for solo indie SaaS developers who want to ship, not configure.

---

## What's in the box

- **Next.js 16** App Router, Turbopack, React 19, TypeScript strict
- **Supabase Auth** — email/password, magic link, Google OAuth, password
  reset, account deletion
- **Supabase Postgres** + Drizzle ORM + row-level security + 4 migrations
- **Stripe + LemonSqueezy** behind a single `resolveCheckout()` switch —
  flip `NEXT_PUBLIC_PAYMENT_PROVIDER` and you're on the other one
- **10 transactional email templates** (welcome, receipts, payment-failed,
  renewal reminders, trial endings, refunds, cancellations, password reset,
  email verification, notifications) — branded via env vars, no code changes
- **Email delivery tracking** — `email_log` table + Mailgun inbound webhook
  updates `delivered`/`bounced`/`complained`/`unsubscribed`/`failed`
- **One-click unsubscribe** (RFC 8058) on every marketing send
- **PII-redacting logger** that walks objects before writing
- **Rate limiting** on key user-callable mutation routes
- **Webhook processing** — signed delivery claims, duplicate no-ops, and retryable failures
- **Modern-minimal design system** — 24 themes, 1 visual language, no
  glassmorphism, no gradient orbs, no AI-slop. The aesthetic of Linear,
  Stripe, and ElevenLabs.
- **Hallmark design discipline** applied to 40 routes consistently
- **Dashboard** — sidebar, profile, billing, activity, danger zone
- **Blog** — markdown, slug routing, OG tags, JSON-LD, RSS, reading time
- **Docs** — in-app `/docs` (auth, database, email, payments, SEO, styling,
  observability) that match the code
- **Landing page** — 9 sections (hero, features, pricing, FAQ, footer, …)
- **Legal pages** — `/tos`, `/privacy-policy`
- **`/pricing`** — public pricing page with CTAs to checkout
- **`/changelog`** — public changelog parsed from `CHANGELOG.md`
- **`/waitlist`** — env-gated pre-launch email capture (5 req/min/IP)
- **SEO** — sitemap, robots, OG, Twitter cards, JSON-LD, RSS, favicon,
  apple-touch-icon, og-image (1200×630)
- **Hardening** — security headers, reduced-motion, mobile tap targets,
  overflow guard, ARIA labels
- **CI** — GitHub Actions runs lint + typecheck + build on every PR
- **Docker** — dev and prod compose files, Next.js `standalone` output
- **Lazy clients** — Stripe, Drizzle, Supabase admin are `Proxy`-wrapped
  so the build doesn't need env vars
- **AI-agent rules** — `AGENTS.md`, `CLAUDE.md`, `.cursorrules` (so Cursor,
  Claude Code, and other agents all play nice)

What is **deliberately not** in the box: an in-memory rate limiter (swap for
Upstash Redis in production — see `SUGGESTIONS.md`), a job queue (add
Inngest when you need it), file storage, search, feature flags, 2FA UI,
multi-tenancy, i18n, observability providers wired up, affiliate tracking.

That's a feature, not a bug. See `SUGGESTIONS.md` for the full list and
recommended next steps for each.

---

## Quick start

### Prerequisites

- Node.js 20+ and npm 10+ (the committed `package-lock.json` is the source of truth)
- A [Supabase](https://supabase.com) project — free tier is fine
- A payment account — [Stripe](https://stripe.com) or [LemonSqueezy](https://lemonsqueezy.com)
- A [Mailgun](https://mailgun.com) account — optional in dev, required in production
- (Recommended) A [Vercel](https://vercel.com) account for deployment

### Install and run

```bash
git clone <this-repo> my-saas
cd my-saas
npm install
cp .env.example .env.local       # then fill in the values
npm run db:push                  # apply schema to your Supabase Postgres
npm run dev                      # http://localhost:3000
```

The home page, `/playground`, `/blog`, `/docs`, `/pricing`, and `/changelog`
all render with **zero external services configured**. Only auth, checkout,
and email actually hit third-party APIs.

### 5-minute deploy

1. Push the repo to GitHub.
2. Import on Vercel.
3. Add the env vars from `.env.example` in the Vercel dashboard.

   **Frontend-only showcase deploy:** set `SHOWCASE_MODE=true` (and nothing
   else) to put a demo online with no database, auth, payment, or email
   configuration. Public pages render; API routes that need those services
   return errors. Never use it for a deployment that handles real
   sign-ups or payments.

4. Apply `supabase/migrations/*.sql` to your Supabase project, including `006_webhook_processing.sql`.
5. Configure Stripe (or LemonSqueezy) and Mailgun webhooks — URLs are
   documented in `src/app/docs/payments` and `src/app/docs/email`.
6. Ship.

---

## Email — ready to customize

Out of the box, every email is branded, mobile-responsive, accessible, and
tagged. **No code changes needed to rebrand.** Set env vars and you're done:

```bash
EMAIL_BRAND_NAME="Acme"
EMAIL_PRODUCT_NAME="Acme Pro"
EMAIL_SUPPORT_ADDRESS="help@acme.com"
EMAIL_LOGO_URL="https://acme.com/logo.png"
EMAIL_PRIMARY_COLOR="#0b0f1a"
```

Preview every template in your browser at `/dev/emails` (dev only, 404 in
production). Send a real test email to yourself with:

```bash
npm run email:test -- welcome you@you.com
npm run email:test -- paymentFailed you@you.com
SKIP_EMAILS=true npm run email:test -- welcome   # log only, no Mailgun call
```

To swap Mailgun for [Resend](https://resend.com), [Postmark](https://postmarkapp.com),
or AWS SES, the change is contained to `src/lib/mailgun.ts` and
`/api/mailgun/webhook/route.ts`. The 10 templates, the `email_log` table,
and the brand config all stay identical. Full guide in `src/app/docs/email`.

---

## Environment variables

All variables are documented inline in `.env.example`. The minimum to get a
runnable dev server:

| Variable                                      | Required   | Purpose                                           |
| --------------------------------------------- | ---------- | ------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`                    | yes        | Supabase project URL                              |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`               | yes        | Public anon key (safe in browser)                 |
| `SUPABASE_SERVICE_ROLE_KEY`                   | yes        | Admin client for webhooks                         |
| `DATABASE_URL`                                | yes        | Postgres connection string                        |
| `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` | for Stripe | Server-side checkout + webhook verify             |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`          | for Stripe | Browser-side redirect                             |
| `LEMONSQUEEZY_API_KEY` + store/variant ids    | for LS     | Alternative to Stripe                             |
| `MAILGUN_API_KEY` + `MAILGUN_DOMAIN`          | for email  | Transactional + inbound                           |
| `MAILGUN_WEBHOOK_SIGNING_KEY`                 | for email  | Verifies delivery event callbacks                 |
| `SUPABASE_WEBHOOK_SECRET`                     | production | HMAC for the auth sync webhook                    |
| `NEXT_PUBLIC_SITE_URL`                        | yes        | Used for absolute URLs in metadata, OAuth, emails |
| `NEXT_PUBLIC_PAYMENT_PROVIDER`                | yes        | `stripe` or `lemonsqueezy`                        |
| `EMAIL_BRAND_NAME` … `EMAIL_BACKGROUND_COLOR` | optional   | Brand customization (defaults supplied)           |
| `NEXT_PUBLIC_WAITLIST_ENABLED`                | optional   | Set to `true` to enable `/waitlist`               |

Generate the Supabase webhook secret with `openssl rand -hex 32` and paste
it into both `.env.local` and the Supabase dashboard.

---

## Documentation

The full guides live inside the app at `/docs` so they always match the
deployed code:

- `/docs/auth` — Supabase auth, magic links, OAuth, webhook sync
- `/docs/database` — Drizzle schema, migrations, row-level security
- `/docs/email` — Mailgun setup, DNS (SPF/DKIM/DMARC), templates, dev preview
- `/docs/payments` — Stripe and LemonSqueezy setup, webhooks, idempotency
- `/docs/seo` — Metadata API, sitemap, structured data
- `/docs/styling` — Theme system, CSS variables, dark mode
- `/docs/observability` — PostHog / Sentry opt-in shim

The guides are written against the actual code in this repo, not a generic
version of Next.js.

---

## Project structure

```
src/
  app/                  # App Router (routes, layouts, metadata)
    api/                # Route handlers: webhooks, checkout, health, mailgun, waitlist, unsubscribe
    auth/               # login, register, confirm, forgot-password, reset-password
    blog/               # markdown-driven blog with [slug] dynamic route
    changelog/          # parsed from CHANGELOG.md
    dashboard/          # sidebar, profile, billing, activity, danger
    dev/emails/         # dev-only template preview (404 in production)
    docs/               # in-app documentation
    playground/         # component catalog (see "Design system")
    pricing/            # public pricing page
    privacy-policy/
    terms-of-service/
    waitlist/           # env-gated pre-launch capture
  components/
    landing/            # home page sections (hero, pricing, FAQ, footer, ...)
    playground/         # 55+ themed components for the catalog
    blog/               # blog post and list components
    auth/               # AuthShell + forms (login, register, forgot/reset)
    dashboard/          # sidebar, page header, forms
    waitlist/           # WaitlistForm
    ui/                 # base primitives (Radix + shadcn patterns) + Logo
  config/               # app, payments, themes, email brand, waitlist
  db/                   # Drizzle schema, queries, lazy-initialised client
  lib/
    checkout.ts         # unified Stripe + LemonSqueezy switch
  webhooks/           # signed, retry-safe webhook handlers
    supabase/           # client / server / admin tiers
    mailgun.ts          # lazy Mailgun client + send helpers (logs to email_log)
    email-templates.ts  # 10 Hallmark modern-minimal templates
    rate-limit.ts       # in-memory token bucket (see SUGGESTIONS.md for Redis swap)
    logger.ts           # PII-redacting logger
    observability.ts    # opt-in PostHog + Sentry shim
  hooks/                # React Query hooks (useAuth uses lazy Supabase client)
  providers/            # QueryProvider, ObservabilityProvider (PageviewTracker in Suspense)
  config/
    email.ts            # brand config (env-driven) used by every template
content/blog/           # markdown posts (drop a .md file, get a page)
supabase/migrations/    # 001 schema, 002 RLS, 003 RLS optim, 004 waitlist, 005 email_log
src/proxy.ts            # Next.js proxy/middleware (public paths, webhook allowlist)
scripts/
  init-db.ts            # db:init script (seed roles, etc.)
  test-email.ts         # npm run email:test -- <template> <email>
  generate-assets.mjs   # og-image, favicon, logo, apple-touch-icon
```

---

## Design system

The visual system is **modern-minimal** (Stripe / Linear / ElevenLabs school):
quiet palette, hairline borders, no glow, no glassmorphism, no gradient orbs.

- **24 themes** in `src/config/theme.ts`, switchable at runtime from the
  navbar. The default is `slate`. All themes ship with light and dark
  variants driven by CSS custom properties — no class swap, no flash.
- **55+ playground components** grouped by purpose, each fully themed and
  responsive.
- **9 landing-page sections** in `src/components/landing/` compose the home
  page out of the playground pieces.
- **Container, typography, and surface utilities** in `src/app/globals.css`:
  - `.section` / `.section-sm` — page padding and max-width
  - `.text-display` / `.text-display-xl` / `.eyebrow` — typography
  - `.card-quiet` / `.hairline` — surfaces
  - `.prose` — long-form content (blog, docs, legal)
- **Button variants** restricted to the names in `src/components/ui/button.tsx`
  (no invented variants). The shared `<Logo />` lives in
  `src/components/Logo.tsx` and is used in every nav, footer, and auth shell.

Browse the live catalog at <http://localhost:3000/playground>.

---

## Tech stack

| Layer         | Choice                             | Why                                         |
| ------------- | ---------------------------------- | ------------------------------------------- |
| Framework     | Next.js 16 (App Router, Turbopack) | RSC, streaming, server actions              |
| Language      | TypeScript 5                       | strict mode                                 |
| Styling       | Tailwind CSS 3 + CSS variables     | Theming without runtime cost                |
| UI primitives | Radix UI + custom shadcn-style     | Accessible, unstyled                        |
| Animation     | Framer Motion 12                   | Production-tested, tree-shaken              |
| Auth          | Supabase Auth                      | Email, OAuth, magic links, sessions, RLS    |
| Database      | PostgreSQL (Supabase)              | RLS, branching, backups                     |
| ORM           | Drizzle 0.45                       | Type-safe SQL, no runtime overhead          |
| Payments      | Stripe + LemonSqueezy              | Two providers, one checkout API             |
| Email         | Mailgun                            | Transactional + inbound + delivery webhooks |
| Data fetching | TanStack Query 5                   | Caching, retries, devtools                  |
| CI            | GitHub Actions on Postgres 16      | lint + typecheck + build                    |

---

## Scripts

| Script                      | What it does                                                              |
| --------------------------- | ------------------------------------------------------------------------- |
| `npm run dev`               | Dev server with Turbopack                                                 |
| `npm run build`             | Production build (lazy init for Stripe + DB)                              |
| `npm start`                 | Start the production server                                               |
| `npm run lint`              | Run ESLint with the Next.js config                                        |
| `npm run format`            | Format with Prettier                                                      |
| `npm run db:generate`       | Generate Drizzle migrations from `src/db/schema.ts`                       |
| `npm run db:push`           | Apply schema to the database (dev)                                        |
| `npm run db:studio`         | Open Drizzle Studio in the browser                                        |
| `npm run db:init`           | Run `scripts/init-db.ts` (seed roles, etc.)                               |
| `npm run email:test`        | Send a real test email (e.g. `npm run email:test -- welcome you@you.com`) |
| `npm run assets:generate`   | Regenerate og-image, favicon, logo                                        |
| `npm run docker:dev`        | Bring up the dev docker-compose stack                                     |
| `npm run docker:prod`       | Start the production stack in the background                              |
| `npm run docker:prod:build` | Rebuild and start the production stack                                    |

---

## Production checklist

This repo includes a hardened starting point for common Next.js 16 SaaS traps.
Run through this once before going live:

### Auth & data

- [ ] Set `SUPABASE_WEBHOOK_SECRET` (`openssl rand -hex 32`) and configure
      the Supabase auth webhook to your production endpoint
- [ ] Apply every migration in `supabase/migrations/` to your Supabase
      project
- [ ] Enable **Point-in-Time Recovery** in the Supabase dashboard
      (ships off by default)
- [ ] Confirm RLS is on:
      `select * from pg_tables where schemaname='public';` should show
      `rowsecurity = true` on every table
- [ ] Verify RLS policies:
      `select * from pg_policies where schemaname='public';` should show
      policies on `users`, `subscriptions`, `orders`, `payments`

### Payments

- [ ] Configure the Stripe **and** LemonSqueezy webhook endpoints in both
      dashboards; secrets must match `STRIPE_WEBHOOK_SECRET` /
      `LEMONSQUEEZY_WEBHOOK_SECRET`
- [ ] Set `NEXT_PUBLIC_PAYMENT_PROVIDER` to your active provider and confirm
      the corresponding env vars are set
- [ ] Create Stripe products/prices and copy the ids into
      `src/config/payments.ts`

### Email

- [ ] Verify your Mailgun domain (SPF, DKIM, DMARC, MX) and set the inbound
      route to `/api/mailgun/webhook` with `MAILGUN_WEBHOOK_SIGNING_KEY`
- [ ] Enable Mailgun delivery event webhooks
      (Delivered / Bounced / Complained / Unsubscribed / Failed) so the
      `email_log` table stays accurate
- [ ] Customize `EMAIL_BRAND_NAME`, `EMAIL_PRODUCT_NAME`,
      `EMAIL_SUPPORT_ADDRESS`, `EMAIL_LOGO_URL`, and brand colors

### App

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production URL (used in metadata,
      OAuth redirects, email links)
- [ ] Set `NODE_ENV=production` and confirm `next.config.ts` security
      headers are applied
- [ ] Add a Sentry DSN (`NEXT_PUBLIC_SENTRY_DSN`) and auth token
      (the shim is a no-op until you install the package)
- [ ] Add your custom 404, 500, and error pages if you don't want the
      defaults
- [ ] Add an Upstash Redis adapter in `src/lib/rate-limit.ts` if you
      outgrow the in-memory bucket (see `SUGGESTIONS.md` §1)
- [ ] Verify `/api/health` returns 200 from outside your network
      (Better Stack / Cronitor)

### What was already done (so you don't redo it)

- **Webhook processing.** Stripe uses its real event id. Lemon Squeezy,
  Supabase, and Mailgun use an internal body dedupe key because those webhook
  shapes do not consistently expose a delivery id. Failed claims remain
  retryable and stale claims expire.
- **RLS performance.** All policies in
  `supabase/migrations/003_rls_optimization.sql` wrap auth lookups in
  `(SELECT auth.uid())` and `(SELECT auth.jwt()->>'role')` so the planner
  can hoist the subselect out of per-row evaluation.
- **Lazy server clients.** `src/db/index.ts` and `src/utils/stripe.ts` use
  a `Proxy` so the build doesn't require `DATABASE_URL` or
  `STRIPE_SECRET_KEY` to be set in CI. They're initialised on first use,
  with a clear error if the env var is missing at request time.
- **Rate limiting.** `src/lib/rate-limit.ts` provides an in-memory token
  bucket with IP extraction; applied to `/api/checkout`, `/api/stripe/portal`,
  `/api/account/delete`, `/api/waitlist`.
- **Health probe.** `/api/health` pings the database and is marked
  `force-dynamic` so it isn't evaluated at build time.
- **Webhook allowlist.** `src/proxy.ts` short-circuits webhook paths so the
  Supabase middleware never sees Stripe / LemonSqueezy / Mailgun traffic.
- **PII redaction.** `src/lib/logger.ts` walks objects and replaces any key
  in the `PII_KEYS` set with `[REDACTED]` before logging.
- **Email log + delivery tracking.** `email_log` table written on every
  send; updated by the Mailgun inbound webhook on delivery events.
- **One-click unsubscribe.** `List-Unsubscribe` + `List-Unsubscribe-Post`
  headers (RFC 8058) on every marketing/notification email; transactional
  emails (receipts, password resets, payment-failed) never carry an
  unsubscribe link per Gmail/Outlook bulk sender guidelines.
- **Accessibility.** `prefers-reduced-motion`, mobile tap targets ≥ 44×44 px,
  ARIA labels on theme switcher and tabs, color-scheme + theme-color
  metadata, overflow guard, semantic HTML.
- **SEO.** Sitemap, robots.txt, OpenGraph + Twitter card metadata, JSON-LD
  (`WebSite`, `Organization`, `BlogPosting`, `BreadcrumbList`), RSS feed,
  1200×630 og-image, favicon, apple-touch-icon.

---

## Adding a blog post

1. Create a markdown file in `content/blog/`, e.g. `my-post.md`
2. Add frontmatter:

   ```markdown
   ---
   title: "My post"
   excerpt: "A short description for SEO and link previews (150-160 chars)."
   date: "2027-01-15"
   author: "Your Name"
   tags: ["nextjs", "saas"]
   image: "/images/your-cover.png"
   ---
   ```

3. Drop the cover image in `public/images/`
4. Push — the post is in the sitemap, has `BlogPosting` JSON-LD, and gets
   OG tags automatically

---

## Deployment

The simplest target is Vercel:

1. Push the repo to GitHub
2. Import on <https://vercel.com/new>
3. Add the env vars from `.env.example` (everything is documented inline)
4. Deploy

The included Dockerfiles and compose files use the committed npm lockfile and
Next.js `standalone` output. The production compose file builds a small
non-root runtime image; copy `.env.docker.example` to `.env.docker` for local
development or provide `.env.production` for self-hosting.

For local production simulation:

```bash
npm run docker:prod:build
```

---

## Customizing the email integration

Everything you need to touch lives in two files:

1. **`src/config/email.ts`** — brand config (env-driven, defaults supplied).
2. **`src/lib/email-templates.ts`** — the 10 templates. Each is a small
   function that returns `{ subject, html, text }`. Edit copy here, the
   design system stays intact.

To add a new template:

```ts
// src/lib/email-templates.ts
myNewEmail(name: string, data: SomeData): EmailTemplate {
  return {
    subject: `…`,
    html: shell("…", "…", [
      heading("…"),
      paragraph(greeting(name)),
      // …more building blocks: muted(), small(), button(),
      //   divider(), detailTable()
    ].join("")),
    text: `…`,
  };
},
```

Then add the send helper in `src/lib/mailgun.ts`:

```ts
export const sendMyNewEmail = async (
  email: string,
  name: string,
  data: SomeData,
  userId?: string
): Promise<boolean> => {
  const template = EmailTemplates.myNewEmail(name, data);
  const messageId = await sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text,
    tags: ["my-tag", "notification"], // add "marketing" to opt into List-Unsubscribe
    template: "myNewEmail", // appears in email_log.template
    userId,
    metadata: { ...data }, // appears in email_log.metadata
  });
  return messageId !== null;
};
```

And call it from wherever the trigger lives — usually a webhook handler in
`src/lib/webhooks/` or a cron. That's it. The `email_log` write and the
PII-redacting log entry are automatic.

---

## What's next

After you buy and deploy, you'll want to:

1. **Set up observability.** Pick a provider from `SUGGESTIONS.md` §Observability.
   The shim is a no-op until you install + set the env var.
2. **Swap the in-memory rate limiter for Redis.** Upstash, ~30 minutes of work.
3. **Add a background job queue** when you need scheduled work
   (renewal reminders, abandoned cart, trial expiry cleanup).
4. **Add file storage** when you need avatars or uploads
   (Supabase Storage is the path of least resistance).
5. **Add a blog with scheduling** when you outgrow markdown files
   (Keystatic, Sanity, Contentful).

See `SUGGESTIONS.md` for the full list, with reasoning and links.

---

## License

This is a **commercial template license** — see `LICENSE`. Summary:

- Use the Template to build **unlimited Customer Projects** (your own
  SaaS products, including ones you sell).
- **Don't resell the Template itself** as a starter kit, boilerplate, or
  competing template product.
- Compiled output embedded in a Customer Project is permitted; the
  Template source is not.
- The Template is provided "as is" without warranty.

You retain ownership of the Customer Projects you build. The Licensor
retains ownership of the Template.

---

## Support

- Read the in-app docs at `/docs`
- See `SUGGESTIONS.md` for production hardening ideas
- File issues in your fork
- For the original template author, see the support link in `package.json`

---

**Last updated:** 2026.
