"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ImagePlus, Loader2, Plus, UploadCloud } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEFAULT_COUNTRY, SUPPORTED_COUNTRIES } from "@/lib/countries";
import { saveLocalProduct } from "@/lib/local-products";
import { saveSupabaseProduct } from "@/lib/supabase-products";
import { categories, type Product, type ProductBadge, type ProductStatus } from "@/lib/data";
import { uploadFiles } from "@/lib/uploadthing";

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
  const [notice, setNotice] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPublishing, setIsPublishing] = useState(false);
  const categoryOptions = useMemo(() => Array.from(new Set(["Footwear", "Tops", ...categories])), []);

  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  function readFileAsDataUrl(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }

  async function getProductImageUrl(file: File, accessToken: string) {
    try {
      setUploadProgress(1);
      const [uploaded] = await uploadFiles("productImageUploader", {
        files: [file],
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
        onUploadProgress: ({ progress }) => setUploadProgress(progress)
      });

      if (uploaded?.url) {
        return uploaded.url;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : t("imageUploadFallback");
      setNotice(`${t("imageUploadFallback")} ${message}`);
    }

    return readFileAsDataUrl(file);
  }

  async function publish(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    setIsPublishing(true);
    const formData = new FormData(event.currentTarget);
    const productImage = selectedImage;

    if (!productImage) {
      setNotice(t("imageRequired"));
      setIsPublishing(false);
      return;
    }

    const accessToken = window.localStorage.getItem("replica-eu-supabase-access-token") ?? "";
    const image = await getProductImageUrl(productImage, accessToken);
    const colors = parseList(String(formData.get("colors") ?? "Black")).map((name) => ({
      name,
      value: colorValue(name)
    }));
    const sizes = parseList(String(formData.get("sizes") ?? "S,M,L"));
    const price = Number(formData.get("price") ?? 0);
    const deposit = Number(formData.get("deposit") ?? Math.round(price * 0.3));

    const productInput = {
      name: String(formData.get("name") ?? "").trim(),
      category: String(formData.get("category") ?? "Footwear"),
      gender: String(formData.get("gender") ?? "Unisex") as Product["gender"],
      country: String(formData.get("country") ?? DEFAULT_COUNTRY),
      leadTime: String(formData.get("leadTime") ?? "14-21 days"),
      price,
      deposit,
      status: String(formData.get("status") ?? "Available for preorder") as ProductStatus,
      badge: String(formData.get("badge") ?? "NEW") as ProductBadge,
      description: String(formData.get("description") ?? "").trim(),
      estimatedDelivery: String(formData.get("estimatedDelivery") ?? "Upcoming delivery"),
      sizes: sizes.length ? sizes : ["S", "M", "L"],
      colors: colors.length ? colors : [{ name: "Black", value: "#111111" }],
      image: image || fallbackImage,
      supplier: String(formData.get("supplier") ?? "Admin published supplier").trim()
    };

    let product: Product;

    try {
      product = accessToken ? await saveSupabaseProduct(productInput, accessToken) : saveLocalProduct(productInput);
      window.dispatchEvent(new CustomEvent("replica-eu-products-updated"));
    } catch (error) {
      product = saveLocalProduct(productInput);
      const message = error instanceof Error ? error.message : t("publishFallback");
      setNotice(`${t("publishFallback")} ${message}`);
    }

    setPublished(product);
    event.currentTarget.reset();
    setSelectedImage(null);
    setUploadProgress(0);
    setIsPublishing(false);
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
          {t("productBadge")}
          <select name="badge" className="h-11 rounded-full border bg-muted px-4" defaultValue="HOT">
            <option>NEW</option>
            <option>HOT</option>
            <option>TRENDING NOW</option>
            <option>LIMITED</option>
            <option>DROP</option>
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
        <div className="grid gap-3 md:col-span-2">
          <Label>{t("productImage")}</Label>
          <label className="group grid cursor-pointer gap-3 rounded-[24px] border border-dashed border-black/20 bg-muted p-4 transition hover:border-[#6C5CE7] hover:bg-[#6C5CE7]/5 sm:grid-cols-[180px_1fr]">
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[20px] bg-white">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <ImagePlus className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex flex-col justify-center gap-2">
              <span className="text-base font-black">{selectedImage?.name ?? t("chooseImageFile")}</span>
              <span className="text-sm font-semibold text-muted-foreground">{t("imageFileHelp")}</span>
              {uploadProgress > 0 ? (
                <span className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                  <span className="block h-full rounded-full bg-[#6C5CE7]" style={{ width: `${uploadProgress}%` }} />
                </span>
              ) : null}
            </div>
            <Input
              name="imageFile"
              type="file"
              accept="image/*"
              required
              className="sr-only"
              onChange={(event) => setSelectedImage(event.target.files?.[0] ?? null)}
            />
          </label>
        </div>
        <div className="grid gap-2 md:col-span-2">
          <Label>{t("supplier")}</Label>
          <Input name="supplier" placeholder="Verified supplier" required />
        </div>
        <div className="grid gap-2 md:col-span-2">
          <Label>{t("description")}</Label>
          <Input name="description" placeholder="Brand-free inspired-style preorder item." required />
        </div>
        <Button type="submit" variant="secondary" size="lg" className="md:col-span-2" disabled={isPublishing}>
          {isPublishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          {t("publish")}
        </Button>
      </form>

      {published ? (
        <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-black text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          {t("published")} {published.name}
        </div>
      ) : null}

      {notice ? (
        <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-black text-amber-800">
          {notice}
        </div>
      ) : null}
    </section>
  );
}
