// ==========================================
// FILE: app/materials/[id]/page.tsx
// Material Detail — metadata + view/download + related (MODULAR: this file only)
// ==========================================
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getMaterialById, getMaterials } from "@/lib/materials";

export default async function MaterialPage({ params }: { params: { id: string } }) {
  const item = await getMaterialById(params.id);
  if (!item) return notFound();

  // Fetch simple related items (same school + courseCode or programme)
  const related = (await getMaterials({ schoolSlug: item.schoolSlug, programmeSlug: item.programmeSlug || undefined, courseCode: item.courseCode || undefined }))
    .filter(m => m.id !== item.id)
    .slice(0, 6);

  return (
    <main className="max-w-4xl mx-auto p-4">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-4 text-slate-600">
        <Link href="/materials" className="hover:underline">Materials</Link>
        <span> / </span>
        <span className="text-slate-900 line-clamp-1">{item.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{item.title}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span>{item.schoolName}</span>
              {item.programmeName && <span>• {item.programmeName}</span>}
              {item.level && <span>• Level {item.level}</span>}
              {item.courseCode && <span>• {item.courseCode}</span>}
              {item.year && <span>• Year: {item.year}</span>}
            </div>
          </div>
          <Badge variant="secondary" className="self-start">{item.kind}</Badge>
        </div>
      </header>

      {/* Actions */}
      <section className="mb-6 flex flex-wrap gap-2">
        {item.fileUrl ? (
          <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
            <Button>View / Download</Button>
          </a>
        ) : (
          <Button variant="outline" disabled>File not yet available</Button>
        )}
        <Link href={`/admissions/${item.schoolSlug}${item.programmeSlug ? `/${item.programmeSlug}` : ""}`}>
          <Button variant="outline">Go to programme</Button>
        </Link>
      </section>

      {/* Placeholder preview */}
      <section className="bg-slate-50 border rounded-xl p-6">
        <p className="text-sm text-slate-700">
          Preview is not enabled yet. Click <strong>View / Download</strong> to open the file.
          Later, we can embed PDF preview or text extraction here.
        </p>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Related materials</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {related.map((m) => (
              <Link key={m.id} href={`/materials/${m.id}`} className="border rounded-xl p-4 hover:shadow-md transition">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium line-clamp-2">{m.title}</div>
                    <div className="text-xs text-slate-600 mt-1">{m.schoolName}{m.programmeName ? ` • ${m.programmeName}` : ""}</div>
                    <div className="text-xs text-slate-600">Level {m.level}{m.courseCode ? ` • ${m.courseCode}` : ""}</div>
                  </div>
                  <Badge variant="secondary">{m.kind}</Badge>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-8 text-sm">
        <Link href="/materials" className="text-blue-600 hover:underline">← Back to Materials</Link>
      </div>
    </main>
  );
}
