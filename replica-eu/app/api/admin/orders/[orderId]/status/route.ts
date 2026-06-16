import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-auth";
import { sendOrderEmail } from "@/lib/mail";
import { nextOrderStatus } from "@/lib/preorder";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  status: z.enum(["pending", "paid", "ordered_from_supplier", "shipped", "delivered", "cancelled"])
});

export async function PATCH(request: Request, { params }: { params: { orderId: string } }) {
  const adminSession = await getAdminSession();
  if (!adminSession) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = schema.safeParse(await request.json());
  if (!body.success) {
    return NextResponse.json({ error: "Invalid order status" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({
    where: { id: params.orderId },
    include: { user: true }
  });

  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if (!nextOrderStatus(order.status, body.data.status)) {
    return NextResponse.json({ error: "Invalid status transition" }, { status: 400 });
  }

  const updated = await prisma.order.update({
    where: { id: params.orderId },
    data: { status: body.data.status }
  });

  await sendOrderEmail({
    to: order.user.email,
    subject: `Replica EU order status: ${body.data.status}`,
    html: `<p>Your preorder ${order.id} status changed to <strong>${body.data.status}</strong>.</p>`
  });

  return NextResponse.json(updated);
}
