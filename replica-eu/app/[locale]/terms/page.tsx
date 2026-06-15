export const metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <section className="container max-w-3xl py-12">
      <h1 className="font-display text-5xl">Terms of Service</h1>
      <div className="mt-6 space-y-4 leading-7 text-muted-foreground">
        <p>Replica EU facilitates preorder transactions between customers and verified suppliers.</p>
        <p>Preorder availability is limited by batch closing dates, supplier capacity, and payment confirmation.</p>
        <p>Users must provide accurate shipping and contact information for EU delivery.</p>
      </div>
    </section>
  );
}
