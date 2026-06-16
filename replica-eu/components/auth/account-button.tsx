"use client";

import Link from "next/link";
import { LogOut, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";

type AccountState = {
  username: string;
  email: string;
  role: string;
};

export function AccountButton({ locale }: { locale: Locale }) {
  const t = useTranslations("auth");
  const [account, setAccount] = useState<AccountState | null>(null);

  useEffect(() => {
    const username = window.localStorage.getItem("replica-eu-username") ?? "";
    const email = window.localStorage.getItem("replica-eu-email") ?? "";
    const role = window.localStorage.getItem("replica-eu-role") ?? "user";
    const token = window.localStorage.getItem("replica-eu-supabase-access-token");

    if (token || username) {
      setAccount({ username: username || "Replica EU", email, role });
    }
  }, []);

  function logout() {
    [
      "replica-eu-supabase-access-token",
      "replica-eu-supabase-refresh-token",
      "replica-eu-username",
      "replica-eu-email",
      "replica-eu-telegram",
      "replica-eu-role"
    ].forEach((key) => window.localStorage.removeItem(key));
    setAccount(null);
  }

  if (!account) {
    return (
      <Button asChild variant="ghost" className="hidden h-10 rounded-full px-4 font-black md:inline-flex">
        <Link href={`/${locale}/login`}>
          <UserRound className="h-4 w-4" />
          {t("signIn")}
        </Link>
      </Button>
    );
  }

  return (
    <div className="hidden items-center gap-2 rounded-full border border-black/10 bg-muted p-1 md:flex">
      <Link href={`/${locale}/dashboard`} className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-black">
        <UserRound className="h-4 w-4" />
        <span className="max-w-[110px] truncate">{account.username}</span>
        {account.role === "admin" ? <span className="rounded-full bg-black px-2 py-0.5 text-[10px] text-white">ADMIN</span> : null}
      </Link>
      {account.role === "admin" ? (
        <Link
          href={`/${locale}/admin`}
          className="flex h-8 items-center gap-1.5 rounded-full bg-[#6C5CE7] px-3 text-xs font-black text-white transition hover:bg-black"
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Admin
        </Link>
      ) : null}
      <button
        type="button"
        onClick={logout}
        className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-black hover:text-white"
        aria-label={t("logout")}
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
