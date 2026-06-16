"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Plus, UploadCloud } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEFAULT_COUNTRY, SUPPORTED_COUNTRIES } from "@/lib/countries";
import { saveLocalProduct } from "@/lib/local-products";
import { categories, type Product, type ProductStatus } from "@/lib/data";

const fallbackImage = "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=80";

function parseList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function colorValue(name: string) {
  const values: Record<string, string> = {
    black: "#111111",
    white: "#f8f8f4",
    pink: "#f3a6c8",
    blue: "#4f7df3",
    grey: "#8c8c8c",
    gray: "#8c8c8c",
    silver: "#c9cbd1",
    cream: "#e8dfc8"
  };

  return values[name.toLowerCase()] ?? "#6C5CE7";
}

export function ProductPublisher() {
  const t = useTranslations("admin");
  const [published, setPublished] = useState<Product | null>(null);
  const categoryOptions = useMemo(() => Array.from(new Set(["Footwear", "Tops", ...categories])), []);

  function publish(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const colors = parseList(String(formData.get("colors") ?? "Black")).map((name) => ({
      name,
      value: colorValue(name)
    }));
    const sizes = parseList(String(formData.get("sizes") ?? "S,M,L"));
    const price = Number(formData.get("price") ?? 0);
    const deposit = Number(formData.get("deposit") ?? Math.round(price * 0.3));

    const product = saveLocalProduct({
      name: String(formData.get("name") ?? "").trim(),
      category: String(formData.get("category") ?? "Footwear"),
      gender: String(formData.get("gender") ?? "Unisex") as Product["gender"],
      country: String(formData.get("country") ?? DEFAULT_COUNTRY),
      leadTime: String(formData.get("leadTime") ?? "14-21 days"),
      price,
      deposit,
      status: String(formData.get("status") ?? "Available for preorder") as ProductStatus,
      description: String(formData.get("description") ?? "").trim(),
      estimatedDelivery: String(formData.get("estimatedDelivery") ?? "Upcoming delivery"),
      sizes: sizes.length ? sizes : ["S", "M", "L"],
      colors: colors.length ? colors : [{ name: "Black", value: "#111111" }],
      image: String(formData.get("image") ?? "").trim() || fallbackImage,
      supplier: String(formData.get("supplier") ?? "Admin published supplier").trim()
    });

    setPublished(product);
    event.currentTarget.reset();
  }

  return (
    <section className="rounded-[28px] border border-black/8 bg-white p-5 shadow-[0_16px_60px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6C5CE7] text-white">
          <UploadCloud className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-[-0.04em]">{t("publishProduct")}</h2>
          <p className="text-sm font-semibold text-muted-foreground">{t("publishProductHelp")}</p>
        </div>
      </div>

      <form onSubmit={publish} className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="grid gap-2 md:col-span-2">
          <Label>{t("productName")}</Label>
          <Input name="name" placeholder="Chunky track sneaker / Green" required />
        </div>
        <label className="grid gap-2 text-sm font-bold">
          {t("category")}
          <select name="category" className="h-11 rounded-full border bg-muted px-4">
            {categoryOptions.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold">
          {t("gender")}
          <select name="gender" className="h-11 rounded-full border bg-muted px-4" defaultValue="Unisex">
            <option>Unisex</option>
            <option>Women</option>
            <option>Men</option>
          </select>
        </label>
        <div className="grid gap-2">
          <Label>{t("price")}</Label>
          <Input name="price" type="number" min="1" step="1" placeholder="245" required />
        </div>
        <div className="grid gap-2">
          <Label>{t("deposit")}</Label>
          <Input name="deposit" type="number" min="1" step="1" placeholder="74" required />
        </div>
        <label className="grid gap-2 text-sm font-bold">
          {t("status")}
          <select name="status" className="h-11 rounded-full border bg-muted px-4">
            <option>Available for preorder</option>
            <option>Closing soon</option>
            <option>Sold out</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold">
          {t("country")}
          <select name="country" className="h-11 rounded-full border bg-muted px-4" defaultValue={DEFAULT_COUNTRY}>
            {SUPPORTED_COUNTRIES.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
        </label>
        <div className="grid gap-2">
          <Label>{t("sizesCsv")}</Label>
          <Input name="sizes" placeholder="38,39,40,41,42" required />
        </div>
        <div className="grid gap-2">
          <Label>{t("colorsCsv")}</Label>
          <Input name="colors" placeholder="Black,Pink,Blue" required />
        </div>
        <div className="grid gap-2">
          <Label>{t("leadTime")}</Label>
          <Input name="leadTime" placeholder="18-26 days" required />
        </div>
        <div className="grid gap-2">
          <Label>{t("estimatedDelivery")}</Label>
          <Input name="estimatedDelivery" placeholder="Late March 2027" required />
        </div>
        <div className="grid gap-2 md:col-span-2">
          <Label>{t("imageUrl")}</Label>
          <Input name="image" type="url" placeholder={fallbackImage} />
        </div>
        <div className="grid gap-2 md:col-span-2">
          <Label>{t("supplier")}</Label>
          <Input name="supplier" placeholder="Verified supplier" required />
        </div>
        <div className="grid gap-2 md:col-span-2">
          <Label>{t("description")}</Label>
          <Input name="description" placeholder="Brand-free inspired-style preorder item." required />
        </div>
        <Button type="submit" variant="secondary" size="lg" className="md:col-span-2">
          <Plus className="h-4 w-4" />
          {t("publish")}
        </Button>
      </form>

      {published ? (
        <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-black text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          {t("published")} {published.name}
        </div>
      ) : null}
    </section>
  );
}
