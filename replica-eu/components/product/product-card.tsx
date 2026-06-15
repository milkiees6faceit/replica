"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock3, MapPin, ShoppingBag, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import type { Product } from "@/lib/data";

function hypeBadge(product: Product) {
  if (product.status === "Closing soon") return "LIMITED";
  if (product.status === "Sold out") return "SOLD";
  if (product.category === "Footwear") return "HOT";
  return "NEW";
}

export function ProductCard({ product, locale, priority = false }: { product: Product; locale: Locale; priority?: boolean }) {
  const badge = hypeBadge(product);
  const disabled = product.status === "Sold out";

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-black/8 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_22px_70px_rgba(0,0,0,0.12)]"
    >
      <Link href={`/${locale}/product/${product.slug}`} className="block">
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
            <Link href={`/${locale}/product/${product.slug}`} className="text-base font-black tracking-[-0.02em] transition hover:text-[#6C5CE7]">
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
            <Clock3 className="h-3 w-3" /> {product.status}
          </Badge>
        </div>
        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-4">
          <Button disabled={disabled} asChild={!disabled} variant="secondary" className="h-12">
            {disabled ? <span>Sold out</span> : <Link href={`/${locale}/checkout`}><Zap className="h-4 w-4" /> Quick buy</Link>}
          </Button>
          <Button disabled={disabled} asChild={!disabled} variant="outline" size="icon" aria-label="Add to cart">
            {disabled ? <ShoppingBag className="h-4 w-4" /> : <Link href={`/${locale}/cart`}><ShoppingBag className="h-4 w-4" /></Link>}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
