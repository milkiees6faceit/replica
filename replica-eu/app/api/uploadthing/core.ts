import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  productImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 6 } })
    .middleware(async () => ({ uploadedBy: "admin" }))
    .onUploadComplete(async ({ file }) => {
      console.info("Product image uploaded", file.url);
      return { url: file.url };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
