import Link from "next/link";
import { notFound } from "next/navigation";
import { School, Clock } from "lucide-react";
import { getSchoolBySlug, getProgrammesBySchool } from "@/lib/admissions"; // implement separately
import { Badge } from "@/components/ui/badge";

export default async function SchoolPage(
  { params }: { params: Promise<{ school: string }> }
) {
  const { school: schoolSlug } = await params;
  const school = await getSchoolBySlug(schoolSlug);
  if (!school) return notFound();

  const programmes = await getProgrammesBySchool(school.id);

  return (
    <main className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <School className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h1 className="text-3xl font-bold">{school.name}</h1>
            <p className="text-slate-600">{school.city}, {school.state}</p>
            {school.allowedDomains?.length ? (
              <p className="text-xs text-slate-600 mt-1">School email domains: {school.allowedDomains.join(", ")}</p>
            ) : null}
          </div>
        </div>
      </div>

      {/* Programmes list */}
      <h2 className="text-xl font-semibold mb-3">Programmes</h2>
      {programmes.length === 0 ? (
        <p className="text-slate-600">No programmes found yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {programmes.map((p) => (
            <Link
              key={p.slug}
              href={`/admissions/${school.slug}/${p.slug}`}
              className="border rounded-xl p-4 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-xs text-slate-600">Level: {p.level}</p>
                </div>
                {p.open ? <Badge>Open</Badge> : <Badge variant="secondary">Closed</Badge>}
              </div>
              {p.summary && (
                <p className="text-sm text-slate-600 mt-2 line-clamp-2">{p.summary}</p>
              )}
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                <Clock className="h-4 w-4" /> Next deadline: {p.nextDeadline ?? "TBA"}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Back link */}
      <div className="mt-6 text-sm">
        <Link href="/admissions" className="text-blue-600 hover:underline">← Back to Admissions</Link>
      </div>
    </main>
  );
}
