// app/properties/properties-client.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useDeferredValue } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Heart, MapPin, Bed, Bath, CheckCircle2, X, SlidersHorizontal, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { properties } from "@/lib/properties";

// --- utils ---------------------------------------------------------------
const NGN = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// --- card ---------------------------------------------------------------
function PropertyCard({ property }: { property: any }) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-0 bg-white dark:bg-slate-900">
      <div className="relative h-64 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {/* Image with loading state */}
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className={cn(
            "object-cover transition-all duration-500 group-hover:scale-110",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          sizes="(min-width: 768px) 33vw, 100vw"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 animate-pulse" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top bar with badges and like button - Always visible */}
        <div className="absolute top-0 left-0 right-0 p-3 flex items-start justify-between z-10">
          {/* Verified Badge */}
          {property.verified && (
            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg border-0 gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Verified
            </Badge>
          )}
          
          {/* Spacer if no badge */}
          {!property.verified && <div />}

          {/* Like Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="w-10 h-10 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-slate-900 transition-all duration-200 shadow-lg hover:scale-110 active:scale-95"
            aria-label="Add to favorites"
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-all duration-200",
                isLiked
                  ? "fill-red-500 stroke-red-500 scale-110"
                  : "stroke-slate-700 dark:stroke-slate-300 hover:stroke-red-500"
              )}
            />
          </button>
        </div>

        {/* Not Available Overlay */}
        {!property.available && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm grid place-items-center animate-in fade-in duration-200 z-20">
            <div className="text-center space-y-2">
              <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg inline-block">
                Not Available
              </span>
              <p className="text-white/80 text-sm">Check back soon</p>
            </div>
          </div>
        )}
      </div>

      <CardHeader className="space-y-2 pb-3">
        <CardTitle className="text-lg font-bold line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {property.title}
        </CardTitle>
        
        <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
          <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span className="font-medium truncate">{property.location}</span>
        </div>
        
        <p className="text-xs text-slate-500 dark:text-slate-500 truncate">
          {property.university}
        </p>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        {/* Price */}
        <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {NGN.format(property.price)}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">/year</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-3 text-sm pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <Bed className="w-4 h-4 text-slate-500" />
            <span className="font-semibold">{property.bedrooms}</span>
          </div>
          <div className="w-px h-4 bg-slate-300 dark:bg-slate-700" />
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <Bath className="w-4 h-4 text-slate-500" />
            <span className="font-semibold">{property.bathrooms}</span>
          </div>
          <div className="w-px h-4 bg-slate-300 dark:bg-slate-700" />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
            {property.type}
          </span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {property.amenities.slice(0, 3).map((amenity: string, idx: number) => (
            <span
              key={idx}
              className="text-xs font-medium text-slate-600 dark:text-slate-400 px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700"
            >
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 px-2.5 py-1.5 flex items-center">
              +{property.amenities.length - 3}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Link href={`/properties/${property.id}`} className="block">
          <Button
            className={cn(
              "w-full font-semibold transition-all duration-200 h-11",
              property.available
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
                : "bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed"
            )}
            disabled={!property.available}
          >
            {property.available ? "View Details" : "Not Available"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

// --- Filter Section Component ---
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-bold text-slate-900 dark:text-slate-100">{title}</Label>
      {children}
    </div>
  );
}

// --- page ---------------------------------------------------------------
export default function PropertiesPageClient() {
  // URL sync
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // initial from URL or defaults
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get("q") ?? "");
  const [minPrice, setMinPrice] = useState<string>(searchParams.get("min") ?? "");
  const [maxPrice, setMaxPrice] = useState<string>(searchParams.get("max") ?? "");
  const [propertyType, setPropertyType] = useState<string>(searchParams.get("type") ?? "all");
  const [bedrooms, setBedrooms] = useState<string>(searchParams.get("beds") ?? "all");
  const [bathrooms, setBathrooms] = useState<string>(searchParams.get("baths") ?? "all");
  const [sort, setSort] = useState<string>(searchParams.get("sort") ?? "recommended");
  const [onlyVerified, setOnlyVerified] = useState<string>(searchParams.get("verified") ?? "all");
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(searchParams.get("available") === "yes");

  // Amenity filters
  const [hasWifi, setHasWifi] = useState<boolean>(searchParams.get("wifi") === "yes");
  const [hasParking, setHasParking] = useState<boolean>(searchParams.get("parking") === "yes");
  const [hasSecurity, setHasSecurity] = useState<boolean>(searchParams.get("security") === "yes");
  const [hasGenerator, setHasGenerator] = useState<boolean>(searchParams.get("generator") === "yes");

  // Mobile filter toggle
  const [showFilters, setShowFilters] = useState(false);

  // deferred search for smoother typing
  const deferredSearch = useDeferredValue(searchTerm);

  // push state to URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (deferredSearch) params.set("q", deferredSearch);
    if (minPrice) params.set("min", minPrice);
    if (maxPrice) params.set("max", maxPrice);
    if (propertyType !== "all") params.set("type", propertyType);
    if (bedrooms !== "all") params.set("beds", bedrooms);
    if (bathrooms !== "all") params.set("baths", bathrooms);
    if (sort !== "recommended") params.set("sort", sort);
    if (onlyVerified === "yes") params.set("verified", "yes");
    if (onlyAvailable) params.set("available", "yes");
    if (hasWifi) params.set("wifi", "yes");
    if (hasParking) params.set("parking", "yes");
    if (hasSecurity) params.set("security", "yes");
    if (hasGenerator) params.set("generator", "yes");

    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    deferredSearch,
    minPrice,
    maxPrice,
    propertyType,
    bedrooms,
    bathrooms,
    sort,
    onlyVerified,
    onlyAvailable,
    hasWifi,
    hasParking,
    hasSecurity,
    hasGenerator,
  ]);

  // compute filtered
  const filtered = useMemo(() => {
    return properties
      .filter((p) => {
        const matchesSearch = deferredSearch
          ? p.location.toLowerCase().includes(deferredSearch.toLowerCase()) ||
            p.university.toLowerCase().includes(deferredSearch.toLowerCase()) ||
            p.title.toLowerCase().includes(deferredSearch.toLowerCase())
          : true;
        const matchesMinPrice = minPrice ? p.price >= Number(minPrice) : true;
        const matchesMaxPrice = maxPrice ? p.price <= Number(maxPrice) : true;
        const matchesType = propertyType === "all" ? true : p.type === propertyType;
        const matchesBeds =
          bedrooms === "all"
            ? true
            : bedrooms === "4+"
            ? p.bedrooms >= 4
            : p.bedrooms === Number(bedrooms);
        const matchesBaths =
          bathrooms === "all"
            ? true
            : bathrooms === "3+"
            ? p.bathrooms >= 3
            : p.bathrooms === Number(bathrooms);
        const matchesVerified = onlyVerified === "yes" ? p.verified : true;
        const matchesAvailable = onlyAvailable ? p.available : true;

        // Amenity checks
        const amenitiesLower = p.amenities.map((a: string) => a.toLowerCase());
        const matchesWifi = hasWifi ? amenitiesLower.some((a: string) => a.includes("wifi") || a.includes("wi-fi") || a.includes("internet")) : true;
        const matchesParking = hasParking ? amenitiesLower.some((a: string) => a.includes("parking")) : true;
        const matchesSecurity = hasSecurity ? amenitiesLower.some((a: string) => a.includes("security") || a.includes("gate")) : true;
        const matchesGenerator = hasGenerator ? amenitiesLower.some((a: string) => a.includes("generator") || a.includes("power")) : true;

        return (
          matchesSearch &&
          matchesMinPrice &&
          matchesMaxPrice &&
          matchesType &&
          matchesBeds &&
          matchesBaths &&
          matchesVerified &&
          matchesAvailable &&
          matchesWifi &&
          matchesParking &&
          matchesSecurity &&
          matchesGenerator
        );
      })
      .sort((a, b) => {
        switch (sort) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "newest": {
            const aTime = a.createdAt ? new Date((a as any).createdAt).getTime() : a.id;
            const bTime = b.createdAt ? new Date((b as any).createdAt).getTime() : b.id;
            return bTime - aTime;
          }
          case "beds-desc":
            return b.bedrooms - a.bedrooms;
          default:
            // recommended: verified first, then cheaper
            if (a.verified !== b.verified) return a.verified ? -1 : 1;
            return a.price - b.price;
        }
      });
  }, [
    deferredSearch,
    minPrice,
    maxPrice,
    propertyType,
    bedrooms,
    bathrooms,
    onlyVerified,
    onlyAvailable,
    hasWifi,
    hasParking,
    hasSecurity,
    hasGenerator,
    sort,
  ]);

  const count = filtered.length;

  // Count active filters
  const activeFiltersCount = [
    searchTerm,
    minPrice,
    maxPrice,
    propertyType !== "all",
    bedrooms !== "all",
    bathrooms !== "all",
    onlyVerified === "yes",
    onlyAvailable,
    hasWifi,
    hasParking,
    hasSecurity,
    hasGenerator,
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setPropertyType("all");
    setBedrooms("all");
    setBathrooms("all");
    setSort("recommended");
    setOnlyVerified("all");
    setOnlyAvailable(false);
    setHasWifi(false);
    setHasParking(false);
    setHasSecurity(false);
    setHasGenerator(false);
  };

  // Filters UI (reusable for desktop and mobile)
  const FiltersUI = () => (
    <div className="space-y-6">
      {/* Search */}
      <FilterSection title="Search">
        <div className="relative">
          <Input
            placeholder="Location, university, keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </FilterSection>

      <div className="h-px bg-slate-200 dark:bg-slate-800" />

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder="Min (₦)"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min={0}
          />
          <Input
            placeholder="Max (₦)"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min={0}
          />
        </div>
      </FilterSection>

      <div className="h-px bg-slate-200 dark:bg-slate-800" />

      {/* Property Type */}
      <FilterSection title="Property Type">
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Apartment">Apartment</SelectItem>
            <SelectItem value="Self-Contain">Self-Contain</SelectItem>
            <SelectItem value="Flat">Flat</SelectItem>
            <SelectItem value="Shared">Shared</SelectItem>
            <SelectItem value="Studio">Studio</SelectItem>
          </SelectContent>
        </Select>
      </FilterSection>

      {/* Bedrooms & Bathrooms */}
      <div className="grid grid-cols-2 gap-4">
        <FilterSection title="Bedrooms">
          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="1">1 Bed</SelectItem>
              <SelectItem value="2">2 Beds</SelectItem>
              <SelectItem value="3">3 Beds</SelectItem>
              <SelectItem value="4+">4+ Beds</SelectItem>
            </SelectContent>
          </Select>
        </FilterSection>

        <FilterSection title="Bathrooms">
          <Select value={bathrooms} onValueChange={setBathrooms}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="1">1 Bath</SelectItem>
              <SelectItem value="2">2 Baths</SelectItem>
              <SelectItem value="3+">3+ Baths</SelectItem>
            </SelectContent>
          </Select>
        </FilterSection>
      </div>

      <div className="h-px bg-slate-200 dark:bg-slate-800" />

      {/* Amenities */}
      <FilterSection title="Amenities">
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <Checkbox
              id="wifi-filter"
              checked={hasWifi}
              onCheckedChange={(checked) => setHasWifi(checked === true)}
              className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
            />
            <span className="text-sm group-hover:text-emerald-600 transition-colors">📶 WiFi</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer group">
            <Checkbox
              id="parking-filter"
              checked={hasParking}
              onCheckedChange={(checked) => setHasParking(checked === true)}
              className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
            />
            <span className="text-sm group-hover:text-emerald-600 transition-colors">🚗 Parking</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer group">
            <Checkbox
              id="security-filter"
              checked={hasSecurity}
              onCheckedChange={(checked) => setHasSecurity(checked === true)}
              className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
            />
            <span className="text-sm group-hover:text-emerald-600 transition-colors">🔒 Security</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer group">
            <Checkbox
              id="generator-filter"
              checked={hasGenerator}
              onCheckedChange={(checked) => setHasGenerator(checked === true)}
              className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
            />
            <span className="text-sm group-hover:text-emerald-600 transition-colors">⚡ Generator</span>
          </label>
        </div>
      </FilterSection>

      <div className="h-px bg-slate-200 dark:bg-slate-800" />

      {/* Additional Options */}
      <FilterSection title="Additional Options">
        <div className="space-y-3">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <Checkbox
              id="verified-filter"
              checked={onlyVerified === "yes"}
              onCheckedChange={(checked) => setOnlyVerified(checked ? "yes" : "all")}
              className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
            />
            <span className="text-sm group-hover:text-emerald-600 transition-colors">
              ✓ Verified properties only
            </span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer group">
            <Checkbox
              id="available-filter"
              checked={onlyAvailable}
              onCheckedChange={(checked) => setOnlyAvailable(checked === true)}
              className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
            />
            <span className="text-sm group-hover:text-emerald-600 transition-colors">
              ✓ Available properties only
            </span>
          </label>
        </div>
      </FilterSection>

      {/* Clear Button */}
      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          onClick={clearAllFilters}
          className="w-full border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-4 h-4 mr-2" />
          Clear All Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
                  Filters
                </h2>
                {activeFiltersCount > 0 && (
                  <Badge variant="default" className="bg-emerald-600">
                    {activeFiltersCount}
                  </Badge>
                )}
              </div>
              <FiltersUI />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full justify-between font-semibold border-2"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="default" className="bg-emerald-600 ml-1">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    showFilters && "rotate-180"
                  )}
                />
              </Button>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 mb-6 animate-in slide-in-from-top-4 duration-300">
                <FiltersUI />
              </div>
            )}

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                Find Your Perfect Crib 🏠
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  <span className="text-2xl font-bold text-emerald-600">{count}</span>{" "}
                  {count === 1 ? "property" : "properties"} available
                </p>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="w-full sm:w-64 border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">⭐ Recommended</SelectItem>
                    <SelectItem value="price-asc">💰 Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">💎 Price: High to Low</SelectItem>
                    <SelectItem value="beds-desc">🛏️ Most Bedrooms</SelectItem>
                    <SelectItem value="newest">🆕 Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Grid */}
            {count > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-500">
                {filtered.map((p, index) => (
                  <div
                    key={p.id}
                    className="animate-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <PropertyCard property={p} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 animate-in fade-in duration-300">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                  No properties found
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Try adjusting your filters to see more results
                </p>
                <Button
                  onClick={clearAllFilters}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}