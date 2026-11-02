"use client";

import { useI18n } from "@/lib/i18n";

export const TechStack = () => {
  const { t } = useI18n();
  const { techStack } = t.sections;

  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="border-border bg-muted/30 border-t"
    >
      <div className="section">
        <div className="max-w-2xl">
          <p className="eyebrow">{techStack.eyebrow}</p>
          <h2 id="stack-heading" className="text-display mt-3 text-balance">
            {techStack.title}
          </h2>
          <p className="text-foreground/70 mt-4 text-base leading-relaxed md:text-lg">
            {techStack.subtitle}
          </p>
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {techStack.groups.map(({ category, items }) => (
            <div key={category}>
              <dt className="text-foreground text-sm font-semibold tracking-tight">
                {category}
              </dt>
              <dd className="mt-4">
                <ul className="divide-border divide-y">
                  {items.map((item) => (
                    <li
                      key={item.name}
                      className="flex flex-col gap-0.5 py-3 first:pt-0"
                    >
                      <span className="text-foreground text-sm font-medium">
                        {item.name}
                      </span>
                      <span className="text-muted-foreground text-xs leading-relaxed">
                        {item.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
