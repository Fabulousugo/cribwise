// ==========================================
// FILE: lib/events.ts
// Events helpers — mock data now + Supabase-ready skeleton (commented)
// Enhanced with registration links and additional fields
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
  
  // Registration/RSVP
  registrationUrl?: string; // External registration link (Google Forms, Eventbrite, etc.)
  registrationDeadline?: string; // ISO date - last date to register
  registrationRequired?: boolean; // true if you must register to attend
  maxAttendees?: number; // capacity limit
  currentAttendees?: number; // current registrations count
  registrationStatus?: "open" | "closed" | "full" | "not-required"; // current status
  
  // Additional useful fields
  imageUrl?: string; // event banner/poster URL
  tags?: string[]; // e.g., ["workshop", "free", "certificate", "networking"]
  price?: {
    amount: number;
    currency: string; // e.g., "NGN"
    isFree?: boolean;
  };
  contactEmail?: string;
  contactPhone?: string;
  
  // Social links
  facebookEventUrl?: string;
  twitterHashtag?: string;
  instagramHandle?: string;
  
  rsvpUrl?: string; // @deprecated - use registrationUrl instead
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
    description: "Welcome activities for new students, campus tours, info sessions, and social mixers. Get to know your campus, meet fellow freshers, and learn everything you need to succeed in your first year.",
    category: "Social",
    schoolSlug: "unilag",
    schoolName: "University of Lagos (UNILAG)",
    organizer: "Student Affairs",
    startISO: new Date(Date.now() + 7*24*3600*1000).toISOString(),
    endISO: new Date(Date.now() + 10*24*3600*1000).toISOString(),
    location: { 
      label: "Main Auditorium, UNILAG",
      address: "University of Lagos, Akoka, Lagos"
    },
    registrationUrl: "https://forms.gle/example-freshers-2025",
    registrationRequired: true,
    registrationDeadline: new Date(Date.now() + 5*24*3600*1000).toISOString(),
    registrationStatus: "open",
    maxAttendees: 500,
    currentAttendees: 342,
    imageUrl: "https://placehold.co/1200x630/6366f1/ffffff?text=Freshers+Orientation",
    tags: ["freshers", "orientation", "free", "mandatory"],
    price: { amount: 0, currency: "NGN", isFree: true },
    contactEmail: "studentaffairs@unilag.edu.ng",
    contactPhone: "+234 801 234 5678",
    createdAt: new Date().toISOString(),
  },
  {
    id: "e2",
    title: "Tech Career Fair 2025",
    description: "Meet top employers in tech, submit your CV, attend resume clinics, and participate in mock interviews. Companies include Andela, Interswitch, Paystack, and more!",
    category: "Career",
    schoolSlug: "ui",
    schoolName: "University of Ibadan (UI)",
    organizer: "UI Career Center",
    startISO: new Date(Date.now() + 14*24*3600*1000).toISOString(),
    endISO: new Date(Date.now() + 14*24*3600*1000 + 6*3600*1000).toISOString(),
    location: { 
      label: "Convocation Hall, UI",
      address: "University of Ibadan, Ibadan, Oyo State"
    },
    registrationUrl: "https://eventbrite.com/ui-career-fair-2025",
    registrationRequired: false,
    registrationStatus: "open",
    maxAttendees: 1000,
    currentAttendees: 687,
    imageUrl: "https://placehold.co/1200x630/8b5cf6/ffffff?text=Tech+Career+Fair",
    tags: ["career", "tech", "free", "networking", "employers"],
    price: { amount: 0, currency: "NGN", isFree: true },
    contactEmail: "careers@ui.edu.ng",
    contactPhone: "+234 802 345 6789",
    facebookEventUrl: "https://facebook.com/events/ui-career-fair",
    twitterHashtag: "#UICareerFair2025",
    createdAt: new Date().toISOString(),
  },
  {
    id: "e3",
    title: "Intro to Data Structures (CSC201) — Tutorial Marathon",
    description: "Peer-led intensive revision session for 200-level Computer Science students. Topics: Arrays, Linked Lists, Stacks, Queues, Trees, and Graphs. Bring your questions and practice problems!",
    category: "Academic",
    schoolSlug: "unilag",
    schoolName: "University of Lagos (UNILAG)",
    organizer: "CribWise Tutors",
    startISO: new Date(Date.now() + 3*24*3600*1000 + 15*3600*1000).toISOString(),
    endISO: new Date(Date.now() + 3*24*3600*1000 + 18*3600*1000).toISOString(),
    location: { 
      label: "CS Lab 2, UNILAG",
      address: "Faculty of Science, UNILAG, Akoka"
    },
    registrationUrl: "https://forms.gle/csc201-tutorial-reg",
    registrationRequired: true,
    registrationDeadline: new Date(Date.now() + 2*24*3600*1000).toISOString(),
    registrationStatus: "open",
    maxAttendees: 50,
    currentAttendees: 38,
    imageUrl: "https://placehold.co/1200x630/10b981/ffffff?text=CSC201+Tutorial",
    tags: ["academic", "tutorial", "computer-science", "free", "study-group"],
    price: { amount: 0, currency: "NGN", isFree: true },
    contactEmail: "tutors@cribwise.com",
    contactPhone: "+234 803 456 7890",
    createdAt: new Date().toISOString(),
  },
  {
    id: "e4",
    title: "Building Your First Startup: Workshop Series",
    description: "3-day intensive workshop on entrepreneurship, business model canvas, pitching, and funding. Learn from successful Nigerian startup founders. Limited spots available!",
    category: "Career",
    schoolSlug: "covenant",
    schoolName: "Covenant University",
    organizer: "Covenant Entrepreneurship Center",
    startISO: new Date(Date.now() + 21*24*3600*1000).toISOString(),
    endISO: new Date(Date.now() + 23*24*3600*1000).toISOString(),
    location: { 
      label: "Innovation Hub, Covenant University",
      address: "Covenant University, Ota, Ogun State"
    },
    registrationUrl: "https://covenantstartups.com/register",
    registrationRequired: true,
    registrationDeadline: new Date(Date.now() + 18*24*3600*1000).toISOString(),
    registrationStatus: "open",
    maxAttendees: 40,
    currentAttendees: 32,
    imageUrl: "https://placehold.co/1200x630/f59e0b/ffffff?text=Startup+Workshop",
    tags: ["workshop", "entrepreneurship", "startup", "certificate", "paid"],
    price: { amount: 5000, currency: "NGN", isFree: false },
    contactEmail: "entrepreneurship@covenantuniversity.edu.ng",
    contactPhone: "+234 804 567 8901",
    instagramHandle: "@covenantstartups",
    createdAt: new Date().toISOString(),
  },
  {
    id: "e5",
    title: "Inter-University Football Championship Finals",
    description: "Watch the most anticipated match of the season! UNILAG Lions vs UI Warriors. Free entry for students with valid ID. Food and drinks available.",
    category: "Sports",
    schoolSlug: "unilag",
    schoolName: "University of Lagos (UNILAG)",
    organizer: "NUGA Sports Committee",
    startISO: new Date(Date.now() + 10*24*3600*1000 + 16*3600*1000).toISOString(),
    endISO: new Date(Date.now() + 10*24*3600*1000 + 19*3600*1000).toISOString(),
    location: { 
      label: "University Sports Complex",
      address: "UNILAG Sports Complex, Akoka, Lagos"
    },
    registrationRequired: false,
    registrationStatus: "not-required",
    imageUrl: "https://placehold.co/1200x630/ef4444/ffffff?text=Football+Finals",
    tags: ["sports", "football", "free", "championship", "inter-university"],
    price: { amount: 0, currency: "NGN", isFree: true },
    contactEmail: "sports@unilag.edu.ng",
    twitterHashtag: "#NUGAFinals2025",
    createdAt: new Date().toISOString(),
  },
  {
    id: "e6",
    title: "Women in Tech: Panel Discussion & Networking",
    description: "Hear from leading women in Nigerian tech industry. Topics: Breaking barriers, career growth, work-life balance, and mentorship. Open to all genders. Refreshments provided.",
    category: "Tech",
    schoolSlug: "lasu",
    schoolName: "Lagos State University (LASU)",
    organizer: "LASU Tech Community",
    startISO: new Date(Date.now() + 17*24*3600*1000 + 14*3600*1000).toISOString(),
    endISO: new Date(Date.now() + 17*24*3600*1000 + 17*3600*1000).toISOString(),
    location: { 
      label: "LASU Main Auditorium",
      address: "Lagos State University, Ojo, Lagos"
    },
    registrationUrl: "https://forms.gle/women-in-tech-lasu",
    registrationRequired: true,
    registrationDeadline: new Date(Date.now() + 15*24*3600*1000).toISOString(),
    registrationStatus: "open",
    maxAttendees: 200,
    currentAttendees: 156,
    imageUrl: "https://placehold.co/1200x630/ec4899/ffffff?text=Women+in+Tech",
    tags: ["tech", "panel", "networking", "free", "diversity", "women"],
    price: { amount: 0, currency: "NGN", isFree: true },
    contactEmail: "techcommunity@lasu.edu.ng",
    contactPhone: "+234 805 678 9012",
    instagramHandle: "@lasutechcommunity",
    createdAt: new Date().toISOString(),
  },
  {
    id: "e7",
    title: "Python for Beginners: 5-Day Bootcamp",
    description: "Learn Python from scratch! No prior programming experience needed. Covers: variables, loops, functions, data structures, and a mini project. Certificate upon completion.",
    category: "Tech",
    schoolSlug: "oau",
    schoolName: "Obafemi Awolowo University (OAU)",
    organizer: "OAU Code Academy",
    startISO: new Date(Date.now() + 28*24*3600*1000).toISOString(),
    endISO: new Date(Date.now() + 32*24*3600*1000).toISOString(),
    location: { 
      label: "Computer Lab B, OAU",
      address: "Obafemi Awolowo University, Ile-Ife, Osun State"
    },
    registrationUrl: "https://oaucodeacademy.com/python-bootcamp",
    registrationRequired: true,
    registrationDeadline: new Date(Date.now() + 25*24*3600*1000).toISOString(),
    registrationStatus: "open",
    maxAttendees: 30,
    currentAttendees: 28,
    imageUrl: "https://placehold.co/1200x630/3b82f6/ffffff?text=Python+Bootcamp",
    tags: ["workshop", "tech", "programming", "certificate", "paid", "bootcamp"],
    price: { amount: 8000, currency: "NGN", isFree: false },
    contactEmail: "codeacademy@oauife.edu.ng",
    contactPhone: "+234 806 789 0123",
    facebookEventUrl: "https://facebook.com/events/oau-python-bootcamp",
    createdAt: new Date().toISOString(),
  },
  {
    id: "e8",
    title: "Mental Health Awareness Week: Free Counseling",
    description: "Free mental health screenings, stress management workshops, and one-on-one counseling sessions with licensed therapists. Your wellbeing matters. Confidential and judgment-free.",
    category: "Social",
    schoolSlug: "unilag",
    schoolName: "University of Lagos (UNILAG)",
    organizer: "UNILAG Health Services",
    startISO: new Date(Date.now() + 35*24*3600*1000).toISOString(),
    endISO: new Date(Date.now() + 39*24*3600*1000).toISOString(),
    location: { 
      label: "Health Center, UNILAG",
      address: "University of Lagos Health Services, Akoka"
    },
    registrationUrl: "https://forms.gle/mental-health-week-unilag",
    registrationRequired: true,
    registrationDeadline: new Date(Date.now() + 33*24*3600*1000).toISOString(),
    registrationStatus: "open",
    imageUrl: "https://placehold.co/1200x630/14b8a6/ffffff?text=Mental+Health+Week",
    tags: ["health", "counseling", "free", "confidential", "wellness"],
    price: { amount: 0, currency: "NGN", isFree: true },
    contactEmail: "healthservices@unilag.edu.ng",
    contactPhone: "+234 807 890 1234",
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

// Helper: Check if registration is still open
export function isRegistrationOpen(event: EventItem): boolean {
  if (!event.registrationRequired) return true;
  if (event.registrationStatus === "closed" || event.registrationStatus === "full") return false;
  
  if (event.registrationDeadline) {
    const deadline = new Date(event.registrationDeadline);
    if (deadline < new Date()) return false;
  }
  
  if (event.maxAttendees && event.currentAttendees) {
    if (event.currentAttendees >= event.maxAttendees) return false;
  }
  
  return true;
}

// Helper: Get registration status badge info
export function getRegistrationBadge(event: EventItem): {
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
  color: string;
} {
  if (!event.registrationRequired) {
    return { label: "Walk-in Welcome", variant: "outline", color: "text-green-600" };
  }
  
  if (event.registrationStatus === "full" || 
      (event.maxAttendees && event.currentAttendees && event.currentAttendees >= event.maxAttendees)) {
    return { label: "Fully Booked", variant: "destructive", color: "text-red-600" };
  }
  
  if (event.registrationDeadline) {
    const deadline = new Date(event.registrationDeadline);
    if (deadline < new Date()) {
      return { label: "Registration Closed", variant: "secondary", color: "text-slate-600" };
    }
  }
  
  if (event.registrationStatus === "closed") {
    return { label: "Registration Closed", variant: "secondary", color: "text-slate-600" };
  }
  
  // Check if filling up fast
  if (event.maxAttendees && event.currentAttendees) {
    const percentFull = (event.currentAttendees / event.maxAttendees) * 100;
    if (percentFull >= 90) {
      return { label: "Almost Full", variant: "destructive", color: "text-orange-600" };
    }
  }
  
  return { label: "Registration Open", variant: "default", color: "text-green-600" };
}

// Helper: Get spots remaining
export function getSpotsRemaining(event: EventItem): number | null {
  if (!event.maxAttendees || !event.currentAttendees) return null;
  return Math.max(0, event.maxAttendees - event.currentAttendees);
}

// Dev-only: add new event to mock store
export async function __addEventMock(e: EventItem) {
  EVENTS.push(e);
  return e;
}