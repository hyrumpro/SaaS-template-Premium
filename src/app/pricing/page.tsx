import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FAQ } from "@/components/landing/FAQ";
import { PricingBody } from "@/components/landing/PricingBody";
import { pricingPlans } from "@/config/payments";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple pricing for ShipSaaS. One plan, all features, lifetime access. Free to start, no credit card required.",
};

export default function PricingPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <PricingBody plans={pricingPlans} />
      <FAQ />
      <Footer />
    </div>
  );
}
