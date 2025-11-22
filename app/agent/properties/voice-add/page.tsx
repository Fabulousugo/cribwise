/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { 
  ArrowLeft, 
  Mic, 
  MicOff, 
  Volume2,
  VolumeX,
  CheckCircle,
  ArrowRight,
  Loader2,
  RotateCcw,
  Info,
  Sparkles,
  Home
} from "lucide-react"
import { toast } from "sonner"

const NIGERIAN_UNIVERSITIES = [
  "University of Lagos",
  "University of Ibadan",
  "Obafemi Awolowo University",
  "University of Nigeria Nsukka",
  "Ahmadu Bello University",
  "University of Benin",
  "Lagos State University",
  "Covenant University",
  "Babcock University"
]

const PROPERTY_TYPES = ["Apartment", "Self-Contain", "Flat", "Shared", "Studio"]

type VoiceStep = {
  id: string
  question: string
  field: keyof PropertyData
  type: 'text' | 'number' | 'select'
  options?: string[]
  validation?: (value: string) => boolean
  errorMessage?: string
}

type PropertyData = {
  location: string
  university: string
  propertyType: string
  bedrooms: string
  bathrooms: string
  price: string
  amenities: string
  specialFeatures: string
  landlordName: string
  landlordPhone: string
}

const VOICE_STEPS: VoiceStep[] = [
  {
    id: 'location',
    question: 'What is the location or area of the property? For example, Akoka, Yaba, or Surulere.',
    field: 'location',
    type: 'text'
  },
  {
    id: 'university',
    question: 'Which university is this property near? Say the full name of the university.',
    field: 'university',
    type: 'select',
    options: NIGERIAN_UNIVERSITIES
  },
  {
    id: 'propertyType',
    question: 'What type of property is this? Say Apartment, Self-Contain, Flat, Shared, or Studio.',
    field: 'propertyType',
    type: 'select',
    options: PROPERTY_TYPES
  },
  {
    id: 'bedrooms',
    question: 'How many bedrooms does it have? Say a number from 1 to 5.',
    field: 'bedrooms',
    type: 'number',
    validation: (val) => parseInt(val) >= 1 && parseInt(val) <= 5,
    errorMessage: 'Please say a number between 1 and 5'
  },
  {
    id: 'bathrooms',
    question: 'How many bathrooms? Say a number from 1 to 4.',
    field: 'bathrooms',
    type: 'number',
    validation: (val) => parseInt(val) >= 1 && parseInt(val) <= 4,
    errorMessage: 'Please say a number between 1 and 4'
  },
  {
    id: 'price',
    question: 'What is the annual rent price in Naira? Just say the amount, for example, 150000 or one hundred and fifty thousand.',
    field: 'price',
    type: 'number',
    validation: (val) => parseInt(val) >= 10000,
    errorMessage: 'Price should be at least 10,000 Naira'
  },
  {
    id: 'amenities',
    question: 'What amenities are available? You can mention WiFi, Generator, Security, Parking, Water Supply, or any others.',
    field: 'amenities',
    type: 'text'
  },
  {
    id: 'specialFeatures',
    question: 'Describe any special features or selling points. Mention things like security, recent renovations, proximity to campus, or unique features.',
    field: 'specialFeatures',
    type: 'text'
  },
  {
    id: 'landlordName',
    question: 'What is the landlord or agent name for this property?',
    field: 'landlordName',
    type: 'text'
  },
  {
    id: 'landlordPhone',
    question: 'What is the contact phone number? Say the digits clearly.',
    field: 'landlordPhone',
    type: 'text',
    validation: (val) => /^\d{11}$/.test(val.replace(/\s/g, '')),
    errorMessage: 'Please say a valid 11-digit phone number'
  }
]

