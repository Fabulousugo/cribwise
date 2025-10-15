import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getListings, getMarketplaceFilters } from "@/lib/marketplace";
import { getSchools } from "@/lib/admissions";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Package, 
  TrendingUp, 
  Sparkles, 
  DollarSign,
  Tag,
  Heart,
  Plus,
  Zap
} from "lucide-react";
import type { ListingItem } from "@/lib/marketplace";

function formatNGN(n: number) {
  try { 
    return new Intl.NumberFormat(undefined, { 
      style: 'currency', 
      currency: 'NGN', 
      maximumFractionDigits: 0 
    }).format(n);
  } catch { 
    return `₦${n.toLocaleString()}`; 
  }
}

export default async function MarketplacePage({ searchParams }: { searchParams?: Record<string, string | string[]> }) {
  const q = typeof searchParams?.q === "string" ? searchParams.q : "";
  const schoolParam = typeof searchParams?.school === "string" ? searchParams.school : "";
  const categoryParam = typeof searchParams?.category === "string" ? searchParams.category : "";
  const conditionParam = typeof searchParams?.condition === "string" ? searchParams.condition : "";
  const minPriceParam = typeof searchParams?.minPrice === "string" ? searchParams.minPrice : "";
  const maxPriceParam = typeof searchParams?.maxPrice === "string" ? searchParams.maxPrice : "";

  const school = schoolParam === "all" ? "" : schoolParam;
  const category = categoryParam === "all" ? "" : categoryParam;
  const condition = conditionParam === "any" ? "" : conditionParam;
  const minPrice = minPriceParam ? Number(minPriceParam) : undefined;
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined;

  const [schools, filters, listings] = await Promise.all([
    getSchools(),
    getMarketplaceFilters(),
    getListings({ 
      q, 
      schoolSlug: school, 
      category: (category as any) || "", 
      minPrice, 
      maxPrice, 
      condition: (condition as any) || "" 
    }),
  ]);

  const hasActiveFilters = q || school || category || condition || minPrice || maxPrice;

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse delay-75"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-full mb-6">
            <ShoppingBag className="h-4 w-4" /> Student Marketplace
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
            Buy, Sell, Thrift 🛍️
          </h1>
          
          <p className="text-slate-700 dark:text-slate-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Your campus marketplace for textbooks, electronics, furniture, and more. Student deals that hit different.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 text-sm font-bold border-2 border-purple-200 dark:border-purple-800">
              <Package className="h-4 w-4 mr-2" />
              {listings.length}+ Items
            </Badge>
            <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 text-sm font-bold border-2 border-blue-200 dark:border-blue-800">
              <Tag className="h-4 w-4 mr-2" />
              Best Prices
            </Badge>
            <Badge className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-4 py-2 text-sm font-bold border-2 border-pink-200 dark:border-pink-800">
              <TrendingUp className="h-4 w-4 mr-2" />
              Safe Trades
            </Badge>
          </div>

          {/* Sell CTA */}
          <Link href="/marketplace/sell">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl px-8 shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="h-5 w-5 mr-2" />
              Sell an Item
            </Button>
          </Link>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="border-2 border-purple-100 dark:border-purple-900/30 shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-xl flex items-center justify-center">
                  <Filter className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Find Your Perfect Deal</CardTitle>
                  <CardDescription className="dark:text-slate-400">
                    Filter by school, category, condition, and price
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <form className="space-y-4" action="/marketplace" method="get">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input 
                    name="q" 
                    defaultValue={q} 
                    placeholder="Search items... (e.g., iPhone, Textbooks, Desk)…"
                    className="pl-12 h-12 text-base border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                {/* Filter Grid */}
                <div className="grid md:grid-cols-3 gap-3">
                  {/* School */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">School</label>
                    <Select name="school" defaultValue={school || "all"}>
                      <SelectTrigger className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl">
                        <SelectValue placeholder="All schools" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All schools</SelectItem>
                        {schools.map((s) => (
                          <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Category</label>
                    <Select name="category" defaultValue={category || "all"}>
                      <SelectTrigger className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl">
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All categories</SelectItem>
                        {filters.categories.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Condition */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Condition</label>
                    <Select name="condition" defaultValue={condition || "any"}>
                      <SelectTrigger className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl">
                        <SelectValue placeholder="Any condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any condition</SelectItem>
                        {filters.conditions.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Price Range (₦)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <Input 
                      name="minPrice" 
                      inputMode="numeric" 
                      pattern="\\d*" 
                      placeholder="Min ₦" 
                      defaultValue={minPriceParam}
                      className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                    <Input 
                      name="maxPrice" 
                      inputMode="numeric" 
                      pattern="\\d*" 
                      placeholder="Max ₦" 
                      defaultValue={maxPriceParam}
                      className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl px-6"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Apply Filters
                  </Button>
                  <Link href="/marketplace">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold rounded-xl"
                    >
                      Reset All
                    </Button>
                  </Link>
                  {hasActiveFilters && (
                    <Badge variant="outline" className="px-3 py-2">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Filters Active
                    </Badge>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Results Header */}
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-1">
                {listings.length === 0 ? "No Items Found" : `${listings.length} Items Available`}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                {listings.length === 0 ? "Try adjusting your filters" : "Click any item to view details"}
              </p>
            </div>
          </div>

          {listings.length === 0 ? (
            <Card className="border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-800 dark:to-purple-950/20">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">No listings match your search 🤔</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                  Can't find what you're looking for? Try widening your search or be the first to list it!
                </p>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                  <p>💡 <span className="font-semibold">Try:</span> Wider price range or fewer filters</p>
                  <p>🏷️ <span className="font-semibold">Browse:</span> Search by category only</p>
                  <p>📱 <span className="font-semibold">New listing?</span> Be the first to sell this item</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/marketplace">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl">
                      Clear All Filters
                    </Button>
                  </Link>
                  <Link href="/marketplace/sell">
                    <Button variant="outline" className="border-2 border-green-500 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-950/20 font-bold rounded-xl">
                      <Plus className="h-4 w-4 mr-2" />
                      List Your Item
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((l: ListingItem) => (
                <Link key={l.id} href={`/marketplace/${l.id}`}>
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 group overflow-hidden">
                    {/* Image */}
                    <div className="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      {l.images?.[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={l.images[0]} 
                          alt={l.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                          <Package className="h-12 w-12" />
                        </div>
                      )}
                      
                      {/* Favorite button overlay */}
                      <button className="absolute top-3 right-3 w-10 h-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 transition-all shadow-lg opacity-0 group-hover:opacity-100">
                        <Heart className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                      </button>

                      {/* Condition Badge */}
                      <div className="absolute bottom-3 left-3">
                        <Badge className={`${
                          l.condition === "New" ? "bg-green-500 text-white" :
                          l.condition === "Like New" ? "bg-blue-500 text-white" :
                          l.condition === "Good" ? "bg-yellow-500 text-white" :
                          "bg-orange-500 text-white"
                        } font-bold shadow-lg`}>
                          {l.condition}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {l.title}
                      </CardTitle>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                          {formatNGN(l.price)}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                        <p className="flex items-center gap-1">
                          <span>📍</span>
                          <span className="font-medium">{l.schoolName || l.schoolSlug}</span>
                        </p>
                      </div>

                      <Button 
                        className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl group-hover:scale-105 transition-transform"
                        size="sm"
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-95"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-sm font-bold bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" /> Start Selling Today
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Got Stuff to Sell? 💰
          </h2>
          
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            List your items in minutes and reach thousands of students on campus. No fees, no hassle, just vibes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace/sell">
              <Button 
                size="lg"
                className="bg-white text-purple-700 hover:bg-slate-100 font-bold rounded-2xl px-8"
              >
                <Plus className="h-5 w-5 mr-2" />
                List Your Item
              </Button>
            </Link>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-bold rounded-2xl backdrop-blur-sm"
              asChild
            >
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>

          <p className="text-white/70 text-sm mt-8">
            Trusted by 10,000+ students across Nigeria 🇳🇬
          </p>
        </div>
      </section>
    </main>
  );
}