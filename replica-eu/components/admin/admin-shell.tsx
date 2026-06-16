import { useTranslations } from "next-intl";
import { ProductPublisher } from "@/components/admin/product-publisher";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminShell() {
  const t = useTranslations("admin");
  const sections = [t("products"), t("categories"), t("orders"), t("customers"), t("batches"), t("suppliers"), t("uploads")];

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="rounded-lg border bg-white p-3">
        {sections.map((section, index) => (
          <button
            key={section}
            className={`block w-full rounded-md px-3 py-2 text-left text-sm ${index === 0 ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
          >
            {section}
          </button>
        ))}
      </aside>
      <div className="grid gap-6">
        <ProductPublisher />
        <div className="grid gap-4 md:grid-cols-4">
          {[t("openBatches"), t("paidOrders"), t("customers"), t("verifiedSuppliers")].map((label, index) => (
            <Card key={label}>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">{label}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-3xl font-medium">{[6, 28, 412, 19][index]}</CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t("operations")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead className="border-b text-left text-muted-foreground">
                  <tr>
                    <th className="py-3">{t("product")}</th>
                    <th>{t("batchClose")}</th>
                    <th>{t("supplier")}</th>
                    <th>{t("status")}</th>
                    <th>{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Atelier wool coat", "2027-01-28", "Verified Bucharest atelier", t("open")],
                    ["Minimal leather loafer", "2027-01-05", "Verified Veneto supplier", t("closing")],
                    ["Cashmere blend knit", "2026-12-20", "Verified Barcelona knit studio", t("closed")]
                  ].map((row) => (
                    <tr key={row[0]} className="border-b last:border-0">
                      {row.slice(0, 3).map((cell) => (
                        <td key={cell} className="py-4">{cell}</td>
                      ))}
                      <td>
                        <Badge variant={row[3] === t("closed") ? "muted" : "secondary"}>{row[3]}</Badge>
                      </td>
                      <td className="text-muted-foreground">{t("actionText")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
