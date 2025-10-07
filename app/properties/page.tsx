"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { properties } from "@/lib/properties"
import Link from "next/link"
import { useState } from "react"

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [propertyType, setPropertyType] = useState("all")

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.university.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrice = !maxPrice || property.price <= parseInt(maxPrice)
    const matchesType = propertyType === "all" || property.type === propertyType
    
    return matchesSearch && matchesPrice && matchesType
  })

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h1 className="text-2xl font-bold mb-6">Find Your Perfect Crib</h1>
          
          <div className="grid md:grid-cols-4 gap-4">
            <Input 
              placeholder="Search location or university..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <Input 
              placeholder="Max Price (₦)" 
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            
            <select title="Property Type"
              className="border rounded-md px-3 py-2"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Self-Contain">Self-Contain</option>
              <option value="Flat">Flat</option>
              <option value="Shared">Shared</option>
              <option value="Studio">Studio</option>
            </select>
            
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setMaxPrice("")
                setPropertyType("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-slate-600">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
          </p>
          <select className="border rounded-md px-3 py-2 text-sm" title="Sort by">
            <option>Sort: Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>

        {/* Property Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="hover:shadow-lg transition overflow-hidden">
              {/* Property Image */}
              <div className="relative h-48 bg-slate-200">
                <img 
                  src={property.images[0]} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.verified && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    ✓ Verified
                  </span>
                )}
                {!property.available && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                      Not Available
                    </span>
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{property.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  📍 {property.location}
                </CardDescription>
                <p className="text-sm text-slate-500">{property.university}</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {/* Price */}
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">
                      ₦{property.price.toLocaleString()}/year
                    </span>
                  </div>
                  
                  {/* Details */}
                  <div className="flex gap-4 text-sm text-slate-600">
                    <span>🛏️ {property.bedrooms} bed{property.bedrooms > 1 ? 's' : ''}</span>
                    <span>🚿 {property.bathrooms} bath</span>
                    <span>{property.type}</span>
                  </div>
                  
                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1">
                    {property.amenities.slice(0, 3).map((amenity, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                    {property.amenities.length > 3 && (
                      <span className="text-xs text-slate-500">
                        +{property.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  {/* View Button */}
                  <Link href={`/properties/${property.id}`}>
                    <Button className="w-full" disabled={!property.available}>
                      {property.available ? 'View Details' : 'Not Available'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-slate-600 mb-4">No properties found matching your criteria</p>
            <Button onClick={() => {
              setSearchTerm("")
              setMaxPrice("")
              setPropertyType("all")
            }}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}