import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GraduationCap, School, Clock, FileText } from "lucide-react";
import { getSchools } from "@/lib/admissions"; 

export default async function AdmissionsHome() {
  const schools = await getSchools(); // expects: { slug, name, city, state, nextDeadline? }[]
  const featured = schools.slice(0, 8);

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-14 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full mb-4">
            <GraduationCap className="h-3.5 w-3.5" /> Admissions Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Your path to admission, step by step</h1>
          <p className="text-slate-600 text-lg mb-6 max-w-2xl mx-auto">Requirements, deadlines, and checklists for Nigerian universities — all in one place.</p>

          {/* SEARCH */}
          <form action="/admissions/search" className="max-w-2xl mx-auto flex gap-2">
            <Input name="q" placeholder="Search schools or programmes… (e.g., UNILAG, Computer Science)" className="text-base" />
            <Button type="submit">Search</Button>
          </form>

          {/* QUICK LINKS */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            <Link href="/admissions/checklist" className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md">My Admission Checklist</Link>
            <Link href="/admissions/deadlines" className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md">Upcoming Deadlines</Link>
            <Link href="/admissions/guides" className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md">Guides</Link>
          </div>
        </div>
      </section>

      {/* FEATURED SCHOOLS */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Popular schools</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((s) => (
              <Link key={s.slug} href={`/admissions/${s.slug}`} className="border rounded-xl p-4 hover:shadow-md transition group">
                <div className="flex items-start gap-3">
                  <School className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold group-hover:text-blue-700">{s.name}</h3>
                    <p className="text-xs text-slate-600">{s.city}, {s.state}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                  <Clock className="h-4 w-4" /> Next deadline: {s.nextDeadline ?? "TBA"}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Don’t miss a requirement</h2>
            <p className="text-slate-600 mt-2">Generate a personalized checklist for your target programme, then get reminders by email/WhatsApp.</p>
          </div>
          <div className="flex md:justify-end">
            <Link href="/admissions/checklist"><Button size="lg" className="gap-2"><FileText className="h-4 w-4" /> Create my checklist</Button></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
