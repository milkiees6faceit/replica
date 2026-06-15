import { CatalogFilters } from "@/components/product/catalog-filters";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/lib/data";
import type { Locale } from "@/lib/i18n";

export const metadata = {
  title: "Catalog"
};

export default function CatalogPage({ params }: { params: { locale: Locale } }) {
  return (
    <section className="container py-10 pb-24 md:pb-10">
      <div className="mb-8 rounded-[32px] bg-black p-6 text-white md:p-10">
        <p className="text-sm font-black uppercase text-[#A29BFE]">Catalog</p>
        <h1 className="mt-2 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.07em] md:text-7xl">
          Find the next EU drop before it closes.
        </h1>
        <p className="mt-4 max-w-2xl font-medium leading-7 text-white/65">
          Filter by category, size, delivery country, supply window, preorder status, and checkout fast.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <CatalogFilters />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={params.locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
