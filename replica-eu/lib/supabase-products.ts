import type { LocalProductInput } from "@/lib/local-products";
import { createProductSlug } from "@/lib/local-products";
import type { Product, ProductStatus } from "@/lib/data";

type SupabaseProductRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  gender: Product["gender"];
  country: string;
  lead_time: string;
  price: number | string;
  deposit: number | string;
  status: ProductStatus;
  description: string;
  estimated_delivery: string;
  sizes: string[];
  colors: Product["colors"];
  images: string[];
  supplier: string;
};

function getSupabasePublicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url.includes("your-project") || key.includes("replace")) {
    return null;
  }

  return { url: url.replace(/\/$/, ""), key };
}

function mapSupabaseProduct(row: SupabaseProductRow): Product {
  return {
    id: `remote-${row.id}`,
    slug: row.slug,
    name: row.name,
    category: row.category,
    gender: row.gender,
    country: row.country,
    leadTime: row.lead_time,
    price: Number(row.price),
    deposit: Number(row.deposit),
    status: row.status,
    description: row.description,
    estimatedDelivery: row.estimated_delivery,
    sizes: row.sizes,
    colors: row.colors,
    images: row.images,
    supplier: row.supplier
  };
}

export async function fetchSupabaseProducts() {
  const config = getSupabasePublicConfig();
  if (!config) return [];

  const response = await fetch(`${config.url}/rest/v1/replica_products?select=*&order=created_at.desc`, {
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`
    }
  });

  if (!response.ok) return [];

  const rows = (await response.json()) as SupabaseProductRow[];
  return rows.map(mapSupabaseProduct);
}

export async function saveSupabaseProduct(input: LocalProductInput, accessToken: string) {
  const config = getSupabasePublicConfig();
  if (!config) {
    throw new Error("Supabase public configuration is missing.");
  }

  const slugBase = createProductSlug(input.name) || "admin-product";
  const response = await fetch(`${config.url}/rest/v1/replica_products`, {
    method: "POST",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      slug: `${slugBase}-${Date.now().toString(36)}`,
      name: input.name,
      category: input.category,
      gender: input.gender,
      country: input.country,
      lead_time: input.leadTime,
      price: input.price,
      deposit: input.deposit,
      status: input.status,
      description: input.description,
      estimated_delivery: input.estimatedDelivery,
      sizes: input.sizes,
      colors: input.colors,
      images: [input.image],
      supplier: input.supplier
    })
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message ?? body.error ?? "Supabase product publish failed.");
  }

  const rows = (await response.json()) as SupabaseProductRow[];
  return mapSupabaseProduct(rows[0]);
}
