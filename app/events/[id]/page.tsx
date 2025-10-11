// ==========================================
// FILE: app/events/[id]/page.tsx
// Event Detail — time/location, organizer, RSVP, add-to-calendar (MODULAR)
// ==========================================
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin, Users, Link as LinkIcon } from "lucide-react";
import { getEventById, getEvents } from "@/lib/events";

function fmtDateRange(startISO: string, endISO?: string) {
  const start = new Date(startISO);
  const end = endISO ? new Date(endISO) : undefined;
  const sDate = start.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  const sTime = start.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  if (!end) return `${sDate} • ${sTime}`;
  const sameDay = start.toDateString() === end.toDateString();
  const eTime = end.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  if (sameDay) return `${sDate} • ${sTime} – ${eTime}`;
  const eDate = end.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  return `${sDate} ${sTime} → ${eDate} ${eTime}`;
}

function icsContent({ title, startISO, endISO, location, description }: { title: string; startISO: string; endISO?: string; location?: string; description?: string }) {
  const dtStart = new Date(startISO).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const dtEnd = endISO ? new Date(endISO).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z") : undefined;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CribWise//Events//EN",
    "BEGIN:VEVENT",
    `UID:${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}@cribwise`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")}`,
    `DTSTART:${dtStart}`,
    dtEnd ? `DTEND:${dtEnd}` : undefined,
    `SUMMARY:${title}`,
    location ? `LOCATION:${location}` : undefined,
    description ? `DESCRIPTION:${description.replace(/\n/g, "\\n")}` : undefined,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);
  return lines.join("\r\n");
}

export default async function EventPage({ params }: { params: { id: string } }) {
  const ev = await getEventById(params.id);
  if (!ev) return notFound();

  // Related events (same school or category), excluding this one
  const related = (await getEvents({ schoolSlug: ev.schoolSlug || "", category: ev.category }))
    .filter((e) => e.id !== ev.id)
    .slice(0, 6);

  const when = fmtDateRange(ev.startISO, ev.endISO);
  const ics = icsContent({ title: ev.title, startISO: ev.startISO, endISO: ev.endISO, location: ev.location?.label, description: ev.description });
  const icsHref = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;

  return (
    <main className="max-w-4xl mx-auto p-4">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-4 text-slate-600">
        <Link href="/events" className="hover:underline">Events</Link>
        <span> / </span>
        <span className="text-slate-900 line-clamp-1">{ev.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">{ev.title}</h1>
        <p className="text-slate-600 mt-1">{ev.schoolName || ev.schoolSlug} {ev.category ? `• ${ev.category}` : ""}</p>
      </header>

      {/* Info cards */}
      <section className="grid md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5" /> When</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">{when}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" /> Where</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">{ev.location?.label || "TBA"}</CardContent>
        </Card>
      </section>

      {/* Description */}
      {ev.description && (
        <section className="prose prose-slate max-w-none mb-6">
          <p>{ev.description}</p>
        </section>
      )}

      {/* Actions */}
      <section className="mb-8 flex flex-wrap gap-2">
        <a href={icsHref} download={`${ev.title.replace(/\s+/g, "-")}.ics`}>
          <Button>Add to calendar</Button>
        </a>
        {ev.rsvpUrl && (
          <a href={ev.rsvpUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2"><LinkIcon className="h-4 w-4" /> RSVP</Button>
          </a>
        )}
        {ev.organizer && (
          <span className="text-xs text-slate-600 self-center">Organized by {ev.organizer}</span>
        )}
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Related events</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {related.map((r) => (
              <Link key={r.id} href={`/events/${r.id}`} className="border rounded-xl p-4 hover:shadow-md transition">
                <div className="font-medium line-clamp-2">{r.title}</div>
                <div className="text-xs text-slate-600 mt-1">{fmtDateRange(r.startISO, r.endISO)}</div>
                {r.location?.label && <div className="text-xs text-slate-600">{r.location.label}</div>}
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-8 text-sm">
        <Link href="/events" className="text-blue-600 hover:underline">← Back to Events</Link>
      </div>
    </main>
  );
}
