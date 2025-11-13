import { notFound } from "next/navigation";
import Link from "next/link";
import { getProgrammeBySlugs, getGuideStepsForProgramme } from "@/lib/admissions"; // implement separately
import { DeadlineBadge } from "@/app/admissions/DeadlineBadge"; // separate component file
import { Checklist } from "@/components/admissions/Checklist"; // separate client component

export default async function ProgrammePage(
  { params }: { params: Promise<{ school: string; programme: string }> }
) {
  const { school: schoolSlug, programme: programmeSlug } = await params;
  const data = await getProgrammeBySlugs(schoolSlug, programmeSlug);

  if (!data) return notFound();
  const { programme, school } = data;
  const steps = await getGuideStepsForProgramme(programme.id);

  return (
    <main className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <nav className="text-sm mb-3 text-slate-600">
        <Link href="/admissions" className="hover:underline">Admissions</Link>
        <span> / </span>
        <Link href={`/admissions/${school.slug}`} className="hover:underline">{school.name}</Link>
        <span> / </span>
        <span className="text-slate-900">{programme.name}</span>
      </nav>

      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">{programme.name} — {school.name}</h1>
        <p className="text-slate-600">Level: {programme.level}</p>
        <div className="mt-2"><DeadlineBadge dateISO={programme.nextDeadline} /></div>
      </div>

      {/* Requirements */}
      <section className="prose prose-slate max-w-none">
        <h2>Requirements</h2>
        <ul>
          {(programme.requirements || []).map((r: string, i: number) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </section>

      {/* Checklist */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Your checklist</h2>
        <Checklist steps={steps} programmeId={programme.id} />
      </section>

      {/* Back link */}
      <div className="mt-8 text-sm">
        <Link href={`/admissions/${school.slug}`} className="text-blue-600 hover:underline">← Back to {school.name}</Link>
      </div>
    </main>
  );
}
