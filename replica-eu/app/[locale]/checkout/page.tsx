import { CryptoCheckout } from "@/components/checkout/crypto-checkout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { euCountries } from "@/lib/data";

export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <section className="container max-w-6xl py-10 pb-24 md:pb-10">
      <div className="rounded-[32px] bg-black p-6 text-white md:p-10">
        <p className="text-sm font-black uppercase text-[#A29BFE]">Checkout</p>
        <h1 className="mt-2 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.07em] md:text-7xl">
          Confirm delivery and payment details.
        </h1>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <form className="h-fit rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_16px_60px_rgba(0,0,0,0.08)]">
          <h2 className="text-2xl font-black tracking-[-0.05em]">Shipping address</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {["First name", "Last name", "Email", "Phone", "Address line", "City", "Postal code"].map((label) => (
              <div key={label} className={label === "Address line" ? "grid gap-2 sm:col-span-2" : "grid gap-2"}>
                <Label>{label}</Label>
                <Input />
              </div>
            ))}
            <label className="grid gap-2 text-sm font-bold">
              EU country
              <select className="h-11 rounded-full border bg-muted px-4">
                {euCountries.map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </label>
          </div>
        </form>
        <CryptoCheckout profileUsername="your_username" />
      </div>
    </section>
  );
}
