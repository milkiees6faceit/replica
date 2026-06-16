"use client";

import Link from "next/link";
import { LogOut, Mail, Send, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/lib/i18n";

type ProfileState = {
  username: string;
  email: string;
  telegram: string;
  role: string;
  isSignedIn: boolean;
};

export function DashboardProfile({ locale }: { locale: Locale }) {
  const t = useTranslations("auth");
  const [profile, setProfile] = useState<ProfileState>({
    username: "",
    email: "",
    telegram: "",
    role: "user",
    isSignedIn: false
  });

  useEffect(() => {
    const token = window.localStorage.getItem("replica-eu-supabase-access-token");
    const username = window.localStorage.getItem("replica-eu-username") ?? "";
    const email = window.localStorage.getItem("replica-eu-email") ?? "";
    const telegram = window.localStorage.getItem("replica-eu-telegram") ?? "";
    const role = window.localStorage.getItem("replica-eu-role") ?? "user";

    setProfile({
      username,
      email,
      telegram,
      role,
      isSignedIn: Boolean(token || username)
    });
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

    setProfile({ username: "", email: "", telegram: "", role: "user", isSignedIn: false });
  }

  if (!profile.isSignedIn) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("account")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>{t("signedOut")}</p>
          <Button asChild variant="secondary" className="w-full">
            <Link href={`/${locale}/login`}>{t("signIn")}</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href={`/${locale}/register`}>{t("createAccount")}</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("account")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="flex items-center gap-2 rounded-2xl bg-muted p-3 font-bold">
          <UserRound className="h-4 w-4" />
          {profile.username || t("unknown")}
        </p>
        <p className="flex items-center gap-2 rounded-2xl bg-muted p-3 font-bold">
          <Mail className="h-4 w-4" />
          {profile.email || t("unknown")}
        </p>
        <p className="flex items-center gap-2 rounded-2xl bg-muted p-3 font-bold">
          <Send className="h-4 w-4" />
          {profile.telegram || t("unknown")}
        </p>
        {profile.role === "admin" ? (
          <p className="rounded-2xl bg-black p-3 text-sm font-black text-white">{t("adminAccount")}</p>
        ) : null}
        <Button type="button" variant="outline" className="w-full" onClick={logout}>
          <LogOut className="h-4 w-4" />
          {t("logout")}
        </Button>
      </CardContent>
    </Card>
  );
}
