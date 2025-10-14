// ==========================================
// FILE: app/faq/students/page.tsx
// Inclusive Student FAQs — platform-wide (not just housing)
// ==========================================
import Link from "next/link";
import { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Student FAQs | CribWise",
  description:
    "Inclusive FAQs for students across housing and services: safety, payments, accessibility, privacy, reporting harassment, international guidance, and more.",
  alternates: { canonical: "/faq/students" },
};

const studentFaq: { q: string; a: string }[] = [
  {
    q: "Is CribWise only for housing?",
    a: "No. CribWise helps students discover and book trusted housing, services, and activities. Safety, secure payments, and verification apply across all categories.",
  },
  {
    q: "How do I stay safe when meeting someone for a viewing or service?",
    a: "Arrange daytime appointments, meet at the pinned location, bring a friend when possible, share your live location, and keep chats on-platform until trust is established.",
  },
  {
    q: "How do payments work and when are funds released?",
    a: "Pay only via CribWise. We hold funds in escrow until the provider meets agreed conditions (e.g., successful viewing, completed service). Off-platform payments aren’t protected.",
  },
  {
    q: "Can I get a refund if the service or place isn’t as advertised?",
    a: "Yes. Report within the stated window with evidence (photos, messages, receipts). We investigate and can reverse or hold funds while we resolve your case.",
  },
  {
    q: "I don’t have a local guarantor—what are my options?",
    a: "Some providers accept alternatives like a higher deposit, staged payments, or approved third-party guarantors. Ask directly on-platform and check listing/service terms.",
  },
  {
    q: "What accessibility information is available?",
    a: "Providers are encouraged to list accessibility details (e.g., step-free access, quiet hours, captions). Message providers for specifics and use the ‘Accessibility’ tag filters where available.",
  },
  {
    q: "How does CribWise handle discrimination or harassment?",
    a: "Zero tolerance. Report via the listing, profile, or /report with details. We investigate, can suspend accounts, and support you with next steps. Emergencies: contact local authorities first.",
  },
  {
    q: "I’m LGBTQ+ or part of a minority group—can I filter for inclusive providers?",
    a: "Yes. Look for ‘Inclusive’ or ‘LGBTQ+ friendly’ tags and reviews. You can also message providers anonymously first via the platform’s masked contact tools.",
  },
  {
    q: "What if a provider pressures me to pay quickly or move off-platform?",
    a: "Don’t comply. Pressure to rush or switch to personal accounts, crypto, or gift cards is a major red flag. Keep chats on CribWise and report the profile.",
  },
  {
    q: "How is my data protected?",
    a: "We use encryption, access controls, and fraud checks. We minimize data collection and mask contact details during early chats. See our Privacy Policy for retention and rights.",
  },
  {
    q: "Can under-18 students use CribWise?",
    a: "Some categories require 18+. When under-18 use is allowed, we apply enhanced safeguards and may require guardian consent depending on your region.",
  },
  {
    q: "I’m an international student. Any special steps?",
    a: "Use your passport for KYC if needed, confirm timezone/meeting logistics, and clarify documentation requirements (e.g., visa letters) with providers before booking.",
    },
  {
    q: "How do reviews work?",
    a: "Only verified transactions can leave reviews. We moderate for hate speech or private info. Providers can respond publicly, but cannot pay to remove honest feedback.",
  },
  {
    q: "Where do I get help quickly?",
    a: "Use /report for urgent safety issues, in-app support chat for account/billing, and the Help Center for guides. If you’re in danger, contact emergency services first.",
  },
];

function FAQSchema({ items }: { items: { q: string; a: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export default function StudentFAQPage() {
  return (
    <main className="min-h-screen">
      {/* Breadcrumbs */}
      <nav className="max-w-6xl mx-auto px-4 pt-6 text-sm">
        <ol className="flex flex-wrap items-center gap-2 text-slate-500">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li>›</li>
          <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
          <li>›</li>
          <li className="text-slate-700 dark:text-slate-300 font-medium">Students</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl shadow">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black">Student FAQs</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
            Safety-first answers for housing, services, activities, payments, accessibility, and reporting.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/safety/tips"><Button variant="outline" className="border-2 font-semibold">Safety Tips</Button></Link>
            <Link href="/report"><Button variant="outline" className="border-2 font-semibold">Report a Concern</Button></Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <Accordion type="single" collapsible className="w-full">
          {studentFaq.map((item, i) => (
            <AccordionItem key={i} value={`student-${i}`}>
              <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
              <AccordionContent className="text-slate-700 dark:text-slate-300">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Footer links */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/faq" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">← Back to FAQ Hub</Link>
          <span className="text-slate-400">•</span>
          <Link href="/verify" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Get Verified</Link>
          <span className="text-slate-400">•</span>
          <Link href="/safety/tips" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Safety Tips</Link>
          <span className="text-slate-400">•</span>
          <Link href="/report" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Report Center</Link>
        </div>
      </div>

      <FAQSchema items={studentFaq} />
    </main>
  );
}
