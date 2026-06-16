export type LocalPreorder = {
  id: string;
  product: string;
  size: string;
  color: string;
  telegramUsername: string;
  username: string;
  paymentNetwork: string;
  paymentAddress: string;
  amountDue: number;
  status: "pending";
  eta: string;
  createdAt: string;
};

export const LOCAL_PREORDERS_KEY = "replica-eu-local-preorders";

export function readLocalPreorders() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(LOCAL_PREORDERS_KEY);
    return raw ? (JSON.parse(raw) as LocalPreorder[]) : [];
  } catch {
    return [];
  }
}

export function saveLocalPreorder(order: LocalPreorder) {
  const orders = readLocalPreorders();
  window.localStorage.setItem(LOCAL_PREORDERS_KEY, JSON.stringify([order, ...orders].slice(0, 20)));
}

export function clearLocalPreorders() {
  window.localStorage.removeItem(LOCAL_PREORDERS_KEY);
}
