import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n";

export const metadata = { title: "Login" };

export default function LoginPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  const t = useTranslations("pages");

  return (
    <section className="container flex min-h-[70vh] items-center justify-center py-12">
      <form className="w-full max-w-md rounded-lg border bg-white p-6">
        <h1 className="font-display text-4xl">{t("loginTitle")}</h1>
        <div className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <Label>{t("email")}</Label>
            <Input type="email" name="email" />
          </div>
          <div className="grid gap-2">
            <Label>{t("password")}</Label>
            <Input type="password" name="password" />
          </div>
          <Button>{t("continue")}</Button>
        </div>
      </form>
    </section>
  );
}
