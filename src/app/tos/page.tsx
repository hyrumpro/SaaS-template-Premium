import { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "Terms of service for ShipSaaS, the premium Next.js SaaS template. Replace this boilerplate with your own terms before going to production.",
};

const TOS = () => {
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
        <h1 className="text-display mt-2">Terms of Service</h1>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          Placeholder boilerplate. Replace with your own terms reviewed by
          counsel before launch.
        </p>

        <article className="prose mt-10">
          <p className="text-muted-foreground">
            Last updated: {new Date().toISOString().slice(0, 10)}
          </p>

          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to
            and use of the services made available through this website. By
            accessing or using the services, you agree to be bound by these
            Terms. If you do not agree, you may not use the services.
          </p>

          <h2>1. Eligibility</h2>
          <p>
            You must be at least 18 years old (or the age of digital consent in
            your jurisdiction) to use the services. By using the services, you
            represent and warrant that you meet this requirement.
          </p>

          <h2>2. Accounts</h2>
          <p>
            You are responsible for safeguarding your account credentials and
            for all activity that occurs under your account. Notify us
            immediately at the contact address below if you suspect any
            unauthorized access.
          </p>

          <h2>3. Plans and Payment</h2>
          <p>
            Paid plans are billed in advance on a recurring basis (monthly or
            yearly) through our payment processors (Stripe and/or Lemon
            Squeezy). Prices, features, and billing cycles are described on the
            pricing page at the time of purchase. Unless otherwise stated,
            subscriptions automatically renew at the then-current rate until
            canceled.
          </p>

          <h2>4. Cancellation and Refunds</h2>
          <p>
            You may cancel your subscription at any time from your account
            settings; cancellation takes effect at the end of the current
            billing period and we do not pro-rate refunds for partial periods.
            If you experience a chargeback or dispute, please contact us first
            &mdash; we will do our best to resolve the issue.
          </p>

          <h2>5. Acceptable Use</h2>
          <p>
            You agree not to: (a) use the services to violate any applicable law
            or third-party right; (b) upload malicious content or attempt to
            disrupt the services; (c) reverse engineer, decompile, or otherwise
            attempt to derive source code from the services except as permitted
            by law; or (d) resell or sublicense access to the services without
            our written permission.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            The services, including all underlying software, designs, and
            content, are owned by us or our licensors and are protected by
            copyright and other intellectual-property laws. You retain all
            rights to the content you upload to the services.
          </p>

          <h2>7. Termination</h2>
          <p>
            We may suspend or terminate your access to the services at any time,
            with or without cause, with notice. Upon termination, your right to
            use the services ceases immediately.
          </p>

          <h2>8. Disclaimers and Limitation of Liability</h2>
          <p>
            The services are provided &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; without warranties of any kind, express or implied,
            including warranties of merchantability, fitness for a particular
            purpose, and non-infringement. To the maximum extent permitted by
            law, our aggregate liability arising out of or relating to these
            Terms will not exceed the amounts you paid us in the twelve (12)
            months preceding the event giving rise to the liability.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the jurisdiction in which
            our company is registered, without regard to conflict-of-laws
            principles. Any dispute will be resolved exclusively in the courts
            located in that jurisdiction.
          </p>

          <h2>10. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. The &ldquo;Last
            updated&rdquo; date above will reflect the date of the most recent
            change. Continued use of the services after changes take effect
            constitutes your acceptance of the revised Terms.
          </p>

          <h2>11. Contact</h2>
          <p>
            If you have any questions about these Terms, please contact us at
            the email address listed on our home page.
          </p>

          <p>
            See also our <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>
        </article>
      </main>
    </div>
  );
};

export default TOS;
