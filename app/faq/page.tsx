// ==========================================
// FILE: app/faq/page.tsx
// FAQ Hub — routes users to Students or Agents
// ==========================================
import Link from "next/link";
import { Metadata } from "next";
import { HelpCircle, GraduationCap, Building2, ShieldCheck, Banknote, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FAQ — Students & Agents | CribWise",
  description: "Choose your path: FAQs for students and agents. Learn about verification, payments, viewings, and safety on CribWise.",
  alternates: { canonical: "/faq" },
};

export default function FAQHubPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800">
              <HelpCircle className="h-4 w-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mt-4">
              How can we help{" "}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">today?</span>
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Pick your audience to see tailored answers. We’ll add questions and guides next.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Card className="border-2 hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Student FAQs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Safety tips, viewings, secure payments, refunds, and what to do if something feels off.
                  </p>
                  <Link href="/faq/students">
                    <Button className="font-semibold">View Student FAQs</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Agent FAQs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Verification, payouts/escrow, listing quality, scheduling viewings, and disputes.
                  </p>
                  <Link href="/faq/agents">
                    <Button className="font-semibold">View Agent FAQs</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Quick highlights */}
            <div className="mt-10 grid md:grid-cols-3 gap-4">
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5" /> Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600 dark:text-slate-300">
                  KYC, badges, and fraud checks to keep everyone safer.
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Banknote className="h-5 w-5" /> Secure Payments
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600 dark:text-slate-300">
                  Funds held in escrow until conditions are met.
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" /> Fast Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600 dark:text-slate-300">
                  Report issues anytime—most cases reviewed within 24 hours.
                </CardContent>
              </Card>
            </div>

            {/* Footer links */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Home</Link>
              <span className="text-slate-400">•</span>
              <Link href="/safety/tips" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Safety Tips</Link>
              <span className="text-slate-400">•</span>
              <Link href="/verify" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Get Verified</Link>
              <span className="text-slate-400">•</span>
              <Link href="/report" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Report Center</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
