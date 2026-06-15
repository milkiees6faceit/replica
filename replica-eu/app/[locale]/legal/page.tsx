export const metadata = { title: "Legal Disclaimer" };

export default function LegalPage() {
  return (
    <section className="container max-w-3xl py-12">
      <p className="text-sm uppercase tracking-[0.26em] text-muted-foreground">Legal</p>
      <h1 className="mt-3 font-display text-5xl">Legal Disclaimer</h1>
      <div className="mt-6 space-y-4 leading-7 text-muted-foreground">
        <p>
          Replica EU is an independent EU fashion preorder marketplace. Replica EU is not affiliated, associated,
          authorized, endorsed by, or in any way officially connected with luxury brands or third-party trademark owners
          unless explicitly stated in writing on a product listing.
        </p>
        <p>
          Product names, descriptions, and marketplace positioning must not imply that goods are counterfeit, unauthorized
          copies, or branded products where no authorization exists.
        </p>
        <p>
          Replica EU positions its marketplace around inspired style, verified suppliers, and no counterfeit goods.
          Sellers and suppliers are expected to comply with intellectual property, consumer protection, customs, and tax
          laws applicable in the European Union.
        </p>
      </div>
    </section>
  );
}
