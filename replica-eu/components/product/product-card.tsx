"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Clock3, MapPin, ShoppingBag, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import type { Product } from "@/lib/data";

function hypeBadge(product: Product) {
  if (product.badge) return product.badge;
  if (product.status === "Closing soon") return "LIMITED";
  if (product.status === "Sold out") return "SOLD";
  if (product.category === "Footwear") return "HOT";
  return "NEW";
}

export function ProductCard({ product, locale, priority = false }: { product: Product; locale: Locale; priority?: boolean }) {
  const t = useTranslations("productCard");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");
  const badge = hypeBadge(product);
  const disabled = product.status === "Sold out";
  const statusText =
    product.status === "Sold out" ? t("soldOut") : product.status === "Closing soon" ? t("closing") : t("available");
  const optionQuery = `?product=${product.slug}&size=${encodeURIComponent(selectedSize)}&color=${encodeURIComponent(selectedColor)}`;
  const productHref = product.id.startsWith("admin-") || product.id.startsWith("remote-") ? `/${locale}/checkout${optionQuery}` : `/${locale}/product/${product.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-black/8 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_22px_70px_rgba(0,0,0,0.12)]"
    >
      <Link href={productHref} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-b-[22px] bg-muted">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4 flex gap-2">
            <Badge className={badge === "HOT" ? "border-0 bg-[#6C5CE7] text-white" : "border-0 bg-black text-white"}>
              {badge}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4 rounded-full bg-white/92 px-3 py-1 text-xs font-black backdrop-blur">
            {product.leadTime}
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex min-h-[58px] items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={productHref} className="text-base font-black tracking-[-0.02em] transition hover:text-[#6C5CE7]">
              {product.name}
            </Link>
            <p className="mt-1 text-sm font-medium text-muted-foreground">{product.category} / {product.gender}</p>
          </div>
          <p className="shrink-0 text-lg font-black tracking-[-0.03em]">{formatPrice(product.price)}</p>
        </div>
        <div className="mt-4 flex min-h-[68px] content-start flex-wrap gap-2">
          <Badge variant="outline" className="gap-1 rounded-full border-black/10 bg-muted font-bold">
            <MapPin className="h-3 w-3" /> {product.country}
          </Badge>
          <Badge variant="outline" className="gap-1 rounded-full border-black/10 bg-muted font-bold">
            <Clock3 className="h-3 w-3" /> {statusText}
          </Badge>
        </div>
        <div className="mt-3 grid min-h-[118px] content-start gap-3">
          <div>
            <div className="mb-2 flex items-center justify-between text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">
              <span>{t("size")}</span>
              <span className="text-black">{selectedSize}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.slice(0, 5).map((size) => (
                <button
                  key={size}
                  type="button"
                  aria-pressed={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-8 min-w-9 rounded-full px-3 text-xs font-black transition ${
                    selectedSize === size ? "bg-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]" : "bg-muted text-black hover:bg-black/10"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">
              <span>{t("color")}</span>
              <span className="truncate pl-3 text-black">{selectedColor}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  aria-label={`${t("color")}: ${color.name}`}
                  aria-pressed={selectedColor === color.name}
                  title={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`h-8 w-8 rounded-full border border-black/10 transition hover:scale-105 ${
                    selectedColor === color.name ? "ring-2 ring-[#6C5CE7] ring-offset-2" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-4">
          <Button disabled={disabled} asChild={!disabled} variant="secondary" className="h-12">
            {disabled ? <span>{t("soldOut")}</span> : <Link href={`/${locale}/checkout${optionQuery}`}><Zap className="h-4 w-4" /> {t("quickBuy")}</Link>}
          </Button>
          <Button disabled={disabled} asChild={!disabled} variant="outline" size="icon" aria-label="Add to cart">
            {disabled ? <ShoppingBag className="h-4 w-4" /> : <Link href={`/${locale}/cart${optionQuery}`}><ShoppingBag className="h-4 w-4" /></Link>}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
