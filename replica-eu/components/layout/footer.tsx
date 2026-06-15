import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { type Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const links = ["about", "contact", "faq", "terms", "privacy", "refund", "legal"];

  return (
    <footer className="mt-24 border-t border-black/5 bg-white pb-24 md:pb-0">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="text-3xl font-black tracking-[-0.05em]">Replica EU</h2>
          <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-muted-foreground">
            EU fashion preorder marketplace for inspired style from verified suppliers. Replica EU does not sell
            counterfeit goods and is not affiliated with luxury brands unless explicitly stated.
          </p>
          <div className="mt-5 flex w-fit items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-black">
            <ShieldCheck className="h-4 w-4" />
            Secure payments, supplier checks, EU delivery support.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm font-bold sm:grid-cols-4">
          {links.map((link) => (
            <Link key={link} href={`/${locale}/${link}`} className="capitalize text-muted-foreground hover:text-foreground">
              {link}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
