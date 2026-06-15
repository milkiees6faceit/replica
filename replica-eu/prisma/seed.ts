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
