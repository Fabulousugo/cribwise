

// Types (shared across components)
export type School = {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  allowedDomains?: string[];
  nextDeadline?: string | null;
};

export type Programme = {
  id: string;
  schoolId: string;
  name: string;
  slug: string;
  level: string;
  summary?: string;
  open: boolean;
  nextDeadline?: string | null;
  requirements: string[];
};

export type GuideStep = {
  id: string;
  programmeId?: string;
  title: string;
  body?: string;
};

// ==========================================
// MOCK DATA (temporary)
// ==========================================
const SCHOOLS: School[] = [
  {
    id: "s1",
    name: "University of Lagos (UNILAG)",
    slug: "unilag",
    city: "Lagos",
    state: "Lagos",
    allowedDomains: ["unilag.edu.ng"],
    nextDeadline: "2026-01-15",
  },
  {
    id: "s2",
    name: "University of Ibadan (UI)",
    slug: "ui",
    city: "Ibadan",
    state: "Oyo",
    allowedDomains: ["ui.edu.ng"],
    nextDeadline: null,
  },
  {
    id: "s3",
    name: "Obafemi Awolowo University (OAU)",
    slug: "oau",
    city: "Ile-Ife",
    state: "Osun",
    allowedDomains: ["oauife.edu.ng"],
    nextDeadline: "2026-02-10",
  },
  {
    id: "s4",
    name: "Ahmadu Bello University (ABU)",
    slug: "abu",
    city: "Zaria",
    state: "Kaduna",
    allowedDomains: ["abu.edu.ng"],
    nextDeadline: null,
  },
];

const PROGRAMMES: Programme[] = [
  {
    id: "p1",
    schoolId: "s1",
    name: "Computer Science (BSc)",
    slug: "computer-science-bsc",
    level: "BSc",
    summary: "Learn algorithms, software engineering, and AI.",
    open: true,
    nextDeadline: "2026-01-15",
    requirements: [
      "JAMB cutoff ~ 250+",
      "O'Level: 5 credits incl. Math & English",
      "UTME subjects: Eng, Math, Physics, Chemistry",
    ],
  },
  {
    id: "p2",
    schoolId: "s1",
    name: "Business Administration (BSc)",
    slug: "business-administration-bsc",
    level: "BSc",
    summary: "Management, finance, operations.",
    open: true,
    nextDeadline: "2026-01-20",
    requirements: [
      "JAMB cutoff ~ 220+",
      "O'Level: 5 credits incl. Math & English",
      "UTME subjects: Eng, Math, Econs, Govt/Commerce",
    ],
  },
  {
    id: "p3",
    schoolId: "s2",
    name: "Mechanical Engineering (BSc)",
    slug: "mechanical-engineering-bsc",
    level: "BSc",
    summary: "Thermodynamics, design, and manufacturing.",
    open: false,
    nextDeadline: null,
    requirements: [
      "JAMB cutoff ~ 240+",
      "O'Level: 5 credits incl. Math & English",
      "UTME: Eng, Math, Physics, Chemistry",
    ],
  },
];

const GUIDE_STEPS: GuideStep[] = [
  { id: "g1", programmeId: "p1", title: "Confirm eligibility", body: "Check JAMB cutoff and O'Level requirements." },
  { id: "g2", programmeId: "p1", title: "Register for UTME/DE", body: "Select required subjects and pay fees." },
  { id: "g3", programmeId: "p1", title: "Prepare documents", body: "Gather transcripts, passport photo, and ID." },
  { id: "g4", programmeId: "p1", title: "Watch for post-UTME dates", body: "Track school portal for screening dates." },
  { id: "g5", programmeId: "p1", title: "Apply on the school portal", body: "Complete application and submit before the deadline." },

  { id: "g6", title: "Create a CribWise account", body: "Save your checklist and get reminders." },
  { id: "g7", title: "Follow your target schools", body: "So you don’t miss deadlines." },
];

// ==========================================
// DATA HELPERS (mock now, DB later)
// ==========================================

export async function getSchools(): Promise<School[]> {
  // TODO: Replace with Supabase later
  /* Example Supabase:
  const { data, error } = await supabase.from('schools').select('*');
  if (error) throw error;
  return data;
  */
  return SCHOOLS;
}

export async function getSchoolBySlug(slug: string): Promise<School | undefined> {
  // const { data } = await supabase.from('schools').select('*').eq('slug', slug).single();
  return SCHOOLS.find((s) => s.slug === slug);
}

export async function getProgrammesBySchool(schoolId: string): Promise<Programme[]> {
  // const { data } = await supabase.from('programmes').select('*').eq('school_id', schoolId);
  return PROGRAMMES.filter((p) => p.schoolId === schoolId);
}

export async function getProgrammeBySlugs(schoolSlug: string, progSlug: string): Promise<{ school: School; programme: Programme } | null> {
  const school = await getSchoolBySlug(schoolSlug);
  if (!school) return null;
  const programme = PROGRAMMES.find((p) => p.slug === progSlug && p.schoolId === school.id);
  if (!programme) return null;
  return { school, programme };
}

export async function getGuideStepsForProgramme(programmeId: string): Promise<GuideStep[]> {
  // const { data } = await supabase.from('guide_steps').select('*').eq('programme_id', programmeId);
  return GUIDE_STEPS.filter((g) => g.programmeId === programmeId);
}

export async function getGenericGuideSteps(): Promise<GuideStep[]> {
  // const { data } = await supabase.from('guide_steps').select('*').is('programme_id', null);
  return GUIDE_STEPS.filter((g) => !g.programmeId);
}

// ==========================================
// ✅ Usage example (later):
// import { getSchools } from '@/lib/admissions';
// const schools = await getSchools();
// ==========================================
