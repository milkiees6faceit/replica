import { CatalogFilters } from "@/components/product/catalog-filters";
import { CatalogProductGrid } from "@/components/product/catalog-product-grid";
import { products } from "@/lib/data";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n";

export const metadata = {
  title: "Catalog"
};

export default function CatalogPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  const t = useTranslations("catalog");

  return (
    <section className="container py-10 pb-24 md:pb-10">
      <div className="mb-8 rounded-[32px] bg-black p-6 text-white md:p-10">
        <p className="text-sm font-black uppercase text-[#A29BFE]">{t("eyebrow")}</p>
        <h1 className="mt-2 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.07em] md:text-7xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl font-medium leading-7 text-white/65">
          {t("subtitle")}
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <CatalogFilters />
        <CatalogProductGrid products={products} locale={params.locale} />
      </div>
    </section>
  );
}
