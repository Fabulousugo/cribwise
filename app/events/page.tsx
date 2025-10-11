// ==========================================
// FILE: app/events/page.tsx
// Events Listing — filters: query, school, category, date range (MODULAR)
// ==========================================
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin } from "lucide-react";
import { getEvents, getEventFilters } from "@/lib/events";
import { getSchools } from "@/lib/admissions";
import type { EventItem } from "@/lib/events";

function fmtRange(startISO: string, endISO?: string) {
  const start = new Date(startISO);
  const end = endISO ? new Date(endISO) : undefined;
  const s = start.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  if (!end) return s;
  const sameDay = start.toDateString() === end.toDateString();
  const e = end.toLocaleString(undefined, { month: sameDay ? undefined : "short", day: sameDay ? undefined : "numeric", hour: "2-digit", minute: "2-digit" });
  return sameDay ? `${s} – ${end.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}` : `${s} → ${e}`;
}

export default async function EventsPage({ searchParams }: { searchParams?: Record<string, string | string[]> }) {
  const q = typeof searchParams?.q === "string" ? searchParams.q : "";
  const school = typeof searchParams?.school === "string" ? searchParams.school : ""; // slug
  const category = typeof searchParams?.category === "string" ? searchParams.category : "";
  const from = typeof searchParams?.from === "string" ? searchParams.from : ""; // yyyy-mm-dd
  const to = typeof searchParams?.to === "string" ? searchParams.to : "";

  const [schools, filters, events] = await Promise.all([
    getSchools(),
    getEventFilters(),
    getEvents({ q, schoolSlug: school, category: (category as any) || "", from: from ? new Date(from).toISOString() : "", to: to ? new Date(to).toISOString() : "" }),
  ]);

  return (
    <main className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Campus Events</h1>
        <p className="text-slate-600">Academic workshops, career fairs, tech meetups, and social life across campuses.</p>
      </header>

      {/* Filters */}
      <form action="/events" method="get" className="grid gap-3 md:grid-cols-6 mb-6">
        <div className="md:col-span-2">
          <Input name="q" defaultValue={q} placeholder="Search event titles or descriptions…" />
        </div>
                <Select name="school" defaultValue={school ? school : "all"}>
        <SelectTrigger><SelectValue placeholder="School" /></SelectTrigger>
        <SelectContent>
            <SelectItem value="all">All schools</SelectItem>
            {schools.map((s) => (
            <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>
            ))}
        </SelectContent>
        </Select>

        {/* Category select */}
        <Select name="category" defaultValue={category ? category : "all"}>
        <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
        <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {filters.categories.map((c) => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
        </SelectContent>
        </Select>

        <Input type="date" name="from" defaultValue={from} />
        <Input type="date" name="to" defaultValue={to} />
        <div className="md:col-span-6 flex gap-2">
          <Button type="submit">Apply filters</Button>
          <Link href="/events"><Button variant="outline" type="button">Reset</Button></Link>
        </div>
      </form>

      {/* Results */}
      {events.length === 0 ? (
        <div className="bg-slate-50 border rounded-xl p-6">
          <p className="text-slate-700">No events match your filters.</p>
          <ul className="text-sm text-slate-600 list-disc ml-5 mt-2">
            <li>Try a different date range or remove some filters.</li>
            <li>Browse by school first, then narrow down by category.</li>
          </ul>
        </div>
      ) : (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((ev: EventItem) => (
            <Card key={ev.id} className="hover:shadow-md transition">
              <CardHeader>
                <CardTitle className="line-clamp-2">{ev.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-xs"><CalendarDays className="h-4 w-4" /> {fmtRange(ev.startISO, ev.endISO)}</div>
                {ev.location?.label && (
                  <div className="flex items-center gap-2 text-xs"><MapPin className="h-4 w-4" /> {ev.location.label}</div>
                )}
                <div className="text-xs text-slate-600">{ev.schoolName || ev.schoolSlug}</div>
                <div className="pt-2">
                  <Link href={`/events/${ev.id}`} className="text-blue-600 hover:underline">View details →</Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      <div className="mt-8 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    </main>
  );
}
