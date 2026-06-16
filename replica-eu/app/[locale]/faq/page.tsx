import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n";

export const metadata = { title: "FAQ" };

export default function FAQPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  const t = useTranslations("faq");
  const faqs = [
    [t("q1"), t("a1")],
    [t("q2"), t("a2")],
    [t("q3"), t("a3")],
    [t("q4"), t("a4")]
  ];

  return (
    <section className="container max-w-3xl py-12">
      <p className="text-sm uppercase tracking-[0.26em] text-muted-foreground">FAQ</p>
      <h1 className="mt-3 font-display text-5xl">{t("title")}</h1>
      <div className="mt-8 divide-y rounded-lg border bg-white">
        {faqs.map(([question, answer]) => (
          <div key={question} className="p-6">
            <h2 className="font-medium">{question}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
