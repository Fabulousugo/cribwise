/* eslint-disable @typescript-eslint/no-explicit-any */
// ==========================================
// FILE: app/onboarding/page.tsx
// Complete Nigerian Student Onboarding with Supabase Integration
// ==========================================
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  GraduationCap, 
  Sparkles, 
  Award,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Zap
} from "lucide-react"
import { UniversityStep } from "./UniversityStep"
import { LevelStep } from "./LevelStep"
import { DepartmentStep } from "./DepartmentStep"
import { CourseSelectionStep } from "./CourseSelection"
import { FinalStep } from "./FinalStep"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "sonner"

const STEPS = [
  { id: 1, name: "University", xp: 50 },
  { id: 2, name: "Level", xp: 50 },
  { id: 3, name: "Department", xp: 100 },
  { id: 4, name: "Courses", xp: 150 },
  { id: 5, name: "Finish", xp: 200 }
]

export default function OnboardingPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [totalXP, setTotalXP] = useState(0)
  const [showXPAnimation, setShowXPAnimation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    university: "",
    level: "",
    faculty: "",
    department: "",
    courses: [] as string[],
    cgpa: ""
  })

  // Get user session on mount
  useEffect(() => {
    async function getUser() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setUserId(session.user.id)
      } else {
        router.push('/signin')
      }
    }
    getUser()
  }, [supabase, router])

  const progress = (currentStep / STEPS.length) * 100

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      // Award XP for completing step
      const stepXP = STEPS[currentStep - 1].xp
      setTotalXP(prev => prev + stepXP)
      setShowXPAnimation(true)
      setTimeout(() => setShowXPAnimation(false), 2000)
      
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.university !== ""
      case 2: return formData.level !== ""
      case 3: return formData.department !== ""
      case 4: return formData.courses.length > 0
      case 5: return true
      default: return false
    }
  }

  const handleFinish = async () => {
    if (!userId) {
      toast.error("Please sign in to continue")
      router.push('/signin')
      return
    }

    setLoading(true)
    
    try {
      // 1. Save academic info to database
      const { error: academicError } = await supabase
        .from('student_academic_info')
        .upsert({
          user_id: userId,
          university: formData.university,
          level: parseInt(formData.level),
          faculty: formData.faculty,
          department: formData.department,
          cgpa: formData.cgpa ? parseFloat(formData.cgpa) : null,
          updated_at: new Date().toISOString()
        })

      if (academicError) throw academicError

      // 2. Save courses
      const courseInserts = formData.courses.map(course => ({
        user_id: userId,
        course_code: course,
        semester: `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`,
        enrolled_at: new Date().toISOString()
      }))

      const { error: coursesError } = await supabase
        .from('student_courses')
        .insert(courseInserts)

      if (coursesError) throw coursesError

      // 3. Mark onboarding as completed in user_profiles
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({ 
          onboarding_completed: true,
          onboarding_completed_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (profileError) throw profileError

      // 4. Award completion XP using your existing system
      // Import and use your awardXP function from lib/xp-systems
      const bonusXP = 200
      setTotalXP(prev => prev + bonusXP)
      setShowXPAnimation(true)

      // Optional: Call your XP system
      // await awardXP(userId, totalXP + bonusXP, "onboarding_complete")

      toast.success("🎉 Profile completed! Welcome to CribConnect!")
      
      // 5. Redirect to dashboard after animation
      setTimeout(() => {
        router.push('/dashboard')
        router.refresh() // Force refresh to re-check onboarding status
      }, 2500)

    } catch (error: any) {
      console.error("Error saving onboarding:", error)
      toast.error("Failed to save profile. Please try again.")
      setLoading(false)
    }
  }

  const handleSkip = () => {
    // Option 1: Allow skip but mark as incomplete
    toast.info("You can complete your profile later from Settings")
    router.push('/dashboard')
    
    // Option 2: Don't allow skip - remove the skip button
    // This forces completion
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* XP Animation */}
        {showXPAnimation && (
          <div className="fixed top-20 right-8 z-50 animate-bounce">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-primary-foreground px-6 py-3 rounded-full shadow-2xl flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <span className="font-bold">+{STEPS[currentStep - 2]?.xp || 0} XP</span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Welcome to CribConnect! 🎉</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Let&apos;s Set Up Your Profile
          </h1>
          <p className="text-lg text-muted-foreground">
            No typing required - just select from the list! 
            <span className="text-amber-600 dark:text-amber-400 font-semibold ml-2">
              Earn {STEPS.reduce((acc, step) => acc + step.xp, 0)} XP total! 🚀
            </span>
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">
                  Step {currentStep} of {STEPS.length}
                </span>
              </div>
              <Badge variant="secondary" className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 dark:text-amber-400">
                <Award className="h-3 w-3 mr-1" />
                {totalXP} XP
              </Badge>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between mt-3">
              {STEPS.map((step) => (
                <div 
                  key={step.id} 
                  className={`text-xs ${
                    step.id <= currentStep 
                      ? 'text-primary font-semibold' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {step.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="mb-6 shadow-xl">
          <CardContent className="p-8">
            {currentStep === 1 && (
              <UniversityStep 
                value={formData.university}
                onChange={(val: any) => updateField('university', val)}
              />
            )}
            {currentStep === 2 && (
              <LevelStep 
                value={formData.level}
                onChange={(val: any) => updateField('level', val)}
              />
            )}
            {currentStep === 3 && (
              <DepartmentStep 
                university={formData.university}
                value={formData.department}
                onFacultyChange={(val: any) => updateField('faculty', val)}
                onDepartmentChange={(val: any) => updateField('department', val)}
              />
            )}
            {currentStep === 4 && (
              <CourseSelectionStep 
                department={formData.department}
                level={formData.level}
                selectedCourses={formData.courses}
                onChange={(val: any) => updateField('courses', val)}
              />
            )}
            {currentStep === 5 && (
              <FinalStep 
                formData={formData}
                totalXP={totalXP}
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1 || loading}
            size="lg"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {currentStep < STEPS.length ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed() || loading}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
            >
              Continue
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleFinish}
              disabled={loading}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-primary-foreground"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Complete Setup
                </>
              )}
            </Button>
          )}
        </div>

        {/* Skip Option - OPTIONAL: Remove this if you want to force completion */}
        {currentStep < STEPS.length && !loading && (
          <div className="text-center mt-6">
            <Button 
              variant="ghost" 
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip for now (you&apos;ll miss {STEPS.reduce((acc, step) => acc + step.xp, 0)} XP 😢)
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}