import { NextResponse } from "next/server";
import { loginWithSupabase } from "@/lib/supabase-auth";

export async function POST(request: Request) {
  try {
    const result = await loginWithSupabase(await request.json());

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
