// ==========================================
// FILE: app/safety/page.tsx
// Safety & Verification — explains CribWise Trust Pack (MODULAR: this file only)
// ==========================================
import Link from "next/link";
import { ShieldCheck, UserCheck, Building2, MapPinCheck, Camera, AlertTriangle, Lock, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function SafetyPage() {
  return (
    <main className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <header className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full mb-3">
          <ShieldCheck className="h-3.5 w-3.5" /> CribWise Trust Pack
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">Safety & Verification</h1>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">How we keep students safe and listings trustworthy — without heavy admin reviews.</p>
      </header>

      {/* Trust pillars */}
      <section className="grid md:grid-cols-2 gap-4 mb-10">
        <Card className="hover:shadow-sm transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserCheck className="h-5 w-5 text-green-600" /> Verified Students</CardTitle>
            <CardDescription>Identity + eligibility</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-700 space-y-2">
            <ul className="list-disc ml-5 space-y-1">
              <li>School email verification (<code>.edu.ng</code> domains) within 90 days of admission.</li>
              <li>Optional: student ID / admission letter for prospective & admitted users.</li>
              <li>Phone/email OTP; suspicious activity triggers re‑verification.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-sm transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5 text-blue-600" /> Verified Landlords & Agents</CardTitle>
            <CardDescription>Basic KYC for listers</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-700 space-y-2">
            <ul className="list-disc ml-5 space-y-1">
              <li>NIN + phone OTP (no bank statement required).</li>
              <li>Face match (selfie vs. ID) when risk signals are high.</li>
              <li>One‑tap WhatsApp number binding to reduce impersonation.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-sm transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MapPinCheck className="h-5 w-5 text-emerald-600" /> Verified Listings</CardTitle>
            <CardDescription>GPS + media integrity</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-700 space-y-2">
            <ul className="list-disc ml-5 space-y-1">
              <li>Auto‑geotag from <strong>WhatsApp‑style</strong> upload link or camera capture.</li>
              <li>EXIF checks (freshness, tamper flags) + soft blocks for anomalies.</li>
              <li>Micro‑deposit flow for bookings to deter spam/scams (refundable).</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-sm transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5 text-purple-600" /> Safer Messages & Payments</CardTitle>
            <CardDescription>Keep chats on-platform when possible</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-700 space-y-2">
            <ul className="list-disc ml-5 space-y-1">
              <li>Flag risky phrases; show inline tips before money changes hands.</li>
              <li>Verified‑only booking links; deposit protection explained upfront.</li>
              <li>Phone masking (relay) where available to limit off‑platform bait‑and‑switch.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* How verification works */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">How verification works</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Camera className="h-5 w-5 text-pink-600" /> Photo & Media Capture</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <p>We guide agents with a 4‑shot capture flow (front, room, facilities, surroundings). The link works on WhatsApp and low‑spec phones.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MapPinCheck className="h-5 w-5 text-emerald-600" /> Location Lock</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <p>GPS is captured at shoot time; pins are <em>not</em> draggable by agents. We store a hashed geo token for privacy + accuracy.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-green-600" /> Risk Scoring</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <p>Signals from identity, device, media, and history determine whether extra checks are required before listing goes live.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reporting & enforcement */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Report an issue</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-amber-600" /> Suspicious listing or behavior</CardTitle>
              <CardDescription>Help us take action quickly</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <p>Every property page has a <em>Report</em> link. We prioritize reports from verified students and recent visitors.</p>
              <Link href="/report" className="text-blue-600 hover:underline text-sm">Open the report form →</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><HelpCircle className="h-5 w-5 text-blue-600" /> Safety tips</CardTitle>
              <CardDescription>Before you pay or visit</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <ul className="list-disc ml-5 space-y-1">
                <li>Tour in daylight and preferably with a friend.</li>
                <li>Use the booking/deposit flow; avoid cash to strangers.</li>
                <li>Confirm landlord/agent identity matches the verified profile.</li>
              </ul>
              <Link href="/safety/tips" className="text-blue-600 hover:underline text-sm">Read all safety tips →</Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 border rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Want the badge?</h3>
          <p className="text-sm text-slate-700">Complete verification to get a visible check on your profile and listings.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/verify"><Button>Verify me</Button></Link>
          <Link href="/safety/tips"><Button variant="outline">Safety tips</Button></Link>
        </div>
      </section>

      <div className="mt-8 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    </main>
  );
}
