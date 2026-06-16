import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, PackageCheck } from "lucide-react";
import { StatusBadge } from "@/components/product/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductPage({ params }: { params: { locale: Locale; slug: string } }) {
  setRequestLocale(params.locale);
  const t = useTranslations("product");
  const product = products.find((item) => item.slug === params.slug);
  if (!product) notFound();

  return (
    <section className="container py-10 pb-24 md:pb-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_440px]">
        <div className="grid gap-4 sm:grid-cols-2">
          {product.images.map((image, index) => (
            <div key={image} className={index === 0 ? "relative aspect-[4/5] overflow-hidden rounded-[28px] bg-muted sm:col-span-2" : "relative aspect-square overflow-hidden rounded-[24px] bg-muted"}>
              <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" sizes="(min-width: 1024px) 55vw, 100vw" />
            </div>
          ))}
        </div>
        <aside className="h-fit rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_16px_60px_rgba(0,0,0,0.08)] lg:sticky lg:top-24">
          <StatusBadge status={product.status} />
          <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.07em]">{product.name}</h1>
          <p className="mt-4 font-medium leading-7 text-muted-foreground">{product.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <Badge key={size} variant="outline" className="rounded-full border-black/10 bg-muted px-4 py-2 font-black">
                {size}
              </Badge>
            ))}
          </div>
          <Separator className="my-6" />
          <div className="grid gap-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="h-4 w-4" /> {t("estimatedDelivery")}
              </span>
              <span>{product.estimatedDelivery}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-muted-foreground">
                <PackageCheck className="h-4 w-4" /> {t("supplier")}
              </span>
              <span>{product.supplier}</span>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="space-y-2">
            <div className="flex justify-between text-xl font-black tracking-[-0.04em]">
              <span>{t("preorderPrice")}</span>
              <span>{formatPrice(product.price)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-muted-foreground">
              <span>{t("depositOption")}</span>
              <span>{formatPrice(product.deposit)}</span>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button disabled={product.status === "Sold out"} variant="secondary" className="h-14">{t("payDeposit")}</Button>
            <Button disabled={product.status === "Sold out"} variant="outline" className="h-14">{t("payFull")}</Button>
          </div>
          <p className="mt-5 rounded-[20px] bg-muted p-4 text-xs font-medium leading-5 text-muted-foreground">
            {t("disclaimer")}
          </p>
        </aside>
      </div>
    </section>
  );
}
