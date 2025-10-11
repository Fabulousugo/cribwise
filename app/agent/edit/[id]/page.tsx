/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AIListingPrompt } from "@/components/ai-listing-prompt"
import Link from "next/link"
import { ArrowLeft, Save, AlertCircle, Upload, X, CheckCircle } from "lucide-react"

const NIGERIAN_UNIVERSITIES = [
  "University of Lagos (UNILAG)",
  "University of Ibadan (UI)",
  "Obafemi Awolowo University (OAU)",
  "University of Nigeria, Nsukka (UNN)",
  "Ahmadu Bello University (ABU)",
  "University of Benin (UNIBEN)",
  "Lagos State University (LASU)",
  "Covenant University",
  "Babcock University",
  "Federal University of Technology, Akure (FUTA)",
  "Other"
]

const PROPERTY_TYPES = ["Apartment", "Self-Contain", "Flat", "Shared", "Studio"]

const COMMON_AMENITIES = [
  "WiFi",
  "Generator",
  "Security",
  "Parking",
  "Water Supply",
  "Furnished",
  "Kitchen",
  "Wardrobe",
  "Study Desk",
  "Air Conditioning",
  "Fan",
  "Balcony",
  "Laundry",
  "CCTV"
]

export default function EditPropertyPage() {
  const router = useRouter()
  const params = useParams()
  const { user, profile, loading } = useAuth()
  const [saving, setSaving] = useState(false)
  const [loadingProperty, setLoadingProperty] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [uploadingImages, setUploadingImages] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    university: '',
    price: '',
    type: '',
    bedrooms: '1',
    bathrooms: '1',
    address: '',
    landlord_name: '',
    landlord_phone: '',
    available_from: '',
    property_rules: '',
    nearby_landmarks: ''
  })

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (profile && user) {
      if (profile.status !== 'agent') {
        router.push('/dashboard')
        return
      }
      loadProperty()
    }
  }, [profile, user])

  async function loadProperty() {
    setLoadingProperty(true)
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', params.id)
        .eq('landlord_id', user!.id)
        .single()

      if (error) throw error

      // Populate form
      setFormData({
        title: data.title || '',
        description: data.description || '',
        location: data.location || '',
        university: data.university || '',
        price: data.price?.toString() || '',
        type: data.type || '',
        bedrooms: data.bedrooms?.toString() || '1',
        bathrooms: data.bathrooms?.toString() || '1',
        address: data.address || '',
        landlord_name: data.landlord_name || '',
        landlord_phone: data.landlord_phone || '',
        available_from: data.available_from || '',
        property_rules: data.property_rules || '',
        nearby_landmarks: data.nearby_landmarks?.join(', ') || ''
      })

      setSelectedAmenities(data.amenities || [])
      setImageUrls(data.images || [])

    } catch (error) {
      console.error('Error loading property:', error)
      setError('Failed to load property. You may not have permission to edit this property.')
    } finally {
      setLoadingProperty(false)
    }
  }

  function toggleAmenity(amenity: string) {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    if (imageUrls.length + files.length > 10) {
      alert('Maximum 10 images allowed')
      return
    }

    setUploadingImages(true)
    try {
      const uploadedUrls: string[] = []

      for (const file of files) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${user!.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
          .from('property-images')
          .getPublicUrl(fileName)

        uploadedUrls.push(urlData.publicUrl)
      }

      setImageUrls(prev => [...prev, ...uploadedUrls])

    } catch (error) {
      console.error('Error uploading images:', error)
      alert('Failed to upload some images')
    } finally {
      setUploadingImages(false)
    }
  }

  function removeImage(index: number) {
    setImageUrls(prev => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const landmarksArray = formData.nearby_landmarks
        .split(',')
        .map(l => l.trim())
        .filter(Boolean)

      const { error: updateError } = await supabase
        .from('properties')
        .update({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          university: formData.university,
          price: parseInt(formData.price),
          type: formData.type,
          bedrooms: parseInt(formData.bedrooms),
          bathrooms: parseInt(formData.bathrooms),
          amenities: selectedAmenities,
          images: imageUrls,
          address: formData.address,
          landlord_name: formData.landlord_name,
          landlord_phone: formData.landlord_phone,
          available_from: formData.available_from || null,
          property_rules: formData.property_rules || null,
          nearby_landmarks: landmarksArray.length > 0 ? landmarksArray : null,
          updated_at: new Date().toISOString()
        })
        .eq('id', params.id)
        .eq('landlord_id', user!.id)

      if (updateError) throw updateError

      setSuccess('Property updated successfully!')
      setTimeout(() => {
        router.push('/agent/properties')
      }, 1500)

    } catch (error: any) {
      console.error('Error updating property:', error)
      setError(error.message || 'Failed to update property')
    } finally {
      setSaving(false)
    }
  }

  if (loading || loadingProperty) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-2xl">Loading property...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/agent/properties">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Properties
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Edit Property</h1>
          <p className="text-slate-600">Update your property details</p>
        </div>

        {/* AI Listing Prompt */}
        <AIListingPrompt />

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Essential details about the property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Property Title *</Label>
                <Input
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Modern 2 Bedroom Apartment Near UNILAG"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the property, its features, and what makes it special..."
                  rows={6}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Property Type *</Label>
                  <Select
                    required
                    value={formData.type}
                    onValueChange={(value) => setFormData({...formData, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_TYPES.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price">Price (₦/year) *</Label>
                  <Input
                    id="price"
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="e.g., 150000"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms *</Label>
                  <Select
                    required
                    value={formData.bedrooms}
                    onValueChange={(value) => setFormData({...formData, bedrooms: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bathrooms">Bathrooms *</Label>
                  <Select
                    required
                    value={formData.bathrooms}
                    onValueChange={(value) => setFormData({...formData, bathrooms: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>Where is the property located?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="university">Nearest University *</Label>
                <Select
                  required
                  value={formData.university}
                  onValueChange={(value) => setFormData({...formData, university: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select university" />
                  </SelectTrigger>
                  <SelectContent>
                    {NIGERIAN_UNIVERSITIES.map(uni => (
                      <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Area/Neighborhood *</Label>
                <Input
                  id="location"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g., Akoka, Yaba"
                />
              </div>

              <div>
                <Label htmlFor="address">Full Address *</Label>
                <Input
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="e.g., 15 Iwaya Road, Akoka, Lagos"
                />
              </div>

              <div>
                <Label htmlFor="nearby_landmarks">Nearby Landmarks</Label>
                <Input
                  id="nearby_landmarks"
                  value={formData.nearby_landmarks}
                  onChange={(e) => setFormData({...formData, nearby_landmarks: e.target.value})}
                  placeholder="e.g., UNILAG Main Gate, Akoka Market (comma-separated)"
                />
                <p className="text-xs text-slate-500 mt-1">Separate landmarks with commas</p>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
              <CardDescription>What features does the property have?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {COMMON_AMENITIES.map(amenity => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <label
                      htmlFor={amenity}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle>Property Photos</CardTitle>
              <CardDescription>Upload up to 10 photos (first photo will be the main image)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="property-images"
                  disabled={uploadingImages || imageUrls.length >= 10}
                />
                <label htmlFor="property-images">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={uploadingImages || imageUrls.length >= 10}
                    onClick={() => document.getElementById('property-images')?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploadingImages ? 'Uploading...' : `Upload Photos (${imageUrls.length}/10)`}
                  </Button>
                </label>
              </div>

              {imageUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Property ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          Main Photo
                        </div>
                      )}
                      <button title="remove-image"
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact & Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact & Additional Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="landlord_name">Landlord/Agent Name *</Label>
                  <Input
                    id="landlord_name"
                    required
                    value={formData.landlord_name}
                    onChange={(e) => setFormData({...formData, landlord_name: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="landlord_phone">Contact Phone *</Label>
                  <Input
                    id="landlord_phone"
                    type="tel"
                    required
                    value={formData.landlord_phone}
                    onChange={(e) => setFormData({...formData, landlord_phone: e.target.value})}
                    placeholder="080XXXXXXXX"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="available_from">Available From</Label>
                <Input
                  id="available_from"
                  type="date"
                  value={formData.available_from}
                  onChange={(e) => setFormData({...formData, available_from: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="property_rules">Property Rules</Label>
                <Textarea
                  id="property_rules"
                  value={formData.property_rules}
                  onChange={(e) => setFormData({...formData, property_rules: e.target.value})}
                  placeholder="e.g., No smoking, No pets, Visitors allowed until 10pm"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-3">
            <Link href="/agent/properties" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={saving} className="flex-1" size="lg">
              {saving ? 'Saving...' : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}