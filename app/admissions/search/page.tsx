import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GraduationCap, School as SchoolIcon, BookOpen } from "lucide-react";
import { getSchools, getProgrammeBySlugs } from "@/lib/admissions";
import type { School, Programme } from "../../types/admissions";
import { getProgrammesBySchool } from "@/lib/admissions";

function normalize(s: string) { return s.trim().toLowerCase(); }
function matches(hay: string, q: string) { return normalize(hay).includes(normalize(q)); }

export default async function AdmissionsSearch({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams?.q || "").trim();

  // If no query, show a simple empty state with the search box
  if (!q) {
    return (
      <main className="max-w-4xl mx-auto p-4">
        <header className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full mb-3">
            <GraduationCap className="h-3.5 w-3.5" /> Admissions Search
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Search schools & programmes</h1>
          <p className="text-slate-600 mt-1">Try queries like <em>UNILAG</em>, <em>Ibadan</em>, or <em>Computer Science</em>.</p>
        </header>
        <form action="/admissions/search" className="flex gap-2 max-w-2xl mx-auto">
          <Input name="q" placeholder="Search schools or programmes…" defaultValue={q} />
          <Button type="submit">Search</Button>
        </form>
      </main>
    );
  }

  // Load all schools and their programmes (from mock helpers)
  const schools = await getSchools();

  // Filter schools first
  const schoolHits: School[] = schools.filter((s) =>
    matches(s.name, q) || matches(s.city, q) || matches(s.state, q) || matches(s.slug, q)
  );

  // Filter programmes by iterating schools' programmes
  const programmeHits: { programme: Programme; school: School }[] = [];
  for (const s of schools) {
    const progs = await getProgrammesBySchool(s.id);
    for (const p of progs) {
      if (
        matches(p.name, q) ||
        matches(p.level, q) ||
        (p.summary ? matches(p.summary, q) : false) ||
        matches(p.slug, q)
      ) {
        programmeHits.push({ programme: p, school: s });
      }
    }
  }

  const hasResults = schoolHits.length > 0 || programmeHits.length > 0;

  return (
    <main className="max-w-6xl mx-auto p-4">
      {/* Header with search box */}
      <header className="mb-6">
        <form action="/admissions/search" className="flex gap-2 max-w-2xl">
          <Input name="q" placeholder="Search schools or programmes…" defaultValue={q} />
          <Button type="submit">Search</Button>
        </form>
        <p className="text-sm text-slate-600 mt-2">Showing results for: <strong>{q}</strong></p>
      </header>

      {!hasResults ? (
        <div className="bg-slate-50 border rounded-xl p-6">
          <p className="text-slate-700">No results. Try a school name (e.g., <em>UNILAG</em>) or a programme (e.g., <em>Computer Science</em>).</p>
          <div className="mt-3 text-sm text-slate-600">
            Tips:
            <ul className="list-disc ml-5">
              <li>Use school abbreviations: UNILAG, UI, OAU, ABU</li>
              <li>Try city or state: Lagos, Ibadan, Osun</li>
              <li>Use programme names: Business Administration, Mechanical Engineering</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Schools column */}
          <section>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><SchoolIcon className="h-5 w-5 text-blue-600" /> Schools</h2>
            {schoolHits.length === 0 ? (
              <p className="text-sm text-slate-600">No matching schools.</p>
            ) : (
              <ul className="space-y-2">
                {schoolHits.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/admissions/${s.slug}`} className="block p-3 border rounded-lg hover:shadow-sm transition">
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-slate-600">{s.city}, {s.state}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Programmes column */}
          <section>
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><BookOpen className="h-5 w-5 text-green-600" /> Programmes</h2>
            {programmeHits.length === 0 ? (
              <p className="text-sm text-slate-600">No matching programmes.</p>
            ) : (
              <ul className="space-y-2">
                {programmeHits.map(({ programme, school }) => (
                  <li key={`${school.slug}-${programme.slug}`}>
                    <Link href={`/admissions/${school.slug}/${programme.slug}`} className="block p-3 border rounded-lg hover:shadow-sm transition">
                      <div className="font-medium">{programme.name}</div>
                      <div className="text-xs text-slate-600">{school.name} • Level: {programme.level} {programme.open ? "• Open" : "• Closed"}</div>
                      {programme.summary && <div className="text-xs text-slate-600 mt-1 line-clamp-2">{programme.summary}</div>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}

      <div className="mt-8 text-sm">
        <Link href="/admissions" className="text-blue-600 hover:underline">← Back to Admissions</Link>
      </div>
    </main>
  );
}
