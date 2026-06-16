import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n";

export const metadata = { title: "Legal Disclaimer" };

export default function LegalPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  const t = useTranslations("pages");

  return (
    <section className="container max-w-3xl py-12">
      <p className="text-sm uppercase tracking-[0.26em] text-muted-foreground">{t("legalEyebrow")}</p>
      <h1 className="mt-3 font-display text-5xl">{t("legalTitle")}</h1>
      <div className="mt-6 space-y-4 leading-7 text-muted-foreground">
        <p>{t("legalP1")}</p>
        <p>{t("legalP2")}</p>
        <p>{t("legalP3")}</p>
      </div>
    </section>
  );
}
