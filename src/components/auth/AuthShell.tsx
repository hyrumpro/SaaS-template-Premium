import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";

/**
 * Auth shell — single-column, centered, hairline card.
 * Used by /auth/login, /auth/register, /auth/confirm.
 */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="bg-background min-h-screen">
      <header className="border-border border-b">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
          <Link href="/" aria-label="ShipSaaS home">
            <Logo />
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-col px-6 py-16">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-foreground text-2xl font-semibold tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted-foreground text-sm leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className={cn("mt-8", className)}>{children}</div>

        {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
      </main>
    </div>
  );
}
