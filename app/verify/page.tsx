"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { 
  Shield, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Lock,
  Unlock,
  Users,
  BookOpen,
  Calendar,
  TrendingUp
} from "lucide-react"

export default function StudentVerificationPage() {
  const router = useRouter()
  const { user, profile } = useAuth()
  const [schoolEmail, setSchoolEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [step, setStep] = useState<"email" | "code">("email")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Check if already verified
  const isVerified = profile?.school_email_verified_at !== null

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      // Validate email format
      if (!schoolEmail.endsWith(".edu.ng") && !schoolEmail.endsWith(".edu")) {
        throw new Error("Please use a valid school email address (.edu or .edu.ng)")
      }

      // TODO: Send verification code to email
      // For now, we'll simulate this
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      
      // Store email in profile (unverified)
      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({ 
          school_email: schoolEmail,
          verification_code: code, // In production, hash this!
          verification_code_sent_at: new Date().toISOString()
        })
        .eq("id", user?.id)

      if (updateError) throw updateError

      setSuccess("Verification code sent! Check your school email.")
      setStep("code")

      // TODO: Actually send email with code
      console.log("Verification code:", code) // Remove in production!

    } catch (err: any) {
      setError(err.message || "Failed to send verification code")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Get stored code from profile
      const { data: profileData, error: fetchError } = await supabase
        .from("user_profiles")
        .select("verification_code, verification_code_sent_at")
        .eq("id", user?.id)
        .single()

      if (fetchError) throw fetchError

      // Check if code matches
      if (profileData.verification_code !== verificationCode) {
        throw new Error("Invalid verification code")
      }

      // Check if code is expired (10 minutes)
      const sentAt = new Date(profileData.verification_code_sent_at).getTime()
      const now = Date.now()
      if (now - sentAt > 10 * 60 * 1000) {
        throw new Error("Verification code expired. Please request a new one.")
      }

      // Mark as verified
      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({ 
          school_email_verified_at: new Date().toISOString(),
          verification_code: null,
          verification_code_sent_at: null
        })
        .eq("id", user?.id)

      if (updateError) throw updateError

      setSuccess("Account verified successfully! 🎉")
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard/admitted")
      }, 2000)

    } catch (err: any) {
      setError(err.message || "Failed to verify code")
    } finally {
      setLoading(false)
    }
  }

  if (isVerified) {
    return (
      <main className="min-h-screen bg-background py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            You&apos;re Already Verified! ✅
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your student account is verified and ready to go.
          </p>
          <Button size="lg" onClick={() => router.push("/dashboard/admitted")}>
            Go to Dashboard
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 mb-6">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Verify Your Student Status
          </h1>
          <p className="text-xl text-muted-foreground">
            Unlock premium features and connect with verified students
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Verification Form */}
          <div>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {step === "email" ? "Step 1: School Email" : "Step 2: Verify Code"}
                </CardTitle>
                <CardDescription className="text-base">
                  {step === "email" 
                    ? "Enter your university email address to receive a verification code"
                    : "Enter the 6-digit code sent to your school email"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step === "email" ? (
                  <form onSubmit={handleSendCode} className="space-y-4">
                    <div>
                      <Label htmlFor="school-email">School Email Address</Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="school-email"
                          type="email"
                          placeholder="student@university.edu.ng"
                          value={schoolEmail}
                          onChange={(e) => setSchoolEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Must end with .edu or .edu.ng
                      </p>
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                      </div>
                    )}

                    {success && (
                      <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
                      </div>
                    )}

                    <Button type="submit" className="w-full" size="lg" disabled={loading}>
                      {loading ? "Sending Code..." : "Send Verification Code"}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyCode} className="space-y-4">
                    <div>
                      <Label htmlFor="verification-code">Verification Code</Label>
                      <Input
                        id="verification-code"
                        type="text"
                        placeholder="000000"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="text-center text-2xl tracking-widest"
                        required
                        maxLength={6}
                      />
                      <p className="text-sm text-muted-foreground mt-2 text-center">
                        Check your inbox at <strong>{schoolEmail}</strong>
                      </p>
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                      </div>
                    )}

                    {success && (
                      <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
                      </div>
                    )}

                    <Button type="submit" className="w-full" size="lg" disabled={loading}>
                      {loading ? "Verifying..." : "Verify Account"}
                    </Button>

                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="w-full" 
                      onClick={() => setStep("email")}
                    >
                      Use Different Email
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Benefits Sidebar */}
          <div className="space-y-6">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  What You'll Unlock
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-background">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Roommate Matching</p>
                    <p className="text-sm text-muted-foreground">AI-powered compatibility scoring with verified students</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-background">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Premium Materials</p>
                    <p className="text-sm text-muted-foreground">Access exclusive notes and past questions</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-background">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Event Access</p>
                    <p className="text-sm text-muted-foreground">RSVP to campus events and workshops</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-background">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Priority Support</p>
                    <p className="text-sm text-muted-foreground">Get help faster from our support team</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Note */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-2">Your Privacy Matters</p>
                    <p className="text-sm text-muted-foreground">
                      We only use your school email to verify you're a real student. We never share your information with third parties.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}