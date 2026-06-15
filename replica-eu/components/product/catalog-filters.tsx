import { SlidersHorizontal } from "lucide-react";
import { categories, euCountries } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CatalogFilters() {
  return (
    <aside className="rounded-[24px] border border-black/8 bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-black tracking-[-0.03em]">Filters</h2>
        <SlidersHorizontal className="h-4 w-4" />
      </div>
      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-bold">
          Category
          <select className="h-11 rounded-full border bg-muted px-4">
            <option>All categories</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Gender
          <select className="h-11 rounded-full border bg-muted px-4">
            <option>All</option>
            <option>Women</option>
            <option>Men</option>
            <option>Unisex</option>
          </select>
        </label>
        <div className="grid gap-2">
          <Label htmlFor="size">Size</Label>
          <Input id="size" placeholder="XS, M, 42..." />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Min EUR" type="number" />
          <Input placeholder="Max EUR" type="number" />
        </div>
        <label className="grid gap-2 text-sm font-bold">
          Delivery country
          <select className="h-11 rounded-full border bg-muted px-4">
            <option>Any EU country</option>
            {euCountries.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Supply window
          <select className="h-11 rounded-full border bg-muted px-4">
            <option>Any</option>
            <option>Up to 21 days</option>
            <option>21-30 days</option>
            <option>30+ days</option>
          </select>
        </label>
        <Button>Apply filters</Button>
      </div>
    </aside>
  );
}
