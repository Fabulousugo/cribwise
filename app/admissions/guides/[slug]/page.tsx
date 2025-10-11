
import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, GraduationCap } from "lucide-react";
import { getGuideBySlug } from "@/lib/guides"; 
import { GuideProse } from "@/components/admissions/GuideProse"; 

export default async function GuidePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return notFound();

  return (
    <main className="max-w-3xl mx-auto p-4">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-4 text-slate-600">
        <Link href="/admissions" className="hover:underline">Admissions</Link>
        <span> / </span>
        <Link href="/admissions/guides" className="hover:underline">Guides</Link>
        <span> / </span>
        <span className="text-slate-900">{guide.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-4">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full mb-3">
          <GraduationCap className="h-3.5 w-3.5" /> Admissions Guide
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">{guide.title}</h1>
        {guide.summary && <p className="text-slate-600 mt-1">{guide.summary}</p>}
        {guide.tags?.length ? (
          <div className="mt-2 flex flex-wrap gap-1">
            {guide.tags.map((t: string) => (
              <span key={t} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">{t}</span>
            ))}
          </div>
        ) : null}
      </header>

      {/* Body (MDX‑ready) */}
      <article className="prose prose-slate max-w-none">
        {/* If you don't implement GuideProse yet, you can render guide.body as plain HTML/MD or text */}
        <GuideProse content={guide.body} />
      </article>

      {/* Footer CTA */}
      <footer className="mt-8">
        <Link href="/admissions" className="text-blue-600 hover:underline">← Back to Admissions</Link>
      </footer>
    </main>
  );
}

// ---------- Types this page expects from lib/guides ----------
// export type Guide = { slug: string; title: string; summary?: string; tags?: string[]; body: string };

// ---------- Fallback if you don't implement GuideProse ----------
// export function GuideProse({ content }: { content: string }) {
//   return <div dangerouslySetInnerHTML={{ __html: content }} />;
// }