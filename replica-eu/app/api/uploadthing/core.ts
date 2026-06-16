import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { isAdminEmail } from "@/lib/admin";
import { getAdminSession } from "@/lib/admin-auth";

const f = createUploadthing();

async function getSupabaseAdminEmail(accessToken: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/auth/v1/user`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${accessToken}`
    }
  }).catch(() => null);

  if (!response?.ok) {
    return null;
  }

  const user = (await response.json().catch(() => null)) as { email?: string } | null;
  return user?.email && isAdminEmail(user.email) ? user.email : null;
}

export const ourFileRouter = {
  productImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 6 } })
    .middleware(async ({ req }) => {
      const adminSession = await getAdminSession();
      const authHeader = req.headers.get("authorization") ?? "";
      const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : "";
      const supabaseAdminEmail = bearerToken ? await getSupabaseAdminEmail(bearerToken) : null;

      if (!adminSession?.user?.email && !supabaseAdminEmail) {
        throw new UploadThingError({ code: "FORBIDDEN", message: "Admin access required" });
      }

      return { uploadedBy: adminSession?.user?.email ?? supabaseAdminEmail };
    })
    .onUploadComplete(async ({ file }) => {
      console.info("Product image uploaded", file.url);
      return { url: file.url };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
