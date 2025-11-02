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
  FileText, 
  Upload, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  GraduationCap,
  Calendar,
  School,
  BookMarked,
  Lightbulb,
  Users,
  TrendingUp,
  X
} from "lucide-react"

type MaterialType = "lecture_notes" | "past_questions" | "textbook" | "assignment" | "research_paper" | "study_guide" | "other"
type UrgencyLevel = "low" | "medium" | "high" | "urgent"

interface FormData {
  materialType: MaterialType | ""
  courseCode: string
  courseName: string
  university: string
  department: string
  level: string
  description: string
  specificTopics: string[]
  urgency: UrgencyLevel | ""
  examDate: string
  additionalNotes: string
  email: string
  canContribute: boolean
}

const materialTypeOptions = [
  { value: "lecture_notes", label: "Lecture Notes", icon: FileText },
  { value: "past_questions", label: "Past Questions", icon: BookMarked },
  { value: "textbook", label: "Textbook/Reference", icon: BookOpen },
  { value: "assignment", label: "Assignment Solutions", icon: FileText },
  { value: "research_paper", label: "Research Paper", icon: FileText },
  { value: "study_guide", label: "Study Guide", icon: BookOpen },
  { value: "other", label: "Other", icon: FileText }
]

const urgencyOptions = [
  { value: "low", label: "Low Priority", color: "text-green-600 dark:text-green-400", description: "Can wait a few weeks" },
  { value: "medium", label: "Medium Priority", color: "text-yellow-600 dark:text-yellow-400", description: "Needed within 2 weeks" },
  { value: "high", label: "High Priority", color: "text-orange-600 dark:text-orange-400", description: "Needed within 1 week" },
  { value: "urgent", label: "Urgent", color: "text-red-600 dark:text-red-400", description: "Exam within 3 days" }
]

