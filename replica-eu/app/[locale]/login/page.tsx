import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <section className="container flex min-h-[70vh] items-center justify-center py-12">
      <form className="w-full max-w-md rounded-lg border bg-white p-6">
        <h1 className="font-display text-4xl">Sign in</h1>
        <div className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input type="email" name="email" />
          </div>
          <div className="grid gap-2">
            <Label>Password</Label>
            <Input type="password" name="password" />
          </div>
          <Button>Continue</Button>
        </div>
      </form>
    </section>
  );
}
