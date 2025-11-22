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
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { 
  ArrowLeft, 
  Wand2, 
  Copy, 
  CheckCircle, 
  Loader2, 
  ArrowRight, 
  Mic, 
  MicOff, 
  Info,
  Sparkles,
  AlertCircle,
  FileText,
  Zap
} from "lucide-react"
import { toast } from "sonner"

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

export default function GenerateListingPage() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [voiceTranscript, setVoiceTranscript] = useState('')
  const [voiceError, setVoiceError] = useState('')
  const recognitionRef = useRef<any>(null)

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

  // Cleanup on unmount
  // Initialize speech recognition
useEffect(() => {
  if (typeof window === 'undefined') return

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  
  if (!SpeechRecognition) {
    return
  }

  const recognition = new SpeechRecognition()
  recognition.continuous = true
  recognition.interimResults = true
  recognition.lang = 'en-US'

  recognition.onresult = (event: any) => {
    let finalTranscript = ''

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' '
      }
    }

    if (finalTranscript) {
      setVoiceTranscript(prev => prev + finalTranscript)
      setFormData(prev => ({
        ...prev,
        agentNotes: prev.agentNotes + finalTranscript
      }))
    }
  }

  recognition.onerror = (event: any) => {
    console.error('Speech recognition error:', event.error)
    setIsListening(false)
    
    if (event.error === 'no-speech') {
      toast.error('No speech detected')
    } else if (event.error === 'not-allowed') {
      toast.error('Microphone access denied')
      setVoiceError('Microphone access denied. Please enable it in your browser settings.')
    } else {
      toast.error('Speech recognition error')
    }
  }

  recognition.onend = () => {
    if (isListening) {
      try {
        recognition.start()
      } catch (e) {
        setIsListening(false)
      }
    }
  }

  recognitionRef.current = recognition

  return () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }
}, [isListening])

  // Calculate form progress
  const calculateProgress = () => {
    const requiredFields = [
      formData.location,
      formData.university,
      formData.price,
      formData.propertyType,
    ]
    const filled = requiredFields.filter(Boolean).length
    return Math.round((filled / requiredFields.length) * 100)
  }

    async function startRecording() {
    try {
      setVoiceError('')
      
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      
      if (!SpeechRecognition) {
        throw new Error('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.')
      }

      if (!recognitionRef.current) {
        throw new Error('Speech recognition not initialized')
      }

      setVoiceTranscript('')
      recognitionRef.current.start()
      setIsListening(true)
      toast.info('Listening... Speak now', {
        description: 'Your words will appear in the notes field automatically'
      })

    } catch (error: any) {
      console.error('Recording error:', error)
      const errorMessage = error.message || 'Failed to start voice recognition'
      setVoiceError(errorMessage)
      toast.error('Voice recognition unavailable', {
        description: errorMessage
      })
      setIsListening(false)
    }
  }

    function stopRecording() {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
      
      if (voiceTranscript) {
        toast.success('Voice notes added!', {
          description: `${voiceTranscript.split(' ').length} words transcribed`
        })
      }
    }
  }

  

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    
    // Stop recording if active
    // Stop listening if active
  if (isListening) {
    stopRecording()
    toast.warning('Transcription stopped', {
      description: 'Generating your listing...'
    })
  }

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

      toast.success('Listing generated!', {
        description: 'Review your AI-generated listing below'
      })

      // Scroll to results
      window.scrollTo({ top: 0, behavior: 'smooth' })

    } catch (error: any) {
      console.error('Generation error:', error)
      const errorMessage = error.message || 'Failed to generate listing. Please try again.'
      setError(errorMessage)
      toast.error('Generation failed', {
        description: errorMessage
      })
    } finally {
      setGenerating(false)
    }
  }

  function handleCopyDescription() {
    if (generatedListing) {
      navigator.clipboard.writeText(generatedListing.description)
      setCopied(true)
      toast.success('Description copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function handleCopyTitle() {
    if (generatedListing) {
      navigator.clipboard.writeText(generatedListing.title)
      toast.success('Title copied to clipboard!')
    }
  }

  function handleUseThisListing() {
    if (!generatedListing) return

    sessionStorage.setItem('ai_generated_listing', JSON.stringify({
      ...formData,
      title: generatedListing.title,
      description: generatedListing.description
    }))

    toast.success('Listing saved!', {
      description: 'Redirecting to add property page...'
    })

    setTimeout(() => {
      router.push('/agent/properties/add?from_ai=true')
    }, 500)
  }

  function handleStartOver() {
    setGeneratedListing(null)
    setFormData({
      location: '',
      university: '',
      price: '',
      bedrooms: '1',
      bathrooms: '1',
      propertyType: '',
      agentNotes: ''
    })
    toast.info('Starting fresh', {
      description: 'Fill in the form to generate a new listing'
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <div className="text-xl text-slate-600">Loading...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push('/signin')
    return null
  }

  if (profile?.status !== 'agent') {
    router.push('/dashboard')
    return null
  }

  const progress = calculateProgress()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/agent/properties">
          <Button variant="ghost" className="mb-6 hover:bg-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Properties
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Wand2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Listing Generator
          </h1>
          <p className="text-slate-600 text-lg">
            Create professional property listings in seconds with AI
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge variant="secondary" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by AI
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              Instant Results
            </Badge>
          </div>
        </div>

        {/* Form Section */}
        {!generatedListing && (
          <>
            {/* Progress Indicator */}
            <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-blue-900">Form Progress</span>
                  <span className="text-sm font-bold text-blue-700">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-slate-600 mt-2">
                  {progress === 100 ? '✓ Ready to generate!' : 'Fill in all required fields to generate'}
                </p>
              </CardContent>
            </Card>

            <form onSubmit={handleGenerate} className="space-y-6">
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Property Basics
                  </CardTitle>
                  <CardDescription>
                    Tell us about your property - our AI will write the perfect listing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Location & University */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">
                        Location/Area *
                        <span className="text-xs text-slate-500 ml-2">(e.g., Akoka)</span>
                      </Label>
                      <Input
                        id="location"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        placeholder="Enter area or neighborhood"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="university">Nearest University *</Label>
                      <Select
                        required
                        value={formData.university}
                        onValueChange={(value) => setFormData({...formData, university: value})}
                      >
                        <SelectTrigger className="mt-1">
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

                  {/* Property Details */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="propertyType">Property Type *</Label>
                      <Select
                        required
                        value={formData.propertyType}
                        onValueChange={(value) => setFormData({...formData, propertyType: value})}
                      >
                        <SelectTrigger className="mt-1">
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
                        <SelectTrigger className="mt-1">
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
                        <SelectTrigger className="mt-1">
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
                    <Label htmlFor="price">
                      Price (₦/year) *
                      <span className="text-xs text-slate-500 ml-2">(Annual rent)</span>
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="e.g., 150000"
                      className="mt-1"
                    />
                  </div>

                  {/* Voice Notes Section */}
                  <div>
                    <Label htmlFor="agentNotes">
                      Additional Notes (Optional)
                      <Badge variant="secondary" className="ml-2 text-xs">
                        More details = Better listing
                      </Badge>
                    </Label>
                    <Textarea
                      id="agentNotes"
                      value={formData.agentNotes}
                      onChange={(e) => setFormData({...formData, agentNotes: e.target.value})}
                      placeholder="Describe special features: security, amenities, proximity to landmarks, recent renovations, unique selling points..."
                      rows={5}
                      className="mt-1"
                    />
                    
                    {/* Voice Dictation Button */}
                    <div className="mt-3">
                      {!isListening ? (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={startRecording}
                          className="w-full hover:bg-blue-50 hover:border-blue-300"
                        >
                          <Mic className="h-4 w-4 mr-2" />
                          🎤 Start Voice Dictation
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={stopRecording}
                          className="w-full animate-pulse"
                        >
                          <MicOff className="h-4 w-4 mr-2" />
                          ⏺️ Listening... Click to Stop
                        </Button>
                      )}
                    </div>

                    {/* Show live transcript */}
                    {isListening && voiceTranscript && (
                      <div className="mt-3 bg-blue-50 border border-blue-200 p-3 rounded-lg">
                        <p className="text-xs text-blue-600 font-medium mb-1">Live Transcription:</p>
                        <p className="text-sm text-blue-900">{voiceTranscript}</p>
                      </div>
                    )}

                    {voiceError && (
                      <div className="mt-2 bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg text-sm flex items-start gap-2">
                        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Voice recording unavailable</p>
                          <p className="text-xs mt-1">{voiceError}. Please type your notes instead.</p>
                        </div>
                      </div>
                    )}
                    
                    <p className="text-xs text-slate-500 mt-2 flex items-start gap-1">
                    <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Tip:</strong> Click the microphone and speak naturally. Your words will appear in the notes field automatically. Works in Chrome, Edge, and Safari.
                    </span>
                  </p>
                  </div>
                </CardContent>
              </Card>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Generation Failed</p>
                    <p className="text-sm mt-1">{error}</p>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={generating || progress < 100}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
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
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-sm">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    ✨ Pro Tips for Better Results
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>Mention specific security features (24-hour guard, CCTV, gated)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>Include distance to campus ("5 minutes walk", "10 minutes drive")</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>Note recent improvements ("newly renovated", "fresh paint")</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>List standout amenities (WiFi, generator, parking)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>Add nearby landmarks (markets, bus stops, restaurants)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </form>
          </>
        )}

        {/* Generated Result */}
        {generatedListing && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Success Banner */}
            <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-green-700 mb-2">
                  <div className="bg-green-600 rounded-full p-2">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-lg">AI Generated Successfully!</span>
                    <p className="text-sm text-green-600 mt-1">
                      Review the listing below and click "Use This Listing" to continue
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Title */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">Property Title</CardTitle>
                    <CardDescription>Auto-generated, SEO-optimized title</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyTitle}
                    className="hover:bg-blue-50"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold text-slate-800 leading-relaxed">
                  {generatedListing.title}
                </p>
              </CardContent>
            </Card>

            {/* Property Description */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">Property Description</CardTitle>
                    <CardDescription>
                      Professional, engaging description that highlights key features
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyDescription}
                    className={copied ? 'bg-green-50 border-green-200' : ''}
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
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
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                    {generatedListing.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                onClick={handleStartOver}
                className="flex-1 hover:bg-slate-50"
                size="lg"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Different Listing
              </Button>
              <Button
                onClick={handleUseThisListing}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                size="lg"
              >
                Use This Listing
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Info Box */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-4">
                <p className="text-sm text-blue-800 flex items-center gap-2">
                  <Info className="h-4 w-4 flex-shrink-0" />
                  <span>
                    You can edit the title and description after clicking "Use This Listing"
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}