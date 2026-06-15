import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = { title: "Admin" };

export default function AdminPage() {
  return (
    <section className="container py-10">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.26em] text-muted-foreground">Admin</p>
        <h1 className="mt-2 font-display text-5xl">Marketplace control room</h1>
      </div>
      <AdminShell />
    </section>
  );
}
