"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

const guides = [
  { href: "/docs/email", title: "Email", desc: "Mailgun + DNS" },
  { href: "/docs/payments", title: "Payments", desc: "Stripe / Lemon Squeezy" },
  { href: "/docs/auth", title: "Authentication", desc: "Magic links + Google" },
  { href: "/docs/database", title: "Database", desc: "Supabase + Drizzle" },
  { href: "/docs/seo", title: "SEO", desc: "Sitemap, robots, JSON-LD" },
  { href: "/docs/styling", title: "Styling", desc: "Themes + dark mode" },
  {
    href: "/docs/observability",
    title: "Observability",
    desc: "PostHog + Sentry",
  },
];

export default function DocsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <div className="min-h-screen">
      <header className="border-border bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
          <Link href="/" aria-label="ShipSaaS home">
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {t.docs.backHome}
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 md:grid-cols-[14rem_1fr] md:gap-12 md:py-16">
        <aside className="md:sticky md:top-24 md:self-start">
          <p className="eyebrow">{t.docs.eyebrow}</p>
          <nav aria-label="Docs" className="mt-4 flex flex-col gap-1">
            {guides.map((g) => {
              const active = pathname === g.href;
              return (
                <Link
                  key={g.href}
                  href={g.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "-mx-3 flex flex-col gap-0.5 rounded-md px-3 py-2 transition-colors",
                    active
                      ? "bg-accent text-foreground"
                      : "hover:bg-accent/60 text-foreground/80"
                  )}
                >
                  <span className="text-sm font-medium">{g.title}</span>
                  <span className="text-muted-foreground text-xs">
                    {g.desc}
                  </span>
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="prose max-w-none">{children}</main>
      </div>
    </div>
  );
}
