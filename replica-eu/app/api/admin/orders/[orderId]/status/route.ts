import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { sendOrderEmail } from "@/lib/mail";
import { nextOrderStatus } from "@/lib/preorder";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  status: z.enum(["pending", "paid", "ordered_from_supplier", "shipped", "delivered", "cancelled"])
});

export async function PATCH(request: Request, { params }: { params: { orderId: string } }) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = schema.parse(await request.json());
  const order = await prisma.order.findUnique({
    where: { id: params.orderId },
    include: { user: true }
  });

  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if (!nextOrderStatus(order.status, body.status)) {
    return NextResponse.json({ error: "Invalid status transition" }, { status: 400 });
  }

  const updated = await prisma.order.update({
    where: { id: params.orderId },
    data: { status: body.status }
  });

  await sendOrderEmail({
    to: order.user.email,
    subject: `Replica EU order status: ${body.status}`,
    html: `<p>Your preorder ${order.id} status changed to <strong>${body.status}</strong>.</p>`
  });

  return NextResponse.json(updated);
}