export default function RequestMaterialPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [currentTopicInput, setCurrentTopicInput] = useState('')

  const [formData, setFormData] = useState<FormData>({
    materialType: "",
    courseCode: "",
    courseName: "",
    university: "",
    department: "",
    level: "",
    description: "",
    specificTopics: [],
    urgency: "",
    examDate: "",
    additionalNotes: "",
    email: "",
    canContribute: false
  })

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData({ ...formData, [field]: value })
    setError('') // Clear error on input change
  }

  const addTopic = () => {
    if (currentTopicInput.trim() && formData.specificTopics.length < 10) {
      setFormData({
        ...formData,
        specificTopics: [...formData.specificTopics, currentTopicInput.trim()]
      })
      setCurrentTopicInput('')
    }
  }

  const removeTopic = (index: number) => {
    setFormData({
      ...formData,
      specificTopics: formData.specificTopics.filter((_, i) => i !== index)
    })
  }

  const validateForm = (): boolean => {
    if (!formData.materialType) {
      setError('Please select a material type')
      return false
    }
    if (!formData.courseCode.trim()) {
      setError('Course code is required')
      return false
    }
    if (!formData.courseName.trim()) {
      setError('Course name is required')
      return false
    }
    if (!formData.university.trim()) {
      setError('University is required')
      return false
    }
    if (!formData.department.trim()) {
      setError('Department is required')
      return false
    }
    if (!formData.level) {
      setError('Academic level is required')
      return false
    }
    if (!formData.description.trim() || formData.description.trim().length < 20) {
      setError('Please provide a detailed description (at least 20 characters)')
      return false
    }
    if (!formData.urgency) {
      setError('Please select urgency level')
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

      // Insert material request
      const { error: insertError } = await supabase
        .from('material_requests')
        .insert({
          user_id: user?.id || null,
          material_type: formData.materialType,
          course_code: formData.courseCode,
          course_name: formData.courseName,
          university: formData.university,
          department: formData.department,
          level: formData.level,
          description: formData.description,
          specific_topics: formData.specificTopics,
          urgency: formData.urgency,
          exam_date: formData.examDate || null,
          additional_notes: formData.additionalNotes,
          contact_email: formData.email,
          can_contribute: formData.canContribute,
          status: 'pending',
          upvotes: 0
        })

      if (insertError) throw insertError

      setSuccess(true)
      
      // Redirect after 4 seconds
      setTimeout(() => {
        router.push('/materials')
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
                  Your material request has been received
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Success Message */}
                <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 p-6 rounded-xl">
                  <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed mb-3">
                    Thank you for your request! We've received your request for <strong>{formData.courseName} ({formData.courseCode})</strong> materials.
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Our community will be notified, and you'll receive an email at <strong>{formData.email}</strong> when materials are available.
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
                        <p className="font-medium text-slate-900 dark:text-slate-100">Community Review</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Other students can upvote your request to show interest</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">Material Sourcing</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Contributors will work on providing the requested materials</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">Email Notification</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">You'll receive an email when materials are uploaded</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid md:grid-cols-2 gap-3 pt-4">
                  <Link href="/materials">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl">
                      Browse Materials
                    </Button>
                  </Link>
                  <Link href="/dashboard/student">
                    <Button variant="outline" className="w-full border-2 rounded-xl font-semibold">
                      Go to Dashboard
                    </Button>
                  </Link>
                </div>

                <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                  Redirecting to materials page in 4 seconds...
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
              href="/materials" 
              className="inline-flex items-center gap-2 text-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-lg font-medium">Back to Materials</span>
            </Link>
            
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
                Request Study Material
              </span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Can't find what you need? Let the community know what materials you're looking for
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="border-2 border-purple-100 dark:border-purple-900/30">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <p className="font-semibold text-sm">Community Driven</p>
                <p className="text-xs text-muted-foreground">Students help students</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-100 dark:border-blue-900/30">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <p className="font-semibold text-sm">Upvote System</p>
                <p className="text-xs text-muted-foreground">Popular requests prioritized</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-pink-100 dark:border-pink-900/30">
              <CardContent className="p-4 text-center">
                <CheckCircle2 className="h-8 w-8 text-pink-600 dark:text-pink-400 mx-auto mb-2" />
                <p className="font-semibold text-sm">Email Alerts</p>
                <p className="text-xs text-muted-foreground">Get notified when available</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <Card className="border-2 border-purple-100 dark:border-purple-900/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Material Request Details</CardTitle>
              <CardDescription>
                Fill in the details below to help us understand what you need
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Material Type */}
                <div className="space-y-2">
                  <Label htmlFor="materialType">
                    Material Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.materialType}
                    onValueChange={(value) => handleInputChange("materialType", value as MaterialType)}
                  >
                    <SelectTrigger id="materialType" className="h-11 border-2 rounded-xl">
                      <SelectValue placeholder="Select material type" />
                    </SelectTrigger>
                    <SelectContent>
                      {materialTypeOptions.map((option) => {
                        const Icon = option.icon
                        return (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              {option.label}
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Course Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="courseCode">
                      Course Code <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <BookMarked className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                      <Input
                        id="courseCode"
                        type="text"
                        placeholder="e.g., CSC 301"
                        className="pl-10 h-11 border-2 rounded-xl"
                        value={formData.courseCode}
                        onChange={(e) => handleInputChange("courseCode", e.target.value.toUpperCase())}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="courseName">
                      Course Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="courseName"
                      type="text"
                      placeholder="e.g., Data Structures and Algorithms"
                      className="h-11 border-2 rounded-xl"
                      value={formData.courseName}
                      onChange={(e) => handleInputChange("courseName", e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* University Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="university">
                      University <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <School className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                      <Input
                        id="university"
                        type="text"
                        placeholder="e.g., University of Lagos"
                        className="pl-10 h-11 border-2 rounded-xl"
                        value={formData.university}
                        onChange={(e) => handleInputChange("university", e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">
                      Department/Faculty <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="department"
                      type="text"
                      placeholder="e.g., Computer Science"
                      className="h-11 border-2 rounded-xl"
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Academic Level */}
                <div className="space-y-2">
                  <Label htmlFor="level">
                    Academic Level <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Select
                      value={formData.level}
                      onValueChange={(value) => handleInputChange("level", value)}
                    >
                      <SelectTrigger id="level" className="pl-10 h-11 border-2 rounded-xl">
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">100 Level (Year 1)</SelectItem>
                        <SelectItem value="200">200 Level (Year 2)</SelectItem>
                        <SelectItem value="300">300 Level (Year 3)</SelectItem>
                        <SelectItem value="400">400 Level (Year 4)</SelectItem>
                        <SelectItem value="500">500 Level (Year 5)</SelectItem>
                        <SelectItem value="postgraduate">Postgraduate</SelectItem>
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
                    placeholder="Describe exactly what materials you need. Be as specific as possible to help contributors understand your request better..."
                    className="min-h-32 border-2 rounded-xl resize-none"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.description.length} / 500 characters (minimum 20)
                  </p>
                </div>

                {/* Specific Topics */}
                <div className="space-y-2">
                  <Label htmlFor="topics">
                    Specific Topics/Chapters (Optional)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="topics"
                      type="text"
                      placeholder="Add a topic and press Enter"
                      className="h-11 border-2 rounded-xl"
                      value={currentTopicInput}
                      onChange={(e) => setCurrentTopicInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addTopic()
                        }
                      }}
                      disabled={loading || formData.specificTopics.length >= 10}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="px-4 border-2 rounded-xl"
                      onClick={addTopic}
                      disabled={loading || formData.specificTopics.length >= 10 || !currentTopicInput.trim()}
                    >
                      Add
                    </Button>
                  </div>
                  {formData.specificTopics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.specificTopics.map((topic, index) => (
                        <div
                          key={index}
                          className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm"
                        >
                          {topic}
                          <button
                            type="button"
                            onClick={() => removeTopic(index)}
                            className="hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5"
                            disabled={loading}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {formData.specificTopics.length} / 10 topics added
                  </p>
                </div>

                {/* Urgency and Exam Date */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="urgency">
                      Urgency Level <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.urgency}
                      onValueChange={(value) => handleInputChange("urgency", value as UrgencyLevel)}
                    >
                      <SelectTrigger id="urgency" className="h-11 border-2 rounded-xl">
                        <SelectValue placeholder="How urgent is this?" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyOptions.map((option) => (
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

                  <div className="space-y-2">
                    <Label htmlFor="examDate">
                      Exam Date (Optional)
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                      <Input
                        id="examDate"
                        type="date"
                        className="pl-10 h-11 border-2 rounded-xl"
                        value={formData.examDate}
                        onChange={(e) => handleInputChange("examDate", e.target.value)}
                        disabled={loading}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">
                    Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="Any other information that might help contributors (e.g., preferred format, lecturer name, etc.)"
                    className="min-h-24 border-2 rounded-xl resize-none"
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
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
                    placeholder="your.email@university.edu.ng"
                    className="h-11 border-2 rounded-xl"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll notify you at this email when materials are available
                  </p>
                </div>

                {/* Can Contribute */}
                <div className="bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800 p-4 rounded-xl">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="canContribute"
                      checked={formData.canContribute}
                      onChange={(e) => handleInputChange("canContribute", e.target.checked)}
                      className="mt-1"
                      disabled={loading}
                    />
                    <label htmlFor="canContribute" className="text-sm text-blue-800 dark:text-blue-200 cursor-pointer">
                      <span className="font-semibold">I can help contribute similar materials</span>
                      <p className="text-blue-700 dark:text-blue-300 mt-1">
                        Check this if you have materials from other courses that you'd be willing to share with the community
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
                        <Upload className="mr-2 h-5 w-5" />
                        Submit Request
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Tips Section */}
          <Card className="mt-6 border-2 border-yellow-100 dark:border-yellow-900/30 bg-yellow-50/50 dark:bg-yellow-950/20">
            <CardContent className="p-6">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                Tips for better results:
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Be specific about what you need (e.g., "2019-2023 past questions" instead of just "past questions")</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Include the lecturer's name if possible - helps identify the right materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Set realistic urgency - "Urgent" should be reserved for exams within days</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>List specific topics/chapters to help contributors provide relevant content</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}