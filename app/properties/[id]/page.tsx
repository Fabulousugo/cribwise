import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { properties } from "@/lib/properties"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ContactLandlordModal } from "@/components/ContactLandlordModal"
import { ScheduleViewingModal } from "@/components/ScheduleViewingModal"

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = properties.find(p => p.id === parseInt(params.id))
  
  if (!property) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Back Button */}
        <Link href="/properties">
          <Button variant="outline" className="mb-6">
            ← Back to Properties
          </Button>
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative h-96 bg-slate-200">
                <img 
                  src={property.images[0]} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.verified && (
                  <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-2 rounded-lg font-semibold flex items-center gap-2">
                    ✓ Verified Property
                  </span>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {property.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 p-4">
                  {property.images.slice(1).map((img, idx) => (
                    <img 
                      key={idx}
                      src={img} 
                      alt={`View ${idx + 2}`}
                      className="h-20 w-full object-cover rounded cursor-pointer hover:opacity-75"
                    />
                  ))}
                </div>
              )}
            </Card>

            {/* Property Details */}
            <Card>
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <p className="text-slate-600 mb-4 flex items-center gap-2">
                  📍 {property.address}, {property.location}
                </p>
                <p className="text-sm text-slate-500 mb-6">{property.university}</p>
                
                <div className="flex gap-6 mb-6 text-slate-700">
                  <span className="flex items-center gap-2">
                    🛏️ {property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}
                  </span>
                  <span className="flex items-center gap-2">
                    🚿 {property.bathrooms} Bathroom{property.bathrooms > 1 ? 's' : ''}
                  </span>
                  <span className="flex items-center gap-2">
                    🏠 {property.type}
                  </span>
                </div>

                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <p className="text-slate-600">{property.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="bg-slate-200 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-slate-500">Map integration coming soon</p>
                  {/* You can add Google Maps iframe here later */}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-6">
                  ₦{property.price.toLocaleString()}/year
                </div>

                
                {property.available ? (
                <>
                    <ContactLandlordModal 
                    propertyTitle={property.title}
                    landlordName={property.landlord.name}
                    landlordPhone={property.landlord.phone}
                    />
                    <ScheduleViewingModal propertyTitle={property.title} />
                </>
                ) : (
                <Button className="w-full" disabled>
                    Not Available
                </Button>
                )}

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-3">Landlord Information</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex justify-between">
                      <span className="text-slate-600">Name:</span>
                      <span className="font-medium">{property.landlord.name}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-600">Phone:</span>
                      <span className="font-medium">{property.landlord.phone}</span>
                    </p>
                    <p className="flex justify-between items-center">
                      <span className="text-slate-600">Verified:</span>
                      <span className={property.landlord.verified ? "text-green-600" : "text-slate-400"}>
                        {property.landlord.verified ? "✓ Yes" : "Pending"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-3">Safety Features</h3>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p>✓ Identity verified</p>
                    <p>✓ Property inspected</p>
                    <p>✓ Secure payment</p>
                    <p>✓ Deposit protection</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}