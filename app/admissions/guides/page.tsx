
import Link from "next/link";
import { GraduationCap, FileText, Search, Calendar, Mail } from "lucide-react";

// TEMP data (replace with DB later)
const GUIDES = [
  {
    slug: "admissions-basics-nigeria",
    title: "Admissions basics in Nigeria",
    summary: "Understand JAMB/UTME, post‑UTME, cut‑offs, and direct entry in one page.",
    tags: ["JAMB", "UTME", "Post‑UTME"],
  },
  {
    slug: "how-to-track-deadlines",
    title: "How to track admissions deadlines",
    summary: "Never miss a window: portals to check, timelines, and reminder setup.",
    tags: ["Deadlines", "Portals", "Reminders"],
  },
  {
    slug: "link-your-school-email",
    title: "Link your school email (CribWise policy)",
    summary: "When to link it, accepted domains, and what happens if you don't.",
    tags: ["School email", "Verification"],
  },
  {
    slug: "prepare-documents",
    title: "Documents you need for applications",
    summary: "From O'Level to transcripts: a printable checklist.",
    tags: ["Documents", "Checklist"],
  },
];

export default function GuidesPage() {
  return (
    <main className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <header className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full mb-3">
          <GraduationCap className="h-3.5 w-3.5" /> Admissions Guides
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">Step‑by‑step guides</h1>
        <p className="text-slate-600 mt-1">Clear, Nigerian‑specific how‑tos to get you from interest to admission.</p>
      </header>

      {/* Filter bar (static for now) */}
      <div className="mb-4 flex flex-wrap gap-2 text-sm">
        <span className="px-3 py-1.5 bg-slate-100 rounded-md">All</span>
        <span className="px-3 py-1.5 bg-slate-100 rounded-md">Deadlines</span>
        <span className="px-3 py-1.5 bg-slate-100 rounded-md">Documents</span>
        <span className="px-3 py-1.5 bg-slate-100 rounded-md">Policy</span>
      </div>

      {/* Guides grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GUIDES.map((g) => (
          <Link key={g.slug} href={`/admissions/guides/${g.slug}`} className="border rounded-xl p-4 hover:shadow-md transition group">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h2 className="font-semibold group-hover:text-blue-700">{g.title}</h2>
                <p className="text-sm text-slate-600 mt-1 line-clamp-2">{g.summary}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {g.tags.map((t) => (
                    <span key={t} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <div className="mt-8 text-sm">
        <Link href="/admissions" className="text-blue-600 hover:underline">← Back to Admissions</Link>
      </div>
    </main>
  );
}
