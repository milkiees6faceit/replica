import { SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { DEFAULT_COUNTRY, SUPPORTED_COUNTRIES } from "@/lib/countries";
import { categories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CatalogFilters() {
  const t = useTranslations("catalog");

  return (
    <aside className="rounded-[24px] border border-black/8 bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-black tracking-[-0.03em]">{t("filters")}</h2>
        <SlidersHorizontal className="h-4 w-4" />
      </div>
      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-bold">
          {t("category")}
          <select className="h-11 rounded-full border bg-muted px-4">
            <option>{t("allCategories")}</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold">
          {t("gender")}
          <select className="h-11 rounded-full border bg-muted px-4">
            <option>{t("all")}</option>
            <option>Women</option>
            <option>Men</option>
            <option>Unisex</option>
          </select>
        </label>
        <div className="grid gap-2">
          <Label htmlFor="size">{t("size")}</Label>
          <Input id="size" placeholder="XS, M, 42..." />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Min EUR" type="number" />
          <Input placeholder="Max EUR" type="number" />
        </div>
        <label className="grid gap-2 text-sm font-bold">
          {t("deliveryCountry")}
          <select className="h-11 rounded-full border bg-muted px-4" defaultValue={DEFAULT_COUNTRY}>
            {SUPPORTED_COUNTRIES.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold">
          {t("supplyWindow")}
          <select className="h-11 rounded-full border bg-muted px-4">
            <option>{t("any")}</option>
            <option>{t("upTo21")}</option>
            <option>{t("days21to30")}</option>
            <option>{t("days30plus")}</option>
          </select>
        </label>
        <Button>{t("apply")}</Button>
      </div>
    </aside>
  );
}
