// ==========================================
// FILE: lib/events.ts
// Events helpers — mock data now + Supabase-ready skeleton (commented)
// ==========================================

export type EventCategory = "Academic" | "Career" | "Tech" | "Social" | "Sports";

export interface EventItem {
  id: string;
  title: string;
  description?: string;
  category: EventCategory;
  schoolSlug?: string; // optional: campus-specific
  schoolName?: string;
  organizer?: string; // e.g., "CS Dept" or "CribWise"
  startISO: string; // e.g., 2026-01-20T14:00:00Z
  endISO?: string;
  location?: {
    label?: string; // e.g., "Main Hall, UNILAG"
    address?: string;
    lat?: number;
    lng?: number;
  };
  rsvpUrl?: string; // external RSVP link
  createdAt: string;
}

export interface EventFilters {
  categories: EventCategory[];
}

export interface GetEventsParams {
  q?: string;
  schoolSlug?: string;
  category?: EventCategory | "";
  from?: string; // ISO date (inclusive)
  to?: string;   // ISO date (inclusive)
}

// ---------------- MOCK DATA (replace later) ----------------
const EVENTS: EventItem[] = [
  {
    id: "e1",
    title: "Freshers' Orientation Week",
    description: "Welcome activities for new students, campus tours, and info sessions.",
    category: "Social",
    schoolSlug: "unilag",
    schoolName: "University of Lagos (UNILAG)",
    organizer: "Student Affairs",
    startISO: new Date(Date.now() + 7*24*3600*1000).toISOString(),
    endISO: new Date(Date.now() + 10*24*3600*1000).toISOString(),
    location: { label: "Main Auditorium, UNILAG" },
    createdAt: new Date().toISOString(),
  },
  {
    id: "e2",
    title: "Tech Career Fair",
    description: "Meet employers, submit CVs, and attend resume clinics.",
    category: "Career",
    schoolSlug: "ui",
    schoolName: "University of Ibadan (UI)",
    organizer: "UI Career Center",
    startISO: new Date(Date.now() + 14*24*3600*1000).toISOString(),
    endISO: new Date(Date.now() + 14*24*3600*1000 + 3*3600*1000).toISOString(),
    location: { label: "Convocation Hall, UI" },
    createdAt: new Date().toISOString(),
  },
  {
    id: "e3",
    title: "Intro to Data Structures (CSC201) — Tutorial Marathon",
    description: "Peer-led revision for 200-level students. Bring your questions.",
    category: "Academic",
    schoolSlug: "unilag",
    schoolName: "University of Lagos (UNILAG)",
    organizer: "CribWise Tutors",
    startISO: new Date(Date.now() + 3*24*3600*1000 + 15*3600*1000).toISOString(),
    endISO: new Date(Date.now() + 3*24*3600*1000 + 18*3600*1000).toISOString(),
    location: { label: "CS Lab 2, UNILAG" },
    createdAt: new Date().toISOString(),
  },
];

function norm(s?: string) { return (s || "").trim().toLowerCase(); }
function includes(h: string, q: string) { return norm(h).includes(norm(q)); }

export async function getEvents(params: GetEventsParams = {}): Promise<EventItem[]> {
  const { q = "", schoolSlug = "", category = "", from = "", to = "" } = params;

  // ----- Supabase version (swap later) -----
  /*
  import { createClient } from '@supabase/supabase-js';
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  let query = supabase.from('events').select('*');
  if (schoolSlug) query = query.eq('school_slug', schoolSlug);
  if (category) query = query.eq('category', category);
  if (from) query = query.gte('start_iso', from);
  if (to) query = query.lte('start_iso', to);
  if (q) query = query.ilike('title', `%${q}%`);
  const { data, error } = await query.order('start_iso', { ascending: true });
  if (error) throw error;
  return data as EventItem[];
  */

  // Mock filter
  let out = EVENTS.slice();
  if (schoolSlug) out = out.filter(e => e.schoolSlug === schoolSlug);
  if (category) out = out.filter(e => e.category === category);
  if (from) {
    const f = new Date(from).getTime();
    out = out.filter(e => new Date(e.startISO).getTime() >= f);
  }
  if (to) {
    const t = new Date(to).getTime();
    out = out.filter(e => new Date(e.startISO).getTime() <= t);
  }
  if (q) out = out.filter(e => includes(e.title, q) || includes(e.description || "", q));

  // Sort by start date ascending
  out.sort((a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime());
  return out;
}

export async function getEventById(id: string): Promise<EventItem | null> {
  // Supabase: select by id
  /*
  const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
  if (error) return null;
  return data as EventItem;
  */
  return EVENTS.find(e => e.id === id) ?? null;
}

export async function getEventFilters(): Promise<EventFilters> {
  return { categories: ["Academic", "Career", "Tech", "Social", "Sports"] };
}

// Dev-only: add new event to mock store
export async function __addEventMock(e: EventItem) {
  EVENTS.push(e);
  return e;
}
