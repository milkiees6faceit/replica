import { Badge } from "@/components/ui/badge";
import type { ProductStatus } from "@/lib/data";

export function StatusBadge({ status }: { status: ProductStatus }) {
  const variant = status === "Sold out" ? "muted" : status === "Closing soon" ? "secondary" : "default";
  return <Badge variant={variant}>{status}</Badge>;
}
