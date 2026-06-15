export function canPreorder(closeAt: Date, now = new Date()) {
  return closeAt.getTime() > now.getTime();
}

export function nextOrderStatus(current: string, next: string) {
  const statuses = ["pending", "paid", "ordered_from_supplier", "shipped", "delivered", "cancelled"];
  if (!statuses.includes(current) || !statuses.includes(next)) return false;
  if (next === "cancelled") return current !== "delivered";
  return statuses.indexOf(next) >= statuses.indexOf(current);
}
