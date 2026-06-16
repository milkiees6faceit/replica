import { NextResponse } from "next/server";

function configured(value: string | undefined, placeholder?: string) {
  return Boolean(value && (!placeholder || !value.includes(placeholder)));
}

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const nextAuthUrl = process.env.NEXTAUTH_URL;

  const checks = {
    appUrl: configured(appUrl, "localhost"),
    nextAuthUrl: configured(nextAuthUrl, "localhost"),
    nextAuthSecret: configured(process.env.NEXTAUTH_SECRET, "replace"),
    supabaseUrl: configured(supabaseUrl, "your-project"),
    supabasePublishableKey: configured(supabaseKey, "replace"),
    databaseUrl: configured(process.env.DATABASE_URL, "localhost"),
    stripe: configured(process.env.STRIPE_SECRET_KEY, "replace") && configured(process.env.STRIPE_WEBHOOK_SECRET, "replace"),
    resend: configured(process.env.RESEND_API_KEY, "replace"),
    uploadthing: configured(process.env.UPLOADTHING_SECRET, "replace") && configured(process.env.UPLOADTHING_APP_ID, "replace")
  };

  let supabaseProductsTable = false;
  if (checks.supabaseUrl && checks.supabasePublishableKey) {
    const response = await fetch(`${supabaseUrl?.replace(/\/$/, "")}/rest/v1/replica_products?select=id&limit=1`, {
      headers: {
        apikey: supabaseKey ?? "",
        Authorization: `Bearer ${supabaseKey}`
      },
      next: { revalidate: 0 }
    }).catch(() => null);

    supabaseProductsTable = response?.ok ?? false;
  }

  const result = {
    status: Object.values({ ...checks, supabaseProductsTable }).every(Boolean) ? "ready" : "needs_setup",
    checks: {
      ...checks,
      supabaseProductsTable
    },
    updatedAt: new Date().toISOString()
  };

  return NextResponse.json(result);
}
