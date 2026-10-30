"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  User,
  CreditCard,
  Activity,
  AlertTriangle,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth, useSignOut } from "@/hooks/useAuth";
import { initialsFromName } from "@/lib/format";

type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  {
    href: "/dashboard",
    label: "Overview",
    description: "Account snapshot",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    description: "Personal information",
    icon: User,
  },
  {
    href: "/dashboard/billing",
    label: "Billing",
    description: "Plan, invoices, payment",
    icon: CreditCard,
  },
  {
    href: "/dashboard/activity",
    label: "Activity",
    description: "Recent payments and events",
    icon: Activity,
  },
];

const DANGER_ITEM: NavItem = {
  href: "/dashboard/settings/danger",
  label: "Danger zone",
  description: "Delete account and data",
  icon: AlertTriangle,
};

export function DashboardSidebar({
  mobileOpen,
  onMobileClose,
}: {
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const pathname = usePathname();
  const { data: user } = useAuth();
  const signOut = useSignOut();

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={onMobileClose}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-200 lg:translate-x-0 lg:z-auto lg:w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold tracking-tight"
            onClick={onMobileClose}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <span>ShipSaaS</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden -mr-2 text-muted-foreground"
            onClick={onMobileClose}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="border-b border-sidebar-border p-3">
          <Link
            href="/"
            className="group flex items-center justify-between rounded-md px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <span>Back to site</span>
            <ExternalLink className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <p className="px-3 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Account
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <SidebarLink
                  item={item}
                  active={isActive(pathname, item.href, item.exact)}
                  onClick={onMobileClose}
                />
              </li>
            ))}
          </ul>

          <p className="mt-6 px-3 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-wider text-destructive/70">
            Danger zone
          </p>
          <ul>
            <li>
              <SidebarLink
                item={DANGER_ITEM}
                active={isActive(pathname, DANGER_ITEM.href, DANGER_ITEM.exact)}
                onClick={onMobileClose}
                danger
              />
            </li>
          </ul>
        </nav>

        <div className="border-t border-sidebar-border p-3">
          {user && (
            <div className="mb-3 flex items-center gap-3 rounded-md p-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {initialsFromName(
                  (user.user_metadata?.full_name as string | undefined) ?? null,
                  (user.email?.[0] ?? "?").toUpperCase()
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {user.user_metadata?.full_name || "Account"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
          )}
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => signOut.mutate()}
            disabled={signOut.isPending}
          >
            <LogOut className="h-4 w-4" />
            {signOut.isPending ? "Signing out…" : "Sign out"}
          </Button>
        </div>
      </aside>
    </>
  );
}

function SidebarLink({
  item,
  active,
  onClick,
  danger,
}: {
  item: NavItem;
  active: boolean;
  onClick: () => void;
  danger?: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        active
          ? danger
            ? "bg-destructive/10 text-destructive"
            : "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
        danger && !active && "text-destructive/80 hover:text-destructive"
      )}
    >
      {active && !danger && (
        <motion.span
          layoutId="sidebar-active"
          className="absolute inset-y-1.5 left-0 w-0.5 rounded-r-full bg-primary"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate font-medium">{item.label}</span>
    </Link>
  );
}

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardMobileHeader({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background px-4 lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={onOpen}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Sparkles className="h-4 w-4" />
        </span>
        <span className="font-bold tracking-tight">ShipSaaS</span>
      </div>
    </div>
  );
}
