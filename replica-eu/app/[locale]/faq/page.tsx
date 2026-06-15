export const metadata = { title: "FAQ" };

const faqs = [
  ["Is Replica EU selling counterfeit goods?", "No. Listings must be independent inspired-style products or explicitly authorized goods."],
  ["When is my preorder confirmed?", "After Stripe payment succeeds, the order status changes from pending to paid."],
  ["Can I cancel?", "Cancellation windows depend on whether the supplier batch has already closed."],
  ["Where do you ship?", "The checkout is designed for EU countries, with shipping options calculated per address."]
];

export default function FAQPage() {
  return (
    <section className="container max-w-3xl py-12">
      <p className="text-sm uppercase tracking-[0.26em] text-muted-foreground">FAQ</p>
      <h1 className="mt-3 font-display text-5xl">Common questions</h1>
      <div className="mt-8 divide-y rounded-lg border bg-white">
        {faqs.map(([question, answer]) => (
          <div key={question} className="p-6">
            <h2 className="font-medium">{question}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
