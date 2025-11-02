"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Building2, 
  UserCheck,
  Users,
  Briefcase,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertCircle
} from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

type UserType = "prospective" | "admitted" | "current" | "alumni" | "agent"

interface ProfileOption {
  type: UserType
  icon: React.ElementType
  title: string
  description: string
  color: string
}

const profileOptions: ProfileOption[] = [
  {
    type: "prospective",
    icon: GraduationCap,
    title: "Prospective Student",
    description: "I'm considering studying in Nigeria",
    color: "from-blue-500 to-cyan-500"
  },
  {
    type: "admitted",
    icon: UserCheck,
    title: "Admitted Student",
    description: "I've been offered admission",
    color: "from-purple-500 to-pink-500"
  },
  {
    type: "current",
    icon: Users,
    title: "Current Student",
    description: "I'm currently enrolled",
    color: "from-green-500 to-emerald-500"
  },
  {
    type: "alumni",
    icon: Briefcase,
    title: "Alumni",
    description: "I'm a graduate",
    color: "from-orange-500 to-red-500"
  },
  {
    type: "agent",
    icon: Building2,
    title: "Landlord/Agent",
    description: "I want to list properties",
    color: "from-indigo-500 to-purple-500"
  }
]

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  
  const [step, setStep] = useState<"profile" | "details">("profile")
  const [selectedProfile, setSelectedProfile] = useState<UserType | null>(null)
  
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Password strength indicator
  const getPasswordStrength = (password: string): { strength: string; color: string; percentage: number } => {
    if (!password) return { strength: "", color: "", percentage: 0 }
    
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^a-zA-Z\d]/.test(password)) score++

    if (score <= 2) return { strength: "Weak", color: "bg-red-500", percentage: 33 }
    if (score <= 3) return { strength: "Medium", color: "bg-yellow-500", percentage: 66 }
    return { strength: "Strong", color: "bg-green-500", percentage: 100 }
  }

  // Handle profile selection
  const handleProfileSelect = (type: UserType) => {
    setSelectedProfile(type)
    setStep("details")
  }

  // Real-time validation for individual fields
  const validateField = (field: keyof FormData, value: string | boolean): string => {
    switch (field) {
      case "firstName":
        if (!value) return "First name is required"
        if (typeof value === "string" && value.trim().length < 2) return "First name must be at least 2 characters"
        break
      case "lastName":
        if (!value) return "Last name is required"
        if (typeof value === "string" && value.trim().length < 2) return "Last name must be at least 2 characters"
        break
      case "email":
        if (!value) return "Email is required"
        if (typeof value === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format"
        break
      case "password":
        if (!value) return "Password is required"
        if (typeof value === "string") {
          if (value.length < 8) return "Password must be at least 8 characters"
          if (!/(?=.*[a-z])/.test(value)) return "Password must contain a lowercase letter"
          if (!/(?=.*[A-Z])/.test(value)) return "Password must contain an uppercase letter"
          if (!/(?=.*\d)/.test(value)) return "Password must contain a number"
        }
        break
      case "confirmPassword":
        if (!value) return "Please confirm your password"
        if (value !== formData.password) return "Passwords do not match"
        break
      case "agreeToTerms":
        if (!value) return "You must agree to the terms and conditions"
        break
    }
    return ""
  }

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    Object.keys(formData).forEach((key) => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData])
      if (error) newErrors[key] = error
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    setTouched(allTouched)
    
    if (!validateForm() || !selectedProfile) {
      return
    }

    setIsLoading(true)

    try {
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            full_name: `${formData.firstName} ${formData.lastName}`,
          },
        },
      })

      if (authError) {
        // Handle specific auth errors
        if (authError.message.includes("already registered")) {
          setErrors({ email: "This email is already registered" })
        } else {
          throw authError
        }
        return
      }

      if (authData.user) {
        // Create user profile with selected type
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: authData.user.id,
            email: formData.email,
            full_name: `${formData.firstName} ${formData.lastName}`,
            user_type: selectedProfile,
            status: selectedProfile === "agent" ? "AGENT" : selectedProfile.toUpperCase(),
            onboarding_completed: false,
          })

        if (profileError) throw profileError

        // Redirect to onboarding
        router.push('/onboarding')
      }
    } catch (error: any) {
      console.error("Registration error:", error)
      setErrors({ 
        submit: error.message || "Registration failed. Please try again." 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
    
    // Only validate if field has been touched
    if (touched[field]) {
      const error = validateField(field, value)
      setErrors({ ...errors, [field]: error })
    }
  }

  const handleBlur = (field: keyof FormData) => {
    setTouched({ ...touched, [field]: true })
    const error = validateField(field, formData[field])
    if (error) {
      setErrors({ ...errors, [field]: error })
    }
  }

  // Profile Selection Step
  if (step === "profile") {
    return (
      <main className="min-h-screen bg-section-light relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="decorative-orb-purple top-0 right-0"></div>
        <div className="decorative-orb-pink bottom-0 left-0"></div>

        <div className="relative section-spacing px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-foreground hover:text-primary mb-6 transition-colors"
                aria-label="Back to home"
              >
                <ArrowRight className="h-5 w-5 rotate-180" />
                <span className="text-lg font-medium">Back to home</span>
              </Link>
              
              <h1 className="heading-section mb-4">
                Join <span className="text-gradient-brand">CribWise</span>
              </h1>
              <p className="text-section-subtitle max-w-2xl mx-auto">
                First, tell us about yourself so we can customize your experience
              </p>
            </div>

            {/* Profile Options */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="radiogroup" aria-label="Select your profile type">
              {profileOptions.map((option) => {
                const Icon = option.icon
                return (
                  <Card
                    key={option.type}
                    className="border-2 hover:border-primary/50 transition-all cursor-pointer hover:shadow-xl hover:scale-105 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                    onClick={() => handleProfileSelect(option.type)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleProfileSelect(option.type)
                      }
                    }}
                    tabIndex={0}
                    role="radio"
                    aria-checked={selectedProfile === option.type}
                    aria-label={`${option.title}: ${option.description}`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${option.color} mb-4`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Sign In Link */}
            <p className="text-center text-sm text-muted-foreground mt-12">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>
    )
  }

  // Details Form Step
  const selectedOption = profileOptions.find(opt => opt.type === selectedProfile)
  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <main className="min-h-screen bg-section-light relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="decorative-orb-purple top-0 right-0"></div>
      <div className="decorative-orb-pink bottom-0 left-0"></div>

      <div className="relative section-spacing px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <button 
              onClick={() => setStep("profile")}
              className="inline-flex items-center gap-2 text-foreground hover:text-primary mb-6 transition-colors"
              aria-label="Change profile type"
            >
              <ArrowRight className="h-5 w-5 rotate-180" />
              <span className="text-lg font-medium">Change profile type</span>
            </button>
            
            <h1 className="heading-section mb-4">
              Create Your <span className="text-gradient-brand">{selectedOption?.title}</span> Account
            </h1>
            <p className="text-section-subtitle">
              {selectedOption?.description}
            </p>
          </div>

          {/* Registration Card */}
          <Card className="border-2 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Account Details</CardTitle>
              <CardDescription>
                Already have an account?{" "}
                <Link href="/signin" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name <span className="text-red-500" aria-label="required">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" aria-hidden="true" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        className={`pl-10 ${errors.firstName && touched.firstName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        onBlur={() => handleBlur("firstName")}
                        aria-invalid={!!errors.firstName && touched.firstName}
                        aria-describedby={errors.firstName && touched.firstName ? "firstName-error" : undefined}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.firstName && touched.firstName && (
                      <p id="firstName-error" className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name <span className="text-red-500" aria-label="required">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" aria-hidden="true" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        className={`pl-10 ${errors.lastName && touched.lastName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        onBlur={() => handleBlur("lastName")}
                        aria-invalid={!!errors.lastName && touched.lastName}
                        aria-describedby={errors.lastName && touched.lastName ? "lastName-error" : undefined}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.lastName && touched.lastName && (
                      <p id="lastName-error" className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500" aria-label="required">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" aria-hidden="true" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={selectedProfile === "agent" ? "your.email@example.com" : "your.email@university.edu.ng"}
                      className={`pl-10 ${errors.email && touched.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      aria-invalid={!!errors.email && touched.email}
                      aria-describedby={errors.email && touched.email ? "email-error" : "email-hint"}
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && touched.email ? (
                    <p id="email-error" className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  ) : selectedProfile !== "agent" ? (
                    <p id="email-hint" className="text-xs text-muted-foreground">
                      You&apos;ll verify your school email after registration
                    </p>
                  ) : null}
                </div>

                {/* Password Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      Password <span className="text-red-500" aria-label="required">*</span>
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" aria-hidden="true" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 8 characters"
                        className={`pl-10 pr-10 ${errors.password && touched.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        onBlur={() => handleBlur("password")}
                        aria-invalid={!!errors.password && touched.password}
                        aria-describedby={errors.password && touched.password ? "password-error" : "password-strength"}
                        disabled={isLoading}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && touched.password ? (
                      <p id="password-error" className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.password}
                      </p>
                    ) : formData.password ? (
                      <div id="password-strength" className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Password strength:</span>
                          <span className={`font-medium ${
                            passwordStrength.strength === "Weak" ? "text-red-500" :
                            passwordStrength.strength === "Medium" ? "text-yellow-500" :
                            "text-green-500"
                          }`}>
                            {passwordStrength.strength}
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{ width: `${passwordStrength.percentage}%` }}
                            role="progressbar"
                            aria-valuenow={passwordStrength.percentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label="Password strength"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm Password <span className="text-red-500" aria-label="required">*</span>
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" aria-hidden="true" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter password"
                        className={`pl-10 pr-10 ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        onBlur={() => handleBlur("confirmPassword")}
                        aria-invalid={!!errors.confirmPassword && touched.confirmPassword}
                        aria-describedby={errors.confirmPassword && touched.confirmPassword ? "confirmPassword-error" : undefined}
                        disabled={isLoading}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p id="confirmPassword-error" className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => 
                        handleInputChange("agreeToTerms", checked as boolean)
                      }
                      aria-invalid={!!errors.agreeToTerms && touched.agreeToTerms}
                      aria-describedby={errors.agreeToTerms && touched.agreeToTerms ? "terms-error" : undefined}
                      disabled={isLoading}
                      className={errors.agreeToTerms && touched.agreeToTerms ? 'border-red-500' : ''}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {errors.agreeToTerms && touched.agreeToTerms && (
                    <p id="terms-error" className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.agreeToTerms}
                    </p>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl" role="alert">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-red-700 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700 dark:text-red-400">{errors.submit}</p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg py-6 rounded-xl"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" aria-hidden="true"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                {/* Benefits Reminder */}
                <div className="pt-6 border-t">
                  <p className="text-sm text-center text-muted-foreground mb-4">
                    What you&apos;ll get:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProfile === "agent" ? (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                          <span className="text-foreground">List properties</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                          <span className="text-foreground">Manage inquiries</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                          <span className="text-foreground">Verification badge</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                          <span className="text-foreground">Analytics dashboard</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                          <span className="text-foreground">Verified housing</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                          <span className="text-foreground">Free materials</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                          <span className="text-foreground">Marketplace access</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                          <span className="text-foreground">Roommate matching</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Security Note */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            🔒 Your information is secure and encrypted. We&apos;ll never share your data.
          </p>
        </div>
      </div>
    </main>
  )
}