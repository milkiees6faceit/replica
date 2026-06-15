export const metadata = { title: "Refund Policy" };

export default function RefundPage() {
  return (
    <section className="container max-w-3xl py-12">
      <h1 className="font-display text-5xl">Refund Policy</h1>
      <div className="mt-6 space-y-4 leading-7 text-muted-foreground">
        <p>Refund eligibility depends on preorder stage, supplier confirmation, and applicable consumer law.</p>
        <p>Before a batch closes, deposits may be refundable unless otherwise disclosed on the product page.</p>
        <p>After supplier ordering begins, refunds may be limited to failed fulfillment, defects, or statutory rights.</p>
      </div>
    </section>
  );
}
