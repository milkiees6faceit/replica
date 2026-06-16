"use client";

import Link from "next/link";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";

export function AdminGate({ children, locale }: { children: ReactNode; locale: Locale }) {
  const t = useTranslations("admin");
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(window.localStorage.getItem("replica-eu-role") ?? "user");
  }, []);

  if (role === null) {
    return (
      <div className="rounded-[28px] border border-black/10 bg-muted p-6 text-sm font-black text-muted-foreground">
        {t("checkingAccess")}
      </div>
    );
  }

  if (role !== "admin") {
    return (
      <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <p className="font-display text-3xl font-black text-red-600">{t("accessDenied")}</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-red-950/70">{t("accessDeniedCopy")}</p>
          </div>
          <div className="flex flex-col gap-2 sm:min-w-[190px]">
            <Button asChild className="h-12 rounded-full bg-black font-black text-white hover:bg-[#6C5CE7]">
              <Link href={`/${locale}/login`}>{t("signIn")}</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full bg-white font-black">
              <Link href={`/${locale}/dashboard`}>{t("goDashboard")}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-3 rounded-[24px] border border-[#6C5CE7]/20 bg-[#6C5CE7]/10 p-4 text-sm font-black text-[#4f42c7]">
        <ShieldCheck className="h-5 w-5" />
        {t("adminVerified")}
      </div>
      {children}
    </div>
  );
}
