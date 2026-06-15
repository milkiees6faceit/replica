import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-sm uppercase tracking-[0.26em] text-muted-foreground">404</p>
      <h1 className="mt-4 font-display text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The preorder you are looking for may have closed or moved.
      </p>
      <Button asChild className="mt-8">
        <Link href="/en/catalog">Return to catalog</Link>
      </Button>
    </section>
  );
}
