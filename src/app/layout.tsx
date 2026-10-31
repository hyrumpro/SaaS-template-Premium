import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import type React from "react";
import { cn } from "@/lib/utils";
import { StructuredData } from "@/components/StructuredData";
import { QueryProvider } from "@/providers/QueryProvider";
import { ObservabilityProvider } from "@/providers/ObservabilityProvider";
import { LocaleProvider } from "@/lib/i18n";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "ShipSaaS - Premium Next.js SaaS Template",
    template: "%s | ShipSaaS",
  },
  description:
    "Premium Next.js 16 SaaS foundation with Supabase Auth on Postgres, Stripe and LemonSqueezy payments, Mailgun email, SEO, and a deployment-ready design system.",
  keywords: [
    "saas",
    "boilerplate",
    "template",
    "premium",
    "next.js",
    "supabase",
    "stripe",
    "shipsaas",
    "startup",
    "saas template",
  ],
  authors: [{ name: "ShipSaaS Team" }],
  creator: "ShipSaaS",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "ShipSaaS",
    title: "ShipSaaS - Premium Next.js SaaS Template",
    description:
      "Premium SaaS template. Launch your startup in days, not weeks.",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ShipSaaS - Premium Next.js SaaS Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShipSaaS - Premium Next.js SaaS Template",
    description:
      "Premium SaaS template. Launch your startup in days, not weeks.",
    images: [`${baseUrl}/og-image.png`],
    creator: "@shipsaas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    types: {
      "application/rss+xml": `${baseUrl}/rss.xml`,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "256x256" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f1a" },
  ],
  colorScheme: "light dark",
};

// Organization structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ShipSaaS",
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
  description: "Premium Next.js SaaS template for launching startups quickly",
  sameAs: ["https://twitter.com/shipsaas"],
};

// WebApplication structured data
const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ShipSaaS",
  url: baseUrl,
  description:
    "Premium SaaS template with authentication, payments, and email integration",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  featureList: [
    "User Authentication",
    "Payment Integration",
    "Email Templates",
    "SEO Optimization",
    "Docker Support",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData data={organizationSchema} />
        <StructuredData data={webAppSchema} />
      </head>
      <body className={cn(bricolageGrotesque.className, "antialiased")}>
        <LocaleProvider>
          <QueryProvider>
            <ObservabilityProvider>{children}</ObservabilityProvider>
          </QueryProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
