/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, LayoutGrid, Rows, Search, Sparkles, Users, Zap, TrendingUp, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

  const safeQuery = Object.fromEntries(
    Object.entries({ q, school, category, from, to }).filter(([, v]) => typeof v === "string" && v && v !== "all")
  ) as Record<string, string>;
  const gridHref = (() => { const u = new URLSearchParams(safeQuery); u.set("view", "grid"); return `/events?${u.toString()}`; })();
  const listHref = (() => { const u = new URLSearchParams(safeQuery); u.set("view", "list"); return `/events?${u.toString()}`; })();

  const featured = events.slice(0, 3);
  const hasActiveFilters = q || school || category || from || to;

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse delay-75"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" /> Campus Events
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
            What&apos;s Happening This Week 🎉
          </h1>
          
          <p className="text-slate-700 dark:text-slate-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Workshops, career fairs, tech meetups, and socials — real events you can actually attend, no cap
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 text-sm font-bold border-2 border-purple-200 dark:border-purple-800">
              <CalendarDays className="h-4 w-4 mr-2" />
              {events.length}+ Events
            </Badge>
            <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 text-sm font-bold border-2 border-blue-200 dark:border-blue-800">
              <Users className="h-4 w-4 mr-2" />
              All Campuses
            </Badge>
            <Badge className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-4 py-2 text-sm font-bold border-2 border-pink-200 dark:border-pink-800">
              <TrendingUp className="h-4 w-4 mr-2" />
              Weekly Updates
            </Badge>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {featured.length > 0 && (
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-black mb-2">Featured Events 🔥</h2>
              <p className="text-slate-600 dark:text-slate-400">Don&apos;t miss these happening soon</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featured.map((ev) => (
                <Link key={ev.id} href={`/events/${ev.id}`}>
                  <Card className="group overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative aspect-[16/9]">
                      <Cover ev={ev} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      {ev.category && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-purple-600 text-white font-bold shadow-lg">
                            {ev.category}
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-bold text-lg line-clamp-2 drop-shadow-lg">{ev.title}</h3>
                        <p className="text-sm text-white/90 mt-1">{ev.schoolName || ev.schoolSlug}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="border-2 border-purple-100 dark:border-purple-900/30 shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-xl flex items-center justify-center">
                  <Search className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Find Your Next Event</CardTitle>
                  <CardDescription className="dark:text-slate-400">
                    Filter by school, category, or date range
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <form className="space-y-4" action="/events" method="get">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input 
                    name="q" 
                    defaultValue={q} 
                    placeholder="Search titles, speakers, venues…"
                    className="pl-12 h-12 text-base border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                {/* Filter Grid */}
                <div className="grid md:grid-cols-4 gap-3">
                  {/* School */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">School</label>
                    <Select name="school" defaultValue={school || "all"}>
                      <SelectTrigger className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl">
                        <SelectValue placeholder="All schools" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All schools</SelectItem>
                        {schools.map((s) => (
                          <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Category</label>
                    <Select name="category" defaultValue={category || "all"}>
                      <SelectTrigger className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl">
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All categories</SelectItem>
                        {filters.categories.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date From */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">From Date</label>
                    <Input 
                      type="date" 
                      name="from" 
                      defaultValue={from}
                      className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>

                  {/* Date To */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">To Date</label>
                    <Input 
                      type="date" 
                      name="to" 
                      defaultValue={to}
                      className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl px-6"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Apply Filters
                  </Button>
                  <Link href="/events">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold rounded-xl"
                    >
                      Reset All
                    </Button>
                  </Link>
                  {hasActiveFilters && (
                    <Badge variant="outline" className="px-3 py-2">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Filters Active
                    </Badge>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Toolbar */}
      <section className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black">
                {events.length === 0 ? "No Events Found" : `${events.length} Event${events.length !== 1 ? 's' : ''} Available`}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {events.length === 0 ? "Try adjusting your filters" : "Click any event to see full details"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link 
                href={gridHref} 
                scroll={false} 
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                  view !== "list" 
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg" 
                    : "bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="text-sm">Grid</span>
              </Link>
              <Link 
                href={listHref} 
                scroll={false} 
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                  view === "list" 
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg" 
                    : "bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700"
                }`}
              >
                <Rows className="h-4 w-4" />
                <span className="text-sm">List</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-6 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {events.length === 0 ? (
            <EmptyState />
          ) : view === "list" ? (
            <ul className="space-y-4">
              {events.map((ev) => (
                <li key={ev.id}><EventRow ev={ev} /></li>
              ))}
            </ul>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((ev) => (
                <EventCard key={ev.id} ev={ev} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-95"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-sm font-bold bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" /> Host Your Event
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Got an Event Coming Up? 📣
          </h2>
          
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            List your campus event and reach thousands of students. Whether it&apos;s a workshop, meetup, or party — let&apos;s make it epic!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-purple-700 hover:bg-slate-100 font-bold rounded-2xl px-8"
            >
              <Zap className="h-5 w-5 mr-2" />
              <Link href="/events/create" className="font-bold">
                List Your Event
              </Link>
              
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-blue-800 hover:bg-white/10 font-bold rounded-2xl backdrop-blur-sm"
              asChild
            >
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>

          <p className="text-white/70 text-sm mt-8">
            Connecting 20,000+ students across Nigeria 🇳🇬
          </p>
        </div>
      </section>
    </main>
  );
}

// ---------- pieces ----------
function EmptyState() {
  return (
    <Card className="border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-800 dark:to-purple-950/20">
      <CardContent className="p-12 text-center">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <CalendarDays className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-bold mb-3">No events match your search 🤔</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
          Try widening your date range or removing some filters. New events are added daily!
        </p>
        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
          <p>💡 <span className="font-semibold">Pro tip:</span> Browse by school first, then narrow by category</p>
          <p>📅 <span className="font-semibold">Date range:</span> Try selecting a wider time period</p>
          <p>🎓 <span className="font-semibold">All events:</span> Remove filters to see everything</p>
        </div>
        <Link href="/events">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl">
            Clear All Filters
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

function EventCard({ ev }: { ev: EventItem }) {
  return (
    <Link href={`/events/${ev.id}`}>
      <Card className="group h-full overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        <div className="relative aspect-[16/9]">
          <Cover ev={ev} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {ev.category && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-purple-600 text-white font-bold shadow-lg">
                {ev.category}
              </Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-bold text-lg leading-snug line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-3">
            {ev.title}
          </h3>
          
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 flex-shrink-0" />
              <span className="line-clamp-1">{fmtRange(ev.startISO, ev.endISO)}</span>
            </div>
            {ev.location?.label && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="line-clamp-1">{ev.location.label}</span>
              </div>
            )}
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              📍 {ev.schoolName || ev.schoolSlug}
            </p>
          </div>

          <Button 
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl group-hover:scale-105 transition-transform"
            size="sm"
          >
            <Zap className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

function EventRow({ ev }: { ev: EventItem }) {
  return (
    <Link href={`/events/${ev.id}`}>
      <Card className="group grid md:grid-cols-[240px,1fr] gap-0 overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-xl transition-all">
        <div className="relative aspect-[16/9] md:aspect-auto">
          <Cover ev={ev} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {ev.category && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-purple-600 text-white font-bold shadow-lg text-xs">
                {ev.category}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-5 flex flex-col justify-center">
          <h3 className="font-bold text-xl leading-snug line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-3">
            {ev.title}
          </h3>
          
          <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400 mb-2">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {fmtRange(ev.startISO, ev.endISO)}
            </span>
            {ev.location?.label && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {ev.location.label}
              </span>
            )}
          </div>
          
          <p className="text-xs text-slate-500 dark:text-slate-400">
            📍 {ev.schoolName || ev.schoolSlug}
          </p>
        </div>
      </Card>
    </Link>
  );
}