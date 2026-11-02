"use client";

/**
 * Lightweight client-side i18n for the landing page (EN/ES).
 *
 * The locale lives in localStorage and is read through
 * useSyncExternalStore: the server snapshot is always "en" (no hydration
 * mismatch), the client snapshot upgrades to the stored choice right after
 * hydration, and storage events keep multiple tabs in sync. Translated
 * copy must be consumed from client components via useI18n().
 *
 * This demonstrates the translation pattern with the full landing page.
 * For route-level i18n (/es/... URLs, localized blog posts, SEO hreflang),
 * adopt next-intl — this module is the floor, not the ceiling.
 */

import * as React from "react";

export type Locale = "en" | "es";

export interface Dictionary {
  nav: {
    features: string;
    stack: string;
    faq: string;
    blog: string;
    docs: string;
    signIn: string;
    getStarted: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    freeNote: string;
    checks: string[];
  };
  footer: {
    builtWith: string;
    rights: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    free: {
      name: string;
      description: string;
      period: string;
      features: string[];
      cta: string;
    };
    popularBadge: string;
    choosePrefix: string;
    includes: {
      title: string;
      subtitle: string;
      items: string[];
    };
    contact: {
      text: string;
      link: string;
    };
  };
  auth: {
    login: {
      title: string;
      subtitle: string;
      footerText: string;
      footerLink: string;
      modePassword: string;
      modeMagic: string;
      emailLabel: string;
      passwordLabel: string;
      magicNote: string;
      submit: string;
      submitting: string;
      magicSubmit: string;
      magicSending: string;
      forgot: string;
      or: string;
      google: string;
      success: string;
      magicSent: string;
      notVerified: string;
      resend: string;
      verificationSent: string;
      invalidCredentials: string;
      magicError: string;
      googleError: string;
      unexpected: string;
      resendError: string;
    };
    register: {
      title: string;
      subtitle: string;
      nameLabel: string;
      emailLabel: string;
      passwordLabel: string;
      confirmLabel: string;
      mismatch: string;
      passwordHelper: string;
      submit: string;
      submitting: string;
      footerText: string;
      footerLink: string;
      success: string;
      alreadyRegistered: string;
      weakPassword: string;
      unexpected: string;
    };
    forgot: {
      title: string;
      subtitle: string;
      emailLabel: string;
      submit: string;
      sending: string;
      failed: string;
      success: string;
      footerText: string;
      footerLink: string;
      unexpected: string;
    };
    reset: {
      title: string;
      subtitle: string;
      newLabel: string;
      confirmLabel: string;
      submit: string;
      submitting: string;
      success: string;
      expiredTitle: string;
      expiredSubtitle: string;
      expiredCta: string;
      footerLink: string;
      minLength: string;
      mismatch: string;
      missingToken: string;
      invalidLink: string;
      unexpected: string;
    };
  };
  blog: {
    navBlog: string;
    navComponents: string;
    navDocs: string;
    getStarted: string;
  };
  docs: {
    backHome: string;
    eyebrow: string;
  };
  sections: {
    features: {
      eyebrow: string;
      title: string;
      subtitle: string;
      items: Array<{ title: string; description: string }>;
      note: string;
    };
    socialProof: {
      stats: Array<{ value: string; label: string; note: string }>;
    };
    techStack: {
      eyebrow: string;
      title: string;
      subtitle: string;
      groups: Array<{
        category: string;
        items: Array<{ name: string; note: string }>;
      }>;
    };
    testimonials: {
      eyebrow: string;
      title: string;
      subtitle: string;
      items: Array<{ quote: string; name: string; role: string }>;
    };
    faq: {
      eyebrow: string;
      title: string;
      items: Array<{ q: string; a: string }>;
    };
    cta: {
      title: string;
      subtitle: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
  };
}

const STORAGE_KEY = "shipsaas.locale";

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      features: "Features",
      stack: "Stack",
      faq: "FAQ",
      blog: "Blog",
      docs: "Docs",
      signIn: "Sign in",
      getStarted: "Get started",
    },
    hero: {
      badge: "Next.js 16 · Supabase · Postgres + RLS",
      title: "A premium Next.js template for shipping your SaaS faster.",
      subtitle:
        "Supabase Auth on Postgres with row-level security, Stripe and LemonSqueezy payments, Mailgun email, and a real dashboard. Production-ready code, end-to-end types, and the architecture most templates make you build yourself.",
      ctaPrimary: "Create an account",
      ctaSecondary: "Browse components",
      freeNote: "Free to start. No credit card required.",
      checks: [
        "Better Auth + magic links",
        "Stripe & LemonSqueezy",
        "55+ components",
      ],
    },
    footer: {
      builtWith: "Built with Next.js, Supabase, and Stripe.",
      rights: "All rights reserved.",
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Simple pricing. No surprises.",
      subtitle:
        "One plan with everything you need to ship a real SaaS. Free to start — upgrade when you outgrow the free tier.",
      free: {
        name: "Free",
        description: "Try the template and build your first project.",
        period: "/forever",
        features: [
          "Full source code",
          "Local development setup",
          "Documentation and examples",
          "Community support",
        ],
        cta: "Get started",
      },
      popularBadge: "Most popular",
      choosePrefix: "Choose",
      includes: {
        title: "Every plan includes",
        subtitle:
          "One source of truth — every plan unlocks the full template and the complete component library. The only difference is how much you pay for it.",
        items: [
          "Supabase Auth — email, magic links, Google",
          "Stripe + LemonSqueezy checkout behind one switch",
          "10 branded transactional email templates",
          "Dashboard, blog, docs, and 55+ components",
          "Rate limiting, retry-safe webhooks, and fail-fast env validation",
          "SEO: metadata, sitemap, robots, JSON-LD",
        ],
      },
      contact: {
        text: "Need a custom plan or have questions?",
        link: "Get in touch",
      },
    },
    auth: {
      login: {
        title: "Sign in",
        subtitle:
          "Use your email and password, or get a magic link sent to your inbox.",
        footerText: "Don't have an account?",
        footerLink: "Create one",
        modePassword: "Password",
        modeMagic: "Magic link",
        emailLabel: "Email",
        passwordLabel: "Password",
        magicNote: "We'll email you a one-time sign-in link.",
        submit: "Sign in",
        submitting: "Signing in...",
        magicSubmit: "Send magic link",
        magicSending: "Sending...",
        forgot: "Forgot your password?",
        or: "Or",
        google: "Continue with Google",
        success: "Login successful! Redirecting...",
        magicSent: "Magic link sent! Check your email to complete the login.",
        notVerified:
          "Your email hasn't been verified yet. Check your inbox for the verification link, or resend it below.",
        resend: "Resend verification email",
        verificationSent: "Verification email sent! Check your inbox.",
        invalidCredentials: "Failed to login. Please check your credentials.",
        magicError: "Failed to send magic link. Please try again.",
        googleError: "Failed to login with Google.",
        unexpected: "An unexpected error occurred. Please try again.",
        resendError: "Failed to resend the email.",
      },
      register: {
        title: "Create your account",
        subtitle: "Free to start. No credit card required.",
        nameLabel: "Full name",
        emailLabel: "Email",
        passwordLabel: "Password",
        confirmLabel: "Confirm password",
        mismatch: "Passwords do not match",
        passwordHelper:
          "At least 8 characters with uppercase, lowercase, and a number.",
        submit: "Create account",
        submitting: "Creating account...",
        footerText: "Already have an account?",
        footerLink: "Sign in",
        success:
          "Account created! Check your inbox — click the verification link to activate your account.",
        alreadyRegistered:
          "This email is already registered. Please sign in instead.",
        weakPassword: "Password is too weak. Please choose a stronger one.",
        unexpected: "Registration failed. Please try again.",
      },
      forgot: {
        title: "Forgot your password?",
        subtitle:
          "Enter your email and we'll send you a link to choose a new password.",
        emailLabel: "Email",
        submit: "Send reset link",
        sending: "Sending...",
        failed: "Failed to send reset email. Please try again.",
        success:
          "If an account exists for that email, a reset link is on its way. Check your inbox.",
        footerText: "Remembered it?",
        footerLink: "Back to sign in",
        unexpected: "An unexpected error occurred. Please try again.",
      },
      reset: {
        title: "Set a new password",
        subtitle:
          "Choose a new password for your account. Use at least 8 characters.",
        newLabel: "New password",
        confirmLabel: "Confirm new password",
        submit: "Update password",
        submitting: "Updating...",
        success: "Password updated. Redirecting to your dashboard...",
        expiredTitle: "Reset link expired",
        expiredSubtitle:
          "This reset link is missing its token or is no longer valid. Request a new one and try again.",
        expiredCta: "Send another reset link",
        footerLink: "Back to sign in",
        minLength: "Password must be at least 8 characters.",
        mismatch: "Passwords do not match.",
        missingToken: "Missing reset token. Request a new reset link.",
        invalidLink:
          "This reset link is invalid or has expired. Request a new one.",
        unexpected: "An unexpected error occurred. Please try again.",
      },
    },
    blog: {
      navBlog: "Blog",
      navComponents: "Components",
      navDocs: "Docs",
      getStarted: "Get started",
    },
    docs: {
      backHome: "Back to home",
      eyebrow: "Documentation",
    },
    sections: {
      features: {
        eyebrow: "Features",
        title: "The boring infrastructure, handled.",
        subtitle:
          "Every feature ships with real implementation, not a stub. Delete what you don't need; keep what you do.",
        items: [
          {
            title: "Auth & sessions",
            description:
              "Supabase Auth with email, magic links, and Google. Server-side session handling, protected routes, and a typed user model.",
          },
          {
            title: "Stripe & LemonSqueezy",
            description:
              "Unified checkout behind a single switch. Subscriptions, one-time payments, webhooks, and a billing portal that just works.",
          },
          {
            title: "Postgres + Drizzle",
            description:
              "Strict types from schema to query. RLS policies that planners hoist, migrations you can read.",
          },
          {
            title: "Transactional email",
            description:
              "Mailgun with DKIM, DMARC, and SPF. Welcome, password reset, payment, and subscription lifecycle templates included.",
          },
          {
            title: "SEO baked in",
            description:
              "Per-page metadata, OpenGraph, Twitter cards, sitemap, robots, and JSON-LD structured data on every public route.",
          },
          {
            title: "Theme system",
            description:
              "24 theme presets, light and dark, every value a CSS variable. Switch with a single prop — no rebuilds.",
          },
          {
            title: "TypeScript strict",
            description:
              "strict mode on, end-to-end. No `any` in the public surface, ESLint clean, every prop documented.",
          },
          {
            title: "Hardened by default",
            description:
              "Idempotent webhooks, signature verification, rate limiting, PII redaction, and an opt-in observability shim.",
          },
        ],
        note: "Built on Next.js 16, React 19, Tailwind 3, Radix UI, and TanStack Query 5.",
      },
      socialProof: {
        stats: [
          {
            value: "55+",
            label: "components",
            note: "ready to copy & customize",
          },
          {
            value: "24",
            label: "themes",
            note: "light + dark, all CSS variables",
          },
          {
            value: "2",
            label: "payment providers",
            note: "Stripe + LemonSqueezy",
          },
          {
            value: "10",
            label: "email templates",
            note: "branded via env vars",
          },
        ],
      },
      techStack: {
        eyebrow: "Stack",
        title: "Boring, deliberate choices.",
        subtitle:
          "Tools picked for stability and the developer experience. Nothing here is a fad.",
        groups: [
          {
            category: "Frontend",
            items: [
              {
                name: "Next.js 16",
                note: "App Router, Turbopack, Server Actions",
              },
              { name: "React 19", note: "Server Components by default" },
              {
                name: "TypeScript",
                note: "strict mode with explicit integration boundaries",
              },
              {
                name: "Tailwind CSS",
                note: "CSS-variable tokens, no inline colors",
              },
              {
                name: "Radix UI",
                note: "Headless primitives, fully accessible",
              },
              {
                name: "TanStack Query",
                note: "Server-state cache, devtools in dev",
              },
            ],
          },
          {
            category: "Backend",
            items: [
              {
                name: "Supabase",
                note: "Auth, Postgres, RLS, and session management",
              },
              { name: "Drizzle ORM", note: "Schema → types → queries" },
              {
                name: "Next.js Route Handlers",
                note: "Typed, rate-limited, signed",
              },
            ],
          },
          {
            category: "Payments",
            items: [
              {
                name: "Stripe",
                note: "Subscriptions, portal, signed retry-safe webhooks",
              },
              {
                name: "LemonSqueezy",
                note: "Alternative provider behind the same plan API",
              },
            ],
          },
          {
            category: "Infra",
            items: [
              {
                name: "Mailgun",
                note: "Transactional email, delivery hooks, DNS checklist",
              },
              { name: "Docker", note: "Dev + production compose files" },
              {
                name: "PostHog + Sentry",
                note: "Opt-in shim, no SDK at install",
              },
            ],
          },
        ],
      },
      testimonials: {
        eyebrow: "Why developers pick it",
        title: "Built for the part everyone dreads.",
        subtitle:
          'The integrations, the mistakes we\'ve already made, the "oh, I forgot about that" problems — solved so you can focus on your product.',
        items: [
          {
            quote:
              "Auth, checkout, emails, a dashboard — all wired and type-safe from day one. I deleted more placeholder code than I wrote.",
            name: "Maya R.",
            role: "Indie founder",
          },
          {
            quote:
              "The webhook handling is the part that impressed me. Signed, retry-safe, and idempotent — every provider nailed.",
            name: "Diego S.",
            role: "Full-stack engineer",
          },
          {
            quote:
              "Swapped from Stripe to LemonSqueezy behind one environment flag. That single switch saved me a weekend of yak-shaving.",
            name: "Priya K.",
            role: "Product developer",
          },
        ],
      },
      faq: {
        eyebrow: "FAQ",
        title: "Questions, answered.",
        items: [
          {
            q: "What does the template include?",
            a: "A Next.js 16 app with Supabase auth, Stripe and LemonSqueezy payments behind a unified plan-based checkout, Mailgun email, a dashboard, a markdown blog, in-app docs, and a 55-component playground. You still configure the providers and build your product domain model.",
          },
          {
            q: "Do I need to use the same providers?",
            a: "No. Supabase, Stripe, and Mailgun are the defaults because they cover the most ground with the least ceremony, but every integration is in a single module. Swap any of them without rewriting the app.",
          },
          {
            q: "Is the code production-ready?",
            a: "It is a production-minded foundation, not a finished product. It includes lazy server clients, signed retry-safe webhook processing, rate limiting on key mutations, PII redaction, and hardened middleware. Add your provider credentials, migrations, tests, and production rate-limit store before launch.",
          },
          {
            q: "What about subscriptions and the billing portal?",
            a: "Subscriptions are modeled in the database with the correct status fields. Stripe's hosted billing portal is one POST away. LemonSqueezy uses its own customer portal. Refunds and cancellations are handled.",
          },
          {
            q: "How is the codebase organized?",
            a: "App Router with server components by default, a thin client layer for the few things that need state, Drizzle for the database, and helpers in src/db/queries.ts so retries are safe. AGENTS.md documents the conventions.",
          },
          {
            q: "Can I deploy this for free?",
            a: "Yes. Vercel is the shortest path, and the repository includes npm-based Docker development and production compose files for self-hosting. Netlify and Cloudflare Pages are not the primary supported targets.",
          },
          {
            q: "How do I add observability?",
            a: "Set NEXT_PUBLIC_POSTHOG_KEY for analytics or SENTRY_DSN for errors, then npm install the matching package. The observability shim is a no-op until both are present. See /docs/observability.",
          },
          {
            q: "What about theming?",
            a: "Every color is a CSS variable on :root. There are 24 presets and dark mode is automatic. Switch themes from the navbar — no rebuild.",
          },
        ],
      },
      cta: {
        title: "Start in minutes, ship in days.",
        subtitle:
          "Clone the repo, fill in your env, run the dev server. You'll have a working SaaS in front of you before the install finishes.",
        ctaPrimary: "Create an account",
        ctaSecondary: "Read the docs",
      },
    },
  },
  es: {
    nav: {
      features: "Características",
      stack: "Stack",
      faq: "FAQ",
      blog: "Blog",
      docs: "Documentación",
      signIn: "Iniciar sesión",
      getStarted: "Comenzar",
    },
    hero: {
      badge: "Next.js 16 · Supabase · Postgres + RLS",
      title: "Una plantilla premium de Next.js para lanzar tu SaaS más rápido.",
      subtitle:
        "Supabase Auth sobre Postgres con seguridad a nivel de fila, pagos con Stripe y LemonSqueezy, email con Mailgun y un dashboard real. Código listo para producción, tipos de extremo a extremo y la arquitectura que la mayoría de las plantillas te obligan a construir.",
      ctaPrimary: "Crear cuenta",
      ctaSecondary: "Ver componentes",
      freeNote: "Gratis para empezar. Sin tarjeta de crédito.",
      checks: [
        "Better Auth + enlaces mágicos",
        "Stripe y LemonSqueezy",
        "Más de 55 componentes",
      ],
    },
    footer: {
      builtWith: "Construido con Next.js, Supabase y Stripe.",
      rights: "Todos los derechos reservados.",
    },
    pricing: {
      eyebrow: "Precios",
      title: "Precios simples. Sin sorpresas.",
      subtitle:
        "Un plan con todo lo que necesitas para lanzar un SaaS real. Gratis para empezar — mejora cuando superes el nivel gratuito.",
      free: {
        name: "Gratis",
        description: "Prueba la plantilla y construye tu primer proyecto.",
        period: "/para siempre",
        features: [
          "Código fuente completo",
          "Configuración de desarrollo local",
          "Documentación y ejemplos",
          "Soporte de la comunidad",
        ],
        cta: "Comenzar",
      },
      popularBadge: "El más popular",
      choosePrefix: "Elegir",
      includes: {
        title: "Cada plan incluye",
        subtitle:
          "Una única fuente de verdad — cada plan desbloquea la plantilla completa y la librería de componentes entera. La única diferencia es cuánto pagas por ella.",
        items: [
          "Supabase Auth: email, enlaces mágicos y Google",
          "Checkout con Stripe + LemonSqueezy tras un solo interruptor",
          "10 plantillas de email con tu marca",
          "Dashboard, blog, documentación y más de 55 componentes",
          "Rate limiting, webhooks con reintentos seguros y validación de entorno",
          "SEO: metadatos, sitemap, robots, JSON-LD",
        ],
      },
      contact: {
        text: "¿Necesitas un plan personalizado o tienes dudas?",
        link: "Escríbenos",
      },
    },
    auth: {
      login: {
        title: "Iniciar sesión",
        subtitle:
          "Usa tu email y contraseña, o recibe un enlace mágico en tu bandeja.",
        footerText: "¿No tienes cuenta?",
        footerLink: "Crea una",
        modePassword: "Contraseña",
        modeMagic: "Enlace mágico",
        emailLabel: "Email",
        passwordLabel: "Contraseña",
        magicNote: "Te enviaremos un enlace de un solo uso por email.",
        submit: "Iniciar sesión",
        submitting: "Iniciando...",
        magicSubmit: "Enviar enlace mágico",
        magicSending: "Enviando...",
        forgot: "¿Olvidaste tu contraseña?",
        or: "O",
        google: "Continuar con Google",
        success: "¡Sesión iniciada! Redirigiendo...",
        magicSent:
          "¡Enlace mágico enviado! Revisa tu email para completar el acceso.",
        notVerified:
          "Tu email aún no está verificado. Revisa tu bandeja para el enlace de verificación, o reenvíalo abajo.",
        resend: "Reenviar email de verificación",
        verificationSent: "¡Email de verificación enviado! Revisa tu bandeja.",
        invalidCredentials:
          "No se pudo iniciar sesión. Revisa tus credenciales.",
        magicError: "No se pudo enviar el enlace mágico. Inténtalo de nuevo.",
        googleError: "No se pudo iniciar sesión con Google.",
        unexpected: "Ocurrió un error inesperado. Inténtalo de nuevo.",
        resendError: "No se pudo reenviar el email.",
      },
      register: {
        title: "Crea tu cuenta",
        subtitle: "Gratis para empezar. Sin tarjeta de crédito.",
        nameLabel: "Nombre completo",
        emailLabel: "Email",
        passwordLabel: "Contraseña",
        confirmLabel: "Confirma la contraseña",
        mismatch: "Las contraseñas no coinciden",
        passwordHelper:
          "Al menos 8 caracteres con mayúsculas, minúsculas y un número.",
        submit: "Crear cuenta",
        submitting: "Creando cuenta...",
        footerText: "¿Ya tienes cuenta?",
        footerLink: "Inicia sesión",
        success:
          "¡Cuenta creada! Revisa tu bandeja: haz clic en el enlace de verificación para activarla.",
        alreadyRegistered:
          "Este email ya está registrado. Inicia sesión en su lugar.",
        weakPassword: "La contraseña es demasiado débil. Elige una más fuerte.",
        unexpected: "No se pudo registrar. Inténtalo de nuevo.",
      },
      forgot: {
        title: "¿Olvidaste tu contraseña?",
        subtitle:
          "Introduce tu email y te enviaremos un enlace para elegir una nueva contraseña.",
        emailLabel: "Email",
        submit: "Enviar enlace",
        sending: "Enviando...",
        failed: "No se pudo enviar el email. Inténtalo de nuevo.",
        success:
          "Si existe una cuenta con ese email, el enlace está en camino. Revisa tu bandeja.",
        footerText: "¿La recordaste?",
        footerLink: "Volver a iniciar sesión",
        unexpected: "Ocurrió un error inesperado. Inténtalo de nuevo.",
      },
      reset: {
        title: "Elige una nueva contraseña",
        subtitle:
          "Elige una nueva contraseña para tu cuenta. Usa al menos 8 caracteres.",
        newLabel: "Nueva contraseña",
        confirmLabel: "Confirma la nueva contraseña",
        submit: "Actualizar contraseña",
        submitting: "Actualizando...",
        success: "Contraseña actualizada. Redirigiendo a tu dashboard...",
        expiredTitle: "Enlace caducado",
        expiredSubtitle:
          "A este enlace le falta el token o ya no es válido. Solicita uno nuevo e inténtalo de nuevo.",
        expiredCta: "Enviar otro enlace",
        footerLink: "Volver a iniciar sesión",
        minLength: "La contraseña debe tener al menos 8 caracteres.",
        mismatch: "Las contraseñas no coinciden.",
        missingToken: "Falta el token. Solicita un nuevo enlace.",
        invalidLink:
          "Este enlace no es válido o ha caducado. Solicita uno nuevo.",
        unexpected: "Ocurrió un error inesperado. Inténtalo de nuevo.",
      },
    },
    blog: {
      navBlog: "Blog",
      navComponents: "Componentes",
      navDocs: "Documentación",
      getStarted: "Comenzar",
    },
    docs: {
      backHome: "Volver al inicio",
      eyebrow: "Documentación",
    },
    sections: {
      features: {
        eyebrow: "Características",
        title: "La infraestructura aburrida, resuelta.",
        subtitle:
          "Cada característica incluye una implementación real, no un stub. Elimina lo que no necesites; conserva lo que sí.",
        items: [
          {
            title: "Auth y sesiones",
            description:
              "Supabase Auth con email, enlaces mágicos y Google. Gestión de sesiones en el servidor, rutas protegidas y un modelo de usuario tipado.",
          },
          {
            title: "Stripe y LemonSqueezy",
            description:
              "Checkout unificado tras un solo interruptor. Suscripciones, pagos únicos, webhooks y un portal de facturación que funciona.",
          },
          {
            title: "Postgres + Drizzle",
            description:
              "Tipos estrictos del esquema a la consulta. Políticas RLS que el planificador optimiza y migraciones que puedes leer.",
          },
          {
            title: "Email transaccional",
            description:
              "Mailgun con DKIM, DMARC y SPF. Incluye plantillas de bienvenida, restablecimiento de contraseña, pagos y ciclo de vida de suscripción.",
          },
          {
            title: "SEO integrado",
            description:
              "Metadatos por página, OpenGraph, Twitter cards, sitemap, robots y datos estructurados JSON-LD en cada ruta pública.",
          },
          {
            title: "Sistema de temas",
            description:
              "24 temas predefinidos, claro y oscuro, todo con variables CSS. Cambia de tema con una prop, sin recompilar.",
          },
          {
            title: "TypeScript estricto",
            description:
              "Modo strict de principio a fin. Sin `any` en la superficie pública, ESLint limpio y cada prop documentada.",
          },
          {
            title: "Endurecido por defecto",
            description:
              "Webhooks idempotentes, verificación de firmas, rate limiting, redacción de PII y un shim opcional de observabilidad.",
          },
        ],
        note: "Construido sobre Next.js 16, React 19, Tailwind 3, Radix UI y TanStack Query 5.",
      },
      socialProof: {
        stats: [
          {
            value: "55+",
            label: "componentes",
            note: "listos para copiar y personalizar",
          },
          {
            value: "24",
            label: "temas",
            note: "claro + oscuro, todo con variables CSS",
          },
          {
            value: "2",
            label: "pasarelas de pago",
            note: "Stripe + LemonSqueezy",
          },
          {
            value: "10",
            label: "plantillas de email",
            note: "personalizables por variables de entorno",
          },
        ],
      },
      techStack: {
        eyebrow: "Stack",
        title: "Decisiones aburridas y deliberadas.",
        subtitle:
          "Herramientas elegidas por estabilidad y experiencia de desarrollo. Nada de modas.",
        groups: [
          {
            category: "Frontend",
            items: [
              {
                name: "Next.js 16",
                note: "App Router, Turbopack, Server Actions",
              },
              { name: "React 19", note: "Server Components por defecto" },
              {
                name: "TypeScript",
                note: "modo strict con límites de integración explícitos",
              },
              {
                name: "Tailwind CSS",
                note: "tokens con variables CSS, sin colores inline",
              },
              {
                name: "Radix UI",
                note: "primitivas headless, totalmente accesibles",
              },
              {
                name: "TanStack Query",
                note: "caché de estado de servidor, devtools en desarrollo",
              },
            ],
          },
          {
            category: "Backend",
            items: [
              {
                name: "Supabase",
                note: "Auth, Postgres, RLS y gestión de sesiones",
              },
              { name: "Drizzle ORM", note: "Esquema → tipos → consultas" },
              {
                name: "Route Handlers de Next.js",
                note: "Tipados, con rate limiting y firmas",
              },
            ],
          },
          {
            category: "Pagos",
            items: [
              {
                name: "Stripe",
                note: "Suscripciones, portal, webhooks firmados y reintentos seguros",
              },
              {
                name: "LemonSqueezy",
                note: "Proveedor alternativo tras la misma API de planes",
              },
            ],
          },
          {
            category: "Infraestructura",
            items: [
              {
                name: "Mailgun",
                note: "Email transaccional, hooks de entrega, checklist de DNS",
              },
              {
                name: "Docker",
                note: "Archivos compose para desarrollo y producción",
              },
              {
                name: "PostHog + Sentry",
                note: "Shim opcional, sin SDK en la instalación",
              },
            ],
          },
        ],
      },
      testimonials: {
        eyebrow: "Por qué lo eligen los desarrolladores",
        title: "Hecho para la parte que todos temen.",
        subtitle:
          "Las integraciones, los errores que ya cometimos y los problemas de «esto también había que hacerlo» — resueltos para que te concentres en tu producto.",
        items: [
          {
            quote:
              "Auth, checkout, emails y un dashboard, todo conectado y tipado desde el primer día. Borré más código de relleno del que escribí.",
            name: "Maya R.",
            role: "Fundadora indie",
          },
          {
            quote:
              "La gestión de webhooks es lo que más me impresionó. Firmados, con reintentos seguros e idempotentes, en todos los proveedores.",
            name: "Diego S.",
            role: "Ingeniero full-stack",
          },
          {
            quote:
              "Cambié de Stripe a LemonSqueezy con una variable de entorno. Ese interruptor me ahorró un fin de semana entero.",
            name: "Priya K.",
            role: "Desarrolladora de producto",
          },
        ],
      },
      faq: {
        eyebrow: "FAQ",
        title: "Preguntas, respondidas.",
        items: [
          {
            q: "¿Qué incluye la plantilla?",
            a: "Una app Next.js 16 con Supabase Auth (email, enlaces mágicos, Google), pagos con Stripe y LemonSqueezy tras un checkout unificado por planes, email con Mailgun, un dashboard, un blog en markdown, documentación integrada y un playground de 55 componentes. Tú configuras los proveedores y construyes tu modelo de dominio.",
          },
          {
            q: "¿Tengo que usar los mismos proveedores?",
            a: "No. Supabase, Stripe y Mailgun son los valores por defecto porque cubren más terreno con menos ceremonia, pero cada integración vive en un único módulo. Cambia cualquiera sin reescribir la app.",
          },
          {
            q: "¿El código está listo para producción?",
            a: "Es una base pensada para producción, no un producto terminado. Incluye clientes de servidor perezosos, procesamiento de webhooks firmado y seguro ante reintentos, rate limiting en las mutaciones clave, redacción de PII y middleware endurecido. Añade tus credenciales, migraciones, tests y un almacén de rate limiting para producción antes de lanzar.",
          },
          {
            q: "¿Qué hay de las suscripciones y el portal de facturación?",
            a: "Las suscripciones se modelan en la base de datos con los campos de estado correctos. El portal de facturación de Stripe está a un POST de distancia. LemonSqueezy usa su propio portal de cliente. Reembolsos y cancelaciones están gestionados.",
          },
          {
            q: "¿Cómo está organizado el código?",
            a: "App Router con server components por defecto, una fina capa de cliente para lo que necesita estado, Drizzle para la base de datos y helpers en src/db/queries.ts para que los reintentos sean seguros. AGENTS.md documenta las convenciones.",
          },
          {
            q: "¿Puedo desplegarlo gratis?",
            a: "Sí. Vercel es el camino más corto y el repositorio incluye archivos compose de Docker para desarrollo y producción. Netlify y Cloudflare Pages no son objetivos soportados.",
          },
          {
            q: "¿Cómo añado observabilidad?",
            a: "Configura NEXT_PUBLIC_POSTHOG_KEY para analítica o SENTRY_DSN para errores y luego instala el paquete correspondiente con npm. El shim de observabilidad no hace nada hasta que ambos estén presentes. Ver /docs/observability.",
          },
          {
            q: "¿Y los temas?",
            a: "Cada color es una variable CSS en :root. Hay 24 predefinidos y el modo oscuro es automático. Cambia de tema desde la navbar, sin recompilar.",
          },
        ],
      },
      cta: {
        title: "Empieza en minutos, lanza en días.",
        subtitle:
          "Clona el repo, rellena tu entorno y arranca el servidor. Tendrás un SaaS funcionando ante ti antes de que termine la instalación.",
        ctaPrimary: "Crear cuenta",
        ctaSecondary: "Leer la documentación",
      },
    },
  },
};

let listeners: Array<() => void> = [];

function subscribe(listener: () => void) {
  listeners.push(listener);
  // Keep other tabs in sync when the locale changes elsewhere.
  window.addEventListener("storage", listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): Locale {
  return window.localStorage.getItem(STORAGE_KEY) === "es" ? "es" : "en";
}

function getServerSnapshot(): Locale {
  return "en";
}

/** Persist the choice, update <html lang>, and notify every consumer. */
export function setLocale(next: Locale) {
  window.localStorage.setItem(STORAGE_KEY, next);
  document.documentElement.lang = next;
  for (const listener of listeners) listener();
}

const LocaleContext = React.createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
} | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = React.useMemo(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useI18n() {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useI18n must be used within <LocaleProvider>");
  }
  return ctx;
}
