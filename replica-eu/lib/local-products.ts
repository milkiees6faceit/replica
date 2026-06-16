import type { Product, ProductBadge, ProductStatus } from "@/lib/data";

export const LOCAL_PRODUCTS_KEY = "replica-eu-admin-products";

export type LocalProductInput = {
  name: string;
  category: string;
  gender: Product["gender"];
  country: string;
  leadTime: string;
  price: number;
  deposit: number;
  status: ProductStatus;
  badge: ProductBadge;
  description: string;
  estimatedDelivery: string;
  sizes: string[];
  colors: Product["colors"];
  image: string;
  supplier: string;
};

export function createProductSlug(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function getLocalProducts(): Product[] {
  if (typeof window === "undefined") return [];

  try {
    const value = window.localStorage.getItem(LOCAL_PRODUCTS_KEY);
    if (!value) return [];
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLocalProduct(input: LocalProductInput) {
  const products = getLocalProducts();
  const slug = createProductSlug(input.name) || `admin-product-${Date.now()}`;
  const product: Product = {
    id: `admin-${Date.now()}`,
    slug,
    name: input.name,
    category: input.category,
    gender: input.gender,
    country: input.country,
    leadTime: input.leadTime,
    price: input.price,
    deposit: input.deposit,
    status: input.status,
    badge: input.badge,
    description: input.description,
    estimatedDelivery: input.estimatedDelivery,
    sizes: input.sizes,
    colors: input.colors,
    images: [input.image],
    supplier: input.supplier
  };

  const nextProducts = [product, ...products.filter((item) => item.slug !== slug)];
  window.localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(nextProducts));
  window.dispatchEvent(new CustomEvent("replica-eu-products-updated"));

  return product;
}
