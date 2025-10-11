// ==========================================
// FILE: lib/reports.ts
// Reports storage — mock in-memory + types + Supabase-ready skeleton (commented)
// ==========================================

export type ReportType = "listing" | "behavior" | "payment" | "other";

export interface ReportRecord {
  id: string;
  userId: string;
  type: ReportType;
  listingRef?: string;
  message: string;
  evidenceUrl?: string; // later: storage URL
  createdAt: string; // ISO
}

const MEMORY: ReportRecord[] = [];

export function randomId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export async function saveReport(rec: Omit<ReportRecord, "id" | "createdAt">): Promise<ReportRecord> {
  const row: ReportRecord = { id: randomId(), createdAt: new Date().toISOString(), ...rec };
  MEMORY.unshift(row);
  return row;
}

export async function listReportsByUser(userId: string): Promise<ReportRecord[]> {
  return MEMORY.filter(r => r.userId === userId);
}

// -------------- Supabase schema (later) --------------
/*
create table reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  type text not null check (type in ('listing','behavior','payment','other')),
  listing_ref text,
  message text not null,
  evidence_url text,
  created_at timestamptz not null default now()
);
*/
