// app/properties/properties-client.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useDeferredValue } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  return (
    <Card className="hover:shadow-xl transition overflow-hidden">
      <div className="relative h-52 bg-muted">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
        {property.verified && (
          <Badge className="absolute top-2 right-2 bg-green-600 text-white shadow" variant="default">
            ✓ Verified
          </Badge>
        )}
        {!property.available && (
          <div className="absolute inset-0 bg-black/50 grid place-items-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-md font-medium">Not Available</span>
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-lg line-clamp-1">{property.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <span>📍 {property.location}</span>
        </CardDescription>
        <p className="text-sm text-slate-500 line-clamp-1">{property.university}</p>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {NGN.format(property.price)}<span className="text-sm text-slate-500">/year</span>
            </span>
          </div>

          <div className="flex gap-4 text-sm text-slate-600">
            <span>🛏️ {property.bedrooms} bed{property.bedrooms > 1 ? "s" : ""}</span>
            <span>🚿 {property.bathrooms} bath</span>
            <span>{property.type}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {property.amenities.slice(0, 3).map((amenity: string, idx: number) => (
              <Badge key={idx} variant="secondary" className="text-[11px] font-normal">
                {amenity}
              </Badge>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>

          <Link href={`/properties/${property.id}`}>
            <Button className="w-full" disabled={!property.available}>
              {property.available ? "View Details" : "Not Available"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
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

    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
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

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-card p-6 rounded-lg shadow sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <h2 className="text-xl font-bold mb-6">Filters</h2>

              <div className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="q" className="text-sm font-semibold">Search</Label>
                  <Input
                    id="q"
                    placeholder="Location, university..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <hr />

                {/* Price Range */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Price Range</Label>
                  <div className="space-y-2">
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
                </div>

                <hr />

                {/* Property Type */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Property Type</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="Self-Contain">Self-Contain</SelectItem>
                      <SelectItem value="Flat">Flat</SelectItem>
                      <SelectItem value="Shared">Shared</SelectItem>
                      <SelectItem value="Studio">Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bedrooms */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Bedrooms</Label>
                  <Select value={bedrooms} onValueChange={setBedrooms}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="1">1 Bed</SelectItem>
                      <SelectItem value="2">2 Beds</SelectItem>
                      <SelectItem value="3">3 Beds</SelectItem>
                      <SelectItem value="4+">4+ Beds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bathrooms */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Bathrooms</Label>
                  <Select value={bathrooms} onValueChange={setBathrooms}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="1">1 Bath</SelectItem>
                      <SelectItem value="2">2 Baths</SelectItem>
                      <SelectItem value="3+">3+ Baths</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <hr />

                {/* Amenities */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Amenities</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="wifi"
                        checked={hasWifi}
                        onCheckedChange={(checked) => setHasWifi(checked === true)}
                      />
                      <label htmlFor="wifi" className="text-sm cursor-pointer">
                        📶 WiFi
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="parking"
                        checked={hasParking}
                        onCheckedChange={(checked) => setHasParking(checked === true)}
                      />
                      <label htmlFor="parking" className="text-sm cursor-pointer">
                        🚗 Parking
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="security"
                        checked={hasSecurity}
                        onCheckedChange={(checked) => setHasSecurity(checked === true)}
                      />
                      <label htmlFor="security" className="text-sm cursor-pointer">
                        🔒 Security
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="generator"
                        checked={hasGenerator}
                        onCheckedChange={(checked) => setHasGenerator(checked === true)}
                      />
                      <label htmlFor="generator" className="text-sm cursor-pointer">
                        ⚡ Generator
                      </label>
                    </div>
                  </div>
                </div>

                <hr />

                {/* Additional Options */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Other Options</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verified"
                        checked={onlyVerified === "yes"}
                        onCheckedChange={(checked) => setOnlyVerified(checked ? "yes" : "all")}
                      />
                      <label htmlFor="verified" className="text-sm cursor-pointer">
                        Verified only
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="available"
                        checked={onlyAvailable}
                        onCheckedChange={(checked) => setOnlyAvailable(checked === true)}
                      />
                      <label htmlFor="available" className="text-sm cursor-pointer">
                        Available only
                      </label>
                    </div>
                  </div>
                </div>

                {/* Clear Button */}
                <Button variant="outline" onClick={clearAllFilters} className="w-full">
                  Clear All Filters
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-card p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-bold mb-6">Filters</h2>
                <div className="space-y-6">
                  {/* Search */}
                  <div className="space-y-2">
                    <Label htmlFor="q-mobile" className="text-sm font-semibold">Search</Label>
                    <Input
                      id="q-mobile"
                      placeholder="Location, university..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Price Range */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Price Range</Label>
                    <div className="space-y-2">
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
                  </div>

                  {/* Property Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Type</Label>
                      <Select value={propertyType} onValueChange={setPropertyType}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="Apartment">Apartment</SelectItem>
                          <SelectItem value="Self-Contain">Self-Contain</SelectItem>
                          <SelectItem value="Flat">Flat</SelectItem>
                          <SelectItem value="Shared">Shared</SelectItem>
                          <SelectItem value="Studio">Studio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Beds</Label>
                      <Select value={bedrooms} onValueChange={setBedrooms}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4+">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Amenities</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="wifi-mobile"
                          checked={hasWifi}
                          onCheckedChange={(checked) => setHasWifi(checked === true)}
                        />
                        <label htmlFor="wifi-mobile" className="text-sm cursor-pointer">
                          📶 WiFi
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="parking-mobile"
                          checked={hasParking}
                          onCheckedChange={(checked) => setHasParking(checked === true)}
                        />
                        <label htmlFor="parking-mobile" className="text-sm cursor-pointer">
                          🚗 Parking
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="security-mobile"
                          checked={hasSecurity}
                          onCheckedChange={(checked) => setHasSecurity(checked === true)}
                        />
                        <label htmlFor="security-mobile" className="text-sm cursor-pointer">
                          🔒 Security
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="generator-mobile"
                          checked={hasGenerator}
                          onCheckedChange={(checked) => setHasGenerator(checked === true)}
                        />
                        <label htmlFor="generator-mobile" className="text-sm cursor-pointer">
                          ⚡ Generator
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" onClick={clearAllFilters} className="w-full">
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Find Your Perfect Crib</h1>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p className="text-muted-foreground">
                  {count} {count === 1 ? "property" : "properties"} found
                </p>
                <div className="flex items-center gap-3">
                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="w-full sm:w-56"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="beds-desc">Most Bedrooms</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Grid */}
            {count > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-lg">
                <p className="text-xl text-muted-foreground mb-4">No properties found matching your criteria</p>
                <Button onClick={clearAllFilters}>
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