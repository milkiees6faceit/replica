import { useTranslations } from "next-intl";

export const metadata = { title: "Terms" };

export default function TermsPage() {
  const t = useTranslations("pages");

  return (
    <section className="container max-w-3xl py-12">
      <h1 className="font-display text-5xl">{t("termsTitle")}</h1>
      <div className="mt-6 space-y-4 leading-7 text-muted-foreground">
        <p>{t("termsP1")}</p>
        <p>{t("termsP2")}</p>
        <p>{t("termsP3")}</p>
      </div>
    </section>
  );
}
