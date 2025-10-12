// ==========================================
// FILE: app/marketplace/page.tsx
// Marketplace Listing — filters: query, school, category, price range, condition
// ==========================================
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getListings, getMarketplaceFilters } from "@/lib/marketplace";
import { getSchools } from "@/lib/admissions";
import type { ListingItem } from "@/lib/marketplace";

function formatNGN(n: number) {
  try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);} catch { return `₦${n.toLocaleString()}`; }
}

export default async function MarketplacePage({ searchParams }: { searchParams?: Record<string, string | string[]> }) {
  const q = typeof searchParams?.q === "string" ? searchParams.q : "";
  const schoolParam = typeof searchParams?.school === "string" ? searchParams.school : "";
  const categoryParam = typeof searchParams?.category === "string" ? searchParams.category : "";
  const conditionParam = typeof searchParams?.condition === "string" ? searchParams.condition : "";
  const minPriceParam = typeof searchParams?.minPrice === "string" ? searchParams.minPrice : "";
  const maxPriceParam = typeof searchParams?.maxPrice === "string" ? searchParams.maxPrice : "";

  // normalize for Selects (no empty value allowed)
  const school = schoolParam === "all" ? "" : schoolParam;
  const category = categoryParam === "all" ? "" : categoryParam;
  const condition = conditionParam === "any" ? "" : conditionParam;
  const minPrice = minPriceParam ? Number(minPriceParam) : undefined;
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined;

  const [schools, filters, listings] = await Promise.all([
    getSchools(),
    getMarketplaceFilters(),
    getListings({ q, schoolSlug: school, category: (category as any) || "", minPrice, maxPrice, condition: (condition as any) || "" }),
  ]);

  return (
    <main className="max-w-6xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Student Marketplace</h1>
        <p className="text-slate-600">Buy and sell textbooks, electronics, furniture, and more within your campus.</p>
      </header>

      {/* Filters */}
      <form action="/marketplace" method="get" className="grid gap-3 md:grid-cols-6 mb-6">
        <div className="md:col-span-2">
          <Input name="q" defaultValue={q} placeholder="Search items…" />
        </div>
        <Select name="school" defaultValue={school ? school : "all"}>
          <SelectTrigger><SelectValue placeholder="School" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All schools</SelectItem>
            {schools.map((s) => (
              <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select name="category" defaultValue={category ? category : "all"}>
          <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {filters.categories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select name="condition" defaultValue={condition ? condition : "any"}>
          <SelectTrigger><SelectValue placeholder="Condition" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any condition</SelectItem>
            {filters.conditions.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="grid grid-cols-2 gap-2">
          <Input name="minPrice" inputMode="numeric" pattern="\\d*" placeholder="Min ₦" defaultValue={minPriceParam} />
          <Input name="maxPrice" inputMode="numeric" pattern="\\d*" placeholder="Max ₦" defaultValue={maxPriceParam} />
        </div>
        <div className="md:col-span-6 flex gap-2">
          <Button type="submit">Apply filters</Button>
          <Link href="/marketplace"><Button type="button" variant="outline">Reset</Button></Link>
          <Link href="/marketplace/sell" className="ml-auto"><Button type="button">Sell an item</Button></Link>
        </div>
      </form>

      {/* Results */}
      {listings.length === 0 ? (
        <div className="bg-slate-50 border rounded-xl p-6">
          <p className="text-slate-700">No listings match your filters.</p>
          <ul className="text-sm text-slate-600 list-disc ml-5 mt-2">
            <li>Try a wider price range or remove some filters.</li>
            <li>Search by category, then refine by condition.</li>
          </ul>
        </div>
      ) : (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((l: ListingItem) => (
            <Link key={l.id} href={`/marketplace/${l.id}`} className="border rounded-xl hover:shadow-md transition overflow-hidden">
              <div className="h-40 bg-slate-100">
                {/* placeholder image */}
                {l.images?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={l.images[0]} alt={l.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">No image</div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{l.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{formatNGN(l.price)}</div>
                  <Badge variant="secondary">{l.condition}</Badge>
                </div>
                <div className="text-xs text-slate-600 mt-1">{l.schoolName || l.schoolSlug}</div>
              </CardContent>
            </Link>
          ))}
        </section>
      )}

      <div className="mt-8 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    </main>
  );
}
