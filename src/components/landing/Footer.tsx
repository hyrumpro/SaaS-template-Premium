import Link from "next/link";
import { Logo } from "@/components/Logo";
import { FooterLegal } from "@/components/landing/FooterLegal";

const groups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Stack", href: "/#stack" },
      { label: "FAQ", href: "/#faq" },
      { label: "Playground", href: "/playground" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Sign in", href: "/auth/login" },
      { label: "Create account", href: "/auth/register" },
      { label: "Contact", href: "mailto:hello@shipsaas.dev" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy-policy" },
      { label: "Terms", href: "/tos" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="border-border bg-background border-t">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Logo />
            <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-relaxed">
              A premium Next.js 16 template for shipping your SaaS faster.
            </p>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-foreground text-xs font-semibold tracking-wider uppercase">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-border mt-12 flex flex-col items-start justify-between gap-4 border-t pt-6 text-sm md:flex-row md:items-center">
          <FooterLegal />
        </div>
      </div>
    </footer>
  );
};
