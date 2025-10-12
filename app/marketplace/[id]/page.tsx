// ==========================================
// FILE: app/marketplace/[id]/page.tsx
// Listing Detail — photos, price, condition, seller contact
// ==========================================
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getListingById, getListings } from "@/lib/marketplace";

function formatNGN(n: number) {
  try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);} catch { return `₦${n.toLocaleString()}`; }
}

export default async function ListingPage({ params }: { params: { id: string } }) {
  const item = await getListingById(params.id);
  if (!item) return notFound();

  // Related (same category or school)
  const related = (await getListings({ schoolSlug: item.schoolSlug || "", category: item.category }))
    .filter(l => l.id !== item.id)
    .slice(0, 6);

  return (
    <main className="max-w-5xl mx-auto p-4">
      <nav className="text-sm mb-4 text-slate-600">
        <Link href="/marketplace" className="hover:underline">Marketplace</Link>
        <span> / </span>
        <span className="text-slate-900 line-clamp-1">{item.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{item.title}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span>{item.schoolName || item.schoolSlug}</span>
            <span>• {item.category}</span>
          </div>
        </div>
        <Badge variant="secondary" className="self-start">{item.condition}</Badge>
      </header>

      {/* Gallery + info */}
      <section className="grid md:grid-cols-5 gap-4 mb-6">
        <div className="md:col-span-3 rounded-xl overflow-hidden border">
          <div className="h-72 bg-slate-100">
            {item.images?.[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">No image</div>
            )}
          </div>
        </div>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{formatNGN(item.price)}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700 space-y-2">
            {item.description && <p>{item.description}</p>}
            {item.contactWhatsApp && (
              <a href={`https://wa.me/${item.contactWhatsApp.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer">
                <Button className="w-full">Chat on WhatsApp</Button>
              </a>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Related listings</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((l) => (
              <Link key={l.id} href={`/marketplace/${l.id}`} className="border rounded-xl hover:shadow-md transition overflow-hidden">
                <div className="h-32 bg-slate-100">
                  {l.images?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={l.images[0]} alt={l.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">No image</div>
                  )}
                </div>
                <div className="p-3">
                  <div className="font-medium line-clamp-1">{l.title}</div>
                  <div className="text-xs text-slate-600">{formatNGN(l.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-8 text-sm">
        <Link href="/marketplace" className="text-blue-600 hover:underline">← Back to Marketplace</Link>
      </div>
    </main>
  );
}
