'use client';

import React from "react";
import { Calendar } from "lucide-react";

export function DeadlineBadge({ dateISO }: { dateISO?: string | null }) {
  if (!dateISO) {
    return (
      <span className="inline-flex items-center gap-2 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
        <Calendar className="h-3.5 w-3.5" /> Deadline: TBA
      </span>
    );
  }
  const d = new Date(dateISO);
  const label = d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  return (
    <span className="inline-flex items-center gap-2 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
      <Calendar className="h-3.5 w-3.5" /> Deadline: {label}
    </span>
  );
}
