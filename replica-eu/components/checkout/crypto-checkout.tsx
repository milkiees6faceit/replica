"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Check, Copy, Hash, MessageCircle, WalletCards } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveLocalPreorder } from "@/lib/local-orders";
import { formatPrice } from "@/lib/utils";

type PaymentMethod = {
  network: "TRC20" | "BEP20" | "TONCOIN";
  asset: string;
  address: string;
};

const paymentMethods: PaymentMethod[] = [
  {
    network: "TRC20",
    asset: "USDT",
    address: "TMjiJ2kxqmR1aTvFcZU2cYGM9cWqHuBhPf"
  },
  {
    network: "BEP20",
    asset: "USDT",
    address: "0xb2acc770685a5f5bFa3485613Fc6B86d63FF4a9b"
  },
  {
    network: "TONCOIN",
    asset: "TON",
    address: "UQBGqyJ7JLXoz49b5s8m5rDW_kD06DrLg0dQiOKJqUMPZltd"
  }
];

export function CryptoCheckout({
  amountDue = 320,
  initialUsername = "",
  productName = "Replica EU preorder",
  selectedSize = "",
  selectedColor = "",
  estimatedDelivery = ""
}: {
  amountDue?: number;
  initialUsername?: string;
  productName?: string;
  selectedSize?: string;
  selectedColor?: string;
  estimatedDelivery?: string;
}) {
  const t = useTranslations("checkout");
  const [profileUsername, setProfileUsername] = useState(initialUsername);
  const [telegramUsername, setTelegramUsername] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState<PaymentMethod["network"]>("TRC20");
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const selectedPayment = useMemo(
    () => paymentMethods.find((method) => method.network === selectedNetwork) ?? paymentMethods[0],
    [selectedNetwork]
  );

  useEffect(() => {
    const savedUsername = window.localStorage.getItem("replica-eu-username");
    if (savedUsername) {
      setProfileUsername(savedUsername);
    }
  }, []);

  async function copyAddress(address: string) {
    await navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    window.setTimeout(() => setCopiedAddress(null), 1800);
  }

  function createOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextOrderNumber = `RE-${Date.now().toString().slice(-7)}`;
    window.localStorage.setItem("replica-eu-username", profileUsername);
    window.localStorage.setItem("replica-eu-telegram", telegramUsername);
    saveLocalPreorder({
      id: nextOrderNumber,
      product: productName,
      size: selectedSize,
      color: selectedColor,
      telegramUsername,
      username: profileUsername,
      paymentNetwork: selectedPayment.network,
      paymentAddress: selectedPayment.address,
      amountDue,
      status: "pending",
      eta: estimatedDelivery,
      createdAt: new Date().toISOString()
    });
    setOrderNumber(nextOrderNumber);
  }

  return (
    <form onSubmit={createOrder} className="space-y-5">
      <section className="rounded-[28px] border border-black/8 bg-white p-5 shadow-[0_16px_60px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
            <MessageCircle className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-2xl font-black tracking-[-0.05em]">{t("paymentInfo")}</h2>
            <p className="text-sm font-medium text-muted-foreground">{t("paymentInfoSubtitle")}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="replicaUsername">{t("replicaUsername")}</Label>
            <Input
              id="replicaUsername"
              value={profileUsername}
              onChange={(event) => setProfileUsername(event.target.value)}
              placeholder="your_username"
              required
              pattern="^[A-Za-z0-9_]{3,32}$"
              className="font-black"
            />
            <p className="text-xs font-medium text-muted-foreground">
              {t("replicaUsernameHelp")}
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="telegramUsername">{t("telegram")}</Label>
            <Input
              id="telegramUsername"
              value={telegramUsername}
              onChange={(event) => setTelegramUsername(event.target.value)}
              placeholder="@yourusername"
              required
              pattern="^@?[A-Za-z0-9_]{5,32}$"
              className="font-black"
            />
            <p className="text-xs font-medium text-muted-foreground">
              {t("telegramHelp")}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-black/8 bg-white p-5 shadow-[0_16px_60px_rgba(0,0,0,0.08)]">
        <div className="rounded-2xl bg-[#EF4444] p-5 text-white shadow-[0_18px_48px_rgba(239,68,68,0.32)]">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 h-7 w-7 shrink-0" />
            <div>
              <h3 className="text-2xl font-black tracking-[-0.05em]">{t("important")}</h3>
              <p className="mt-3 text-sm font-bold leading-6">
                {t("important1")}
              </p>
              <p className="mt-2 text-sm font-bold leading-6">
                {t("important2")}
              </p>
              <p className="mt-2 text-sm font-bold leading-6">
                {t("important3")}
              </p>
              <div className="mt-4 rounded-xl bg-white/18 px-4 py-3 font-mono text-sm font-black">
                {t("example")}: ReplicaEU: {profileUsername || "your_username"}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6C5CE7] text-white">
            <WalletCards className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-2xl font-black tracking-[-0.05em]">{t("crypto")}</h2>
            <p className="text-sm font-medium text-muted-foreground">{t("cryptoSubtitle")}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {paymentMethods.map((method) => {
            const selected = method.network === selectedNetwork;
            const copied = copiedAddress === method.address;

            return (
              <label
                key={method.network}
                className={`block cursor-pointer rounded-[22px] border p-4 transition ${
                  selected ? "border-[#6C5CE7] bg-[#6C5CE7]/8 shadow-[0_14px_40px_rgba(108,92,231,0.12)]" : "border-black/8 bg-muted/60 hover:bg-muted"
                }`}
              >
                <input
                  type="radio"
                  name="paymentNetwork"
                  value={method.network}
                  checked={selected}
                  onChange={() => setSelectedNetwork(method.network)}
                  className="sr-only"
                />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-black tracking-[-0.04em]">{method.network} ({method.asset})</h3>
                      <Badge className="border-0 bg-black text-white">{method.network}</Badge>
                    </div>
                    <p className="mt-2 break-all font-mono text-sm font-bold text-muted-foreground">
                      {method.address}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant={copied ? "secondary" : "outline"}
                    onClick={() => copyAddress(method.address)}
                    className="shrink-0"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? t("copied") : t("copy")}
                  </Button>
                </div>
              </label>
            );
          })}
        </div>

        {copiedAddress ? (
          <div className="mt-4 rounded-2xl border border-[#6C5CE7]/20 bg-[#6C5CE7]/10 px-4 py-3 text-sm font-black text-[#4f42c7]">
            {t("copiedSuccess")}
          </div>
        ) : null}

        <div className="mt-5 rounded-2xl border border-[#EF4444]/20 bg-[#EF4444]/10 p-5 text-[#991B1B]">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <h3 className="font-black">{t("doNotForget")}</h3>
              <p className="mt-2 text-sm font-bold leading-6">
                {t("warning1")}
              </p>
              <p className="mt-1 text-sm font-bold leading-6">
                {t("warning2")}
              </p>
            </div>
          </div>
        </div>

        <Button type="submit" variant="secondary" size="lg" className="mt-6 w-full">
          {t("createOrder")}
        </Button>
      </section>

      {orderNumber ? (
        <section className="rounded-[28px] border border-[#6C5CE7]/20 bg-[#6C5CE7]/8 p-5 shadow-[0_16px_60px_rgba(108,92,231,0.12)]">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6C5CE7] text-white">
              <Hash className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-2xl font-black tracking-[-0.05em]">{t("orderCreated")}</h2>
              <p className="text-sm font-medium text-muted-foreground">{t("orderCreatedSubtitle")}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              [t("orderNumber"), orderNumber],
              [t("telegram"), telegramUsername],
              [t("selectedNetwork"), selectedPayment.network],
              [t("paymentAddress"), selectedPayment.address],
              [t("amountDue"), `${formatPrice(amountDue)} / ${amountDue} USDT`]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white p-4">
                <p className="text-xs font-black uppercase text-muted-foreground">{label}</p>
                <p className="mt-2 break-all font-mono text-sm font-black">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl bg-black p-5 text-white">
            <p className="text-xs font-black uppercase text-white/50">{t("usernameUsed")}</p>
            <p className="mt-2 font-mono text-xl font-black">ReplicaEU: {profileUsername}</p>
          </div>
        </section>
      ) : null}
    </form>
  );
}