export default function VoiceAddPropertyPage() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()
  
  // Voice recognition
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [propertyData, setPropertyData] = useState<PropertyData>({
    location: '',
    university: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    price: '',
    amenities: '',
    specialFeatures: '',
    landlordName: '',
    landlordPhone: ''
  })
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  
  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Check browser support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      
      if (!SpeechRecognition) {
        setError('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.')
        return
      }

      if (!window.speechSynthesis) {
        toast.error('Text-to-speech not supported in your browser')
      }
    }
  }, [])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window === 'undefined') return

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      handleVoiceInput(transcript)
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
      
      if (event.error === 'no-speech') {
        toast.error('No speech detected. Please try again.')
      } else if (event.error === 'not-allowed') {
        toast.error('Microphone access denied. Please enable it in your browser settings.')
      } else {
        toast.error('Speech recognition error. Please try again.')
      }
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [currentStep])

  // Text-to-speech function
  const speak = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => {
      setIsSpeaking(true)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
    }

    utterance.onerror = () => {
      setIsSpeaking(false)
    }

    synthesisRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const startListening = () => {
    if (!recognitionRef.current) {
      toast.error('Speech recognition not initialized')
      return
    }

    try {
      stopSpeaking() // Stop any ongoing speech
      setTranscript('')
      recognitionRef.current.start()
      setIsListening(true)
      toast.info('Listening... Speak now')
    } catch (error) {
      console.error('Error starting recognition:', error)
      toast.error('Failed to start listening')
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  // Process voice input
  const handleVoiceInput = (transcript: string) => {
    setTranscript(transcript)
    setIsProcessing(true)

    const step = VOICE_STEPS[currentStep]
    let processedValue = transcript.trim()

    // Process based on type
    if (step.type === 'number') {
      // Convert words to numbers
      processedValue = convertWordsToNumber(transcript)
    } else if (step.type === 'select') {
      // Find best match from options
      processedValue = findBestMatch(transcript, step.options!)
    }

    // Validate
    if (step.validation && !step.validation(processedValue)) {
      toast.error(step.errorMessage || 'Invalid input. Please try again.')
      speak(step.errorMessage || 'Invalid input. Please try again.')
      setIsProcessing(false)
      return
    }

    // Update data
    setPropertyData(prev => ({
      ...prev,
      [step.field]: processedValue
    }))

    toast.success(`Got it: ${processedValue}`)
    
    setTimeout(() => {
      setIsProcessing(false)
      moveToNextStep()
    }, 1000)
  }

  const moveToNextStep = () => {
    if (currentStep < VOICE_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
      setTranscript('')
      
      // Ask next question after a brief pause
      setTimeout(() => {
        speak(VOICE_STEPS[currentStep + 1].question)
      }, 1500)
    } else {
      // All steps completed
      completeVoiceInput()
    }
  }

  const moveToPreviousStep = () => {
    if (currentStep > 0) {
      stopSpeaking()
      stopListening()
      setCurrentStep(prev => prev - 1)
      setTranscript('')
      toast.info('Going back to previous question')
      
      setTimeout(() => {
        speak(VOICE_STEPS[currentStep - 1].question)
      }, 500)
    }
  }

  const completeVoiceInput = () => {
    stopSpeaking()
    stopListening()
    
    speak('Great! All information collected. Redirecting you to complete the listing.')
    
    toast.success('Voice input complete!', {
      description: 'Redirecting to add property page...'
    })

    // Save to session storage
    setTimeout(() => {
      sessionStorage.setItem('voice_property_data', JSON.stringify(propertyData))
      router.push('/agent/properties/add?from_voice=true')
    }, 2000)
  }

  const startVoiceFlow = () => {
    setCurrentStep(0)
    setTranscript('')
    speak('Welcome! Let\'s add your property. I will ask you some questions. ' + VOICE_STEPS[0].question)
  }

  const resetFlow = () => {
    stopSpeaking()
    stopListening()
    setCurrentStep(0)
    setPropertyData({
      location: '',
      university: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      price: '',
      amenities: '',
      specialFeatures: '',
      landlordName: '',
      landlordPhone: ''
    })
    setTranscript('')
    toast.info('Voice flow reset')
  }

  // Helper: Convert spoken numbers to digits
  const convertWordsToNumber = (text: string): string => {
    const lowerText = text.toLowerCase()
    
    // Check if already a number
    const directNumber = lowerText.match(/\d+/)
    if (directNumber) {
      return directNumber[0]
    }

    // Simple word to number conversion
    const numberWords: Record<string, number> = {
      'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
      'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
      'fifty': 50, 'hundred': 100, 'thousand': 1000
    }

    let result = 0
    let current = 0

    const words = lowerText.split(/\s+/)
    
    for (const word of words) {
      if (numberWords[word]) {
        if (word === 'hundred') {
          current = current === 0 ? 100 : current * 100
        } else if (word === 'thousand') {
          current = current === 0 ? 1000 : current * 1000
          result += current
          current = 0
        } else {
          current += numberWords[word]
        }
      }
    }
    
    result += current
    return result > 0 ? result.toString() : text
  }

  // Helper: Find best match from options
  const findBestMatch = (text: string, options: string[]): string => {
    const lowerText = text.toLowerCase()
    
    // Exact match
    for (const option of options) {
      if (lowerText.includes(option.toLowerCase())) {
        return option
      }
    }

    // Partial match
    for (const option of options) {
      const optionWords = option.toLowerCase().split(' ')
      for (const word of optionWords) {
        if (lowerText.includes(word) && word.length > 3) {
          return option
        }
      }
    }

    // Return original if no match
    return text
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

  const progress = ((currentStep + 1) / VOICE_STEPS.length) * 100
  const currentStepData = VOICE_STEPS[currentStep]
  const isFlowStarted = currentStep > 0 || propertyData.location !== ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/agent/properties">
          <Button variant="ghost" className="mb-6 hover:bg-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Properties
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <Mic className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Voice Add Property
          </h1>
          <p className="text-slate-600 text-lg">
            Add properties hands-free with voice commands
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge variant="secondary" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              100% Free
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <Home className="h-3 w-3 mr-1" />
              No Internet Required
            </Badge>
          </div>
        </div>

        {/* Browser Support Error */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 text-red-700">
                <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Voice features unavailable</p>
                  <p className="text-sm mt-1">{error}</p>
                  <Link href="/agent/properties/add">
                    <Button variant="outline" size="sm" className="mt-3">
                      Use Regular Form Instead
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!error && (
          <>
            {/* How It Works */}
            {!isFlowStarted && (
              <Card className="mb-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    How It Works
                  </CardTitle>
                  <CardDescription>
                    A simple voice-guided process to add your property
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <p className="text-sm text-slate-700">
                      Click "Start Voice Input" and allow microphone access
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <p className="text-sm text-slate-700">
                      Listen to each question and speak your answer clearly
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <p className="text-sm text-slate-700">
                      System will automatically move to the next question
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      4
                    </div>
                    <p className="text-sm text-slate-700">
                      Review and complete your listing at the end
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Progress */}
            {isFlowStarted && (
              <Card className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-purple-900">
                      Step {currentStep + 1} of {VOICE_STEPS.length}
                    </span>
                    <span className="text-sm font-bold text-purple-700">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-slate-600 mt-2">
                    {VOICE_STEPS.length - currentStep - 1} questions remaining
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Main Voice Interface */}
            <Card className="shadow-lg mb-6">
              <CardHeader>
                <CardTitle>
                  {!isFlowStarted ? 'Ready to Start' : currentStepData.id}
                </CardTitle>
                <CardDescription>
                  {!isFlowStarted 
                    ? 'Click the button below to begin voice input'
                    : 'Listen to the question and speak your answer'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Question Display */}
                {isFlowStarted && (
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg border-2 border-purple-200">
                    <div className="flex items-start gap-3">
                      <Volume2 className={`h-6 w-6 ${isSpeaking ? 'text-purple-600 animate-pulse' : 'text-slate-600'} flex-shrink-0`} />
                      <div className="flex-1">
                        <p className="text-lg font-medium text-slate-800 mb-2">
                          {currentStepData.question}
                        </p>
                        {currentStepData.options && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {currentStepData.options.map(option => (
                              <Badge key={option} variant="secondary" className="text-xs">
                                {option}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Microphone Button */}
                <div className="flex flex-col items-center justify-center py-8">
                  {!isFlowStarted ? (
                    <Button
                      size="lg"
                      onClick={startVoiceFlow}
                      className="h-32 w-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-2xl hover:shadow-3xl transition-all"
                    >
                      <Mic className="h-16 w-16" />
                    </Button>
                  ) : (
                    <div className="relative">
                      {!isListening ? (
                        <Button
                          size="lg"
                          onClick={startListening}
                          disabled={isProcessing || isSpeaking}
                          className="h-32 w-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-2xl hover:shadow-3xl transition-all disabled:opacity-50"
                        >
                          <Mic className="h-16 w-16" />
                        </Button>
                      ) : (
                        <Button
                          size="lg"
                          onClick={stopListening}
                          className="h-32 w-32 rounded-full bg-red-600 hover:bg-red-700 shadow-2xl animate-pulse"
                        >
                          <MicOff className="h-16 w-16" />
                        </Button>
                      )}
                      
                      {/* Pulse animation when listening */}
                      {isListening && (
                        <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-20"></div>
                      )}
                    </div>
                  )}
                  
                  <p className="mt-6 text-center text-sm font-medium text-slate-600">
                    {!isFlowStarted && 'Click to start voice input'}
                    {isFlowStarted && !isListening && !isProcessing && !isSpeaking && 'Click microphone to answer'}
                    {isListening && 'Listening... Speak now'}
                    {isProcessing && 'Processing your answer...'}
                    {isSpeaking && 'Speaking... Listen carefully'}
                  </p>
                </div>

                {/* Transcript */}
                {transcript && (
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <p className="text-xs text-slate-500 mb-1">You said:</p>
                    <p className="text-slate-800 font-medium">{transcript}</p>
                  </div>
                )}

                {/* Controls */}
                {isFlowStarted && (
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={moveToPreviousStep}
                      disabled={currentStep === 0 || isProcessing || isSpeaking}
                      className="flex-1"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous Question
                    </Button>
                    
                    {isSpeaking && (
                      <Button
                        variant="outline"
                        onClick={stopSpeaking}
                        className="flex-1"
                      >
                        <VolumeX className="h-4 w-4 mr-2" />
                        Stop Speaking
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      onClick={() => speak(currentStepData.question)}
                      disabled={isSpeaking || isListening}
                      className="flex-1"
                    >
                      <Volume2 className="h-4 w-4 mr-2" />
                      Repeat Question
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={resetFlow}
                      disabled={isProcessing}
                      className="flex-1 text-red-600 hover:bg-red-50"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Start Over
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Collected Data Preview */}
            {isFlowStarted && Object.values(propertyData).some(v => v !== '') && (
              <Card className="bg-slate-50 border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Information Collected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {Object.entries(propertyData).map(([key, value]) => 
                      value && (
                        <div key={key} className="flex flex-col">
                          <span className="text-slate-500 text-xs capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-slate-800 font-medium">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  💡 Voice Input Tips
                </h3>
                <ul className="text-sm text-amber-800 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Speak clearly and at a normal pace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Use a quiet environment for best results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>For numbers, you can say digits or words (e.g., "150000" or "one hundred fifty thousand")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>You can always go back and correct your answers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Works offline - no internet connection required!</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Alternative Option */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600 mb-3">
                Prefer typing? Use the regular form instead
              </p>
              <Link href="/agent/properties/add">
                <Button variant="outline" size="sm">
                  Use Regular Form
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}