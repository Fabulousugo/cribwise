/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, LayoutGrid, Rows, Search, Sparkles, Users, Zap, TrendingUp, Clock, ExternalLink, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEvents, getEventFilters, isRegistrationOpen, getRegistrationBadge, getSpotsRemaining } from "@/lib/events";
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
              {featured.map((ev) => {
                const regOpen = isRegistrationOpen(ev);
                const regBadge = getRegistrationBadge(ev);
                const spotsLeft = getSpotsRemaining(ev);
                
                return (
                  <Card key={ev.id} className="group overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <Link href={`/events/${ev.id}`}>
                      <div className="relative aspect-[16/9]">
                        <Cover ev={ev} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        {/* Category Badge */}
                        {ev.category && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-purple-600 text-white font-bold shadow-lg">
                              {ev.category}
                            </Badge>
                          </div>
                        )}
                        
                        {/* Registration Status Badge */}
                        <div className="absolute top-3 right-3">
                          <Badge 
                            variant={regBadge.variant}
                            className={`font-bold shadow-lg ${
                              regBadge.label === "Registration Open" ? "bg-green-600 text-white" :
                              regBadge.label === "Almost Full" ? "bg-orange-600 text-white" :
                              regBadge.label === "Fully Booked" ? "bg-red-600 text-white" :
                              regBadge.label === "Walk-in Welcome" ? "bg-blue-600 text-white" :
                              "bg-slate-600 text-white"
                            }`}
                          >
                            {regBadge.label === "Registration Open" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {regBadge.label === "Almost Full" && <AlertCircle className="h-3 w-3 mr-1" />}
                            {regBadge.label === "Fully Booked" && <XCircle className="h-3 w-3 mr-1" />}
                            {regBadge.label}
                          </Badge>
                        </div>
                        
                        {/* Spots Remaining */}
                        {spotsLeft !== null && spotsLeft > 0 && spotsLeft <= 20 && (
                          <div className="absolute bottom-20 left-3">
                            <Badge className="bg-orange-500 text-white font-bold shadow-lg">
                              {spotsLeft} spots left
                            </Badge>
                          </div>
                        )}
                        
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="font-bold text-lg line-clamp-2 drop-shadow-lg">{ev.title}</h3>
                          <p className="text-sm text-white/90 mt-1">{ev.schoolName || ev.schoolSlug}</p>
                        </div>
                      </div>
                    </Link>
                    
                    {/* Register Button */}
                    <CardContent className="p-4">
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl"
                        size="sm"
                        asChild
                      >
                        <Link href={`/events/register/${ev.id}`}>
                          {regOpen ? (
                            <>
                              <Zap className="h-4 w-4 mr-2" />
                              Register Now
                            </>
                          ) : (
                            <>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Details
                            </>
                          )}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Search & Filter Section - KEEPING YOUR ORIGINAL CODE */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="border-2 border-slate-200 dark:border-slate-700 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                Find Your Perfect Event
              </CardTitle>
              <CardDescription>Filter by school, date, category, or search keywords</CardDescription>
            </CardHeader>
            <CardContent>
              <form method="GET" action="/events" className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Input name="q" placeholder="Search events..." defaultValue={q} className="border-2" />
                
                <Select name="school" defaultValue={school || "all"}>
                  <SelectTrigger className="border-2">
                    <SelectValue placeholder="All Schools" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Schools</SelectItem>
                    {schools.map((s) => (
                      <SelectItem key={s.slug} value={s.slug}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select name="category" defaultValue={category || "all"}>
                  <SelectTrigger className="border-2">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {filters.categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input name="from" type="date" placeholder="From" defaultValue={from} className="border-2" />
                <Input name="to" type="date" placeholder="To" defaultValue={to} className="border-2" />
                
                <Button 
                  type="submit" 
                  className="md:col-span-2 lg:col-span-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search Events
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Events List */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-1">
                {hasActiveFilters ? "Search Results" : "All Events"}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                {events.length} event{events.length !== 1 ? "s" : ""} found
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant={view === "grid" ? "default" : "outline"} size="sm" asChild>
                <Link href={gridHref}>
                  <LayoutGrid className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant={view === "list" ? "default" : "outline"} size="sm" asChild>
                <Link href={listHref}>
                  <Rows className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {events.length === 0 ? (
            <EmptyState />
          ) : view === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((ev) => (
                <EventCard key={ev.id} ev={ev} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((ev) => (
                <EventRow key={ev.id} ev={ev} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
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
              asChild
            >
              <Link href="/events/create">
                <Zap className="h-5 w-5 mr-2" />
                List Your Event
              </Link>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-bold rounded-2xl backdrop-blur-sm"
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
  const regOpen = isRegistrationOpen(ev);
  const regBadge = getRegistrationBadge(ev);
  const spotsLeft = getSpotsRemaining(ev);
  
  return (
    <Card className="group h-full overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <Link href={`/events/${ev.id}`}>
        <div className="relative aspect-[16/9]">
          <Cover ev={ev} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Category Badge */}
          {ev.category && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-purple-600 text-white font-bold shadow-lg">
                {ev.category}
              </Badge>
            </div>
          )}
          
          {/* Registration Status Badge */}
          <div className="absolute top-3 right-3">
            <Badge 
              variant={regBadge.variant}
              className={`font-bold shadow-lg text-xs ${
                regBadge.label === "Registration Open" ? "bg-green-600 text-white" :
                regBadge.label === "Almost Full" ? "bg-orange-600 text-white" :
                regBadge.label === "Fully Booked" ? "bg-red-600 text-white" :
                regBadge.label === "Walk-in Welcome" ? "bg-blue-600 text-white" :
                "bg-slate-600 text-white"
              }`}
            >
              {regBadge.label}
            </Badge>
          </div>
          
          {/* Price Badge */}
          {ev.price && (
            <div className="absolute bottom-3 right-3">
              <Badge className={`font-bold shadow-lg ${ev.price.isFree ? 'bg-green-600' : 'bg-orange-600'} text-white`}>
                {ev.price.isFree ? 'FREE' : `₦${ev.price.amount.toLocaleString()}`}
              </Badge>
            </div>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link href={`/events/${ev.id}`}>
          <h3 className="font-bold text-lg leading-snug line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-3">
            {ev.title}
          </h3>
        </Link>
        
        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
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
          
          {/* Spots Remaining */}
          {spotsLeft !== null && spotsLeft > 0 && (
            <p className={`text-xs font-bold ${spotsLeft <= 10 ? 'text-orange-600' : 'text-green-600'}`}>
              {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} remaining
            </p>
          )}
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl group-hover:scale-105 transition-transform"
          size="sm"
          asChild
        >
          <Link href={`/events/register/${ev.id}`}>
            {regOpen ? (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Register Now
              </>
            ) : (
              <>
                <ExternalLink className="h-4 w-4 mr-2" />
                View Details
              </>
            )}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function EventRow({ ev }: { ev: EventItem }) {
  const regOpen = isRegistrationOpen(ev);
  const regBadge = getRegistrationBadge(ev);
  const spotsLeft = getSpotsRemaining(ev);
  
  return (
    <Card className="group grid md:grid-cols-[240px,1fr,auto] gap-0 overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-xl transition-all">
      <Link href={`/events/${ev.id}`}>
        <div className="relative aspect-[16/9] md:aspect-auto">
          <Cover ev={ev} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Category Badge */}
          {ev.category && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-purple-600 text-white font-bold shadow-lg text-xs">
                {ev.category}
              </Badge>
            </div>
          )}
          
          {/* Price Badge */}
          {ev.price && (
            <div className="absolute bottom-3 left-3">
              <Badge className={`font-bold shadow-lg text-xs ${ev.price.isFree ? 'bg-green-600' : 'bg-orange-600'} text-white`}>
                {ev.price.isFree ? 'FREE' : `₦${ev.price.amount.toLocaleString()}`}
              </Badge>
            </div>
          )}
        </div>
      </Link>
      
      <Link href={`/events/${ev.id}`}>
        <div className="p-5 flex flex-col justify-center">
          <div className="flex items-start gap-2 mb-2">
            <h3 className="font-bold text-xl leading-snug line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-1">
              {ev.title}
            </h3>
            <Badge 
              variant={regBadge.variant}
              className={`font-bold text-xs flex-shrink-0 ${
                regBadge.label === "Registration Open" ? "bg-green-600 text-white" :
                regBadge.label === "Almost Full" ? "bg-orange-600 text-white" :
                regBadge.label === "Fully Booked" ? "bg-red-600 text-white" :
                regBadge.label === "Walk-in Welcome" ? "bg-blue-600 text-white" :
                "bg-slate-600 text-white"
              }`}
            >
              {regBadge.label}
            </Badge>
          </div>
          
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
          
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              📍 {ev.schoolName || ev.schoolSlug}
            </p>
            {spotsLeft !== null && spotsLeft > 0 && (
              <p className={`text-xs font-bold ${spotsLeft <= 10 ? 'text-orange-600' : 'text-green-600'}`}>
                {spotsLeft} spots left
              </p>
            )}
          </div>
        </div>
      </Link>
      
      <div className="flex items-center p-5 border-l">
        <Button 
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl"
          size="sm"
          asChild
        >
          <Link href={`/events/register/${ev.id}`}>
            {regOpen ? (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Register
              </>
            ) : (
              <>
                <ExternalLink className="h-4 w-4 mr-2" />
                Details
              </>
            )}
          </Link>
        </Button>
      </div>
    </Card>
  );
}