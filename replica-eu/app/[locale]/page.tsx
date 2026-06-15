import Link from "next/link";
import { ArrowRight, BadgeCheck, Flame, Lock, PackageCheck, Sparkles, Timer, TrendingUp, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";
import type { Locale } from "@/lib/i18n";

export default function HomePage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  const t = useTranslations("home");

  return (
    <>
      <section className="premium-grid min-h-[calc(100vh-4rem)] overflow-hidden border-b border-black/5">
        <div className="container grid min-h-[calc(100vh-4rem)] content-center gap-8 py-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-10">
          <div className="animate-rise flex flex-col justify-center">
            <div className="flex flex-wrap gap-2">
              <Badge className="border-0 bg-black px-3 py-1 text-white">EU drops</Badge>
              <Badge className="border-0 bg-[#6C5CE7] px-3 py-1 text-white">Verified suppliers</Badge>
              <Badge variant="outline" className="border-black/10 bg-white px-3 py-1">No counterfeit goods</Badge>
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-6xl font-black leading-[0.88] tracking-[-0.08em] sm:text-7xl lg:text-8xl">
              {t("hero")} <span className="bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] bg-clip-text text-transparent">before it drops.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-muted-foreground">
              Inspired-style fashion preorders for the new generation of Europe. Fast discovery, secure checkout,
              supplier-verified drops.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href={`/${params.locale}/catalog`}>
                  {t("cta")} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#trending">Trending now</Link>
              </Button>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {[
                ["28K", "monthly views"],
                ["EU", "delivery"],
                ["0", "counterfeits"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-[22px] border border-black/8 bg-white/80 p-4 backdrop-blur">
                  <p className="text-3xl font-black tracking-[-0.06em]">{value}</p>
                  <p className="mt-1 text-xs font-bold uppercase text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="animate-rise-delay grid content-center gap-4">
            <div className="grid grid-cols-2 gap-4">
              {products.slice(0, 2).map((product, index) => (
                <div key={product.id} className={index === 1 ? "pt-10" : ""}>
                  <ProductCard product={product} locale={params.locale} priority={index === 0} />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between rounded-[28px] bg-black p-4 text-white sm:p-5">
              <div>
                <p className="text-xs font-black uppercase text-white/50">Live drop window</p>
                <p className="mt-1 text-2xl font-black tracking-[-0.04em]">48h left / 312 watching</p>
              </div>
              <Timer className="h-8 w-8 text-[#A29BFE]" />
            </div>
          </div>
        </div>
      </section>

      <section id="trending" className="container py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-black uppercase text-[#6C5CE7]">
              <Flame className="h-4 w-4" /> Trending now
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.06em] md:text-6xl">Most watched this week</h2>
          </div>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href={`/${params.locale}/catalog`}>View all</Link>
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={params.locale} />
          ))}
        </div>
      </section>

      <section className="surface-noise border-y border-black/5 bg-muted py-16">
        <div className="container">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-sm font-black uppercase text-[#6C5CE7]">
                <Sparkles className="h-4 w-4" /> New arrivals
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.06em] md:text-6xl">Fresh from verified suppliers</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["01", "Pick the drop", "Choose size, country, deposit or full payment."],
              ["02", "Batch locks", "Supplier order opens after preorder window closes."],
              ["03", "Track it", "Status updates from paid to delivered in dashboard."]
            ].map(([step, title, copy]) => (
              <div key={step} className="rounded-[28px] border border-black/8 bg-white p-6">
                <p className="text-5xl font-black tracking-[-0.08em] text-[#6C5CE7]">{step}</p>
                <h3 className="mt-6 text-2xl font-black tracking-[-0.04em]">{title}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="rounded-[32px] bg-black p-6 text-white md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-black uppercase text-[#A29BFE]">
                <Lock className="h-4 w-4" /> Limited drops
              </p>
              <h2 className="mt-3 max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.07em] md:text-7xl">
                Exclusive fashion marketplace for the new generation of Europe.
              </h2>
            </div>
            <Button asChild size="lg" variant="secondary">
              <Link href={`/${params.locale}/catalog`}>Shop limited</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-4">
            {[
              [TrendingUp, "Hype-aware drops"],
              [PackageCheck, "EU delivery"],
              [BadgeCheck, "Verified suppliers"],
              [Zap, "Fast checkout"]
            ].map(([Icon, label]) => (
              <div key={label as string} className="rounded-[24px] border border-white/10 bg-white/8 p-4">
                <Icon className="h-6 w-6 text-[#A29BFE]" />
                <p className="mt-4 font-black">{label as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container pb-24 md:pb-16">
        <div className="rounded-[28px] border border-black/8 bg-white p-5 text-sm font-medium leading-6 text-muted-foreground">
          Replica EU is not affiliated with luxury brands. Product listings are independent inspired-style fashion unless
          an authorized relationship is explicitly stated. No counterfeit goods.
        </div>
      </section>
    </>
  );
}
