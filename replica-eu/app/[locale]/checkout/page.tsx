import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { euCountries } from "@/lib/data";

export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <section className="container max-w-5xl py-10">
      <h1 className="font-display text-5xl">Checkout</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <form className="rounded-lg border bg-white p-6">
          <h2 className="font-display text-2xl">Shipping address</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {["First name", "Last name", "Email", "Phone", "Address line", "City", "Postal code"].map((label) => (
              <div key={label} className={label === "Address line" ? "grid gap-2 sm:col-span-2" : "grid gap-2"}>
                <Label>{label}</Label>
                <Input />
              </div>
            ))}
            <label className="grid gap-2 text-sm">
              EU country
              <select className="h-10 rounded-md border bg-background px-3">
                {euCountries.map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </label>
          </div>
        </form>
        <aside className="h-fit rounded-lg border bg-white p-6">
          <CreditCard className="h-6 w-6" />
          <h2 className="mt-4 font-display text-2xl">Stripe payment</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Checkout session is created by `/api/checkout`. VAT calculation is intentionally left as a placeholder for
            your accountant or tax provider.
          </p>
          <form action="/api/checkout" method="POST">
            <Button className="mt-6 w-full">Pay securely</Button>
          </form>
        </aside>
      </div>
    </section>
  );
}
