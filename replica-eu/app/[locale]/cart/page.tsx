import Image from "next/image";
import { CartSummary } from "@/components/cart/cart-summary";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { Locale } from "@/lib/i18n";

export const metadata = { title: "Cart" };

export default function CartPage({ params }: { params: { locale: Locale } }) {
  const t = useTranslations("cart");
  const product = products[0];
  return (
    <section className="container py-10">
      <h1 className="font-display text-5xl">{t("title")}</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg border bg-white p-4">
          <div className="grid gap-4 sm:grid-cols-[140px_1fr_auto]">
            <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
            </div>
            <div>
              <h2 className="font-display text-2xl">{product.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("sizeDeposit", { delivery: product.estimatedDelivery })}</p>
              <Button variant="link" className="mt-3 h-auto p-0">{t("remove")}</Button>
            </div>
            <p className="font-medium">{formatPrice(product.price)}</p>
          </div>
        </div>
        <CartSummary locale={params.locale} />
      </div>
    </section>
  );
}
