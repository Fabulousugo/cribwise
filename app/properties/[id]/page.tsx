import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { use } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { properties } from "@/lib/properties"
import SidebarActions from "@/components/property/SidebarActions"
import Gallery from "@/components/property/Gallery"
import Map from "@/components/property/Map" // ⬅️ NEW

const NGN = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 })

type PageParams = { id: string }

export default function PropertyDetailPage({ params }: { params: Promise<PageParams> }) {
  const { id } = use(params) // unwrap Promise per Next 15
  const idNum = Number(id)
  const property = properties.find((p) => p.id === idNum)
  if (!property) notFound()

  const related = properties.filter((p) => p.id !== idNum && p.location === property.location).slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-600">
          <Link href="/properties" className="hover:underline">Properties</Link>
          <span>/</span>
          <span className="text-slate-800 line-clamp-1">{property.title}</span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            {/* Gallery (client) */}
            <Card className="overflow-hidden">
              <Gallery images={property.images} title={property.title} badges={{
                available: property.available,
                verified: property.verified,
                type: property.type,
              }} />
            </Card>

            {/* Details */}
            <Card>
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <p className="text-slate-600 mb-3 flex items-center gap-2">📍 {property.address}, {property.location}</p>
                <p className="text-sm text-slate-500 mb-6">{property.university}</p>

                <div className="flex flex-wrap gap-4 mb-6 text-muted-foreground">
                  <span className="flex items-center gap-2">🛏️ {property.bedrooms} Bedroom{property.bedrooms > 1 ? "s" : ""}</span>
                  <span className="flex items-center gap-2">🚿 {property.bathrooms} Bathroom{property.bathrooms > 1 ? "s" : ""}</span>
                  <span className="flex items-center gap-2">🏠 {property.type}</span>
                </div>

                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <p className="text-slate-700 leading-relaxed">{property.description}</p>
                </div>

                <Separator className="my-6" />
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-green-600">✓</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>

              <Separator className="my-6" />
              <h2 className="text-xl font-semibold mb-4">Location</h2>

              {Number.isFinite(property.lat) && Number.isFinite(property.lng) ? (
                <div className="rounded-lg overflow-hidden">
                  <Map
                    lat={property.lat as number}
                    lng={property.lng as number}
                    title={property.title}
                    address={`${property.address}, ${property.location}`}
                    zoom={property.mapZoom ?? 16}          // tighter for small towns
                    radiusMeters={property.mapRadius ?? 300}
                    theme="auto"
                  />
                </div>
              ) : (
                <div className="bg-slate-200 h-64 rounded-lg grid place-items-center text-slate-600">
                  No coordinates on this listing yet.
                </div>
              )}

              </CardContent>
            </Card>

            {/* Related properties */}
            {related.length > 0 && (
              <section className="pt-2">
                <h3 className="text-xl font-semibold mb-4">Similar in {property.location}</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {related.map((rp) => (
                    <Link key={rp.id} href={`/properties/${rp.id}`} className="block rounded-lg overflow-hidden border bg-white hover:shadow">
                      <div className="relative h-32 bg-muted">
                        <Image src={rp.images[0]} alt={rp.title} fill className="object-cover" sizes="(min-width:768px) 20vw, 100vw" />
                      </div>
                      <div className="p-3">
                        <p className="font-medium line-clamp-1">{rp.title}</p>
                        <p className="text-sm text-slate-600 line-clamp-1">📍 {rp.location}</p>
                        <p className="text-sm font-semibold text-emerald-700">{NGN.format(rp.price)}<span className="text-slate-500">/yr</span></p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar (client) */}
          <div className="space-y-6">
            <SidebarActions
              priceYear={property.price}
              available={property.available}
              landlord={property.landlord}
              propertyTitle={property.title}
            />

            {/* Optional: badges summary */}
            <Card>
              <CardContent className="p-4 flex flex-wrap gap-2">
                {property.available ? (
                  <Badge className="bg-emerald-600 text-white">Available</Badge>
                ) : (
                  <Badge className="bg-rose-600 text-white">Not Available</Badge>
                )}
                {property.verified && <Badge className="bg-green-600 text-white">✓ Verified</Badge>}
                <Badge className="bg-slate-900/80 text-white">{property.type}</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

