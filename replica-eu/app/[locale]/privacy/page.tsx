export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <section className="container max-w-3xl py-12">
      <h1 className="font-display text-5xl">Privacy Policy</h1>
      <div className="mt-6 space-y-4 leading-7 text-muted-foreground">
        <p>Replica EU stores account, order, shipping, and payment reference data needed to operate preorders.</p>
        <p>Payment card data is handled by Stripe. Email notifications are sent through Resend.</p>
        <p>Customers may request access, correction, or deletion subject to legal retention requirements.</p>
      </div>
    </section>
  );
}
