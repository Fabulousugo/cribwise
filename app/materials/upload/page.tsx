// ==========================================
// FILE: app/materials/upload/page.tsx
// Materials Upload — simple server-rendered form (MODULAR: this file only)
// Next step: add API route at /api/materials/create and optional client component
// ==========================================
import { getSchools } from "@/lib/admissions";
import type { School } from "../../types/admissions";
import Link from "next/link";

export const dynamic = "force-dynamic"; // ensure fresh school list

export default async function MaterialsUploadPage() {
  const schools = await getSchools();

  return (
    <main className="max-w-3xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Upload Study Material</h1>
        <p className="text-slate-600">Add past questions, lecture notes, or syllabi. (Access control TBD)</p>
      </header>

      {/* Basic HTML form for now. We'll wire /api/materials/create next. */}
      <form action="/api/materials/create" method="post" encType="multipart/form-data" className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input name="title" required placeholder="e.g., CSC201 Past Questions (2019–2024)" className="mt-1 w-full border rounded-md px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Kind</label>
          <select  title="Kind" name="kind" required className="mt-1 w-full border rounded-md px-3 py-2">
            <option value="Past Questions">Past Questions</option>
            <option value="Lecture Notes">Lecture Notes</option>
            <option value="Syllabus">Syllabus</option>
            <option value="Textbook">Textbook</option>
            <option value="Assignment">Assignment</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">School</label>
            <select title="schoolSlug" name="schoolSlug" required className="mt-1 w-full border rounded-md px-3 py-2">
              {schools.map((s: School) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Programme (slug)</label>
            <input name="programmeSlug" placeholder="e.g., computer-science-bsc" className="mt-1 w-full border rounded-md px-3 py-2" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium">Level</label>
            <select title="Level" name="level" className="mt-1 w-full border rounded-md px-3 py-2">
              <option value="">—</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="PG">PG</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Course code</label>
            <input name="courseCode" placeholder="e.g., CSC201" className="mt-1 w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Year</label>
            <input name="year" placeholder="e.g., 2023/2024" className="mt-1 w-full border rounded-md px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">File (PDF preferred)</label>
          <input type="file" name="file" accept="application/pdf,image/*" className="mt-1 w-full" />
          <p className="text-xs text-slate-500 mt-1">Tip: For now this submits to /api/materials/create (to be implemented next). Later we’ll upload to Cloudflare Images or Supabase Storage.</p>
        </div>

        <div className="flex items-center gap-2">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Upload</button>
          <Link href="/materials" className="text-sm text-blue-600 hover:underline">Cancel</Link>
        </div>
      </form>

      <div className="mt-8 text-sm">
        <Link href="/materials" className="text-blue-600 hover:underline">← Back to Materials</Link>
      </div>
    </main>
  );
}


// ---------------- MOCK MUTATION (dev only) ----------------
export async function __addMaterialMock(m: Material) {
  // Prepend newest for visibility in mock mode
  try {
    await new Promise(r => setTimeout(r, 1000));
    MATERIALS.unshift(m);
  } catch {}
  return m;
}
