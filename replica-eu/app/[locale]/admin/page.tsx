import { AdminShell } from "@/components/admin/admin-shell";
import { useTranslations } from "next-intl";

export const metadata = { title: "Admin" };

export default function AdminPage() {
  const t = useTranslations("pages");

  return (
    <section className="container py-10">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.26em] text-muted-foreground">{t("adminEyebrow")}</p>
        <h1 className="mt-2 font-display text-5xl">{t("adminTitle")}</h1>
      </div>
      <AdminShell />
    </section>
  );
}
