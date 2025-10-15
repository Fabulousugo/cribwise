/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Wand2, Copy, CheckCircle, Loader2, ArrowRight, Mic, MicOff, Info } from "lucide-react"

// ... keep your existing constants ...

export default function GenerateListingPage() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [voiceError, setVoiceError] = useState('')
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

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

  // Simple browser audio recording (works offline)
  async function startRecording() {
    try {
      setVoiceError('')
      
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        // Create audio blob
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        
        // For now, just let user know recording was captured
        // In production, you'd send this to Whisper API
        const sizeKB = Math.round(audioBlob.size / 1024)
        setFormData(prev => ({
          ...prev,
          agentNotes: prev.agentNotes 
            ? `${prev.agentNotes}\n\n[Voice recording captured (${sizeKB}KB). Please type your notes above for now, or describe the property features.]`
            : `[Voice recording captured (${sizeKB}KB). Please type your notes for now.]`
        }))
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop())
        
        // Show message
        alert(`✅ Recording captured (${sizeKB}KB)!\n\nVoice transcription coming soon. For now, please type your property features in the notes field.`)
      }

      // Start recording
      mediaRecorder.start()
      setIsRecording(true)

    } catch (error: any) {
      console.error('Recording error:', error)
      setVoiceError('Microphone access denied or unavailable')
      setIsRecording(false)
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
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

    sessionStorage.setItem('ai_generated_listing', JSON.stringify({
      ...formData,
      title: generatedListing.title,
      description: generatedListing.description
    }))

    router.push('/agent/properties/add?from_ai=true')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
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
                {/* Location & University */}
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
                        <SelectItem value="University of Lagos (UNILAG)">University of Lagos (UNILAG)</SelectItem>
                        <SelectItem value="University of Ibadan (UI)">University of Ibadan (UI)</SelectItem>
                        <SelectItem value="Obafemi Awolowo University (OAU)">Obafemi Awolowo University (OAU)</SelectItem>
                        <SelectItem value="University of Nigeria, Nsukka (UNN)">University of Nigeria, Nsukka (UNN)</SelectItem>
                        <SelectItem value="Ahmadu Bello University (ABU)">Ahmadu Bello University (ABU)</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Property Details */}
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
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="Self-Contain">Self-Contain</SelectItem>
                        <SelectItem value="Flat">Flat</SelectItem>
                        <SelectItem value="Shared">Shared</SelectItem>
                        <SelectItem value="Studio">Studio</SelectItem>
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

                {/* Voice Notes Section */}
                <div>
                  <Label htmlFor="agentNotes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="agentNotes"
                    value={formData.agentNotes}
                    onChange={(e) => setFormData({...formData, agentNotes: e.target.value})}
                    placeholder="Describe special features: security, amenities, proximity to landmarks, recent renovations, unique selling points..."
                    rows={5}
                  />
                  
                  {/* Voice Recording Button */}
                  <div className="mt-3">
                    {!isRecording ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={startRecording}
                        className="w-full"
                      >
                        <Mic className="h-4 w-4 mr-2" />
                        🎤 Record Voice Notes (Coming Soon)
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={stopRecording}
                        className="w-full animate-pulse"
                      >
                        <MicOff className="h-4 w-4 mr-2" />
                        ⏺️ Recording... Click to Stop
                      </Button>
                    )}
                  </div>

                  {voiceError && (
                    <div className="mt-2 bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg text-sm flex items-start gap-2">
                      <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Voice recording unavailable</p>
                        <p className="text-xs mt-1">{voiceError}. Please type your notes instead.</p>
                      </div>
                    </div>
                  )}
                  
                  <p className="text-xs text-slate-500 mt-2">
                    💡 <strong>Tip:</strong> Mention security, amenities, distance to campus, recent upgrades, or anything that makes this property special
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
                  Generate Professional Listing with AI
                </>
              )}
            </Button>

            {/* Quick Tips */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-blue-900 mb-2">✨ Pro Tips for Better Results:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Mention specific security features (24-hour guard, CCTV, gated)</li>
                  <li>• Include distance to campus (&quot;5 minutes walks&quot;, &quot;10 minutes drive&quot;, &quot;next to main gate&quot;)</li>
                  <li>• Note recent improvements (&quot;newly renovated&quot;, &quot;fresh paint&quot;)</li>
                  <li>• List standout amenities (WiFi, generator, parking)</li>
                  <li>• Add nearby landmarks (markets, bus stops, restaurants)</li>
                </ul>
              </CardContent>
            </Card>
          </form>
        )}

        {/* Generated Result - Keep your existing code */}
        {generatedListing && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* ... rest of your generated listing display code ... */}
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