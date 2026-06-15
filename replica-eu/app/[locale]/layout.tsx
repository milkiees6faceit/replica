import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { locales, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: {
    default: "Replica EU | EU fashion preorder marketplace",
    template: "%s | Replica EU"
  },
  description:
    "Preorder curated inspired-style fashion across Europe from verified suppliers. No counterfeit goods.",
  keywords: ["EU fashion preorder", "verified suppliers", "inspired style", "fashion marketplace"],
  openGraph: {
    title: "Replica EU",
    description: "Preorder curated fashion across Europe.",
    type: "website"
  }
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  if (!locales.includes(params.locale)) notFound();
  setRequestLocale(params.locale);
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={params.locale} messages={messages}>
      <Header locale={params.locale} />
      <main>{children}</main>
      <Footer locale={params.locale} />
    </NextIntlClientProvider>
  );
}
