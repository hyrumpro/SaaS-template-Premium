"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

/**
 * Quiet testimonial cards. No marquee, no loud branding — just three
 * cards that rise in on scroll. `prefers-reduced-motion` honored globally.
 */
export const Testimonials = () => {
  const { t } = useI18n();
  const { testimonials } = t.sections;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="border-border border-t"
    >
      <div className="section">
        <div className="max-w-2xl">
          <p className="eyebrow">{testimonials.eyebrow}</p>
          <h2
            id="testimonials-heading"
            className="text-display mt-3 text-balance"
          >
            {testimonials.title}
          </h2>
          <p className="text-foreground/70 mt-4 text-base leading-relaxed md:text-lg">
            {testimonials.subtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.items.map((item, i) => (
            <motion.figure
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="border-border bg-card flex flex-col justify-between rounded-lg border p-6"
            >
              <blockquote className="text-foreground/85 text-sm leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="bg-foreground text-background inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold">
                  {item.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span>
                  <span className="text-foreground block text-sm font-medium">
                    {item.name}
                  </span>
                  <span className="text-muted-foreground block text-xs">
                    {item.role}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};
