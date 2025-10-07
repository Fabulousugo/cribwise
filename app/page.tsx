import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/Navbar"
import {Footer} from "@/components/Footer"



export default function Home() {
  return (
    <>
      <Navbar />
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
            <Button size="lg">Search</Button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-slate-200 flex items-center justify-center">
                  <span className="text-slate-400">Property Image</span>
                </div>
                <CardHeader>
                  <CardTitle>2 Bedroom Apartment</CardTitle>
                  <CardDescription>Near University of Lagos</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600">₦150,000/year</p>
                  <Button className="w-full mt-4">View Details</Button>
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
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
    </>
  )
}