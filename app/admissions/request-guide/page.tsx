/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  BookOpen, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Lightbulb,
  Users,
  TrendingUp,
  X,
  FileQuestion,
  Target,
  Zap,
  Send
} from "lucide-react"

type GuideCategory = "admissions" | "housing" | "finance" | "campus_life" | "academic" | "career" | "other"
type PriorityLevel = "low" | "medium" | "high"
type AudienceType = "prospective" | "admitted" | "current" | "all"

interface FormData {
  guideTitle: string
  category: GuideCategory | ""
  audience: AudienceType | ""
  description: string
  specificQuestions: string[]
  priority: PriorityLevel | ""
  whyNeeded: string
  additionalContext: string
  email: string
  canHelp: boolean
}

const categoryOptions = [
  { value: "admissions", label: "Admissions & Applications", icon: "📝" },
  { value: "housing", label: "Housing & Accommodation", icon: "🏠" },
  { value: "finance", label: "Finance & Scholarships", icon: "💰" },
  { value: "campus_life", label: "Campus Life & Culture", icon: "🎓" },
  { value: "academic", label: "Academic Success", icon: "📚" },
  { value: "career", label: "Career & Internships", icon: "💼" },
  { value: "other", label: "Other", icon: "📋" }
]

const audienceOptions = [
  { value: "prospective", label: "Prospective Students", description: "Considering studying in Nigeria" },
  { value: "admitted", label: "Admitted Students", description: "Received admission offer" },
  { value: "current", label: "Current Students", description: "Already enrolled" },
  { value: "all", label: "All Students", description: "Relevant to everyone" }
]

const priorityOptions = [
  { value: "low", label: "Low Priority", color: "text-green-600 dark:text-green-400", description: "General knowledge, not time-sensitive" },
  { value: "medium", label: "Medium Priority", color: "text-yellow-600 dark:text-yellow-400", description: "Important but can wait" },
  { value: "high", label: "High Priority", color: "text-red-600 dark:text-red-400", description: "Urgent - affects many students" }
]

const POPULAR_REQUESTS = [
  "How to choose the right university",
  "Understanding student loans in Nigeria",
  "Campus safety tips for freshers",
  "How to balance school and side hustles",
  "Navigating university bureaucracy",
  "Making friends as an international student"
]

