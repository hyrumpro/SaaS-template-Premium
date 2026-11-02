import { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "Privacy policy for ShipSaaS, the premium Next.js SaaS template. Replace this boilerplate with your own policy before going to production.",
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <header className="border-border border-b">
        <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-6">
          <Link href="/" aria-label="ShipSaaS home">
            <Logo />
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20">
        <p className="eyebrow">Legal</p>
        <h1 className="text-display mt-2">Privacy Policy</h1>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          Placeholder boilerplate. Replace with your own privacy policy reviewed
          by counsel before launch.
        </p>

        <article className="prose mt-10">
          <p className="text-muted-foreground">
            Last updated: {new Date().toISOString().slice(0, 10)}
          </p>

          <p>
            This Privacy Policy describes how the operators of this website
            (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collect,
            use, and protect information when you visit or use our services.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            When you create an account, sign up for a paid plan, or contact us,
            we collect information you provide directly, such as your name,
            email address, billing address, and payment information processed by
            our payment providers (Stripe, Lemon Squeezy). We also collect
            standard server logs (IP address, user agent, pages viewed) and use
            cookies and similar technologies for authentication and analytics.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to: provide, maintain, and improve
            our services; process payments and prevent fraud; send transactional
            emails (receipts, account notifications, security alerts); and
            respond to support requests.
          </p>

          <h2>3. Sharing of Information</h2>
          <p>
            We do not sell your personal information. We share data only with
            vetted sub-processors who help us operate the service, including:
            payment processors (Stripe, Lemon Squeezy), database hosting
            (Supabase / Postgres), email delivery (Mailgun), and error
            monitoring. Each sub-processor is contractually obligated to protect
            your data.
          </p>

          <h2>4. Data Retention</h2>
          <p>
            We retain account data for as long as your account is active. We
            delete personal data on request, except where retention is required
            for legal, tax, or accounting purposes.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            Depending on your jurisdiction (GDPR, CCPA, LGPD, etc.) you may have
            the right to access, correct, port, or delete the personal data we
            hold about you. Contact us at the address below to exercise these
            rights.
          </p>

          <h2>6. Security</h2>
          <p>
            We use industry-standard measures (TLS in transit, encryption at
            rest, row-level security in the database, webhook signature
            verification) to protect your data. No method of transmission over
            the Internet, however, is 100% secure.
          </p>

          <h2>7. Children</h2>
          <p>
            Our services are not directed to children under 13 (or under 16 in
            the EEA / UK), and we do not knowingly collect personal data from
            them.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of material changes by email or by posting a notice on our site
            before the change takes effect.
          </p>

          <h2>9. Contact</h2>
          <p>
            If you have questions about this Privacy Policy or our practices,
            please contact us at the email address listed on our home page.
          </p>
        </article>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
