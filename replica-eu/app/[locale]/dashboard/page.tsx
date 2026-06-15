import { orders } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <section className="container py-10">
      <h1 className="font-display text-5xl">My preorders</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle>{order.product}</CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">{order.id}</p>
                </div>
                <Badge variant="secondary">{order.status}</Badge>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm sm:grid-cols-3">
                <p><span className="text-muted-foreground">ETA:</span> {order.eta}</p>
                <p><span className="text-muted-foreground">Tracking:</span> {order.tracking}</p>
                <p><span className="text-muted-foreground">Total:</span> EUR {order.total}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Profile settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Email notifications: enabled</p>
            <p>Default country: Germany</p>
            <p>Preferred language: English</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
