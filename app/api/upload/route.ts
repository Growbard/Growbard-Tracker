import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Client-upload flow: the browser uploads the file straight to Vercel Blob,
// this route only issues a short-lived upload token. Supports large PDFs/docs.
export async function POST(request: Request): Promise<NextResponse> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "File storage is not configured." }, { status: 501 });
  }
  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/png",
          "image/jpeg",
          "image/webp",
        ],
        maximumSizeInBytes: 25 * 1024 * 1024, // 25 MB
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {
        /* nothing to do server-side; the client saves the URL into the deal */
      },
    });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
