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
  CheckCircle2
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

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  
  const [step, setStep] = useState<"profile" | "details">("profile")
  const [selectedProfile, setSelectedProfile] = useState<UserType | null>(null)
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Handle profile selection
  const handleProfileSelect = (type: UserType) => {
    setSelectedProfile(type)
    setStep("details")
  }

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
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

      if (authError) throw authError

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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
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
              <Link href="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary mb-6">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profileOptions.map((option) => {
                const Icon = option.icon
                return (
                  <Card
                    key={option.type}
                    className="border-2 hover:border-primary/50 transition-all cursor-pointer hover:shadow-xl hover:scale-105"
                    onClick={() => handleProfileSelect(option.type)}
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
  const Icon = selectedOption?.icon || User

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
              className="inline-flex items-center gap-2 text-foreground hover:text-primary mb-6"
            >
              <ArrowRight className="h-5 w-5 rotate-180" />
              <span className="text-lg font-medium">Change profile type</span>
            </button>
            
            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${selectedOption?.color} mb-6`}>
              <Icon className="h-10 w-10 text-white" />
            </div>
            
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
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        className="pl-10"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        className="pl-10"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={selectedProfile === "agent" ? "your.email@example.com" : "your.email@university.edu.ng"}
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                  {selectedProfile !== "agent" && (
                    <p className="text-xs text-muted-foreground">
                      You&apos;ll verify your school email after registration
                    </p>
                  )}
                </div>

                {/* Password Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Min. 8 characters"
                        className="pl-10"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Re-enter password"
                        className="pl-10"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">{errors.confirmPassword}</p>
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
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline font-medium">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline font-medium">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {errors.agreeToTerms && (
                    <p className="text-sm text-red-500">{errors.agreeToTerms}</p>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <p className="text-sm text-red-700 dark:text-red-400">{errors.submit}</p>
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
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
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
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-foreground">List properties</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-foreground">Manage inquiries</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-foreground">Verification badge</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-foreground">Analytics dashboard</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-foreground">Verified housing</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-foreground">Free materials</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-foreground">Marketplace access</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
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