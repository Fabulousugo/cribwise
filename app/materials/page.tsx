import Link from "next/link";
import { Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { getMaterials, getMaterialFilters } from "@/lib/materials";
import { getSchools } from "@/lib/admissions";
import type { School } from "../types/admissions"; // ← use your alias

export default async function MaterialsHome({ searchParams }: { searchParams?: Record<string, string | string[]> }) {
  const q = typeof searchParams?.q === "string" ? searchParams.q : "";

  // read raw params from URL
  const rawSchool = typeof searchParams?.school === "string" ? searchParams.school : "";
  const rawLevel  = typeof searchParams?.level  === "string" ? searchParams.level  : "";
  const programme = typeof searchParams?.programme === "string" ? searchParams.programme : "";
  const course    = typeof searchParams?.course    === "string" ? searchParams.course    : "";

  // map non-empty sentinels → actual filters (empty string = no filter)
  const school = rawSchool === "all" ? "" : rawSchool;
  const level  = rawLevel  === "any" ? "" : rawLevel;

  // Fetch filters + data
  const schools = await getSchools();
  const filters = await getMaterialFilters();
  const materials = await getMaterials({ q, schoolSlug: school, programmeSlug: programme, level, courseCode: course });

  return (
    <main className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Study Materials</h1>
        <p className="text-slate-600">Past questions, lecture notes, and syllabi — tagged by school, programme, level, and course code.</p>
      </header>

      {/* Filters */}
      <form className="grid gap-3 md:grid-cols-5 mb-6" action="/materials" method="get">
        <div className="md:col-span-2">
          <Input name="q" defaultValue={q} placeholder="Search titles (e.g., Calculus, Thermodynamics)…" />
        </div>

        {/* School (uses sentinel 'all') */}
        <Select defaultValue={rawSchool || "all"}>
          <SelectTrigger><SelectValue placeholder="School" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All schools</SelectItem>
            {schools.map((s: School) => (
              <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* ensure selection is submitted in GET form */}
        <input type="hidden" name="school" value={rawSchool || "all"} />

        <Input name="programme" defaultValue={programme} placeholder="Programme slug (e.g., computer-science-bsc)" />

        {/* Level (uses sentinel 'any') */}
        <Select defaultValue={rawLevel || "any"}>
          <SelectTrigger><SelectValue placeholder="Level" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any level</SelectItem>
            {(filters.levels || ["100","200","300","400"]).map((lv: string) => (
              <SelectItem key={lv} value={lv}>{lv} level</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input type="hidden" name="level" value={rawLevel || "any"} />

        <Input name="course" defaultValue={course} placeholder="Course code (e.g., CSC201)" />

        <div className="md:col-span-5 flex gap-2">
          <Button type="submit">Apply filters</Button>
          <Link href="/materials"><Button type="button" variant="outline">Reset</Button></Link>
        </div>
      </form>

      {/* Results */}
      {materials.length === 0 ? (
        <div className="bg-slate-50 border rounded-xl p-6">
          <p className="text-slate-700">No materials match your filters.</p>
          <ul className="text-sm text-slate-600 list-disc ml-5 mt-2">
            <li>Try removing some filters or searching by course code (e.g., CSC201).</li>
            <li>Check other levels (100–400) or browse by school only.</li>
          </ul>
        </div>
      ) : (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((m) => (
            <Link key={m.id} href={`/materials/${m.id}`} className="border rounded-xl p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold line-clamp-2">{m.title}</h2>
                  <p className="text-xs text-slate-600 mt-1">{m.schoolName}{m.programmeName ? ` • ${m.programmeName}` : ""}</p>
                  <p className="text-xs text-slate-600">Level {m.level}{m.courseCode ? ` • ${m.courseCode}` : ""}</p>
                </div>
                <Badge variant="secondary">{m.kind}</Badge>
              </div>
              {m.year && <div className="text-xs text-slate-600 mt-2">Year: {m.year}</div>}
            </Link>
          ))}
        </section>
      )}

      <div className="mt-8 text-sm">
        <Link href="/admissions" className="text-blue-600 hover:underline">← Back to Admissions</Link>
      </div>
    </main>
  );
}
