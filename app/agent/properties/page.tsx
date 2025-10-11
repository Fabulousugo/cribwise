"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Plus, Edit, Trash2, Eye, MapPin, Home as HomeIcon } from "lucide-react"
import { AIListingPrompt } from "@/components/ai-listing-prompt"

type Property = {
  id: number
  title: string
  location: string
  university: string
  price: number
  type: string
  bedrooms: number
  images: string[]
  available: boolean
  verified: boolean
  created_at: string
}

export default function MyPropertiesPage() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()
  const [properties, setProperties] = useState<Property[]>([])
  const [loadingProperties, setLoadingProperties] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && profile?.status === 'agent') {
      loadProperties()
    } else if (!loading && profile?.status !== 'agent') {
      router.push('/dashboard')
    }
  }, [user, profile, loading])

  async function loadProperties() {
    setLoadingProperties(true)
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('landlord_id', user!.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setProperties(data || [])
    } catch (error) {
      console.error('Error loading properties:', error)
    } finally {
      setLoadingProperties(false)
    }
  }

  async function handleDelete(propertyId: number, title: string) {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId)
        .eq('landlord_id', user!.id)

      if (error) throw error

      // Reload properties
      loadProperties()
    } catch (error) {
      console.error('Error deleting property:', error)
      alert('Failed to delete property')
    }
  }

  async function toggleAvailability(propertyId: number, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ available: !currentStatus })
        .eq('id', propertyId)
        .eq('landlord_id', user!.id)

      if (error) throw error

      // Reload properties
      loadProperties()
    } catch (error) {
      console.error('Error updating property:', error)
      alert('Failed to update property')
    }
  }

  if (loading || loadingProperties) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-2xl">Loading properties...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/dashboard/agent">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>

          <Link href="/agent/properties/add">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Properties</h1>
          <p className="text-slate-600">
            Manage your {properties.length} {properties.length === 1 ? 'listing' : 'listings'}
          </p>
        </div>
        <AIListingPrompt />

        {/* Properties Grid */}
        {properties.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <HomeIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No properties yet</h3>
              <p className="text-slate-600 mb-6">
                Start by adding your first property listing
              </p>
              <Link href="/agent/properties/add">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Property
                </Button>
              </Link> 
            </CardContent>
          </Card>
          
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                {/* Property Image */}
                <div className="relative h-48 bg-slate-200">
                  {property.images && property.images.length > 0 ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      No Image
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <Badge variant={property.available ? 'default' : 'secondary'}>
                      {property.available ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>

                  {property.verified && (
                    <div className="absolute top-2 left-2">
                      <Badge variant="default" className="bg-green-600">
                        ✓ Verified
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{property.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs">{property.location}</span>
                    </div>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">{property.type}</span>
                    <span className="text-sm text-slate-600">{property.bedrooms} bed</span>
                  </div>

                  <div className="text-2xl font-bold text-blue-600">
                    ₦{property.price.toLocaleString()}/year
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Link href={`/properties/${property.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>

                    <Link href={`/agent/properties/edit/${property.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(property.id, property.title)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant={property.available ? 'outline' : 'default'}
                    size="sm"
                    className="w-full"
                    onClick={() => toggleAvailability(property.id, property.available)}
                  >
                    {property.available ? 'Mark as Unavailable' : 'Mark as Available'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}