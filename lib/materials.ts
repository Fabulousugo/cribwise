import type { School } from "./admissions";

export type MaterialKind = "Past Questions" | "Lecture Notes" | "Syllabus" | "Textbook" | "Assignment";

export interface Material {
  id: string;
  title: string;
  kind: MaterialKind;
  schoolSlug: string; // e.g., "unilag"
  schoolName: string;
  programmeSlug?: string; // e.g., "computer-science-bsc"
  programmeName?: string;
  level?: string; // 100 | 200 | 300 | 400 | PG
  courseCode?: string; // e.g., CSC201
  year?: string; // e.g., 2023/2024
  fileUrl?: string; // public file URL (later: Cloudflare/Supabase)
  createdAt: string; // ISO string
}

export interface MaterialFilters {
  levels: string[];
  kinds: MaterialKind[];
}

export interface GetMaterialsParams {
  q?: string;
  schoolSlug?: string;
  programmeSlug?: string;
  level?: string;
  courseCode?: string;
}

// ---------------- MOCK DATA (replace later) ----------------
const MATERIALS: Material[] = [
  {
    id: "m1",
    title: "CSC201 Data Structures — Past Questions (2019–2024)",
    kind: "Past Questions",
    schoolSlug: "unilag",
    schoolName: "University of Lagos (UNILAG)",
    programmeSlug: "computer-science-bsc",
    programmeName: "Computer Science (BSc)",
    level: "200",
    courseCode: "CSC201",
    year: "2019-2024",
    fileUrl: "",
    createdAt: new Date().toISOString(),
  },
  {
    id: "m2",
    title: "BUS101 Introduction to Business — Lecture Notes",
    kind: "Lecture Notes",
    schoolSlug: "unilag",
    schoolName: "University of Lagos (UNILAG)",
    programmeSlug: "business-administration-bsc",
    programmeName: "Business Administration (BSc)",
    level: "100",
    courseCode: "BUS101",
    year: "2024",
    fileUrl: "",
    createdAt: new Date().toISOString(),
  },
  {
    id: "m3",
    title: "MEE301 Thermodynamics — Syllabus",
    kind: "Syllabus",
    schoolSlug: "ui",
    schoolName: "University of Ibadan (UI)",
    programmeSlug: "mechanical-engineering-bsc",
    programmeName: "Mechanical Engineering (BSc)",
    level: "300",
    courseCode: "MEE301",
    year: "2023/2024",
    fileUrl: "",
    createdAt: new Date().toISOString(),
  },
];

// ---------------- HELPERS ----------------
function norm(s?: string) { return (s || "").trim().toLowerCase(); }
function includes(hay: string, q: string) { return norm(hay).includes(norm(q)); }

export async function getMaterials(params: GetMaterialsParams = {}): Promise<Material[]> {
  const { q = "", schoolSlug = "", programmeSlug = "", level = "", courseCode = "" } = params;

  // ----- Supabase version (swap later) -----
  /*
  import { createClient } from '@supabase/supabase-js';
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
  let query = supabase.from('materials').select('*');
  if (schoolSlug) query = query.eq('school_slug', schoolSlug);
  if (programmeSlug) query = query.eq('programme_slug', programmeSlug);
  if (level) query = query.eq('level', level);
  if (courseCode) query = query.ilike('course_code', `%${courseCode}%`);
  if (q) query = query.ilike('title', `%${q}%`);
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data as Material[];
  */

  // Mock filter
  let out = MATERIALS.slice();
  if (schoolSlug) out = out.filter(m => m.schoolSlug === schoolSlug);
  if (programmeSlug) out = out.filter(m => m.programmeSlug === programmeSlug);
  if (level) out = out.filter(m => (m.level || "") === level);
  if (courseCode) out = out.filter(m => includes(m.courseCode || "", courseCode));
  if (q) out = out.filter(m => includes(m.title, q));
  // sort newest first
  out.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return out;
}

export async function getMaterialById(id: string): Promise<Material | null> {
  // Supabase:
  /*
  const { data, error } = await supabase.from('materials').select('*').eq('id', id).single();
  if (error) return null;
  return data as Material;
  */
  return MATERIALS.find(m => m.id === id) ?? null;
}
export async function __addMaterialMock(m: Material) {
  MATERIALS.unshift(m);
  return m;
}


export async function getMaterialFilters(): Promise<MaterialFilters> {
  // Supabase: compute distinct values with RPC or distinct
  /*
  const { data: levels } = await supabase.rpc('distinct_levels');
  const { data: kinds } = await supabase.rpc('distinct_kinds');
  return { levels, kinds } as MaterialFilters;
  */
  return {
    levels: ["100", "200", "300", "400", "PG"],
    kinds: ["Past Questions", "Lecture Notes", "Syllabus", "Textbook", "Assignment"],
  };
}
