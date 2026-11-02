"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeSwitcher } from "@/components/playground/ui/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  HeroGradient,
  HeroFloating,
  HeroSplit,
  HeroMinimal,
  Hero3D,
} from "@/components/playground/hero";
import {
  GlassNavbar,
  MinimalNavbar,
  StickyNavbar,
  AnimatedNavbar,
} from "@/components/playground/nav";
import {
  PricingCards,
  PricingComparison,
  PricingToggle,
  PricingSlider,
} from "@/components/playground/pricing";
import {
  ContactForm,
  NewsletterForm,
  WaitlistForm,
  FeedbackForm,
} from "@/components/playground/forms";
import {
  FeatureGrid,
  FeatureCards,
  FeatureComparison,
  FeatureTabs,
} from "@/components/playground/features";
import {
  CTAGradient,
  CTAMinimal,
  CTANewsletter,
  CTASplit,
} from "@/components/playground/cta";
import {
  FAQAccordion,
  FAQSearch,
  FAQTabs,
  FAQCollapsible,
} from "@/components/playground/faq";
import {
  LogoCloud,
  TrustBadges,
  BrandLogos,
  SocialProof,
} from "@/components/playground/social";
import {
  StatCounter,
  StatsProgress,
  StatsGrid,
  StatsComparison,
} from "@/components/playground/stats";
import {
  Timeline,
  TimelineVertical,
  TimelineHorizontal,
  TimelineRoadmap,
} from "@/components/playground/timeline";
import { Code2, ArrowRight } from "lucide-react";

const TestimonialCards = dynamic(() =>
  import("@/components/playground/testimonials").then((m) => m.TestimonialCards)
);
const TestimonialMarquee = dynamic(() =>
  import("@/components/playground/testimonials").then(
    (m) => m.TestimonialMarquee
  )
);
const TestimonialGrid = dynamic(() =>
  import("@/components/playground/testimonials").then((m) => m.TestimonialGrid)
);
const TestimonialSlider = dynamic(() =>
  import("@/components/playground/testimonials").then(
    (m) => m.TestimonialSlider
  )
);

const StatsCards = dynamic(() =>
  import("@/components/playground/dashboard").then((m) => m.StatsCards)
);
const ActivityFeed = dynamic(() =>
  import("@/components/playground/dashboard").then((m) => m.ActivityFeed)
);
const QuickActions = dynamic(() =>
  import("@/components/playground/dashboard").then((m) => m.QuickActions)
);
const RecentActivity = dynamic(() =>
  import("@/components/playground/dashboard").then((m) => m.RecentActivity)
);

