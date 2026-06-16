import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";
import { DEFAULT_COUNTRY, SUPPORTED_COUNTRIES } from "../lib/countries";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash("admin12345", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@replica-eu.example" },
    update: {},
    create: {
      email: "admin@replica-eu.example",
      name: "Replica EU Admin",
      role: Role.ADMIN,
      passwordHash
    }
  });

  await prisma.user.upsert({
    where: { email: "milkiees6faceit@gmail.com" },
    update: { role: Role.ADMIN },
    create: {
      email: "milkiees6faceit@gmail.com",
      name: "milkiees6faceit",
      role: Role.ADMIN,
      passwordHash
    }
  });

  const category = await prisma.category.upsert({
    where: { slug: "outerwear" },
    update: {},
    create: { name: "Outerwear", slug: "outerwear" }
  });

  const supplier = await prisma.supplier.create({
    data: {
      name: "Verified Bucharest atelier",
      country: DEFAULT_COUNTRY,
      status: "verified",
      notes: "Independent supplier, no third-party luxury branding."
    }
  });

  const product = await prisma.product.upsert({
    where: { slug: "atelier-wool-coat" },
    update: {},
    create: {
      slug: "atelier-wool-coat",
      name: "Atelier wool coat",
      description: "Brand-free inspired-style longline wool coat for EU preorder.",
      gender: "Women",
      status: "AVAILABLE_FOR_PREORDER",
      priceCents: 32000,
      depositCents: 9600,
      estimatedDelivery: "Late February 2027",
      leadTime: "21-28 days",
      deliveryCountries: [...SUPPORTED_COUNTRIES],
      categoryId: category.id,
      supplierId: supplier.id,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=80",
            alt: "Minimal wool coat editorial"
          }
        ]
      },
      sizeVariants: {
        create: ["XS", "S", "M", "L"].map((label) => ({
          label,
          sku: `WOOL-COAT-${label}`,
          stock: 25
        }))
      }
    }
  });

  const batch = await prisma.preorderBatch.create({
    data: {
      name: "February outerwear batch",
      closeAt: new Date("2027-01-28T23:59:00.000Z"),
      supplierEta: new Date("2027-02-20T10:00:00.000Z"),
      minQuantity: 10,
      productId: product.id,
      supplierId: supplier.id
    }
  });

  const footwearCategory = await prisma.category.upsert({
    where: { slug: "footwear" },
    update: {},
    create: { name: "Footwear", slug: "footwear" }
  });

  const topsCategory = await prisma.category.upsert({
    where: { slug: "tops" },
    update: {},
    create: { name: "Tops", slug: "tops" }
  });

  const sneakerSupplier = await prisma.supplier.create({
    data: {
      name: "Verified Berlin footwear studio",
      country: "Germany",
      status: "verified",
      notes: "Independent non-branded inspired-style footwear supplier."
    }
  });

  const parisSupplier = await prisma.supplier.create({
    data: {
      name: "Verified Paris cut-and-sew studio",
      country: "France",
      status: "verified",
      notes: "Independent supplier for brand-free cut-and-sew tops."
    }
  });

  const milanSupplier = await prisma.supplier.create({
    data: {
      name: "Verified Milan sneaker supplier",
      country: "Italy",
      status: "verified",
      notes: "Independent non-branded runner-style footwear supplier."
    }
  });

  const testProducts = [
    {
      slug: "chunky-track-sneaker-black",
      name: "Chunky track sneaker / Black",
      description: "Non-branded chunky runner silhouette in black for inspired-style streetwear preorders.",
      gender: "Unisex",
      status: "AVAILABLE_FOR_PREORDER" as const,
      priceCents: 24500,
      depositCents: 7400,
      estimatedDelivery: "Late March 2027",
      leadTime: "18-26 days",
      categoryId: footwearCategory.id,
      supplierId: sneakerSupplier.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
          alt: "Black chunky sneaker editorial"
        }
      ],
      sizes: ["38", "39", "40", "41", "42", "43", "44"]
    },
    {
      slug: "chunky-track-sneaker-pink",
      name: "Chunky track sneaker / Pink",
      description: "Non-branded chunky runner silhouette in pink with layered panels and padded comfort.",
      gender: "Unisex",
      status: "CLOSING_SOON" as const,
      priceCents: 24500,
      depositCents: 7400,
      estimatedDelivery: "Late March 2027",
      leadTime: "18-26 days",
      categoryId: footwearCategory.id,
      supplierId: sneakerSupplier.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80",
          alt: "Pink sneaker editorial"
        }
      ],
      sizes: ["38", "39", "40", "41", "42", "43"]
    },
    {
      slug: "chunky-track-sneaker-blue",
      name: "Chunky track sneaker / Blue",
      description: "Non-branded chunky runner silhouette in blue with sculpted overlays and breathable mesh.",
      gender: "Unisex",
      status: "AVAILABLE_FOR_PREORDER" as const,
      priceCents: 24500,
      depositCents: 7400,
      estimatedDelivery: "Late March 2027",
      leadTime: "18-26 days",
      categoryId: footwearCategory.id,
      supplierId: sneakerSupplier.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80",
          alt: "Blue sneaker editorial"
        }
      ],
      sizes: ["38", "39", "40", "41", "42", "43", "44"]
    },
    {
      slug: "deconstructed-cotton-t-shirt",
      name: "Deconstructed cotton t-shirt",
      description: "Brand-free cotton tee with a relaxed drape and subtle stitch-inspired construction details.",
      gender: "Unisex",
      status: "AVAILABLE_FOR_PREORDER" as const,
      priceCents: 11800,
      depositCents: 3500,
      estimatedDelivery: "Mid March 2027",
      leadTime: "14-20 days",
      categoryId: topsCategory.id,
      supplierId: parisSupplier.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
          alt: "Minimal cotton t-shirt editorial"
        }
      ],
      sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
      slug: "runner-mesh-sneaker",
      name: "Runner mesh sneaker",
      description: "Non-branded runner-style sneaker with breathable mesh, layered textures, and a fast profile.",
      gender: "Unisex",
      status: "AVAILABLE_FOR_PREORDER" as const,
      priceCents: 23000,
      depositCents: 6900,
      estimatedDelivery: "Early April 2027",
      leadTime: "21-30 days",
      categoryId: footwearCategory.id,
      supplierId: milanSupplier.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=80",
          alt: "Runner mesh sneaker editorial"
        }
      ],
      sizes: ["38", "39", "40", "41", "42", "43", "44"]
    }
  ];

  for (const item of testProducts) {
    await prisma.product.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        slug: item.slug,
        name: item.name,
        description: item.description,
        gender: item.gender,
        status: item.status,
        priceCents: item.priceCents,
        depositCents: item.depositCents,
        estimatedDelivery: item.estimatedDelivery,
        leadTime: item.leadTime,
        deliveryCountries: [...SUPPORTED_COUNTRIES],
        categoryId: item.categoryId,
        supplierId: item.supplierId,
        images: { create: item.images },
        sizeVariants: {
          create: item.sizes.map((label) => ({
            label,
            sku: `${item.slug.toUpperCase()}-${label}`,
            stock: 30
          }))
        }
      }
    });
  }

  const address = await prisma.shippingAddress.create({
    data: {
      userId: admin.id,
      firstName: "Admin",
      lastName: "Buyer",
      line1: "1 Preorder Street",
      city: "Bucharest",
      postalCode: "010001",
      country: DEFAULT_COUNTRY
    }
  });

  await prisma.order.create({
    data: {
      userId: admin.id,
      status: "paid",
      subtotalCents: 32000,
      totalCents: 32000,
      shippingAddressId: address.id,
      items: {
        create: {
          productId: product.id,
          preorderBatchId: batch.id,
          quantity: 1,
          unitPriceCents: 32000,
          depositCents: 9600
        }
      },
      payment: {
        create: {
          status: "paid",
          amountCents: 32000
        }
      }
    }
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
