import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { sendOrderEmail } from "@/lib/mail";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing Stripe webhook configuration" }, { status: 400 });
  }

  const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await sendOrderEmail({
      to: session.customer_details?.email ?? "orders@replica-eu.example",
      subject: "Replica EU preorder paid",
      html: "<p>Your preorder payment was received. Order status: paid.</p>"
    });
  }

  return NextResponse.json({ received: true });
}
