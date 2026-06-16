import { products } from "@/lib/data";
import { getLocalProducts } from "@/lib/local-products";

type SearchParams = Record<string, string | string[] | undefined>;

function readParam(searchParams: SearchParams | undefined, key: string) {
  const value = searchParams?.[key];
  return Array.isArray(value) ? value[0] : value;
}

export function getProductSelection(searchParams?: SearchParams) {
  const slug = readParam(searchParams, "product");
  const allProducts = [...getLocalProducts(), ...products];
  const product = allProducts.find((item) => item.slug === slug) ?? allProducts[0];
  const requestedSize = readParam(searchParams, "size");
  const requestedColor = readParam(searchParams, "color");
  const size = product.sizes.includes(requestedSize ?? "") ? requestedSize! : product.sizes[0];
  const color = product.colors.find((item) => item.name === requestedColor) ?? product.colors[0];
  const queryString = new URLSearchParams({
    product: product.slug,
    size,
    color: color.name
  }).toString();

  return {
    product,
    size,
    color,
    queryString
  };
}
