"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { CartSummary } from "@/components/cart/cart-summary";
import { Button } from "@/components/ui/button";
import { getProductSelection } from "@/lib/product-selection";
import { formatPrice } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

function searchParamsToObject(searchParams: URLSearchParams) {
  return Object.fromEntries(searchParams.entries());
}

export function CartContent({ locale }: { locale: Locale }) {
  const t = useTranslations("cart");
  const searchParams = useSearchParams();
  const selection = getProductSelection(searchParamsToObject(searchParams));
  const { product, size, color, queryString } = selection;

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="rounded-lg border bg-white p-4">
        <div className="grid gap-4 sm:grid-cols-[140px_1fr_auto]">
          <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          </div>
          <div>
            <h2 className="font-display text-2xl">{product.name}</h2>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.12em]">
              <span className="rounded-full bg-muted px-3 py-1.5">{t("size")}: {size}</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
                <span className="h-3 w-3 rounded-full border border-black/10" style={{ backgroundColor: color.value }} />
                {t("color")}: {color.name}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("depositPayment", { delivery: product.estimatedDelivery })}
            </p>
            <Button variant="link" className="mt-3 h-auto p-0">{t("remove")}</Button>
          </div>
          <p className="font-medium">{formatPrice(product.price)}</p>
        </div>
      </div>
      <CartSummary locale={locale} subtotal={product.price} queryString={queryString} />
    </div>
  );
}
