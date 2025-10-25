/* eslint-disable @typescript-eslint/no-explicit-any */
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
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Hero Section - VIBRANT gradients restored */}
      <section className="relative py-16 px-4 overflow-hidden">
        {/* Enhanced animated background blobs with multiple colors */}
        <div className="absolute top-10 right-10 w-80 h-80 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-pulse"
             style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.3) 70%, transparent 100%)' }}></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-25 animate-pulse"
             style={{ background: 'radial-gradient(circle, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.3) 70%, transparent 100%)', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse"
             style={{ background: 'radial-gradient(circle, hsl(var(--success)) 0%, hsl(var(--success) / 0.2) 70%, transparent 100%)', animationDelay: '2s' }}></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge with vibrant gradient */}
          <div className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full mb-6 shadow-lg backdrop-blur-sm border border-primary/20"
               style={{ 
                 background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 50%, hsl(var(--accent)) 100%)`,
                 color: 'hsl(var(--primary-foreground))'
               }}>
            <ShoppingBag className="h-4 w-4" /> Student Marketplace
          </div>
          
          {/* Title with VIBRANT multi-color gradient */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            <span className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, 
                      hsl(var(--primary)) 0%, 
                      hsl(var(--accent)) 30%, 
                      hsl(var(--success)) 60%, 
                      hsl(var(--primary)) 100%)`
                  }}>
              Buy, Sell, Thrift 🛍️
            </span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Your campus marketplace for textbooks, electronics, furniture, and more. Student deals that hit different.
          </p>

          {/* Quick Stats with colorful gradients */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="px-4 py-2 text-sm font-bold border-2 shadow-lg backdrop-blur-sm"
                   style={{ 
                     background: `linear-gradient(135deg, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.05) 100%)`,
                     borderColor: 'hsl(var(--primary) / 0.3)',
                     color: 'hsl(var(--primary))'
                   }}>
              <Package className="h-4 w-4 mr-2" />
              {listings.length}+ Items
            </Badge>
            <Badge className="px-4 py-2 text-sm font-bold border-2 shadow-lg backdrop-blur-sm"
                   style={{ 
                     background: `linear-gradient(135deg, hsl(var(--accent) / 0.15) 0%, hsl(var(--accent) / 0.05) 100%)`,
                     borderColor: 'hsl(var(--accent) / 0.3)',
                     color: 'hsl(var(--accent-foreground))'
                   }}>
              <Tag className="h-4 w-4 mr-2" />
              Best Prices
            </Badge>
            <Badge className="px-4 py-2 text-sm font-bold border-2 shadow-lg backdrop-blur-sm"
                   style={{ 
                     background: `linear-gradient(135deg, hsl(var(--success) / 0.15) 0%, hsl(var(--success) / 0.05) 100%)`,
                     borderColor: 'hsl(var(--success) / 0.3)',
                     color: 'hsl(var(--success))'
                   }}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Safe Trades
            </Badge>
          </div>

          {/* Sell CTA with gradient */}
          <Link href="/marketplace/sell">
            <Button 
              size="lg"
              className="font-bold rounded-2xl px-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 border-0"
              style={{
                background: `linear-gradient(135deg, hsl(var(--success)) 0%, hsl(var(--success) / 0.8) 100%)`,
                color: 'hsl(var(--success-foreground))'
              }}
            >
              <Plus className="h-5 w-5 mr-2" />
              Sell an Item
            </Button>
          </Link>
        </div>
      </section>

      {/* Filters Section with gradient accents */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="border-2 shadow-xl overflow-hidden relative">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                 style={{
                   background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)`
                 }}></div>
            
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                     style={{
                       background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)`
                     }}>
                  <Filter className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg">Find Your Perfect Deal</CardTitle>
                  <CardDescription>
                    Filter by school, category, condition, and price
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative z-10">
              <form className="space-y-4" action="/marketplace" method="get">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    name="q" 
                    defaultValue={q} 
                    placeholder="Search items... (e.g., iPhone, Textbooks, Desk)…"
                    className="pl-12 h-12 text-base border-2 rounded-xl focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Filter Grid */}
                <div className="grid md:grid-cols-3 gap-3">
                  {/* School */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">School</label>
                    <Select name="school" defaultValue={school || "all"}>
                      <SelectTrigger className="h-11 border-2 rounded-xl">
                        <SelectValue placeholder="All schools" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All schools</SelectItem>
                        {schools.map((s) => (
                          <SelectItem key={s.slug} value={s.slug}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Category</label>
                    <Select name="category" defaultValue={category || "all"}>
                      <SelectTrigger className="h-11 border-2 rounded-xl">
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All categories</SelectItem>
                        {filters.categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Condition */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Condition</label>
                    <Select name="condition" defaultValue={condition || "any"}>
                      <SelectTrigger className="h-11 border-2 rounded-xl">
                        <SelectValue placeholder="Any condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any condition</SelectItem>
                        {filters.conditions.map((cond) => (
                          <SelectItem key={cond} value={cond}>
                            {cond}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Price Range */}
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Min Price (₦)</label>
                    <Input 
                      type="number" 
                      name="minPrice" 
                      defaultValue={minPrice} 
                      placeholder="0" 
                      className="h-11 border-2 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Max Price (₦)</label>
                    <Input 
                      type="number" 
                      name="maxPrice" 
                      defaultValue={maxPrice} 
                      placeholder="1000000" 
                      className="h-11 border-2 rounded-xl"
                    />
                  </div>
                </div>

                {/* Action Buttons with gradients */}
                <div className="flex gap-3 pt-2">
                  <Button 
                    type="submit" 
                    className="flex-1 font-bold h-11 rounded-xl border-0 shadow-md hover:shadow-lg transition-all"
                    style={{
                      background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.85) 100%)`,
                      color: 'hsl(var(--primary-foreground))'
                    }}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Apply Filters
                  </Button>
                  {hasActiveFilters && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="border-2 font-bold h-11 rounded-xl"
                      asChild
                    >
                      <Link href="/marketplace">Clear</Link>
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Listings Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              <span className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(var(--primary)) 100%)`
                    }}>
                {hasActiveFilters ? "Search Results" : "All Listings"}
              </span>
            </h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Package className="h-5 w-5" />
              <p className="text-sm font-medium">
                {listings.length} {listings.length === 1 ? "item" : "items"} found
              </p>
            </div>
          </div>

          {listings.length === 0 ? (
            <Card className="border-2 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5"
                   style={{
                     background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)`
                   }}></div>
              <CardContent className="p-12 text-center relative z-10">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">No listings match your search 🤔</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Can&apos;t find what you&apos;re looking for? Try widening your search or be the first to list it!
                </p>
                <div className="space-y-2 text-sm text-muted-foreground mb-6">
                  <p>💡 <span className="font-semibold">Try:</span> Wider price range or fewer filters</p>
                  <p>🏷️ <span className="font-semibold">Browse:</span> Search by category only</p>
                  <p>📱 <span className="font-semibold">New listing?</span> Be the first to sell this item</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/marketplace">
                    <Button className="font-bold rounded-xl shadow-md border-0"
                            style={{
                              background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)`,
                              color: 'hsl(var(--primary-foreground))'
                            }}>
                      Clear All Filters
                    </Button>
                  </Link>
                  <Link href="/marketplace/sell">
                    <Button variant="outline" className="border-2 font-bold rounded-xl"
                            style={{
                              borderColor: 'hsl(var(--success))',
                              color: 'hsl(var(--success))'
                            }}>
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
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 group overflow-hidden relative"
                        style={{
                          borderColor: 'hsl(var(--border))'
                        }}>
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                         style={{
                           background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)`
                         }}></div>
                    
                    {/* Image */}
                    <div className="relative h-48 bg-muted overflow-hidden">
                      {l.images?.[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={l.images[0]} 
                          alt={l.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                          <Package className="h-12 w-12" />
                        </div>
                      )}
                      
                      {/* Favorite button overlay */}
                      <button 
                        title="favorite" 
                        className="absolute top-3 right-3 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-all shadow-lg opacity-0 group-hover:opacity-100"
                      >
                        <Heart className="h-5 w-5 text-muted-foreground hover:text-destructive transition-colors" />
                      </button>

                      {/* Condition Badge with gradient */}
                      <div className="absolute bottom-3 left-3">
                        <Badge className="font-bold shadow-lg border-0"
                               style={{
                                 background: l.condition === "New" 
                                   ? `linear-gradient(135deg, hsl(var(--success)) 0%, hsl(var(--success) / 0.8) 100%)`
                                   : l.condition === "Like New"
                                   ? `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)`
                                   : l.condition === "Good"
                                   ? `linear-gradient(135deg, hsl(var(--warning)) 0%, hsl(var(--warning) / 0.8) 100%)`
                                   : `linear-gradient(135deg, hsl(var(--info)) 0%, hsl(var(--info) / 0.8) 100%)`,
                                 color: l.condition === "New" 
                                   ? 'hsl(var(--success-foreground))'
                                   : l.condition === "Like New"
                                   ? 'hsl(var(--primary-foreground))'
                                   : l.condition === "Good"
                                   ? 'hsl(var(--warning-foreground))'
                                   : 'hsl(var(--info-foreground))'
                               }}>
                          {l.condition}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3 relative z-10">
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {l.title}
                      </CardTitle>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-2xl font-black bg-clip-text text-transparent"
                             style={{
                               backgroundImage: `linear-gradient(135deg, hsl(var(--success)) 0%, hsl(var(--success) / 0.7) 100%)`
                             }}>
                          {formatNGN(l.price)}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="relative z-10">
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p className="flex items-center gap-1">
                          <span>📍</span>
                          <span className="font-medium">{l.schoolName || l.schoolSlug}</span>
                        </p>
                      </div>

                      <Button 
                        className="w-full mt-4 font-bold rounded-xl group-hover:scale-105 transition-transform border-0 shadow-md"
                        size="sm"
                        style={{
                          background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)`,
                          color: 'hsl(var(--primary-foreground))'
                        }}
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

      {/* CTA Section with VIBRANT gradient */}
      <section 
        className="relative py-16 px-4 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, 
            hsl(var(--hero-from)) 0%, 
            hsl(var(--primary)) 25%,
            hsl(var(--accent)) 50%,
            hsl(var(--hero-via)) 75%,
            hsl(var(--hero-to)) 100%)`
        }}
      >
        {/* Additional overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/20"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-sm font-bold bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6 border border-white/30">
            <Sparkles className="h-4 w-4" /> Start Selling Today
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">
            Got Stuff to Sell? 💰
          </h2>
          
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto drop-shadow">
            List your items in minutes and reach thousands of students on campus. No fees, no hassle, just vibes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace/sell">
              <Button 
                size="lg"
                className="bg-white hover:bg-slate-100 font-bold rounded-2xl px-8 shadow-xl hover:scale-105 transition-all"
                style={{ color: 'hsl(var(--primary))' }}
              >
                <Plus className="h-5 w-5 mr-2" />
                List Your Item
              </Button>
            </Link>
            <Button 
              size="lg"
              className="border-2 border-white text-white hover:bg-white/10 font-bold rounded-2xl backdrop-blur-sm shadow-lg"
              asChild
            >
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>

          <p className="text-white/70 text-sm mt-8 drop-shadow">
            Trusted by 10,000+ students across Nigeria 🇳🇬
          </p>
        </div>
      </section>
    </main>
  );
}