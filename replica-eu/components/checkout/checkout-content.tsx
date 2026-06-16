"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { CryptoCheckout } from "@/components/checkout/crypto-checkout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEFAULT_COUNTRY, SUPPORTED_COUNTRIES } from "@/lib/countries";
import { getProductSelection } from "@/lib/product-selection";
import { formatPrice } from "@/lib/utils";

function searchParamsToObject(searchParams: URLSearchParams) {
  return Object.fromEntries(searchParams.entries());
}

export function CheckoutContent() {
  const t = useTranslations("checkout");
  const searchParams = useSearchParams();
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal: "",
    country: DEFAULT_COUNTRY
  });
  const selection = getProductSelection(searchParamsToObject(searchParams));
  const { product, size, color } = selection;
  const fields = [
    ["firstName", t("fields.firstName")],
    ["lastName", t("fields.lastName")],
    ["email", t("fields.email")],
    ["phone", t("fields.phone")],
    ["address", t("fields.address")],
    ["city", t("fields.city")],
    ["postal", t("fields.postal")]
  ];

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <form className="h-fit rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_16px_60px_rgba(0,0,0,0.08)]">
        <h2 className="text-2xl font-black tracking-[-0.05em]">{t("shipping")}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {fields.map(([id, label]) => (
            <div key={id} className={id === "address" ? "grid gap-2 sm:col-span-2" : "grid gap-2"}>
              <Label>{label}</Label>
              <Input
                value={shipping[id as keyof typeof shipping]}
                onChange={(event) => setShipping((current) => ({ ...current, [id]: event.target.value }))}
                required
                type={id === "email" ? "email" : id === "phone" ? "tel" : "text"}
              />
            </div>
          ))}
          <label className="grid gap-2 text-sm font-bold">
            {t("shippingCountry")}
            <select
              className="h-11 rounded-full border bg-muted px-4"
              value={shipping.country}
              onChange={(event) => setShipping((current) => ({ ...current, country: event.target.value }))}
              required
            >
              {SUPPORTED_COUNTRIES.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </select>
          </label>
        </div>
      </form>
      <div className="space-y-5">
        <section className="rounded-[28px] border border-black/8 bg-white p-5 shadow-[0_16px_60px_rgba(0,0,0,0.08)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6C5CE7]">{t("orderReview")}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-[112px_1fr]">
            <div className="relative aspect-square overflow-hidden rounded-[22px] bg-muted">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
            </div>
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl font-black tracking-[-0.05em]">{product.name}</h2>
                <p className="shrink-0 text-xl font-black">{formatPrice(product.price)}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.12em]">
                <span className="rounded-full bg-muted px-3 py-1.5">{t("size")}: {size}</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
                  <span className="h-3 w-3 rounded-full border border-black/10" style={{ backgroundColor: color.value }} />
                  {t("color")}: {color.name}
                </span>
              </div>
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                {t("estimatedDelivery")}: {product.estimatedDelivery}
              </p>
            </div>
          </div>
        </section>
        <CryptoCheckout
          amountDue={product.price}
          productName={product.name}
          selectedSize={size}
          selectedColor={color.name}
          estimatedDelivery={product.estimatedDelivery}
          shipping={{
            name: `${shipping.firstName} ${shipping.lastName}`.trim(),
            country: shipping.country,
            city: shipping.city,
            postal: shipping.postal,
            address: shipping.address,
            email: shipping.email,
            phone: shipping.phone
          }}
        />
      </div>
    </div>
  );
}
