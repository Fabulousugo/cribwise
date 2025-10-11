// ==========================================
// FILE: components/admissions/Checklist.tsx (server-sync)
// Enhances the local checklist with server sync via API routes
// + Notes & Due Dates UI + Filter + ProgressRing + Reminders
// ==========================================
"use client";

import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProgressRing } from "@/components/common/ProgressRing";
import type { ChecklistScope, ChecklistStepInput, ChecklistItemState } from "@/app/types/checklist";

interface Props {
  steps: ChecklistStepInput[];
  programmeId?: string;
}

export function Checklist({ steps, programmeId }: Props) {
  const scope: ChecklistScope = programmeId ? { kind: "programme", programmeId } : { kind: "generic" };
  const storageKey = programmeId ? `cw_chk_${programmeId}` : `cw_chk_generic`;

  const [items, setItems] = useState<Record<string, ChecklistItemState>>({});
  const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({});
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);
  const doneCount = useMemo(() => Object.values(items).filter((i) => i.done).length, [items]);
  const pct = useMemo(() => (steps.length ? (doneCount / steps.length) * 100 : 0), [doneCount, steps.length]);

  // Load local first for instant UI
  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
    if (raw) {
      try {
        const parsed: Record<string, ChecklistItemState> = JSON.parse(raw);
        setItems(parsed);
      } catch {}
    }
  }, [storageKey]);

  // Fetch server state and merge (server wins)
  useEffect(() => {
    async function fetchServer() {
      try {
        const res = await fetch("/api/checklist/get", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ scope }) });
        const data = await res.json();
        if (data?.ok && data.payload?.items) {
          const map: Record<string, ChecklistItemState> = {};
          for (const it of data.payload.items as ChecklistItemState[]) map[it.stepId] = it;
          setItems((prev) => ({ ...prev, ...map }));
        }
      } catch {}
    }
    fetchServer();
  }, [scope]);

  // Persist to localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);

  // ---- helpers to sync single item ----
  async function syncItem(next: ChecklistItemState) {
    try {
      await fetch("/api/checklist/upsert", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ scope, item: next }) });
    } catch {}
  }

  async function postReminder(stepId: string, title: string, dueDateISO: string) {
    try {
      await fetch("/api/reminders/upsert", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ stepId, title, dueDateISO }) });
    } catch {}
  }

  function getItem(stepId: string): ChecklistItemState {
    return items[stepId] ?? { stepId, done: false, note: "", dueDate: null, updatedAt: new Date().toISOString() };
  }

  async function setDone(stepId: string, done: boolean) {
    const base = getItem(stepId);
    const next: ChecklistItemState = { ...base, done, updatedAt: new Date().toISOString() };
    setItems((prev) => ({ ...prev, [stepId]: next }));
    await syncItem(next);
  }

  async function setNote(stepId: string, note: string) {
    const base = getItem(stepId);
    const next: ChecklistItemState = { ...base, note, updatedAt: new Date().toISOString() };
    setItems((prev) => ({ ...prev, [stepId]: next }));
    await syncItem(next);
  }

  async function setDueDate(stepId: string, dueDate: string | null, title?: string) {
    const base = getItem(stepId);
    const next: ChecklistItemState = { ...base, dueDate, updatedAt: new Date().toISOString() };
    setItems((prev) => ({ ...prev, [stepId]: next }));
    await syncItem(next);
    if (dueDate && title) {
      await postReminder(stepId, title, dueDate);
    }
  }

  const visibleSteps = steps.filter((s) => !showOnlyIncomplete || !(items[s.id]?.done));

  return (
    <div className="space-y-4">
      {/* Header with progress + filter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ProgressRing value={pct} />
          <div className="text-sm text-slate-700">
            <div className="font-medium">Progress</div>
            <div>{doneCount} / {steps.length} completed</div>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={showOnlyIncomplete} onCheckedChange={(v) => setShowOnlyIncomplete(Boolean(v))} />
          Show only incomplete
        </label>
      </div>

      {/* Steps */}
      {visibleSteps.map((s) => {
        const state = items[s.id] ?? { stepId: s.id, done: false, note: "", dueDate: null, updatedAt: new Date().toISOString() };
        const isOpen = openDetails[s.id] ?? false;
        return (
          <div key={s.id} className="p-3 border rounded-xl">
            <div className="flex items-start gap-3">
              <Checkbox id={s.id} checked={!!state.done} onCheckedChange={(v) => setDone(s.id, Boolean(v))} />
              <div className="flex-1">
                <label htmlFor={s.id} className="font-medium cursor-pointer">{s.title}</label>
                {s.body && <p className="text-sm text-slate-600 mt-1">{s.body}</p>}
              </div>
              <Button variant="ghost" size="sm" onClick={() => setOpenDetails((o) => ({ ...o, [s.id]: !isOpen }))}>{isOpen ? "Hide" : "Details"}</Button>
            </div>

            {isOpen && (
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs text-slate-600">Due date</label>
                  <Input type="date" value={state.dueDate ?? ""} onChange={(e) => setDueDate(s.id, e.target.value || null, s.title)} />
                  <p className="text-[11px] text-slate-500">Selecting a date registers a reminder (server-side mock for now).</p>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs text-slate-600">Notes</label>
                  <Textarea placeholder="Add a note…" value={state.note ?? ""} onChange={(e) => setNote(s.id, e.target.value)} />
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => setItems({})}>Reset checklist</Button>
      </div>
    </div>
  );
}
