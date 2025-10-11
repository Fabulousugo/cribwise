/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Wand2, Copy, CheckCircle, Loader2, ArrowRight } from "lucide-react"
import { Mic, MicOff } from "lucide-react"



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
  "Other"
]

const PROPERTY_TYPES = ["Apartment", "Self-Contain", "Flat", "Shared", "Studio"]


export default function GenerateListingPage() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const [formData, setFormData] = useState({
    location: '',
    university: '',
    price: '',
    bedrooms: '1',
    bathrooms: '1',
    propertyType: '',
    agentNotes: ''
  })

  const [generatedListing, setGeneratedListing] = useState<{
    title: string
    description: string
  } | null>(null)

const [isRecording, setIsRecording] = useState(false)
const [recognition, setRecognition] = useState<any>(null)
const [voiceSupported, setVoiceSupported] = useState(false)

useEffect(() => {
  // Check if browser supports speech recognition
  if (typeof window !== 'undefined') {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (SpeechRecognition) {
      setVoiceSupported(true)
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = 'en-US'
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setFormData(prev => ({
          ...prev,
          agentNotes: prev.agentNotes ? `${prev.agentNotes} ${transcript}` : transcript
        }))
        setIsRecording(false)
      }
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsRecording(false)
        if (event.error === 'no-speech') {
          alert('No speech detected. Please try again.')
        } else {
          alert('Voice recognition error. Please try again.')
        }
      }
      
      recognitionInstance.onend = () => {
        setIsRecording(false)
      }
      
      setRecognition(recognitionInstance)
    }
  }
}, [])

function handleStartVoiceRecording() {
  if (!recognition) {
    alert('Voice recording not supported in your browser. Please use Chrome or Edge.')
    return
  }
  
  try {
    setIsRecording(true)
    recognition.start()
  } catch (error) {
    console.error('Failed to start recording:', error)
    setIsRecording(false)
    alert('Failed to start voice recording. Please try again.')
  }
}

function handleStopVoiceRecording() {
  if (recognition) {
    recognition.stop()
    setIsRecording(false)
  }
}



  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setGenerating(true)
    setError('')
    setGeneratedListing(null)

    try {
      const response = await fetch('/api/generate-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate listing')
      }

      setGeneratedListing({
        title: data.title,
        description: data.description
      })

    } catch (error: any) {
      console.error('Generation error:', error)
      setError(error.message || 'Failed to generate listing. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  function handleCopyDescription() {
    if (generatedListing) {
      navigator.clipboard.writeText(generatedListing.description)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function handleUseThisListing() {
    if (!generatedListing) return

    // Store in sessionStorage to pass to add property page
    sessionStorage.setItem('ai_generated_listing', JSON.stringify({
      ...formData,
      title: generatedListing.title,
      description: generatedListing.description
    }))

    // Redirect to add property page
    router.push('/agent/properties/add?from_ai=true')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/agent/properties">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Properties
          </Button>
        </Link>

        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
            <Wand2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">AI Listing Generator</h1>
          <p className="text-slate-600 text-lg">
            Create professional property listings in seconds with AI
          </p>
        </div>

        {/* Input Form */}
        {!generatedListing && (
          <form onSubmit={handleGenerate} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Basics</CardTitle>
                <CardDescription>
                  Tell us about your property - our AI will write the perfect listing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location/Area *</Label>
                    <Input
                      id="location"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="e.g., Akoka, Yaba"
                    />
                  </div>

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
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="propertyType">Property Type *</Label>
                    <Select
                      required
                      value={formData.propertyType}
                      onValueChange={(value) => setFormData({...formData, propertyType: value})}
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

                <div>
                <Label htmlFor="agentNotes">Additional Notes (Optional)</Label>
                <div className="flex gap-2 mb-2">
                    <Textarea
                    id="agentNotes"
                    value={formData.agentNotes}
                    onChange={(e) => setFormData({...formData, agentNotes: e.target.value})}
                    placeholder="Any special features, amenities, or unique selling points you want to highlight..."
                    rows={4}
                    className="flex-1"
                    />
                </div>
                
                {voiceSupported && (
                    <div className="flex items-center gap-2 mb-2">
                    {!isRecording ? (
                        <Button
                        type="button"
                        variant="outline"
                        onClick={handleStartVoiceRecording}
                        className="w-full"
                        >
                        <Mic className="h-4 w-4 mr-2" />
                        🎤 Speak Your Notes (Click to Start)
                        </Button>
                    ) : (
                        <Button
                        type="button"
                        variant="destructive"
                        onClick={handleStopVoiceRecording}
                        className="w-full animate-pulse"
                        >
                        <MicOff className="h-4 w-4 mr-2" />
                        Recording... (Click to Stop)
                        </Button>
                    )}
                    </div>
                )}
                
                <p className="text-xs text-slate-500">
                    {voiceSupported 
                    ? "Type or click the microphone to speak your notes naturally - the AI will incorporate them"
                    : "Tell us what makes this property special - the AI will incorporate it naturally"
                    }
                </p>
                </div>
              </CardContent>
            </Card>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={generating}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {generating ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  AI is Writing Your Listing...
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5 mr-2" />
                  Generate Professional Listing
                </>
              )}
            </Button>
          </form>
        )}

        {/* Generated Result */}
        {generatedListing && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-green-700 mb-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">AI Generated Successfully!</span>
                </div>
                <p className="text-sm text-green-600">
                  Review the listing below and click &quot;Use This Listing&quot; to continue
                </p>
              </CardContent>
            </Card>

            {/* Title */}
            <Card>
              <CardHeader>
                <CardTitle>Property Title</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold text-slate-800">
                  {generatedListing.title}
                </p>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Property Description</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyDescription}
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                  {generatedListing.description}
                </p>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setGeneratedListing(null)}
                className="flex-1"
              >
                Generate Again
              </Button>
              <Button
                onClick={handleUseThisListing}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
              >
                Use This Listing
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}