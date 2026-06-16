import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

export function CartSummary({ locale }: { locale: Locale }) {
  const t = useTranslations("cart");
  const subtotal = 320;
  const vat = 0;
  return (
    <div className="rounded-lg border bg-white p-5">
      <h2 className="font-display text-2xl">{t("summary")}</h2>
      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <span>{t("subtotal")}</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>{t("vat")}</span>
          <span>{formatPrice(vat)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>{t("shipping")}</span>
          <span>{t("shippingCalc")}</span>
        </div>
      </div>
      <Separator className="my-5" />
      <div className="flex justify-between font-medium">
        <span>{t("total")}</span>
        <span>{formatPrice(subtotal + vat)}</span>
      </div>
      <Button asChild className="mt-6 w-full">
        <Link href={`/${locale}/checkout`}>{t("checkout")}</Link>
      </Button>
    </div>
  );
}
