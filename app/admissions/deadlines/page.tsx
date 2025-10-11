/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { GraduationCap, Clock, School as SchoolIcon, BookOpen } from "lucide-react";
import { getSchools, getProgrammesBySchool } from "@/lib/admissions";
import type { School, Programme } from "../../types/admissions";

function parseISO(d?: string | null): Date | null {
  if (!d) return null;
  const date = new Date(d);
  return isNaN(date.getTime()) ? null : date;
}

export default async function DeadlinesPage() {
  const schools = await getSchools();

  // Build a combined list of deadlines from schools and their programmes
  const items: Array<
    | { kind: "school"; school: School; date: Date }
    | { kind: "programme"; school: School; programme: Programme; date: Date }
  > = [];

  for (const s of schools) {
    const sDate = parseISO(s.nextDeadline);
    if (sDate) items.push({ kind: "school", school: s, date: sDate });

    const progs = await getProgrammesBySchool(s.id);
    for (const p of progs) {
      const pDate = parseISO(p.nextDeadline);
      if (pDate) items.push({ kind: "programme", school: s, programme: p, date: pDate });
    }
  }

  // Sort ascending by date
  items.sort((a, b) => a.date.getTime() - b.date.getTime());

  // Group by YYYY MMM label
  const groups = new Map<string, typeof items>();
  for (const it of items) {
    const label = it.date.toLocaleDateString(undefined, { year: "numeric", month: "long" });
    if (!groups.has(label)) groups.set(label, [] as any);
    groups.get(label)!.push(it);
  }

  const hasAny = items.length > 0;

  return (
    <main className="max-w-5xl mx-auto p-4">
      {/* Header */}
      <header className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full mb-3">
          <GraduationCap className="h-3.5 w-3.5" /> Admissions Deadlines
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">Upcoming deadlines</h1>
        <p className="text-slate-600 mt-1">Track school and programme-specific key dates so you never miss a window.</p>
      </header>

      {!hasAny ? (
        <div className="bg-slate-50 border rounded-xl p-6">
          <p className="text-slate-700">No deadlines available yet. Check individual schools or programmes for details.</p>
          <div className="mt-3 text-sm">
            <Link href="/admissions" className="text-blue-600 hover:underline">← Back to Admissions</Link>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {Array.from(groups.entries()).map(([monthLabel, arr]) => (
            <section key={monthLabel}>
              <h2 className="text-lg font-semibold mb-3">{monthLabel}</h2>
              <ul className="space-y-2">
                {arr.map((it, idx) => {
                  const dateStr = it.date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
                  if (it.kind === "school") {
                    return (
                      <li key={`s-${it.school.slug}-${idx}`} className="p-3 border rounded-lg flex items-start gap-3">
                        <SchoolIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-medium">{it.school.name}</div>
                          <div className="text-xs text-slate-600">School-level deadline • {dateStr}</div>
                          <div className="text-xs mt-1 text-slate-600">{it.school.city}, {it.school.state}</div>
                        </div>
                        <Link href={`/admissions/${it.school.slug}`} className="text-sm text-blue-600 hover:underline">View</Link>
                      </li>
                    );
                  }
                  // programme
                  return (
                    <li key={`p-${it.school.slug}-${it.programme.slug}-${idx}`} className="p-3 border rounded-lg flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium">{it.programme.name}</div>
                        <div className="text-xs text-slate-600">{it.school.name} • Programme deadline • {dateStr}</div>
                      </div>
                      <Link href={`/admissions/${it.school.slug}/${it.programme.slug}`} className="text-sm text-blue-600 hover:underline">View</Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}

      <div className="mt-8 text-sm">
        <Link href="/admissions" className="text-blue-600 hover:underline">← Back to Admissions</Link>
      </div>
    </main>
  );
}
