"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product/product-card";
import { getLocalProducts } from "@/lib/local-products";
import { fetchSupabaseProducts } from "@/lib/supabase-products";
import type { Product } from "@/lib/data";
import type { Locale } from "@/lib/i18n";

export function CatalogProductGrid({ locale, products }: { locale: Locale; products: Product[] }) {
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [remoteProducts, setRemoteProducts] = useState<Product[]>([]);

  useEffect(() => {
    function syncProducts() {
      setLocalProducts(getLocalProducts());
    }

    syncProducts();
    window.addEventListener("storage", syncProducts);
    window.addEventListener("replica-eu-products-updated", syncProducts);

    return () => {
      window.removeEventListener("storage", syncProducts);
      window.removeEventListener("replica-eu-products-updated", syncProducts);
    };
  }, []);

  useEffect(() => {
    fetchSupabaseProducts().then(setRemoteProducts).catch(() => setRemoteProducts([]));
  }, []);

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {[...localProducts, ...remoteProducts, ...products].map((product) => (
        <ProductCard key={product.id} product={product} locale={locale} />
      ))}
    </div>
  );
}
