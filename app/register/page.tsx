"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { nigerianUniversities, searchUniversities, type University } from "@/lib/universities"
import { GraduationCap, Mail, Lock, User, Phone, MapPin, Search, CheckCircle2, ArrowRight } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    university: "",
    studentId: "",
    agreeToTerms: false,
  })

  const [universitySearch, setUniversitySearch] = useState("")
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false)
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>(nigerianUniversities)
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Handle university search
  const handleUniversitySearch = (query: string) => {
    setUniversitySearch(query)
    if (query.length > 0) {
      const results = searchUniversities(query)
      setFilteredUniversities(results)
      setShowUniversityDropdown(true)
    } else {
      setFilteredUniversities(nigerianUniversities)
      setShowUniversityDropdown(false)
    }
  }

  // Select university
  const handleSelectUniversity = (university: University) => {
    setSelectedUniversity(university)
    setUniversitySearch(university.name)
    setFormData({ ...formData, university: university.id })
    setShowUniversityDropdown(false)
    // Clear university error if exists
    if (errors.university) {
      setErrors({ ...errors, university: "" })
    }
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
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[\d+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number"
    }
    if (!formData.university) newErrors.university = "Please select your university"
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
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      
      console.log("Form submitted:", formData)
      // Redirect to dashboard or email verification page
      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Registration error:", error)
      setErrors({ submit: "Registration failed. Please try again." })
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

  return (
    <main className="min-h-screen bg-section-light relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="decorative-orb-purple top-0 right-0"></div>
      <div className="decorative-orb-pink bottom-0 left-0"></div>

      <div className="relative section-spacing px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary mb-6">
              <ArrowRight className="h-5 w-5 rotate-180" />
              <span className="text-lg font-medium">Back to home</span>
            </Link>
            
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="heading-section mb-4">
              Join <span className="text-gradient-brand">CribWise</span>
            </h1>
            <p className="text-section-subtitle">
              Create your account and unlock access to housing, materials, marketplace, and more
            </p>
          </div>

          {/* Registration Card */}
          <Card className="border-2 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Create Your Account</CardTitle>
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
                      placeholder="john.doe@university.edu.ng"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+234 801 234 5678"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                {/* University - Searchable Dropdown */}
                <div className="space-y-2">
                  <Label htmlFor="university">
                    University <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground z-10" />
                    <Input
                      id="university"
                      type="text"
                      placeholder="Search for your university..."
                      className="pl-10"
                      value={universitySearch}
                      onChange={(e) => handleUniversitySearch(e.target.value)}
                      onFocus={() => setShowUniversityDropdown(true)}
                    />
                    
                    {/* Selected University Badge */}
                    {selectedUniversity && !showUniversityDropdown && (
                      <div className="absolute right-3 top-3 flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-medium">
                          {selectedUniversity.type.toUpperCase()}
                        </span>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                    )}

                    {/* Dropdown */}
                    {showUniversityDropdown && (
                      <div className="absolute z-20 w-full mt-1 bg-background border-2 border-muted rounded-xl shadow-2xl max-h-72 overflow-y-auto">
                        {filteredUniversities.length > 0 ? (
                          <div className="p-2">
                            {filteredUniversities.map((uni) => (
                              <button
                                key={uni.id}
                                type="button"
                                onClick={() => handleSelectUniversity(uni)}
                                className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex-1">
                                    <p className="font-semibold text-foreground">
                                      {uni.name}
                                      {uni.abbreviation && (
                                        <span className="text-muted-foreground ml-2">
                                          ({uni.abbreviation})
                                        </span>
                                      )}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <MapPin className="h-3 w-3 text-muted-foreground" />
                                      <span className="text-sm text-muted-foreground">
                                        {uni.state} State
                                      </span>
                                    </div>
                                  </div>
                                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                    uni.type === 'federal' 
                                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                      : uni.type === 'state'
                                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                                      : 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
                                  }`}>
                                    {uni.type.toUpperCase()}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-8 text-center">
                            <p className="text-muted-foreground">No universities found</p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Try adjusting your search
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {errors.university && (
                    <p className="text-sm text-red-500">{errors.university}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Can&apos;t find your university? <Link href="/contact" className="text-primary hover:underline">Let us know</Link>
                  </p>
                </div>

                {/* Student ID (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="studentId">
                    Student ID <span className="text-muted-foreground">(Optional)</span>
                  </Label>
                  <Input
                    id="studentId"
                    type="text"
                    placeholder="e.g., 2021/1/12345"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange("studentId", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Helps us verify your student status for exclusive benefits
                  </p>
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
                    {[
                      "Access to verified housing",
                      "Free course materials",
                      "Student marketplace",
                      "Roommate matching",
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-foreground">{benefit}</span>
                      </div>
                    ))}
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