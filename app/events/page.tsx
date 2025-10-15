// app/events/page.tsx — Refined, photo-forward redesign (no agents)
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, LayoutGrid, Rows, Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEvents, getEventFilters } from "@/lib/events";
import { getSchools } from "@/lib/admissions";
import type { EventItem } from "@/lib/events";

// ---------- utils ----------
function fmtRange(startISO: string, endISO?: string) {
  const start = new Date(startISO);
  const end = endISO ? new Date(endISO) : undefined;
  const s = start.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  if (!end) return s;
  const sameDay = start.toDateString() === end.toDateString();
  const e = end.toLocaleString(undefined, { month: sameDay ? undefined : "short", day: sameDay ? undefined : "numeric", hour: "2-digit", minute: "2-digit" });
  return sameDay ? `${s} – ${end.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}` : `${s} → ${e}`;
}

// Prefer event-provided image. Otherwise, use a tasteful gradient cover (no external hosts required).
const GRADIENTS = [
  "from-indigo-600 via-purple-600 to-fuchsia-600",
  "from-rose-500 via-orange-500 to-amber-400",
  "from-sky-500 via-cyan-500 to-teal-500",
  "from-emerald-600 via-lime-500 to-yellow-400",
  "from-slate-700 via-slate-600 to-slate-500",
];
function gradientIndex(key: string) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return h % GRADIENTS.length;
}

function Cover({ ev, className }: { ev: EventItem; className?: string }) {
  const g = GRADIENTS[gradientIndex(ev.id || ev.title)];
  const titleInitials = ev.title
    .split(/\s+/)
    .slice(0, 3)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  const src = (ev as any).imageUrl as string | undefined;
  if (src) {
    return (
      <Image
        src={src}
        alt={ev.title}
        width={1200}
        height={800}
        unoptimized
        className={className || "h-full w-full object-cover"}
      />
    );
  }
  return (
    <div className={`h-full w-full bg-gradient-to-br ${g} relative ${className || ""}`}>
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_top_left,white,transparent_40%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white/90 font-black tracking-tight text-4xl drop-shadow-sm">
          {titleInitials}
        </span>
      </div>
    </div>
  );
}

