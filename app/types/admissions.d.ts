import type { School, Programme, GuideStep, ProgrammeLevel } from "@/types/admissions";


export type ProgrammeLevel =
  | "BSc"
  | "ND"
  | "HND"
  | "MSc"
  | "PhD"
  | "Diploma"
  | "Certificate";

export interface School {
  id: string;
  name: string;
  slug: string; // e.g., "unilag"
  city: string;
  state: string; // e.g., "Lagos"
  allowedDomains?: string[]; // school email domains
  nextDeadline?: string | null; // ISO date string or null
}

export interface Programme {
  id: string;
  schoolId: string;
  name: string;
  slug: string; // e.g., "computer-science-bsc"
  level: ProgrammeLevel;
  summary?: string;
  open: boolean; // currently accepting applications
  nextDeadline?: string | null; // ISO date string or null
  requirements: string[]; // bullet points
}

export interface GuideStep {
  id: string;
  programmeId?: string; // undefined for generic steps
  title: string;
  body?: string;
}

// Optional helper result for a combined search endpoint
export type AdmissionsSearchResult =
  | { kind: "school"; school: School }
  | { kind: "programme"; programme: Programme; school: School };

// Utility: map of ID -> entity (useful in loaders)
export type IndexMap<T extends { id: string }> = Record<string, T>;

// Utility: map of ID -> entity (useful in loaders)
export type IndexMap<T extends { id: string }> = Record<string, T>;