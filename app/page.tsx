import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { properties } from "@/lib/properties"
import { Footer} from "@/components/Footer"
import { Navbar} from "@/components/Navbar"

export default function Home() {
  // Get first 3 verified properties for featured section
  const featuredProperties = properties.filter(p => p.verified && p.available).slice(0, 3)

  return (
 
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Find Your Perfect Student Crib
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Safe, verified student housing across Nigerian universities
          </p>
          
          {/* Search Bar */}
          <div className="flex gap-2 max-w-2xl mx-auto">
            <Input 
              placeholder="Search by university or location..." 
              className="text-lg"
            />
            <Link href="/properties">
              <Button size="lg">Search</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Properties</h2>
            <Link href="/properties">
              <Button variant="outline">View All →</Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition">
                <div className="relative h-48 bg-slate-200">
                  <img 
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    ✓ Verified
                  </span>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <CardDescription>{property.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600 mb-4">
                    ₦{property.price.toLocaleString()}/year
                  </p>
                  <Link href={`/properties/${property.id}`}>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">How Cribwise Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold mb-2">Search</h3>
              <p className="text-slate-600">Browse verified properties near your university</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold mb-2">Verify</h3>
              <p className="text-slate-600">All properties verified with AI and human checks</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold mb-2">Move In</h3>
              <p className="text-slate-600">Book safely with deposit protection</p>
            </div>
          </div>
          
          <Link href="/how-it-works">
            <Button size="lg" className="mt-8">
              Learn More
            </Button>
          </Link>
        </div>
      </section>
    </main>
 
  )
}