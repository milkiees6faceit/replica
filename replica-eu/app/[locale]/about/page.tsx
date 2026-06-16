import { useTranslations } from "next-intl";

export const metadata = { title: "About" };

export default function AboutPage() {
  const t = useTranslations("pages");

  return (
    <section className="container max-w-3xl py-12">
      <p className="text-sm uppercase tracking-[0.26em] text-muted-foreground">{t("aboutEyebrow")}</p>
      <h1 className="mt-3 font-display text-5xl">{t("aboutTitle")}</h1>
      <p className="mt-6 leading-8 text-muted-foreground">
        {t("aboutCopy")}
      </p>
    </section>
  );
}
