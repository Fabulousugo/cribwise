// ==========================================
// FILE: app/safety/tips/page.tsx
// Safety Tips — concise checklist students see before visits or payments (MODULAR)
// ==========================================
import Link from "next/link";
import { ShieldCheck, MapPin, Banknote, Users, MousePointerClick, MessageSquareWarning } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SafetyTipsPage() {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <header className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full mb-3">
          <ShieldCheck className="h-3.5 w-3.5" /> Safety Tips
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">Stay safe while house‑hunting</h1>
        <p className="text-slate-600 mt-1">Quick checks before you visit, pay, or sign anything.</p>
      </header>

      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5 text-emerald-600"/> On‑site visit checklist</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            <ul className="list-disc ml-5 space-y-1">
              <li>Visit in daylight and go with a friend.</li>
              <li>Ask to meet at the exact location shown in the app; avoid off‑site meetups.</li>
              <li>Confirm the person matches the verified profile photo/name.</li>
              <li>Try locks, taps, power, network signal; look for damp/roof leaks.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Banknote className="h-5 w-5 text-blue-600"/> Payments</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            <ul className="list-disc ml-5 space-y-1">
              <li>Prefer the in‑app booking/deposit flow; avoid cash to individuals.</li>
              <li>Never pay to a third‑party account that’s different from the verified landlord/agent.</li>
              <li>Keep proof of payment and receipts; avoid screenshots that can be faked.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-purple-600"/> Communication</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            <ul className="list-disc ml-5 space-y-1">
              <li>Keep early chats on CribWise; we mask numbers where possible.</li>
              <li>Be cautious of pressure tactics: “pay today or lose it”.</li>
              <li>Report any request to move off‑platform quickly via suspicious links.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MessageSquareWarning className="h-5 w-5 text-amber-600"/> Red flags</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            <ul className="list-disc ml-5 space-y-1">
              <li>Unwilling to meet at the pinned address.</li>
              <li>Demands full payment before viewing or contract.</li>
              <li>Inconsistent names across bank account, ID, and profile.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <div className="mt-8 text-sm flex items-center justify-between">
        <Link href="/safety" className="text-blue-600 hover:underline">← Back to Safety & Verification</Link>
        <Link href="/report" className="text-blue-600 hover:underline">Report an issue →</Link>
      </div>
    </main>
  );
}
