// app/report/report-client.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck } from "lucide-react";

export default function ReportPageClient() {
  const { user, loading } = useAuth();
  const search = useSearchParams();
  const submitted = search?.get("submitted") === "1";
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto p-4">
        <p className="text-slate-600">Loading…</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="max-w-3xl mx-auto p-4">
        <div className="border rounded-xl p-6 bg-slate-50">
          <h1 className="text-xl font-semibold mb-2">Sign in required</h1>
          <p className="text-slate-600">You must be logged in to submit a report.</p>
          <div className="mt-4 flex gap-2">
            <Link href="/signin"><Button>Sign In</Button></Link>
            <Link href="/"><Button variant="outline">Go home</Button></Link>
          </div>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="max-w-3xl mx-auto p-4">
        <div className="border rounded-xl p-6 bg-green-50">
          <h1 className="text-xl font-semibold mb-2">Report received ✅</h1>
        <p className="text-slate-700">Thank you. Our team will review your report shortly. You can track responses in your inbox.</p>
          <div className="mt-4 flex gap-2">
            <Link href="/safety"><Button>Back to Safety</Button></Link>
            <Link href="/"><Button variant="outline">Home</Button></Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-4">
      <header className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full mb-3">
          <ShieldCheck className="h-3.5 w-3.5" /> Report an Issue
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">Help us keep CribWise safe</h1>
        <p className="text-slate-600 mt-1">Tell us what happened. Verified reports are prioritized.</p>
      </header>

      <form
        className="space-y-4"
        action="/api/report/create"
        method="post"
        encType="multipart/form-data"
        onSubmit={() => setSubmitting(true)}
      >
        <div>
          <Label>Issue type</Label>
          <Select name="type" defaultValue="listing">
            <SelectTrigger className="mt-1"><SelectValue placeholder="Choose" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="listing">Suspicious listing</SelectItem>
              <SelectItem value="behavior">Suspicious behavior</SelectItem>
              <SelectItem value="payment">Payment or refund issue</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Listing URL or ID (if relevant)</Label>
          <Input name="listingRef" placeholder="e.g., https://cribwise.app/properties/abc123" />
        </div>

        <div>
          <Label>What happened?</Label>
          <Textarea name="message" required placeholder="Describe the issue with as much detail as you can…" rows={6} />
        </div>

        <div>
          <Label>Evidence (optional)</Label>
          <Input type="file" name="evidence" accept="image/*,application/pdf" />
          <p className="text-xs text-slate-500 mt-1">Screenshots, receipts, or documents that support your report.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Submit report"}</Button>
          <Link href="/safety" className="text-sm text-blue-600 hover:underline">Back to Safety</Link>
        </div>
      </form>
    </main>
  );
}
