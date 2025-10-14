// ==========================================
// FILE: app/faq/agents/page.tsx
// Inclusive Agent FAQs — platform-wide (not just housing)
// ==========================================
import Link from "next/link";
import { Metadata } from "next";
import { Building2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Agent FAQs | CribWise",
  description:
    "Inclusive FAQs for agents and providers: verification, inclusive listings, accessibility, payments/escrow, cancellations, disputes, and data privacy.",
  alternates: { canonical: "/faq/agents" },
};

const agentFaq: { q: string; a: string }[] = [
  {
    q: "Is CribWise only for property agents?",
    a: "No. CribWise supports verified providers across housing and student-friendly services (e.g., cleaning, moving, tutoring, wellness). The same safety and payment rules apply.",
  },
  {
    q: "How do I get verified?",
    a: "Complete KYC with a government ID and proof of business or ownership. Depending on category, we may request licenses, insurance, or accreditation.",
  },
  {
    q: "What are inclusive listing guidelines?",
    a: "Use welcoming language, avoid discriminatory criteria, disclose accessibility details, and present accurate pricing. Listings must comply with local anti-discrimination laws.",
  },
  {
    q: "How should I communicate with students?",
    a: "Keep messaging on-platform, be clear and respectful, avoid pressure tactics, and confirm key details (location, timing, scope, price) in writing before payment.",
  },
  {
    q: "How do payments and escrow work?",
    a: "Students pay via CribWise. Funds are held in escrow and released after agreed milestones (e.g., completed viewing or service). Off-platform payments are not protected.",
  },
  {
    q: "What accessibility information should I include?",
    a: "Be specific: step-free access, elevator, accessible restroom, quiet hours, service-animal policy, captions/notes for sessions, or sensory considerations for events.",
  },
  {
    q: "How are cancellations and no-shows handled?",
    a: "Set clear cancellation windows in your listing. Repeated last-minute cancellations harm rankings. No-shows may incur fees per policy; communicate proactively if delays occur.",
  },
  {
    q: "How do disputes work?",
    a: "Open a case in the Transactions panel with evidence (photos, chat logs, agreements). We review both sides and may issue partial or full refunds or release funds accordingly.",
  },
  {
    q: "What’s CribWise’s policy on harassment and discrimination?",
    a: "Zero tolerance. Discriminatory content, refusal of service based on protected characteristics, or harassment can lead to removal and account suspension.",
  },
  {
    q: "Can my team collaborate on listings and inbox?",
    a: "Yes. Add team members with role-based permissions to manage listings, calendars, and payouts securely from one organization workspace.",
  },
  {
    q: "How do I improve ranking and conversion?",
    a: "Fast responses, transparent pricing, inclusive language, strong photos, verified status, and consistent 5★ service. Encourage post-transaction reviews.",
  },
  {
    q: "How is provider data protected?",
    a: "We encrypt data, restrict access, and follow least-privilege principles. Use 2FA, unique passwords, and keep banking details updated in your payout settings.",
  },
  {
    q: "Can I require age or ID from students?",
    a: "Only when legally required or justified by safety (e.g., equipment rental). Keep requests minimal, store data securely, and never ask for irrelevant personal documents.",
  },
  {
    q: "What evidence helps in case of a dispute?",
    a: "Clear scope of work, time-stamped messages, before/after photos, signed agreements, and proof of attendance or delivery. Keep records within CribWise when possible.",
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

export default function AgentFAQPage() {
  return (
    <main className="min-h-screen">
      {/* Breadcrumbs */}
      <nav className="max-w-6xl mx-auto px-4 pt-6 text-sm">
        <ol className="flex flex-wrap items-center gap-2 text-slate-500">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li>›</li>
          <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
          <li>›</li>
          <li className="text-slate-700 dark:text-slate-300 font-medium">Agents</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl shadow">
              <Building2 className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black">Agent & Provider FAQs</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
            Guidance for inclusive listings, safe communications, escrow, cancellations, disputes, and privacy.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/verify"><Button variant="outline" className="border-2 font-semibold">Get Verified</Button></Link>
            <Link href="/report"><Button variant="outline" className="border-2 font-semibold">Report an Issue</Button></Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <Accordion type="single" collapsible className="w-full">
          {agentFaq.map((item, i) => (
            <AccordionItem key={i} value={`agent-${i}`}>
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

      <FAQSchema items={agentFaq} />
    </main>
  );
}
