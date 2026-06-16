import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n";

export const metadata = { title: "Contact" };

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  const t = useTranslations("pages");

  return (
    <section className="container max-w-3xl py-12">
      <p className="text-sm uppercase tracking-[0.26em] text-muted-foreground">{t("contactEyebrow")}</p>
      <h1 className="mt-3 font-display text-5xl">{t("contactTitle")}</h1>
      <form className="mt-8 grid gap-4 rounded-lg border bg-white p-6">
        <div className="grid gap-2">
          <Label>{t("name")}</Label>
          <Input />
        </div>
        <div className="grid gap-2">
          <Label>{t("email")}</Label>
          <Input type="email" />
        </div>
        <label className="grid gap-2 text-sm">
          {t("message")}
          <textarea className="min-h-32 rounded-md border bg-background px-3 py-2" />
        </label>
        <Button>{t("send")}</Button>
      </form>
    </section>
  );
}
