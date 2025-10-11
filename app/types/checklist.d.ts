
export type ChecklistScope =
  | { kind: "generic" }
  | { kind: "programme"; programmeId: string };

export interface ChecklistStepInput {
  id: string;            // stable step id (e.g., "g1")
  title: string;
  body?: string;
}

export interface ChecklistItemState {
  stepId: string;
  done: boolean;
  note?: string;
  dueDate?: string | null; // ISO date
  updatedAt: string;       // ISO timestamp
}

export interface ChecklistPayload {
  scope: ChecklistScope;
  items: ChecklistItemState[];
}

export interface ChecklistUpsertInput {
  scope: ChecklistScope;
  item: ChecklistItemState; // single-step upsert
}
