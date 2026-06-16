import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getAdminSession } from "@/lib/admin-auth";

const f = createUploadthing();

export const ourFileRouter = {
  productImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 6 } })
    .middleware(async () => {
      const adminSession = await getAdminSession();

      if (!adminSession?.user?.email) {
        throw new UploadThingError({ code: "FORBIDDEN", message: "Admin access required" });
      }

      return { uploadedBy: adminSession.user.email };
    })
    .onUploadComplete(async ({ file }) => {
      console.info("Product image uploaded", file.url);
      return { url: file.url };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
