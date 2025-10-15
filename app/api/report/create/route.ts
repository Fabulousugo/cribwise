import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Parse multipart form-data
  const form = await req.formData();
  const type = (form.get("type") as string) ?? "other";
  const listingRef = (form.get("listingRef") as string) ?? "";
  const message = (form.get("message") as string) ?? "";
  const evidence = form.get("evidence"); // File | null

  // TODO: (optional) auth check if your API requires it
  // const session = await getSession(); if (!session) return NextResponse.redirect(new URL("/signin", req.url));

  // TODO: persist to your DB / storage
  // - message, type, listingRef
  // - if (evidence instanceof File) read as ArrayBuffer and upload to S3/Blob, etc.
  // const buf = evidence && evidence instanceof File ? Buffer.from(await evidence.arrayBuffer()) : undefined;

  // After saving, redirect back to the page with a success flag
  const redirectUrl = new URL("/report?submitted=1", req.url);
  return NextResponse.redirect(redirectUrl, { status: 303 }); // 303 so browsers re-GET the page
}

// Optional: increase body size for uploads (Next 14+)
export const config = {
  api: {
    bodyParser: false, // required for formData
  },
};
