"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

export function BlogNavbar() {
  const { t } = useI18n();

  const navLinks = [
    { label: t.blog.navBlog, href: "/blog" },
    { label: t.blog.navComponents, href: "/playground" },
    { label: t.blog.navDocs, href: "/docs" },
  ];

  return (
    <header className="border-border bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="ShipSaaS home">
          <Logo />
        </Link>
        <nav aria-label="Blog" className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/auth/register"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors"
          >
            {t.blog.getStarted}
          </Link>
        </div>
      </div>
    </header>
  );
}
