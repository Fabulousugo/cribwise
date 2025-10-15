// app/report/page.tsx
import { Suspense } from "react";
import ReportPageClient from "../report/report-client";

export default function ReportPage() {
  return (
    <Suspense fallback={<main className="max-w-3xl mx-auto p-4"><p className="text-slate-600">Loading…</p></main>}>
      <ReportPageClient />
    </Suspense>
  );
}
