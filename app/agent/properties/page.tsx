"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from "next/link"
import { ArrowLeft, Plus, Edit, Trash2, Eye, MapPin, Home as HomeIcon, Search, Filter, TrendingUp, CheckCircle, XCircle, DollarSign } from "lucide-react"
import { AIListingPrompt } from "@/components/ai-listing-prompt"
import { toast } from "sonner"

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
  
  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'title'>('date')
  
  // Delete dialog state
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; propertyId: number | null; title: string }>({
    open: false,
    propertyId: null,
    title: ''
  })

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
  }, [user, profile, loading, router])


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
      toast.error('Failed to load properties')
    } finally {
      setLoadingProperties(false)
    }
  }
  

  async function handleDelete() {
    if (!deleteDialog.propertyId) return

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', deleteDialog.propertyId)
        .eq('landlord_id', user!.id)

      if (error) throw error

      toast.success(`"${deleteDialog.title}" has been deleted`)
      setDeleteDialog({ open: false, propertyId: null, title: '' })
      loadProperties()
    } catch (error) {
      console.error('Error deleting property:', error)
      toast.error('Failed to delete property')
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

      toast.success(`Property marked as ${!currentStatus ? 'available' : 'unavailable'}`)
      loadProperties()
    } catch (error) {
      console.error('Error updating property:', error)
      toast.error('Failed to update property')
    }
  }

  // Filter and sort properties
  const filteredAndSortedProperties = properties
    .filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = filterType === "all" || property.type === filterType
      const matchesStatus = filterStatus === "all" || 
                           (filterStatus === "available" && property.available) ||
                           (filterStatus === "unavailable" && !property.available)
      return matchesSearch && matchesType && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

  // Calculate stats
  const stats = {
    total: properties.length,
    available: properties.filter(p => p.available).length,
    verified: properties.filter(p => p.verified).length,
    avgPrice: properties.length > 0 
      ? Math.round(properties.reduce((sum, p) => sum + p.price, 0) / properties.length)
      : 0
  }

  // Get unique property types
  const propertyTypes = Array.from(new Set(properties.map(p => p.type)))

  if (loading || loadingProperties) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-10 w-48 mb-6" />
          <Skeleton className="h-12 w-64 mb-2" />
          <Skeleton className="h-6 w-48 mb-8" />
          
          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Properties Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
                  <p className="text-sm text-slate-600 mt-1">Total Properties</p>
                </div>
                <HomeIcon className="h-10 w-10 text-blue-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-green-600">{stats.available}</div>
                  <p className="text-sm text-slate-600 mt-1">Available</p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-purple-600">{stats.verified}</div>
                  <p className="text-sm text-slate-600 mt-1">Verified</p>
                </div>
                <CheckCircle className="h-10 w-10 text-purple-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    ₦{stats.avgPrice.toLocaleString()}
                  </div>
                  <p className="text-sm text-slate-600 mt-1">Avg. Price/Year</p>
                </div>
                <DollarSign className="h-10 w-10 text-orange-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <AIListingPrompt />

        {/* Search and Filters */}
        {properties.length > 0 && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search by title or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Type Filter */}
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {propertyTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Status Filter */}
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm text-slate-600">Sort by:</span>
                <div className="flex gap-2">
                  <Button
                    variant={sortBy === 'date' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('date')}
                  >
                    Date
                  </Button>
                  <Button
                    variant={sortBy === 'price' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('price')}
                  >
                    Price
                  </Button>
                  <Button
                    variant={sortBy === 'title' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('title')}
                  >
                    Title
                  </Button>
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchQuery || filterType !== 'all' || filterStatus !== 'all') && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <span className="text-sm text-slate-600">Active filters:</span>
                  {searchQuery && (
                    <Badge variant="secondary">Search: {searchQuery}</Badge>
                  )}
                  {filterType !== 'all' && (
                    <Badge variant="secondary">Type: {filterType}</Badge>
                  )}
                  {filterStatus !== 'all' && (
                    <Badge variant="secondary">Status: {filterStatus}</Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('')
                      setFilterType('all')
                      setFilterStatus('all')
                    }}
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Properties Grid */}
        {filteredAndSortedProperties.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <HomeIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              {properties.length === 0 ? (
                <>
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
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                  <p className="text-slate-600 mb-6">
                    Try adjusting your search or filters
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery('')
                      setFilterType('all')
                      setFilterStatus('all')
                    }}
                  >
                    Clear Filters
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-slate-600">
                Showing {filteredAndSortedProperties.length} of {properties.length} properties
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Property Image */}
                  <div className="relative h-48 bg-slate-200">
                    {property.images && property.images.length > 0 ? (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-property.jpg'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <HomeIcon className="h-12 w-12" />
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
                    <div className="flex justify-between items-center text-sm text-slate-600">
                      <span>{property.type}</span>
                      <span>{property.bedrooms} bed</span>
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
                        onClick={() => setDeleteDialog({
                          open: true,
                          propertyId: property.id,
                          title: property.title
                        })}
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
          </>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialog.open} onOpenChange={(open) => 
          setDeleteDialog({ ...deleteDialog, open })
        }>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete "{deleteDialog.title}". This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete Property
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