const AnimatedBorder = dynamic(() =>
  import("@/components/playground/premium").then((m) => m.AnimatedBorder)
);
const GlassCard = dynamic(() =>
  import("@/components/playground/premium").then((m) => m.GlassCard)
);
const ParallaxCard = dynamic(() =>
  import("@/components/playground/premium").then((m) => m.ParallaxCard)
);
const HolographicCard = dynamic(() =>
  import("@/components/playground/premium").then((m) => m.HolographicCard)
);

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-border bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            aria-label="ShipSaaS home"
            className="hover:opacity-80 transition-opacity"
          >
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                Back to home
              </Link>
            </Button>
            <ThemeSwitcher />
            <LanguageSwitcher />
            <Button asChild size="sm">
              <Link href="/docs">
                <Code2 className="h-3.5 w-3.5" />
                View docs
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="eyebrow">Playground</p>
            <h1 className="text-display-xl mt-2">Component library</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7 md:text-lg">
              Copy, paste, and customize the components on this page. Every
              variant is themeable and production-ready.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary/30 border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
          <Tabs defaultValue="hero" className="w-full">
            <div className="overflow-x-auto pb-4">
              <TabsList
                aria-label="Component categories"
                className="inline-flex w-auto min-w-full justify-start gap-2 mb-12 flex-wrap"
              >
                <TabsTrigger value="hero">Hero</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="cta">CTA</TabsTrigger>
                <TabsTrigger value="testimonials">Reviews</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="stats">Stats</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="forms">Forms</TabsTrigger>
                <TabsTrigger value="nav">Nav</TabsTrigger>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="premium">Premium</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="hero" className="space-y-12">
              <ComponentPreview
                title="Gradient Hero"
                description="Animated gradient mesh background"
              >
                <HeroGradient />
              </ComponentPreview>

              <ComponentPreview
                title="Floating Icons"
                description="3D floating icons animation"
              >
                <HeroFloating />
              </ComponentPreview>

              <ComponentPreview
                title="Split Layout"
                description="Text + visual preview side by side"
              >
                <HeroSplit />
              </ComponentPreview>

              <ComponentPreview
                title="Minimal"
                description="Clean, typography-focused design"
              >
                <HeroMinimal />
              </ComponentPreview>

              <ComponentPreview
                title="3D Effect"
                description="Placeholder for 3D sphere (requires additional deps)"
              >
                <Hero3D />
              </ComponentPreview>
            </TabsContent>

            <TabsContent value="nav" className="space-y-12">
              <ComponentPreview
                title="Glass Navbar"
                description="Apple-style frosted glass navigation"
              >
                <div className="max-w-4xl mx-auto">
                  <GlassNavbar />
                </div>
              </ComponentPreview>

              <ComponentPreview
                title="Minimal Navbar"
                description="Clean navigation with animated underlines"
              >
                <div className="max-w-4xl mx-auto">
                  <MinimalNavbar />
                </div>
              </ComponentPreview>

              <ComponentPreview
                title="Sticky Navbar"
                description="Sticky header with scroll effects and mobile menu"
              >
                <div className="max-w-4xl mx-auto">
                  <StickyNavbar />
                </div>
              </ComponentPreview>

              <ComponentPreview
                title="Animated Navbar"
                description="Animated tab indicator with smooth transitions"
              >
                <div className="max-w-4xl mx-auto">
                  <AnimatedNavbar />
                </div>
              </ComponentPreview>
            </TabsContent>

            <TabsContent value="features" className="space-y-12">
              <ComponentPreview
                title="Feature Grid"
                description="Animated feature showcase with icons and hover effects"
              >
                <FeatureGrid />
              </ComponentPreview>

              <ComponentPreview
                title="Feature Cards"
                description="Hover effects with gradient accents"
              >
                <FeatureCards />
              </ComponentPreview>

              <ComponentPreview
                title="Feature Comparison"
                description="Side-by-side plan comparison table"
              >
                <FeatureComparison />
              </ComponentPreview>

              <ComponentPreview
                title="Feature Tabs"
                description="Tabbed interface with images and benefits"
              >
                <FeatureTabs />
              </ComponentPreview>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-12">
              <ComponentPreview
                title="Pricing Cards"
                description="Monthly/yearly toggle with animated prices"
              >
                <PricingCards />
              </ComponentPreview>

              <ComponentPreview
                title="Pricing Comparison"
                description="Feature comparison table with checkmarks"
              >
                <PricingComparison />
              </ComponentPreview>

              <ComponentPreview
                title="Pricing Toggle"
                description="Enhanced pricing cards with icons and gradients"
              >
                <PricingToggle />
              </ComponentPreview>

              <ComponentPreview
                title="Pricing Slider"
                description="Usage-based pricing with interactive slider"
              >
                <PricingSlider />
              </ComponentPreview>
            </TabsContent>

            <TabsContent value="cta" className="space-y-12">
              <ComponentPreview
                title="Gradient CTA"
                description="Eye-catching gradient background with animated elements"
              >
                <CTAGradient />
              </ComponentPreview>

              <ComponentPreview
                title="Minimal CTA"
                description="Clean, conversion-focused call-to-action"
              >
                <CTAMinimal />
              </ComponentPreview>

              <ComponentPreview
                title="Newsletter CTA"
                description="Email subscription with animated background"
              >
                <CTANewsletter />
              </ComponentPreview>

              <ComponentPreview
                title="Split CTA"
                description="Split layout with benefits and visual"
              >
                <CTASplit />
              </ComponentPreview>
            </TabsContent>

            <TabsContent value="faq" className="space-y-12">
              <ComponentPreview
                title="FAQ Accordion"
                description="Expandable questions with smooth animations"
              >
                <FAQAccordion />
              </ComponentPreview>

              <ComponentPreview
                title="FAQ Search"
                description="Searchable FAQ with categories"
              >
                <FAQSearch />
              </ComponentPreview>

              <ComponentPreview
                title="FAQ Tabs"
                description="Tabbed FAQ by category"
              >
                <FAQTabs />
              </ComponentPreview>

              <ComponentPreview
                title="FAQ Collapsible"
                description="Simple collapsible with plus/minus icons"
              >
                <FAQCollapsible />
              </ComponentPreview>
            </TabsContent>

            <TabsContent value="stats" className="space-y-12">
              <ComponentPreview
                title="Animated Counters"
                description="Number counters with smooth animations"
              >
                <StatCounter />
              </ComponentPreview>

              <ComponentPreview
                title="Stats Progress"
                description="Progress bars with goals and percentages"
              >
                <StatsProgress />
              </ComponentPreview>

              <ComponentPreview
                title="Stats Grid"
                description="Metric cards with icons and trend indicators"
              >
                <StatsGrid />
              </ComponentPreview>

              <ComponentPreview
                title="Stats Comparison"
                description="Current vs previous period comparison"
              >
                <StatsComparison />
              </ComponentPreview>
            </TabsContent>

            <TabsContent value="social" className="space-y-12">
              <ComponentPreview
                title="Logo Cloud"
                description="Animated customer/partner logos with marquee"
              >
                <LogoCloud />
              </ComponentPreview>

              <ComponentPreview
                title="Trust Badges"
                description="Security and compliance badges"
              >
                <TrustBadges />
              </ComponentPreview>

              <ComponentPreview
                title="Brand Logos"
                description="Grayscale logos with hover color effect"
              >
                <BrandLogos />
              </ComponentPreview>

              <ComponentPreview
                title="Social Proof"
                description="Stats with icons (users, ratings, awards)"
              >
                <SocialProof />
              </ComponentPreview>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-12">
              <ComponentPreview
                title="Basic Timeline"
                description="Simple timeline component"
              >
                <Timeline />
              </ComponentPreview>

              <ComponentPreview
                title="Vertical Timeline"
                description="Vertical timeline with status icons and cards"
              >
                <TimelineVertical />
              </ComponentPreview>

              <ComponentPreview
                title="Horizontal Timeline"
                description="Horizontal roadmap with quarterly milestones"
              >
                <TimelineHorizontal />
              </ComponentPreview>

              <ComponentPreview
                title="Roadmap Timeline"
                description="Detailed roadmap with completed/planned items"
              >
                <TimelineRoadmap />
              </ComponentPreview>
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-12">
              <ComponentPreview
                title="Testimonial Cards"
                description="Customer reviews with star ratings"
              >
                <TestimonialCards />
              </ComponentPreview>

              <ComponentPreview
                title="Testimonial Marquee"
                description="Auto-scrolling testimonials"
              >
                <TestimonialMarquee />
              </ComponentPreview>

              <ComponentPreview
                title="Testimonial Grid"
                description="Grid layout with quote cards"
              >
                <TestimonialGrid />
              </ComponentPreview>

              <ComponentPreview
                title="Testimonial Slider"
                description="Carousel with navigation dots and arrows"
              >
                <TestimonialSlider />
              </ComponentPreview>
            </TabsContent>

            <TabsContent value="forms" className="space-y-12">
              <ComponentPreview
                title="Contact Form"
                description="Animated form with validation"
              >
                <ContactForm />
              </ComponentPreview>

              <ComponentPreview
                title="Newsletter Form"
                description="Email subscription with success state"
              >
                <NewsletterForm />
              </ComponentPreview>

              <ComponentPreview
                title="Waitlist Form"
                description="Waitlist signup with success state and counter"
              >
                <WaitlistForm />
              </ComponentPreview>

              <ComponentPreview
                title="Feedback Form"
                description="Rating and feedback collection with emoji ratings"
              >
                <FeedbackForm />
              </ComponentPreview>
            </TabsContent>

            <TabsContent value="dashboard" className="space-y-12">
              <ComponentPreview
                title="Stats Cards"
                description="Dashboard metrics with trends"
              >
                <StatsCards />
              </ComponentPreview>

              <ComponentPreview
                title="Activity Feed"
                description="Real-time activity timeline"
              >
                <div className="max-w-2xl mx-auto">
                  <ActivityFeed />
                </div>
              </ComponentPreview>

              <ComponentPreview
                title="Quick Actions"
                description="Grid of quick action buttons with icons"
              >
                <QuickActions />
              </ComponentPreview>

              <ComponentPreview
                title="Recent Activity"
                description="Activity feed with avatars and timestamps"
              >
                <div className="max-w-2xl mx-auto">
                  <RecentActivity />
                </div>
              </ComponentPreview>
            </TabsContent>

            <TabsContent value="premium" className="space-y-12">
              <ComponentPreview
                title="Animated Borders"
                description="Cards with animated gradient borders"
              >
                <AnimatedBorder />
              </ComponentPreview>

              <ComponentPreview
                title="Glass Cards"
                description="Premium frosted glass effect cards"
              >
                <GlassCard />
              </ComponentPreview>

              <ComponentPreview
                title="Parallax Card"
                description="3D parallax hover effect with mouse tracking"
              >
                <ParallaxCard />
              </ComponentPreview>

              <ComponentPreview
                title="Holographic Card"
                description="Holographic credit card with shine effect"
              >
                <HolographicCard />
              </ComponentPreview>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
          <div className="hairline rounded-lg p-10 md:p-14">
            <p className="eyebrow">All components ready to use</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Hero sections, pricing tables, testimonials, forms, dashboards,
              and premium effects.
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed md:text-base">
              Every component on this page is themeable. Switch the active theme
              in the header to preview them in any of the 24 presets.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/docs/styling">
                  <Code2 />
                  Theme guide
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/docs">Read the docs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ComponentPreview({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold tracking-tight mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="rounded-lg border border-border bg-card/40 p-8 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
