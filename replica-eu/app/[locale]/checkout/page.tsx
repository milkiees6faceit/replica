import { Suspense } from "react";
import { CheckoutContent } from "@/components/checkout/checkout-content";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n";

export const metadata = { title: "Checkout" };

export default function CheckoutPage({
  params
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(params.locale);
  const t = useTranslations("checkout");

  return (
    <section className="container max-w-6xl py-10 pb-24 md:pb-10">
      <div className="rounded-[32px] bg-black p-6 text-white md:p-10">
        <p className="text-sm font-black uppercase text-[#A29BFE]">{t("eyebrow")}</p>
        <h1 className="mt-2 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.07em] md:text-7xl">
          {t("title")}
        </h1>
      </div>

      <Suspense fallback={<div className="mt-8 h-64 rounded-[28px] bg-muted" />}>
        <CheckoutContent />
      </Suspense>
    </section>
  );
}
