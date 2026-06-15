import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="container max-w-3xl py-12">
      <p className="text-sm uppercase tracking-[0.26em] text-muted-foreground">Contact</p>
      <h1 className="mt-3 font-display text-5xl">Talk to Replica EU</h1>
      <form className="mt-8 grid gap-4 rounded-lg border bg-white p-6">
        <div className="grid gap-2">
          <Label>Name</Label>
          <Input />
        </div>
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input type="email" />
        </div>
        <label className="grid gap-2 text-sm">
          Message
          <textarea className="min-h-32 rounded-md border bg-background px-3 py-2" />
        </label>
        <Button>Send message</Button>
      </form>
    </section>
  );
}
