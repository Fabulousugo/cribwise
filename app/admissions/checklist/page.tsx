import React from "react";  
import { getGenericGuideSteps } from "@/lib/admissions"; // implement separately
import { Checklist } from "@/components/admissions/Checklist"; // separate client component

export default async function ChecklistPage() {
  const steps = await getGenericGuideSteps();

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Admission Checklist</h1>
      <p className="text-slate-600 mb-4">Tick off tasks and we’ll save your progress in this browser. Sign in later to sync to your account.</p>
      <Checklist steps={steps} />
    </main>
  );
}
