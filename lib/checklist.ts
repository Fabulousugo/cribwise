import type { ChecklistScope, ChecklistItemState, ChecklistPayload, ChecklistUpsertInput } from "@/types/checklist";

// ---------------- MOCK (in-memory) ----------------
// NOTE: This resets on server restart. Replace with Supabase later.
const MEMORY: Record<string, ChecklistPayload> = {};

function keyForScope(scope: ChecklistScope, userId: string) {
  return scope.kind === "generic" ? `u:${userId}:generic` : `u:${userId}:prog:${scope.programmeId}`;
}

export async function getChecklist(userId: string, scope: ChecklistScope): Promise<ChecklistPayload | null> {
  const key = keyForScope(scope, userId);
  return MEMORY[key] ?? null;
}

export async function upsertChecklistItem(userId: string, input: ChecklistUpsertInput): Promise<ChecklistPayload> {
  const key = keyForScope(input.scope, userId);
  const existing = MEMORY[key]?.items ?? [];
  const idx = existing.findIndex((it) => it.stepId === input.item.stepId);
  const nextItems = [...existing];
  if (idx >= 0) nextItems[idx] = input.item; else nextItems.push(input.item);
  const payload: ChecklistPayload = { scope: input.scope, items: nextItems };
  MEMORY[key] = payload;
  return payload;
}

// ---------------- Supabase skeleton ----------------
/* Example schema
create table checklist (
  user_id uuid not null,
  scope_kind text not null check (scope_kind in ('generic','programme')),
  programme_id text null,
  items jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, scope_kind, programme_id)
);
*/

/* Supabase version (later)
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function getChecklist(userId: string, scope: ChecklistScope): Promise<ChecklistPayload | null> {
  const { data, error } = await supabase
    .from('checklist')
    .select('items, scope_kind, programme_id')
    .eq('user_id', userId)
    .eq('scope_kind', scope.kind)
    .eq('programme_id', scope.kind === 'programme' ? scope.programmeId : null)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return { scope, items: data.items as ChecklistItemState[] };
}

export async function upsertChecklistItem(userId: string, input: ChecklistUpsertInput): Promise<ChecklistPayload> {
  const { data, error } = await supabase
    .from('checklist')
    .upsert({
      user_id: userId,
      scope_kind: input.scope.kind,
      programme_id: input.scope.kind === 'programme' ? input.scope.programmeId : null,
      items: supabase.fn.jsonb_set('items', '{placeholder}', input.item) // pseudo; you may merge client-side first
    })
    .select()
    .single();
  if (error) throw error;
  return { scope: input.scope, items: (data.items as ChecklistItemState[]) };
}
*/
