"use client";

import Link from "next/link";
import { Home, Search, ShieldCheck, ShoppingBag, Sparkles, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AccountButton } from "@/components/auth/account-button";
import { Button } from "@/components/ui/button";
import { localeNames, locales, type Locale } from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const [isAdmin, setIsAdmin] = useState(false);
  const links = [
    ["catalog", t("catalog")],
    ["about", t("about")],
    ["faq", t("faq")],
    ["legal", t("legal")],
    ...(isAdmin ? [["admin", t("admin")]] : [])
  ];
  const mobileLinks = [
    [Home, t("home"), `/${locale}`],
    [Search, t("shop"), `/${locale}/catalog`],
    [Sparkles, t("drops"), `/${locale}/catalog?status=limited`],
    ...(isAdmin ? [[ShieldCheck, t("admin"), `/${locale}/admin`]] : []),
    [ShoppingBag, t("bag"), `/${locale}/cart`]
  ];

  useEffect(() => {
    function syncRole() {
      setIsAdmin(window.localStorage.getItem("replica-eu-role") === "admin");
    }

    syncRole();
    window.addEventListener("storage", syncRole);
    return () => window.removeEventListener("storage", syncRole);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/86 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-xl font-black tracking-[-0.03em]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs text-white">RE</span>
            Replica EU
          </Link>
          <nav className="hidden items-center gap-2 text-sm font-bold text-muted-foreground md:flex">
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={`/${locale}/${href}`}
                className="rounded-full px-4 py-2 transition hover:bg-muted hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <div className="hidden rounded-full border border-black/10 bg-muted p-1 md:flex">
              {locales.map((item) => (
                <Link
                  key={item}
                  href={`/${item}`}
                  className={`rounded-full px-3 py-1 text-xs font-black ${item === locale ? "bg-black text-white" : ""}`}
                >
                  {localeNames[item]}
                </Link>
              ))}
            </div>
            <Button asChild variant="ghost" size="icon" aria-label="Dashboard">
              <Link href={`/${locale}/dashboard`}>
                <UserRound className="h-5 w-5" />
              </Link>
            </Button>
            <AccountButton locale={locale} />
            <Button asChild variant="secondary" size="icon" aria-label="Cart">
              <Link href={`/${locale}/cart`}>
                <ShoppingBag className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <nav
        className="fixed inset-x-3 bottom-3 z-50 grid rounded-[28px] border border-black/10 bg-white/92 p-2 shadow-[0_18px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl md:hidden"
        style={{ gridTemplateColumns: `repeat(${mobileLinks.length}, minmax(0, 1fr))` }}
      >
        {mobileLinks.map(([Icon, label, href]) => (
          <Link key={label as string} href={href as string} className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-black text-muted-foreground active:bg-muted">
            <Icon className="h-5 w-5" />
            {label as string}
          </Link>
        ))}
      </nav>
    </>
  );
}
