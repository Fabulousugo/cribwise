/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
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
import { ArrowLeft, Save, AlertCircle, Upload, X, FileText, Sparkles, Info, Mic } from "lucide-react"
import { AIListingPrompt } from "@/components/ai-listing-prompt"
import { toast } from "sonner"
import imageCompression from 'browser-image-compression'

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

const PRICE_SUGGESTIONS = {
  'Self-Contain': { min: 80000, max: 150000 },
  'Apartment': { min: 150000, max: 300000 },
  'Flat': { min: 200000, max: 400000 },
  'Studio': { min: 120000, max: 250000 },
  'Shared': { min: 50000, max: 100000 }
}

export default function AddPropertyPage() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [uploadingImages, setUploadingImages] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [showDraftDialog, setShowDraftDialog] = useState(false)

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
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  // Check authentication
  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  // Pre-fill landlord info from profile
  useEffect(() => {
    if (profile) {
      // Check if user is an agent
      if (profile.status !== 'agent') {
        router.push('/dashboard')
        return
      }

      // Pre-fill landlord info
      setFormData(prev => ({
        ...prev,
        landlord_name: profile.full_name || '',
        landlord_phone: profile.phone || ''
      }))
    }
  }, [profile, router])

  // Handle AI/Voice data and drafts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const fromAI = urlParams.get('from_ai')
    const fromVoice = urlParams.get('from_voice')

    // Handle AI generated data
    if (fromAI === 'true') {
      const aiData = sessionStorage.getItem('ai_generated_listing')
      if (aiData) {
        try {
          const parsed = JSON.parse(aiData)
          
          setFormData(prev => ({
            ...prev,
            title: parsed.title || '',
            description: parsed.description || '',
            location: parsed.location || '',
            university: parsed.university || '',
            price: parsed.price || '',
            type: parsed.propertyType || '',
            bedrooms: parsed.bedrooms || '1',
            bathrooms: parsed.bathrooms || '1'
          }))

          sessionStorage.removeItem('ai_generated_listing')
          toast.success('✨ AI-generated listing loaded!', {
            description: 'Review and complete the remaining fields.'
          })
        } catch (error) {
          console.error('Error parsing AI data:', error)
          toast.error('Failed to load AI data')
        }
      }
    }

    // Handle Voice generated data
    if (fromVoice === 'true') {
      const voiceData = sessionStorage.getItem('voice_property_data')
      if (voiceData) {
        try {
          const parsed = JSON.parse(voiceData)
          
          setFormData(prev => ({
            ...prev,
            title: `${parsed.propertyType} in ${parsed.location}`,
            location: parsed.location || '',
            university: parsed.university || '',
            price: parsed.price || '',
            type: parsed.propertyType || '',
            bedrooms: parsed.bedrooms || '1',
            bathrooms: parsed.bathrooms || '1',
            landlord_name: parsed.landlordName || prev.landlord_name,
            landlord_phone: parsed.landlordPhone || prev.landlord_phone,
            description: generateDescriptionFromVoice(parsed)
          }))

          // Parse amenities if provided
          if (parsed.amenities) {
            const voiceAmenities = parseAmenities(parsed.amenities)
            setSelectedAmenities(voiceAmenities)
          }

          sessionStorage.removeItem('voice_property_data')
          toast.success('🎤 Voice data loaded!', {
            description: 'Review and complete the remaining fields.'
          })
        } catch (error) {
          console.error('Error parsing voice data:', error)
          toast.error('Failed to load voice data')
        }
      }
    }

    // Check for saved draft (only if not from AI or Voice)
    if (!fromAI && !fromVoice) {
      const draft = localStorage.getItem('property_draft')
      if (draft) {
        setShowDraftDialog(true)
      }
    }
  }, [])

  // Helper function to generate description from voice data
  function generateDescriptionFromVoice(voiceData: any): string {
    const parts = []
    
    if (voiceData.propertyType) {
      parts.push(`This ${voiceData.propertyType.toLowerCase()}`)
    }
    
    if (voiceData.bedrooms && voiceData.bathrooms) {
      parts.push(`features ${voiceData.bedrooms} bedroom(s) and ${voiceData.bathrooms} bathroom(s)`)
    }
    
    if (voiceData.location && voiceData.university) {
      parts.push(`located in ${voiceData.location}, near ${voiceData.university}`)
    }
    
    if (voiceData.amenities) {
      parts.push(`The property offers ${voiceData.amenities.toLowerCase()}`)
    }
    
    if (voiceData.specialFeatures) {
      parts.push(voiceData.specialFeatures)
    }
    
    return parts.join('. ') + (parts.length > 0 ? '.' : '')
  }

  // Helper function to parse amenities from voice text
  function parseAmenities(amenitiesText: string): string[] {
    const lowerText = amenitiesText.toLowerCase()
    const found: string[] = []
    
    for (const amenity of COMMON_AMENITIES) {
      if (lowerText.includes(amenity.toLowerCase())) {
        found.push(amenity)
      }
    }
    
    return found
  }

  const loadDraft = () => {
    const draft = localStorage.getItem('property_draft')
    if (draft) {
      try {
        const parsed = JSON.parse(draft)
        setFormData(prev => ({
          ...prev,
          ...parsed.formData
        }))
        setSelectedAmenities(parsed.selectedAmenities || [])
        setImageUrls(parsed.imageUrls || [])
        toast.success('Draft loaded successfully')
      } catch (error) {
        console.error('Error loading draft:', error)
        toast.error('Failed to load draft')
      }
    }
    setShowDraftDialog(false)
  }

  const discardDraft = () => {
    localStorage.removeItem('property_draft')
    setShowDraftDialog(false)
    toast.info('Draft discarded')
  }

  const saveDraft = () => {
    try {
      const draftData = {
        formData,
        selectedAmenities,
        imageUrls,
        savedAt: new Date().toISOString()
      }
      localStorage.setItem('property_draft', JSON.stringify(draftData))
      toast.success('Draft saved successfully')
    } catch (error) {
      console.error('Error saving draft:', error)
      toast.error('Failed to save draft')
    }
  }

  const calculateProgress = () => {
    const requiredFields = [
      formData.title,
      formData.description,
      formData.location,
      formData.university,
      formData.price,
      formData.type,
      formData.address,
      formData.landlord_name,
      formData.landlord_phone
    ]
    const filled = requiredFields.filter(Boolean).length
    const total = requiredFields.length
    return Math.round((filled / total) * 100)
  }

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'price':
        if (value && parseInt(value) < 10000) {
          return 'Price should be at least ₦10,000'
        }
        break
      case 'landlord_phone':
        if (value && !/^0\d{10}$/.test(value)) {
          return 'Phone must be 11 digits starting with 0'
        }
        break
      case 'title':
        if (value && value.length < 10) {
          return 'Title should be at least 10 characters'
        }
        break
      case 'description':
        if (value && value.length < 50) {
          return 'Description should be at least 50 characters'
        }
        break
    }
    return ''
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    const error = validateField(name, value)
    setValidationErrors(prev => ({ ...prev, [name]: error }))
  }

  function toggleAmenity(amenity: string) {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    )
    
    if (files.length > 0) {
      await processImageFiles(files)
    }
  }, [imageUrls])

  async function processImageFiles(files: File[]) {
    if (imageUrls.length + files.length > 10) {
      toast.error('Maximum 10 images allowed')
      return
    }

    setUploadingImages(true)
    const uploadPromises = files.map(file => uploadSingleImage(file))
    
    try {
      const results = await Promise.allSettled(uploadPromises)
      const successfulUploads = results
        .filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
        .map(result => result.value)
      
      setImageUrls(prev => [...prev, ...successfulUploads])
      
      const failedCount = results.filter(r => r.status === 'rejected').length
      if (failedCount > 0) {
        toast.error(`${failedCount} image(s) failed to upload`)
      } else {
        toast.success(`${successfulUploads.length} image(s) uploaded successfully`)
      }
    } catch (error) {
      console.error('Error uploading images:', error)
      toast.error('Failed to upload images')
    } finally {
      setUploadingImages(false)
    }
  }

  async function uploadSingleImage(file: File): Promise<string> {
    // Compress image
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    const compressedFile = await imageCompression(file, options)
    
    // Upload to Supabase
    const fileExt = file.name.split('.').pop()
    const fileName = `${user!.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('property-images')
      .upload(fileName, compressedFile, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage
      .from('property-images')
      .getPublicUrl(fileName)

    return urlData.publicUrl
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    await processImageFiles(files)
  }

  function removeImage(index: number) {
    setImageUrls(prev => prev.filter((_, i) => i !== index))
    toast.success('Image removed')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // Validate all fields
    const errors: Record<string, string> = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) errors[key] = error
    })

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      toast.error('Please fix validation errors')
      return
    }

    setSaving(true)
    setError('')

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.location || 
          !formData.university || !formData.price || !formData.type || 
          !formData.address || !formData.landlord_name || !formData.landlord_phone) {
        throw new Error('Please fill in all required fields')
      }

      // Parse landmarks
      const landmarksArray = formData.nearby_landmarks
        .split(',')
        .map(l => l.trim())
        .filter(Boolean)

      // Insert property
      const { data, error: insertError } = await supabase
        .from('properties')
        .insert([{
          landlord_id: user!.id,
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
          landlord_verified: profile?.nin ? true : false,
          available: true,
          verified: false,
          available_from: formData.available_from || null,
          property_rules: formData.property_rules || null,
          nearby_landmarks: landmarksArray.length > 0 ? landmarksArray : null
        }])
        .select()

      if (insertError) throw insertError

      // Clear draft
      localStorage.removeItem('property_draft')
      
      toast.success('Property listing created successfully!')
      router.push('/agent/properties')

    } catch (error: any) {
      console.error('Error creating property:', error)
      setError(error.message || 'Failed to create property')
      toast.error(error.message || 'Failed to create property')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    )
  }

  if (!user) return null

  const progress = calculateProgress()

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back and Voice buttons */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/agent/properties">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to My Properties
            </Button>
          </Link>
          
          <Link href="/agent/properties/voice-add">
            <Button variant="outline" className="bg-purple-50 border-purple-200 hover:bg-purple-100">
              <Mic className="h-4 w-4 mr-2" />
              Use Voice Input
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Add New Property</h1>
          <p className="text-slate-600">List a property for students</p>
        </div>

        {/* Progress Card */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-blue-900">Form Progress</span>
              <span className="text-sm font-bold text-blue-700">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-slate-600 mt-2">
              {progress === 100 ? '✓ All required fields completed!' : 'Complete all required fields to submit'}
            </p>
          </CardContent>
        </Card>

        <AIListingPrompt />

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
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Modern 2 Bedroom Apartment Near UNILAG"
                  className={validationErrors.title ? 'border-red-500' : ''}
                />
                {validationErrors.title && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {validationErrors.title}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the property, its features, and what makes it special..."
                  rows={6}
                  className={validationErrors.description ? 'border-red-500' : ''}
                />
                <div className="flex justify-between items-center mt-1">
                  {validationErrors.description ? (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.description}
                    </p>
                  ) : (
                    <p className="text-xs text-slate-500">
                      {formData.description.length} characters (minimum 50)
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Property Type *</Label>
                  <Select
                    required
                    value={formData.type}
                    onValueChange={(value) => handleInputChange('type', value)}
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
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="e.g., 150000"
                    className={validationErrors.price ? 'border-red-500' : ''}
                  />
                  {validationErrors.price ? (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.price}
                    </p>
                  ) : formData.type && PRICE_SUGGESTIONS[formData.type as keyof typeof PRICE_SUGGESTIONS] && (
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      Typical range for {formData.type}: ₦
                      {PRICE_SUGGESTIONS[formData.type as keyof typeof PRICE_SUGGESTIONS].min.toLocaleString()} - ₦
                      {PRICE_SUGGESTIONS[formData.type as keyof typeof PRICE_SUGGESTIONS].max.toLocaleString()}/year
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms *</Label>
                  <Select
                    required
                    value={formData.bedrooms}
                    onValueChange={(value) => handleInputChange('bedrooms', value)}
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
                    onValueChange={(value) => handleInputChange('bathrooms', value)}
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
                  onValueChange={(value) => handleInputChange('university', value)}
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
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Akoka, Yaba"
                />
              </div>

              <div>
                <Label htmlFor="address">Full Address *</Label>
                <Input
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="e.g., 15 Iwaya Road, Akoka, Lagos"
                />
              </div>

              <div>
                <Label htmlFor="nearby_landmarks">Nearby Landmarks</Label>
                <Input
                  id="nearby_landmarks"
                  value={formData.nearby_landmarks}
                  onChange={(e) => handleInputChange('nearby_landmarks', e.target.value)}
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
              {selectedAmenities.length > 0 && (
                <p className="text-xs text-slate-500 mt-4">
                  {selectedAmenities.length} amenities selected
                </p>
              )}
            </CardContent>
          </Card>

          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle>Property Photos</CardTitle>
              <CardDescription>Upload up to 10 photos (first photo will be the main image)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-slate-300 hover:border-blue-400'
                } ${uploadingImages || imageUrls.length >= 10 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <p className="text-sm text-slate-600 mb-2">
                  Drag and drop images here, or click to browse
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  Images will be automatically compressed. Max 10 images.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="property-images"
                  disabled={uploadingImages || imageUrls.length >= 10}
                />
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploadingImages || imageUrls.length >= 10}
                  onClick={() => document.getElementById('property-images')?.click()}
                >
                  {uploadingImages ? 'Uploading...' : `Choose Files (${imageUrls.length}/10)`}
                </Button>
              </div>

              {imageUrls.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{imageUrls.length} image(s) uploaded</p>
                    <p className="text-xs text-slate-500">Drag to reorder (coming soon)</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Property ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-slate-200"
                          loading="lazy"
                        />
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow-lg">
                            Main Photo
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-700"
                          title="Remove image"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
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
                    onChange={(e) => handleInputChange('landlord_name', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="landlord_phone">Contact Phone *</Label>
                  <Input
                    id="landlord_phone"
                    type="tel"
                    required
                    value={formData.landlord_phone}
                    onChange={(e) => handleInputChange('landlord_phone', e.target.value)}
                    placeholder="080XXXXXXXX"
                    className={validationErrors.landlord_phone ? 'border-red-500' : ''}
                  />
                  {validationErrors.landlord_phone && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.landlord_phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="available_from">Available From</Label>
                <Input
                  id="available_from"
                  type="date"
                  value={formData.available_from}
                  onChange={(e) => handleInputChange('available_from', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="property_rules">Property Rules</Label>
                <Textarea
                  id="property_rules"
                  value={formData.property_rules}
                  onChange={(e) => handleInputChange('property_rules', e.target.value)}
                  placeholder="e.g., No smoking, No pets, Visitors allowed until 10pm"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/agent/properties" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button
              type="button"
              variant="outline"
              onClick={saveDraft}
              className="flex-1"
            >
              <FileText className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button
              type="submit"
              disabled={saving || progress < 100}
              className="flex-1 sm:flex-[1.5]"
              size="lg"
            >
              {saving ? (
                'Creating...'
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Property Listing
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Draft Dialog */}
        <AlertDialog open={showDraftDialog} onOpenChange={setShowDraftDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                Draft Found
              </AlertDialogTitle>
              <AlertDialogDescription>
                You have a saved draft. Would you like to continue where you left off?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={discardDraft}>Start Fresh</AlertDialogCancel>
              <AlertDialogAction onClick={loadDraft}>Load Draft</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}