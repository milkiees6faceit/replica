export type ProductStatus = "Available for preorder" | "Closing soon" | "Sold out";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  gender: "Women" | "Men" | "Unisex";
  country: string;
  leadTime: string;
  price: number;
  deposit: number;
  status: ProductStatus;
  description: string;
  estimatedDelivery: string;
  sizes: string[];
  colors: { name: string; value: string }[];
  images: string[];
  supplier: string;
};

export const categories = ["Outerwear", "Knitwear", "Tailoring", "Footwear", "Tops", "Accessories"];

export const products: Product[] = [
  {
    id: "p1",
    slug: "atelier-wool-coat",
    name: "Atelier wool coat",
    category: "Outerwear",
    gender: "Women",
    country: "Romania",
    leadTime: "21-28 days",
    price: 320,
    deposit: 96,
    status: "Available for preorder",
    description:
      "A clean longline coat in a structured wool blend, designed for an inspired city wardrobe without third-party branding.",
    estimatedDelivery: "Late February 2027",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Black", value: "#111111" },
      { name: "Oat", value: "#c8bca8" },
      { name: "Graphite", value: "#4b4b4b" }
    ],
    images: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
    ],
    supplier: "Verified Bucharest atelier"
  },
  {
    id: "p2",
    slug: "minimal-leather-loafer",
    name: "Minimal leather loafer",
    category: "Footwear",
    gender: "Unisex",
    country: "Italy",
    leadTime: "30-40 days",
    price: 210,
    deposit: 63,
    status: "Closing soon",
    description:
      "Low-profile loafers from a small EU workshop with smooth leather finish and understated hardware-free detailing.",
    estimatedDelivery: "Early March 2027",
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: [
      { name: "Black", value: "#111111" },
      { name: "Espresso", value: "#3b241a" }
    ],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80"
    ],
    supplier: "Verified Veneto supplier"
  },
  {
    id: "p3",
    slug: "soft-tailored-set",
    name: "Soft tailored set",
    category: "Tailoring",
    gender: "Women",
    country: "France",
    leadTime: "18-24 days",
    price: 280,
    deposit: 84,
    status: "Available for preorder",
    description:
      "Relaxed tailoring with a fluid drape, made for travel days, work dinners, and refined capsule wardrobes.",
    estimatedDelivery: "Mid February 2027",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Stone", value: "#d6d1c4" },
      { name: "Black", value: "#111111" },
      { name: "Grey", value: "#8c8c8c" }
    ],
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80"
    ],
    supplier: "Verified Lyon atelier"
  },
  {
    id: "p4",
    slug: "cashmere-blend-knit",
    name: "Cashmere blend knit",
    category: "Knitwear",
    gender: "Men",
    country: "Spain",
    leadTime: "14-21 days",
    price: 165,
    deposit: 50,
    status: "Sold out",
    description:
      "Dense gauge knitwear with a soft hand feel, neutral tone, and no visible brand marks.",
    estimatedDelivery: "Batch closed",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", value: "#2f2f2f" },
      { name: "Cream", value: "#e8dfc8" },
      { name: "Navy", value: "#1f2a44" }
    ],
    images: [
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?auto=format&fit=crop&w=1200&q=80"
    ],
    supplier: "Verified Barcelona knit studio"
  },
  {
    id: "p5",
    slug: "chunky-track-sneaker-black",
    name: "Chunky track sneaker / Black",
    category: "Footwear",
    gender: "Unisex",
    country: "Germany",
    leadTime: "18-26 days",
    price: 245,
    deposit: 74,
    status: "Available for preorder",
    description:
      "A non-branded chunky runner silhouette with layered panels, black mesh texture, and streetwear-ready volume.",
    estimatedDelivery: "Late March 2027",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: [{ name: "Black", value: "#111111" }],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80"
    ],
    supplier: "Verified Berlin footwear studio"
  },
  {
    id: "p6",
    slug: "chunky-track-sneaker-pink",
    name: "Chunky track sneaker / Pink",
    category: "Footwear",
    gender: "Unisex",
    country: "Germany",
    leadTime: "18-26 days",
    price: 245,
    deposit: 74,
    status: "Closing soon",
    description:
      "A non-branded chunky runner silhouette in a soft pink colorway with layered paneling and padded comfort.",
    estimatedDelivery: "Late March 2027",
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: [{ name: "Pink", value: "#f3a6c8" }],
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1200&q=80"
    ],
    supplier: "Verified Berlin footwear studio"
  },
  {
    id: "p7",
    slug: "chunky-track-sneaker-blue",
    name: "Chunky track sneaker / Blue",
    category: "Footwear",
    gender: "Unisex",
    country: "Germany",
    leadTime: "18-26 days",
    price: 245,
    deposit: 74,
    status: "Available for preorder",
    description:
      "A non-branded chunky runner silhouette in blue with sculpted overlays, breathable mesh, and clean contrast details.",
    estimatedDelivery: "Late March 2027",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: [{ name: "Blue", value: "#4f7df3" }],
    images: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=80"
    ],
    supplier: "Verified Berlin footwear studio"
  },
  {
    id: "p8",
    slug: "deconstructed-cotton-t-shirt",
    name: "Deconstructed cotton t-shirt",
    category: "Tops",
    gender: "Unisex",
    country: "France",
    leadTime: "14-20 days",
    price: 118,
    deposit: 35,
    status: "Available for preorder",
    description:
      "A brand-free cotton tee with an inside-out construction feel, relaxed drape, and subtle stitch-inspired detailing.",
    estimatedDelivery: "Mid March 2027",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", value: "#f8f8f4" },
      { name: "Black", value: "#111111" }
    ],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=80"
    ],
    supplier: "Verified Paris cut-and-sew studio"
  },
  {
    id: "p9",
    slug: "runner-mesh-sneaker",
    name: "Runner mesh sneaker",
    category: "Footwear",
    gender: "Unisex",
    country: "Italy",
    leadTime: "21-30 days",
    price: 230,
    deposit: 69,
    status: "Available for preorder",
    description:
      "A non-branded runner-style sneaker with breathable mesh, layered textures, and a fast everyday streetwear profile.",
    estimatedDelivery: "Early April 2027",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Silver", value: "#c9cbd1" },
      { name: "Black", value: "#111111" }
    ],
    images: [
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80"
    ],
    supplier: "Verified Milan sneaker supplier"
  }
];

export const orders = [
  {
    id: "ORD-1042",
    product: "Atelier wool coat",
    status: "paid",
    total: 320,
    tracking: "Pending supplier dispatch",
    eta: "Late February 2027"
  },
  {
    id: "ORD-1037",
    product: "Minimal leather loafer",
    status: "ordered_from_supplier",
    total: 210,
    tracking: "EU-PRE-883410",
    eta: "Early March 2027"
  }
];
