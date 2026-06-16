"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clearLocalPreorders, readLocalPreorders, type LocalPreorder } from "@/lib/local-orders";
import { formatPrice } from "@/lib/utils";

export function LocalPreorders() {
  const t = useTranslations("dashboard");
  const [orders, setOrders] = useState<LocalPreorder[]>([]);

  useEffect(() => {
    setOrders(readLocalPreorders());
  }, []);

  if (orders.length === 0) return null;

  function clearOrders() {
    clearLocalPreorders();
    setOrders([]);
  }

  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-black tracking-[-0.05em]">{t("recentLocalOrders")}</h2>
        <Button type="button" variant="outline" className="h-9 rounded-full" onClick={clearOrders}>
          {t("clearLocalOrders")}
        </Button>
      </div>
      {orders.map((order) => (
        <Card key={order.id} className="border-[#6C5CE7]/20 bg-[#6C5CE7]/5">
          <CardHeader className="flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>{order.product}</CardTitle>
              <p className="mt-2 font-mono text-sm text-muted-foreground">{order.id}</p>
            </div>
            <Badge className="border-0 bg-[#6C5CE7] text-white">{t("pendingPayment")}</Badge>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-6">
            <p><span className="font-bold text-muted-foreground">{t("variant")}:</span> {order.size} / {order.color}</p>
            <p><span className="font-bold text-muted-foreground">{t("delivery")}:</span> {order.shippingCity || "-"} / {order.shippingCountry || "-"}</p>
            <p><span className="font-bold text-muted-foreground">{t("contact")}:</span> {order.shippingEmail || order.shippingPhone || "-"}</p>
            <p><span className="font-bold text-muted-foreground">{t("network")}:</span> {order.paymentNetwork}</p>
            <p><span className="font-bold text-muted-foreground">{t("telegram")}:</span> {order.telegramUsername}</p>
            <p><span className="font-bold text-muted-foreground">{t("amount")}:</span> {formatPrice(order.amountDue)}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
