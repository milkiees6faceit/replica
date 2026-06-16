import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  const t = useTranslations("pages");

  return (
    <section className="container max-w-3xl py-12">
      <h1 className="font-display text-5xl">{t("privacyTitle")}</h1>
      <div className="mt-6 space-y-4 leading-7 text-muted-foreground">
        <p>{t("privacyP1")}</p>
        <p>{t("privacyP2")}</p>
        <p>{t("privacyP3")}</p>
      </div>
    </section>
  );
}
