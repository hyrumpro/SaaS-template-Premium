"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

/**
 * Compact stats / social-proof band. Quiet tokens only; each stat fades in
 * with a tiny rise on scroll. `prefers-reduced-motion` honored globally.
 */
export const SocialProof = () => {
  const { t } = useI18n();
  const { stats } = t.sections.socialProof;

  return (
    <section
      aria-label="Template stats"
      className="border-border bg-muted/30 border-t"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-14 md:py-16">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="text-center lg:text-left"
            >
              <dd className="text-display text-foreground font-semibold tracking-tight">
                {stat.value}
              </dd>
              <dt className="text-foreground mt-1 text-sm font-medium">
                {stat.label}
              </dt>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                {stat.note}
              </p>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
};
