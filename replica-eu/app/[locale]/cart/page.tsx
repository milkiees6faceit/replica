import { Suspense } from "react";
import { CartContent } from "@/components/cart/cart-content";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n";

export const metadata = { title: "Cart" };

export default function CartPage({
  params
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(params.locale);
  const t = useTranslations("cart");

  return (
    <section className="container py-10">
      <h1 className="font-display text-5xl">{t("title")}</h1>
      <Suspense fallback={<div className="mt-8 h-40 rounded-lg bg-muted" />}>
        <CartContent locale={params.locale} />
      </Suspense>
    </section>
  );
}
