import { SupabaseAuthForm } from "@/components/auth/supabase-auth-form";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n";

export const metadata = { title: "Register" };

export default function RegisterPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);

  return (
    <section className="container flex min-h-[76vh] items-center justify-center py-12 pb-24 md:pb-12">
      <SupabaseAuthForm locale={params.locale} mode="register" />
    </section>
  );
}
