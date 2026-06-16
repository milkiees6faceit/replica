"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertCircle, AtSign, Calendar, Lock, Mail, Send, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/lib/i18n";

type AuthMode = "login" | "register";

export function SupabaseAuthForm({ locale, mode }: { locale: Locale; mode: AuthMode }) {
  const router = useRouter();
  const t = useTranslations("auth");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const isRegister = mode === "register";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      nickname: String(formData.get("nickname") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      telegramUsername: String(formData.get("telegramUsername") ?? ""),
      dateOfBirth: String(formData.get("dateOfBirth") ?? "")
    };

    const response = await fetch(`/api/supabase-auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(body.error ?? t("genericError"));
      setIsLoading(false);
      return;
    }

    const user = body.user ?? body.session?.user;
    const metadata = user?.user_metadata ?? {};
    const nickname = metadata.nickname ?? payload.nickname;
    const telegramUsername = metadata.telegram_username ?? payload.telegramUsername;

    if (body.access_token) {
      window.localStorage.setItem("replica-eu-supabase-access-token", body.access_token);
    }

    if (body.refresh_token) {
      window.localStorage.setItem("replica-eu-supabase-refresh-token", body.refresh_token);
    }

    if (nickname) {
      window.localStorage.setItem("replica-eu-username", nickname);
    }

    window.localStorage.setItem("replica-eu-email", payload.email.toLowerCase());

    if (telegramUsername) {
      window.localStorage.setItem("replica-eu-telegram", telegramUsername);
    }

    router.push(`/${locale}/dashboard`);
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_18px_70px_rgba(0,0,0,0.08)]">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6C5CE7]">Supabase Auth</p>
      <h1 className="mt-2 text-5xl font-black leading-[0.92] tracking-[-0.07em]">
        {isRegister ? t("registerTitle") : t("loginTitle")}
      </h1>
      <p className="mt-3 text-sm font-medium leading-6 text-muted-foreground">
        {isRegister ? t("registerSubtitle") : t("loginSubtitle")}
      </p>

      <div className="mt-6 grid gap-4">
        {isRegister ? (
          <div className="grid gap-2">
            <Label htmlFor="nickname">{t("nickname")}</Label>
            <div className="relative">
              <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="nickname" name="nickname" placeholder="replica_user" required pattern="^[A-Za-z0-9_]{3,32}$" className="pl-10" />
            </div>
          </div>
        ) : null}

        <div className="grid gap-2">
          <Label htmlFor="email">{t("gmail")}</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" name="email" type="email" placeholder="you@gmail.com" required pattern="^[^@\s]+@gmail\.com$" className="pl-10" />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">{t("password")}</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="password" name="password" type="password" minLength={8} required className="pl-10" />
          </div>
        </div>

        {isRegister ? (
          <>
            <div className="grid gap-2">
              <Label htmlFor="telegramUsername">{t("telegram")}</Label>
              <div className="relative">
                <AtSign className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="telegramUsername" name="telegramUsername" placeholder="@yourusername" required pattern="^@?[A-Za-z0-9_]{5,32}$" className="pl-10" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dateOfBirth">{t("dateOfBirth")}</Label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="dateOfBirth" name="dateOfBirth" type="date" required className="pl-10" />
              </div>
              <p className="text-xs font-medium text-muted-foreground">{t("ageHelp")}</p>
            </div>
          </>
        ) : null}
      </div>

      {error ? (
        <div className="mt-5 flex gap-2 rounded-2xl border border-[#EF4444]/20 bg-[#EF4444]/10 p-4 text-sm font-bold text-[#991B1B]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      ) : null}

      <Button type="submit" variant="secondary" size="lg" className="mt-6 w-full" disabled={isLoading}>
        <Send className="h-4 w-4" />
        {isLoading ? t("loading") : isRegister ? t("createAccount") : t("signIn")}
      </Button>

      <p className="mt-5 text-center text-sm font-bold text-muted-foreground">
        {isRegister ? t("hasAccount") : t("noAccount")}{" "}
        <Link href={`/${locale}/${isRegister ? "login" : "register"}`} className="text-[#6C5CE7]">
          {isRegister ? t("goLogin") : t("goRegister")}
        </Link>
      </p>
    </form>
  );
}
