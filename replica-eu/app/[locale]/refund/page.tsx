import { useTranslations } from "next-intl";

export const metadata = { title: "Refund Policy" };

export default function RefundPage() {
  const t = useTranslations("pages");

  return (
    <section className="container max-w-3xl py-12">
      <h1 className="font-display text-5xl">{t("refundTitle")}</h1>
      <div className="mt-6 space-y-4 leading-7 text-muted-foreground">
        <p>{t("refundP1")}</p>
        <p>{t("refundP2")}</p>
        <p>{t("refundP3")}</p>
      </div>
    </section>
  );
}
