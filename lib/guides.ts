
export type Guide = {
  slug: string;
  title: string;
  summary?: string;
  tags?: string[];
  body: string; // can be plain text/HTML/MD for now; MDX later
};

// ---------------- MOCK DATA (replace later) ----------------
const GUIDES: Guide[] = [
  {
    slug: "admissions-basics-nigeria",
    title: "Admissions basics in Nigeria",
    summary: "Understand JAMB/UTME, post‑UTME, cut‑offs, and direct entry in one page.",
    tags: ["JAMB", "UTME", "Post‑UTME"],
    body: `# Admissions basics\n\n**JAMB/UTME** is the national exam...`,
  },
  {
    slug: "how-to-track-deadlines",
    title: "How to track admissions deadlines",
    summary: "Never miss a window: portals to check, timelines, and reminder setup.",
    tags: ["Deadlines", "Portals", "Reminders"],
    body: `# Track deadlines\n\nUse your school portal + CribWise reminders...`,
  },
  {
    slug: "link-your-school-email",
    title: "Link your school email (CribWise policy)",
    summary: "When to link it, accepted domains, and what happens if you don't.",
    tags: ["School email", "Verification"],
    body: `# Link your school email\n\nAfter admission you have 90 days to verify...`,
  },
  {
    slug: "prepare-documents",
    title: "Documents you need for applications",
    summary: "From O'Level to transcripts: a printable checklist.",
    tags: ["Documents", "Checklist"],
    body: `# Required documents\n\n1. O'Level results...`,
  },
];

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  // ----- Supabase version (swap in later) -----
  /*
  import { createClient } from '@supabase/supabase-js';
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data, error } = await supabase.from('guides').select('*').eq('slug', slug).single();
  if (error) return null;
  return {
    slug: data.slug,
    title: data.title,
    summary: data.summary ?? undefined,
    tags: data.tags ?? undefined,
    body: data.body, // store MD/HTML, render via MDX later
  } as Guide;
  */

  return GUIDES.find((g) => g.slug === slug) ?? null;
}

export async function listGuides(): Promise<Guide[]> {
  // Supabase version:
  /*
  const { data, error } = await supabase.from('guides').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Guide[];
  */
  return GUIDES;
}

// Optional: simple search (local)
export async function searchGuides(q: string): Promise<Guide[]> {
  const n = q.trim().toLowerCase();
  if (!n) return [];
  return GUIDES.filter((g) =>
    g.title.toLowerCase().includes(n) ||
    (g.summary?.toLowerCase().includes(n) ?? false) ||
    (g.tags?.some((t) => t.toLowerCase().includes(n)) ?? false)
  );
}
