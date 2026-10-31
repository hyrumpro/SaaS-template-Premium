"use client";

import { useI18n } from "@/lib/i18n";

/**
 * Translated footer legal lines (copyright + built-with). Client component
 * so the copy follows the navbar language switcher.
 */
export function FooterLegal() {
  const { t } = useI18n();

  return (
    <>
      <p className="text-muted-foreground">
        © {new Date().getFullYear()} ShipSaaS. {t.footer.rights}
      </p>
      <p className="text-muted-foreground">{t.footer.builtWith}</p>
    </>
  );
}
