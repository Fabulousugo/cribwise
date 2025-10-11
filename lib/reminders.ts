// ==========================================
// FILE: lib/reminders.ts
// Mock reminder registration + OneSignal-ready notes
// ==========================================

export type ReminderInput = {
  userId: string;
  stepId: string;
  title: string;
  dueDateISO: string; // ISO date (no time) or full ISO timestamp
};

// In-memory mock (replace with DB or OneSignal player_id mapping later)
const MEMORY: ReminderInput[] = [];

export async function upsertReminder(input: ReminderInput) {
  const idx = MEMORY.findIndex(r => r.userId === input.userId && r.stepId === input.stepId);
  if (idx >= 0) MEMORY[idx] = input; else MEMORY.push(input);
  return { ok: true };
}

export async function listReminders(userId: string) {
  return MEMORY.filter(r => r.userId === userId);
}

// -------- OneSignal sketch (later) --------
// 1) Capture subscription (player_id) on client when user clicks "Enable reminders".
// 2) Store mapping: userId -> player_id in DB.
// 3) A cron job checks due dates daily and triggers notifications via OneSignal REST API.
