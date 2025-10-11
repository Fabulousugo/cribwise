/* eslint-disable @typescript-eslint/no-explicit-any */
// ==========================================
// FILE: app/api/materials/create/route.ts
// Accepts multipart form from /materials/upload and appends to mock store
// Later: swap storage for Cloudflare Images or Supabase Storage, and insert into DB
// ==========================================
import { NextRequest } from "next/server";
import { __addMaterialMock, type Material, type MaterialKind } from "@/lib/materials";
import { getSchools } from "@/lib/admissions";

function randomId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const title = String(form.get("title") || "");
    const kind = String(form.get("kind") || "") as MaterialKind;
    const schoolSlug = String(form.get("schoolSlug") || "");
    const programmeSlug = String(form.get("programmeSlug") || "");
    const level = String(form.get("level") || "");
    const courseCode = String(form.get("courseCode") || "");
    const year = String(form.get("year") || "");
    const file = form.get("file") as File | null;

    if (!title || !kind || !schoolSlug) {
      return Response.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // Map slug -> name
    const schools = await getSchools();
    const school = schools.find((s) => s.slug === schoolSlug);
    const schoolName = school?.name || schoolSlug;

    // TODO: upload the file to storage and get URL
    const fileUrl = "";
    if (file && file.size > 0) {
      // Placeholder: you can upload to Cloudflare Images/Supabase here and set fileUrl
      // For now we ignore the bytes to keep costs at zero.
    }

    const mat: Material = {
      id: randomId(),
      title,
      kind,
      schoolSlug,
      schoolName,
      programmeSlug: programmeSlug || undefined,
      programmeName: undefined, // (optional) look up from programmes list later
      level: level || undefined,
      courseCode: courseCode || undefined,
      year: year || undefined,
      fileUrl,
      createdAt: new Date().toISOString(),
    };

    await __addMaterialMock(mat);

    // Redirect back to the material page in a simple flow
    return Response.redirect(new URL(`/materials/${mat.id}`, req.url));
  } catch (e: any) {
    return Response.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
