"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();

  const navLinks = [
    { label: t.nav.features, href: "#features" },
    { label: t.nav.stack, href: "#stack" },
    { label: t.nav.faq, href: "#faq" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.docs, href: "/docs" },
  ];

  return (
    <header className="border-border bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="ShipSaaS home" className="flex items-center">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <Button asChild variant="ghost" size="sm">
            <Link href="/auth/login">{t.nav.signIn}</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/auth/register">{t.nav.getStarted}</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setIsOpen((v) => !v)}
          className="text-foreground -mr-2 inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-md md:hidden"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          className="border-border bg-background border-t md:hidden"
        >
          <nav
            aria-label="Mobile"
            className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-foreground hover:bg-accent rounded-md px-3 py-2 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
              <LanguageSwitcher className="self-start" />
              <Button asChild variant="outline">
                <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                  {t.nav.signIn}
                </Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                  {t.nav.getStarted}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
