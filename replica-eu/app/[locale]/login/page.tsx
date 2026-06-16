import { SupabaseAuthForm } from "@/components/auth/supabase-auth-form";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n";

export const metadata = { title: "Login" };

export default function LoginPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);

  return (
    <section className="container flex min-h-[70vh] items-center justify-center py-12">
      <SupabaseAuthForm locale={params.locale} mode="login" />
    </section>
  );
}
