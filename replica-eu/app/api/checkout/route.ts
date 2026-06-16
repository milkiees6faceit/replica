import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { products } from "@/lib/data";

export async function POST(request: Request) {
  const origin = request.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const product = products[0];
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: product.price * 100,
          product_data: {
            name: product.name,
            description: "Replica EU preorder. No counterfeit goods."
          }
        }
      }
    ],
    metadata: {
      productId: product.id,
      preorderType: "full"
    },
    success_url: `${origin}/en/dashboard?checkout=success`,
    cancel_url: `${origin}/en/cart?checkout=cancelled`
  });

  return NextResponse.redirect(session.url ?? `${origin}/en/cart`, { status: 303 });
}
