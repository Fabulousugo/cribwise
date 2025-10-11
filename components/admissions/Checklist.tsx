'use client';

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface ChecklistStep {
  id: string;
  title: string;
  body?: string;
}

export function Checklist({ steps, programmeId }: { steps: ChecklistStep[]; programmeId?: string }) {
  const storageKey = programmeId ? `cw_chk_${programmeId}` : `cw_chk_generic`;
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
    if (raw) setChecked(JSON.parse(raw));
  }, [storageKey]);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(storageKey, JSON.stringify(checked));
  }, [checked, storageKey]);

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function clearAll() {
    setChecked({});
  }

  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div className="space-y-3">
      <div className="text-sm text-slate-600">{done} / {steps.length} completed</div>
      {steps.map((s) => (
        <div key={s.id} className="flex items-start gap-3 p-3 border rounded-xl">
          <Checkbox id={s.id} checked={!!checked[s.id]} onCheckedChange={() => toggle(s.id)} />
          <div>
            <label htmlFor={s.id} className="font-medium cursor-pointer">{s.title}</label>
            {s.body && <p className="text-sm text-slate-600 mt-1">{s.body}</p>}
          </div>
        </div>
      ))}
      <Button variant="ghost" onClick={clearAll}>Reset checklist</Button>
    </div>
  );
}
