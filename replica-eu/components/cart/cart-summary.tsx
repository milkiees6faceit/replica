import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

export function CartSummary({ locale }: { locale: Locale }) {
  const subtotal = 320;
  const vat = 0;
  return (
    <div className="rounded-lg border bg-white p-5">
      <h2 className="font-display text-2xl">Order summary</h2>
      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>VAT placeholder</span>
          <span>{formatPrice(vat)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>Calculated after address</span>
        </div>
      </div>
      <Separator className="my-5" />
      <div className="flex justify-between font-medium">
        <span>Total due</span>
        <span>{formatPrice(subtotal + vat)}</span>
      </div>
      <Button asChild className="mt-6 w-full">
        <Link href={`/${locale}/checkout`}>Continue to checkout</Link>
      </Button>
    </div>
  );
}