export default function RequestGuidePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [currentQuestionInput, setCurrentQuestionInput] = useState('')

  const [formData, setFormData] = useState<FormData>({
    guideTitle: "",
    category: "",
    audience: "",
    description: "",
    specificQuestions: [],
    priority: "",
    whyNeeded: "",
    additionalContext: "",
    email: "",
    canHelp: false
  })

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData({ ...formData, [field]: value })
    setError('') // Clear error on input change
  }

  const addQuestion = () => {
    if (currentQuestionInput.trim() && formData.specificQuestions.length < 10) {
      setFormData({
        ...formData,
        specificQuestions: [...formData.specificQuestions, currentQuestionInput.trim()]
      })
      setCurrentQuestionInput('')
    }
  }

  const removeQuestion = (index: number) => {
    setFormData({
      ...formData,
      specificQuestions: formData.specificQuestions.filter((_, i) => i !== index)
    })
  }

  const validateForm = (): boolean => {
    if (!formData.guideTitle.trim() || formData.guideTitle.trim().length < 10) {
      setError('Guide title must be at least 10 characters')
      return false
    }
    if (!formData.category) {
      setError('Please select a category')
      return false
    }
    if (!formData.audience) {
      setError('Please select target audience')
      return false
    }
    if (!formData.description.trim() || formData.description.trim().length < 30) {
      setError('Please provide a detailed description (at least 30 characters)')
      return false
    }
    if (!formData.whyNeeded.trim() || formData.whyNeeded.trim().length < 20) {
      setError('Please explain why this guide is needed (at least 20 characters)')
      return false
    }
    if (!formData.priority) {
      setError('Please select priority level')
      return false
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Valid email is required')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError('')

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()

      // Insert guide request
      const { error: insertError } = await supabase
        .from('guide_requests')
        .insert({
          user_id: user?.id || null,
          title: formData.guideTitle,
          category: formData.category,
          target_audience: formData.audience,
          description: formData.description,
          specific_questions: formData.specificQuestions,
          priority: formData.priority,
          why_needed: formData.whyNeeded,
          additional_context: formData.additionalContext,
          contact_email: formData.email,
          can_contribute: formData.canHelp,
          status: 'pending',
          upvotes: 0
        })

      if (insertError) throw insertError

      setSuccess(true)
      
      // Redirect after 4 seconds
      setTimeout(() => {
        router.push('/admissions/guides')
      }, 4000)

    } catch (err: any) {
      console.error('Request submission error:', err)
      setError(err.message || 'Failed to submit request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Success State
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse delay-75"></div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-green-100 dark:border-green-900/30 shadow-2xl">
              <CardHeader className="text-center space-y-2 pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-2 animate-bounce">
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl md:text-4xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                  Request Submitted! 🎉
                </CardTitle>
                <CardDescription className="text-base dark:text-slate-400">
                  Your guide request has been received
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Success Message */}
                <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 p-6 rounded-xl">
                  <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed mb-3">
                    Thank you for your request! We've received your request for <strong>"{formData.guideTitle}"</strong>.
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Our content team will review your request, and you'll receive an email at <strong>{formData.email}</strong> when the guide is published.
                  </p>
                </div>

                {/* What Happens Next */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    What happens next:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">Community Voting</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Other students can upvote your request to show demand</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">Content Creation</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Our team researches and writes the comprehensive guide</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">Publication & Notification</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">You'll receive an email when the guide goes live</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid md:grid-cols-2 gap-3 pt-4">
                  <Link href="/admissions/guides">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl">
                      Browse Guides
                    </Button>
                  </Link>
                  <Link href="/dashboard/student">
                    <Button variant="outline" className="w-full border-2 rounded-xl font-semibold">
                      Go to Dashboard
                    </Button>
                  </Link>
                </div>

                <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                  Redirecting to guides page in 4 seconds...
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Form State
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse delay-75"></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link 
              href="/admissions/guides" 
              className="inline-flex items-center gap-2 text-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-lg font-medium">Back to Guides</span>
            </Link>
            
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4">
              <FileQuestion className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
                Request a New Guide
              </span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Can't find the guide you need? Tell us what you'd like to learn about
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="border-2 border-purple-100 dark:border-purple-900/30">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <p className="font-semibold text-sm">Student-Driven</p>
                <p className="text-xs text-muted-foreground">Built from real needs</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-100 dark:border-blue-900/30">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <p className="font-semibold text-sm">Upvote System</p>
                <p className="text-xs text-muted-foreground">Popular requests first</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-pink-100 dark:border-pink-900/30">
              <CardContent className="p-4 text-center">
                <Zap className="h-8 w-8 text-pink-600 dark:text-pink-400 mx-auto mb-2" />
                <p className="font-semibold text-sm">Fast Turnaround</p>
                <p className="text-xs text-muted-foreground">Published within weeks</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <Card className="border-2 border-purple-100 dark:border-purple-900/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Guide Request Details</CardTitle>
              <CardDescription>
                Help us understand what guide would be most valuable to you
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Guide Title */}
                <div className="space-y-2">
                  <Label htmlFor="guideTitle">
                    Proposed Guide Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="guideTitle"
                    type="text"
                    placeholder='e.g., "How to Apply for JAMB as an International Student"'
                    className="h-11 border-2 rounded-xl"
                    value={formData.guideTitle}
                    onChange={(e) => handleInputChange("guideTitle", e.target.value)}
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.guideTitle.length} / 100 characters (minimum 10)
                  </p>
                </div>

                {/* Category and Audience */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleInputChange("category", value as GuideCategory)}
                    >
                      <SelectTrigger id="category" className="h-11 border-2 rounded-xl">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <span>{option.icon}</span>
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="audience">
                      Target Audience <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.audience}
                      onValueChange={(value) => handleInputChange("audience", value as AudienceType)}
                    >
                      <SelectTrigger id="audience" className="h-11 border-2 rounded-xl">
                        <SelectValue placeholder="Who is this for?" />
                      </SelectTrigger>
                      <SelectContent>
                        {audienceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex flex-col">
                              <span className="font-medium">{option.label}</span>
                              <span className="text-xs text-muted-foreground">{option.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Detailed Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what the guide should cover. What information are you looking for? What problems should it solve?"
                    className="min-h-32 border-2 rounded-xl resize-none"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.description.length} / 500 characters (minimum 30)
                  </p>
                </div>

                {/* Specific Questions */}
                <div className="space-y-2">
                  <Label htmlFor="questions">
                    Specific Questions to Answer (Optional)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="questions"
                      type="text"
                      placeholder="Add a question and press Enter"
                      className="h-11 border-2 rounded-xl"
                      value={currentQuestionInput}
                      onChange={(e) => setCurrentQuestionInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addQuestion()
                        }
                      }}
                      disabled={loading || formData.specificQuestions.length >= 10}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="px-4 border-2 rounded-xl"
                      onClick={addQuestion}
                      disabled={loading || formData.specificQuestions.length >= 10 || !currentQuestionInput.trim()}
                    >
                      Add
                    </Button>
                  </div>
                  {formData.specificQuestions.length > 0 && (
                    <div className="space-y-2 mt-2">
                      {formData.specificQuestions.map((question, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-3 rounded-xl"
                        >
                          <Target className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm flex-1">{question}</span>
                          <button
                            type="button"
                            onClick={() => removeQuestion(index)}
                            className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-1"
                            disabled={loading}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {formData.specificQuestions.length} / 10 questions added
                  </p>
                </div>

                {/* Why Needed */}
                <div className="space-y-2">
                  <Label htmlFor="whyNeeded">
                    Why is this guide needed? <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="whyNeeded"
                    placeholder="Explain why this guide would be valuable. What challenges are students facing? How would this help?"
                    className="min-h-24 border-2 rounded-xl resize-none"
                    value={formData.whyNeeded}
                    onChange={(e) => handleInputChange("whyNeeded", e.target.value)}
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.whyNeeded.length} characters (minimum 20)
                  </p>
                </div>

                {/* Priority Level */}
                <div className="space-y-2">
                  <Label htmlFor="priority">
                    Priority Level <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => handleInputChange("priority", value as PriorityLevel)}
                  >
                    <SelectTrigger id="priority" className="h-11 border-2 rounded-xl">
                      <SelectValue placeholder="How urgent is this need?" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex flex-col">
                            <span className={`font-medium ${option.color}`}>{option.label}</span>
                            <span className="text-xs text-muted-foreground">{option.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional Context */}
                <div className="space-y-2">
                  <Label htmlFor="additionalContext">
                    Additional Context (Optional)
                  </Label>
                  <Textarea
                    id="additionalContext"
                    placeholder="Any other information that would help us create this guide (sources, examples, specific scenarios, etc.)"
                    className="min-h-24 border-2 rounded-xl resize-none"
                    value={formData.additionalContext}
                    onChange={(e) => handleInputChange("additionalContext", e.target.value)}
                    disabled={loading}
                  />
                </div>

                {/* Contact Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Contact Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="h-11 border-2 rounded-xl"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll notify you when the guide is published
                  </p>
                </div>

                {/* Can Help */}
                <div className="bg-purple-50 dark:bg-purple-950/30 border-2 border-purple-200 dark:border-purple-800 p-4 rounded-xl">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="canHelp"
                      checked={formData.canHelp}
                      onChange={(e) => handleInputChange("canHelp", e.target.checked)}
                      className="mt-1"
                      disabled={loading}
                    />
                    <label htmlFor="canHelp" className="text-sm text-purple-800 dark:text-purple-200 cursor-pointer">
                      <span className="font-semibold">I can help contribute to this guide</span>
                      <p className="text-purple-700 dark:text-purple-300 mt-1">
                        Check this if you have experience or information that could help create this guide
                      </p>
                    </label>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 p-4 rounded-xl">
                    <p className="text-sm text-red-700 dark:text-red-300 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-12 border-2 rounded-xl font-semibold"
                    onClick={() => router.back()}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Submit Request
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Popular Requests Section */}
          <Card className="mt-6 border-2 border-yellow-100 dark:border-yellow-900/30 bg-yellow-50/50 dark:bg-yellow-950/20">
            <CardContent className="p-6">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                Other students are requesting:
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {POPULAR_REQUESTS.map((request, index) => (
                  <button
                    key={index}
                    onClick={() => handleInputChange("guideTitle", request)}
                    className="flex items-center gap-2 p-3 text-left border-2 border-yellow-200 dark:border-yellow-800 rounded-xl hover:border-yellow-400 dark:hover:border-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-all group text-sm"
                  >
                    <Lightbulb className="h-4 w-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 group-hover:text-yellow-900 dark:group-hover:text-yellow-100">
                      {request}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}