export default async function EventsPage({ searchParams }: { searchParams?: Record<string, string | string[]> }) {
  const q = typeof searchParams?.q === "string" ? searchParams.q : "";
  const school = typeof searchParams?.school === "string" ? searchParams.school : "";
  const category = typeof searchParams?.category === "string" ? searchParams.category : "";
  const from = typeof searchParams?.from === "string" ? searchParams.from : "";
  const to = typeof searchParams?.to === "string" ? searchParams.to : "";
  const view = typeof searchParams?.view === "string" ? searchParams.view : "grid";

  const [schools, filters, events] = await Promise.all([
    getSchools(),
    getEventFilters(),
    getEvents({ q, schoolSlug: school, category: (category as any) || "", from: from ? new Date(from).toISOString() : "", to: to ? new Date(to).toISOString() : "" }),
  ]);

  // Build serialisable hrefs for view toggles
  const safeQuery = Object.fromEntries(
    Object.entries({ q, school, category, from, to }).filter(([, v]) => typeof v === "string" && v && v !== "all")
  ) as Record<string, string>;
  const gridHref = (() => { const u = new URLSearchParams(safeQuery); u.set("view", "grid"); return `/events?${u.toString()}`; })();
  const listHref = (() => { const u = new URLSearchParams(safeQuery); u.set("view", "list"); return `/events?${u.toString()}`; })();

  const featured = events.slice(0, 3);

  return (
    <main className="max-w-7xl mx-auto p-4">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-background mb-10 border">
        <div className="grid md:grid-cols-[1.15fr,0.85fr] gap-0">
          <div className="p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-slate-50 text-slate-700 text-xs">
              <Sparkles className="h-4 w-4" /> Hand‑picked campus events
            </div>
            <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">What’s happening this week</h1>
            <p className="mt-2 text-slate-600 max-w-prose">Workshops, career fairs, tech meetups and socials — real events you can attend (no agents).</p>

            {/* Search + filters */}
            <form action="/events" method="get" className="mt-6 grid gap-3 md:grid-cols-6">
              <div className="md:col-span-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input name="q" defaultValue={q} placeholder="Search titles, speakers, venues…" className="pl-9" />
                </div>
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
          </div>

          {/* Featured column */}
          <div className="grid grid-rows-3 divide-y md:divide-y-0 md:divide-x bg-slate-50 md:rounded-r-3xl overflow-hidden">
            {featured.map((ev) => (
              <Link key={ev.id} href={`/events/${ev.id}`} className="group relative block">
                <div className="relative aspect-[16/10] md:aspect-[16/6]">
                  <Cover ev={ev} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
                </div>
                <div className="absolute inset-0 p-4 flex items-end">
                  <div className="text-white drop-shadow">
                    <div className="text-xs opacity-90">{ev.schoolName || ev.schoolSlug}</div>
                    <div className="font-semibold leading-snug line-clamp-2">{ev.title}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="text-slate-600 text-sm">{events.length} result{events.length === 1 ? "" : "s"}</div>
        <div className="flex items-center gap-2">
          <Link href={gridHref} scroll={false} className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border ${view !== "list" ? "bg-slate-900 text-white border-slate-900" : "bg-white"}`}>
            <LayoutGrid className="h-4 w-4" /> <span className="text-xs">Grid</span>
          </Link>
          <Link href={listHref} scroll={false} className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border ${view === "list" ? "bg-slate-900 text-white border-slate-900" : "bg-white"}`}>
            <Rows className="h-4 w-4" /> <span className="text-xs">List</span>
          </Link>
        </div>
      </div>

      {/* Results */}
      {events.length === 0 ? (
        <EmptyState />
      ) : view === "list" ? (
        <ul className="space-y-3">
          {events.map((ev) => (
            <li key={ev.id}><EventRow ev={ev} /></li>
          ))}
        </ul>
      ) : (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((ev) => (
            <EventCard key={ev.id} ev={ev} />
          ))}
        </section>
      )}

      <div className="mt-10 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    </main>
  );
}

// ---------- pieces ----------
function EmptyState() {
  return (
    <div className="rounded-2xl border bg-slate-50 p-12 text-center">
      <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-white shadow flex items-center justify-center">
        <CalendarDays className="h-6 w-6 text-slate-600" />
      </div>
      <h3 className="text-lg font-semibold">No events match your filters</h3>
      <p className="text-slate-600 mt-1">Try a wider date range or browse by school first, then narrow by category.</p>
      <div className="mt-4">
        <Link href="/events"><Button variant="outline">Reset filters</Button></Link>
      </div>
    </div>
  );
}

function EventCard({ ev }: { ev: EventItem }) {
  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition">
      <div className="relative aspect-[16/9]">
        <Cover ev={ev} className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        {ev.category && (
          <div className="absolute top-3 left-3"><Badge variant="secondary" className="bg-white/90 text-slate-900">{ev.category}</Badge></div>
        )}
      </div>
      <CardContent className="p-4">
        <Link href={`/events/${ev.id}`} className="font-semibold leading-snug line-clamp-2 hover:underline">
          {ev.title}
        </Link>
        <div className="mt-2 space-y-1 text-sm text-slate-600">
          <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /> {fmtRange(ev.startISO, ev.endISO)}</div>
          {ev.location?.label && (
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {ev.location.label}</div>
          )}
          <div className="text-xs text-slate-500">{ev.schoolName || ev.schoolSlug}</div>
        </div>
        <div className="mt-3">
          <Link href={`/events/${ev.id}`} className="inline-flex items-center text-blue-600 hover:underline">View details →</Link>
        </div>
      </CardContent>
    </Card>
  );
}

function EventRow({ ev }: { ev: EventItem }) {
  return (
    <Link href={`/events/${ev.id}`} className="grid grid-cols-[120px,1fr] sm:grid-cols-[220px,1fr] gap-4 rounded-2xl border bg-white hover:shadow-md transition overflow-hidden">
      <div className="relative aspect-[16/10] sm:aspect-[16/9]">
        <Cover ev={ev} className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="py-4 pr-4">
        <div className="flex flex-wrap items-center gap-2">
          {ev.category && <Badge variant="secondary">{ev.category}</Badge>}
          <span className="text-xs text-slate-500">{ev.schoolName || ev.schoolSlug}</span>
        </div>
        <h3 className="mt-1 font-semibold leading-snug line-clamp-2">{ev.title}</h3>
        <div className="mt-1 text-sm text-slate-600 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> {fmtRange(ev.startISO, ev.endISO)}</span>
          {ev.location?.label && <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {ev.location.label}</span>}
        </div>
      </div>
    </Link>
  );
}

// This page is strictly for real events — not agents.
