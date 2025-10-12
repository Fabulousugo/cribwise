"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { 
  Award,
  Upload,
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  TrendingUp,
  BarChart3,
  Users,
  DollarSign,
  Eye,
  FileText,
  Home
} from "lucide-react"

export default function AgentVerificationPage() {
  const router = useRouter()
  const { user, profile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // Form data
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || "",
    phone: profile?.phone || "",
    nin: "",
    businessName: "",
    businessAddress: "",
    propertyCount: "",
    additionalInfo: ""
  })

  const [documents, setDocuments] = useState<{
    idCard: File | null
    proofOfOwnership: File | null
  }>({
    idCard: null,
    proofOfOwnership: null
  })

  // Check if already verified
  const isVerified = profile?.landlord_verified === true

  const handleFileChange = (field: "idCard" | "proofOfOwnership", file: File | null) => {
    setDocuments(prev => ({ ...prev, [field]: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Validate required fields
      if (!formData.nin || !formData.businessName || !documents.idCard) {
        throw new Error("Please fill in all required fields and upload ID card")
      }

      // Upload documents to Supabase Storage
      const idCardPath = documents.idCard 
        ? await uploadFile(documents.idCard, "id-cards")
        : null

      const proofPath = documents.proofOfOwnership
        ? await uploadFile(documents.proofOfOwnership, "property-docs")
        : null

      // Save verification request
      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({
          nin: formData.nin,
          verification_documents: {
            idCardUrl: idCardPath,
            proofOfOwnershipUrl: proofPath,
            businessName: formData.businessName,
            businessAddress: formData.businessAddress,
            propertyCount: formData.propertyCount,
            additionalInfo: formData.additionalInfo,
            submittedAt: new Date().toISOString(),
            status: "pending"
          },
          landlord_verified: false // Will be set to true after manual review
        })
        .eq("id", user?.id)

      if (updateError) throw updateError

      setSuccess(true)

    } catch (err: any) {
      setError(err.message || "Failed to submit verification")
    } finally {
      setLoading(false)
    }
  }

  const uploadFile = async (file: File, bucket: string): Promise<string> => {
    const fileExt = file.name.split(".").pop()
    const fileName = `${user?.id}-${Date.now()}.${fileExt}`
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file)

    if (error) throw error
    return data.path
  }

  if (isVerified) {
    return (
      <main className="min-h-screen bg-background py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            You're Verified! 🎉
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your landlord account is verified and ready for premium features.
          </p>
          <Button size="lg" onClick={() => router.push("/dashboard/agent")}>
            Go to Dashboard
          </Button>
        </div>
      </main>
    )
  }

  if (success) {
    return (
      <main className="min-h-screen bg-background py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Application Submitted! ✅
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            We're reviewing your verification documents.
          </p>
          <p className="text-muted-foreground mb-8">
            This usually takes 24-48 hours. We'll email you once approved!
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => router.push("/dashboard/agent")}>
              Go to Dashboard
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push("/agent/properties/add")}>
              Add Property
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 mb-6">
            <Award className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Become a Verified Landlord
          </h1>
          <p className="text-xl text-muted-foreground">
            Get a trust badge and unlock premium features
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form - 2 columns */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Verification Application</CardTitle>
                <CardDescription className="text-base">
                  Provide your details and documents for verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Personal Information</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="nin">National ID Number (NIN) *</Label>
                      <Input
                        id="nin"
                        value={formData.nin}
                        onChange={(e) => setFormData({ ...formData, nin: e.target.value })}
                        placeholder="00000000000"
                        required
                      />
                    </div>
                  </div>

                  {/* Business Info */}
                  <div className="space-y-4 pt-6 border-t">
                    <h3 className="font-semibold text-lg">Business Information</h3>
                    
                    <div>
                      <Label htmlFor="businessName">Business/Company Name *</Label>
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g., ABC Properties Ltd"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="businessAddress">Business Address *</Label>
                      <Input
                        id="businessAddress"
                        value={formData.businessAddress}
                        onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                        placeholder="Street, City, State"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="propertyCount">Number of Properties</Label>
                      <Input
                        id="propertyCount"
                        type="number"
                        value={formData.propertyCount}
                        onChange={(e) => setFormData({ ...formData, propertyCount: e.target.value })}
                        placeholder="e.g., 5"
                      />
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="space-y-4 pt-6 border-t">
                    <h3 className="font-semibold text-lg">Required Documents</h3>
                    
                    <div>
                      <Label htmlFor="idCard">
                        Government-Issued ID Card *
                        <span className="text-xs text-muted-foreground ml-2">(Driver's License, National ID, or Passport)</span>
                      </Label>
                      <div className="mt-2 flex items-center gap-4">
                        <Input
                          id="idCard"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange("idCard", e.target.files?.[0] || null)}
                          required
                        />
                        {documents.idCard && (
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="proofOfOwnership">
                        Proof of Property Ownership (Optional)
                        <span className="text-xs text-muted-foreground ml-2">(Certificate of Occupancy, Title Deed, etc.)</span>
                      </Label>
                      <div className="mt-2 flex items-center gap-4">
                        <Input
                          id="proofOfOwnership"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange("proofOfOwnership", e.target.files?.[0] || null)}
                        />
                        {documents.proofOfOwnership && (
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-4 pt-6 border-t">
                    <div>
                      <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                      <Textarea
                        id="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                        placeholder="Any other details you'd like to share..."
                        rows={4}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                  )}

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "Submitting..." : "Submit for Verification"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By submitting, you agree to our verification process and terms of service.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Sidebar */}
          <div className="space-y-6">
            <Card className="border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-emerald-600" />
                  Premium Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-background">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">3x More Inquiries</p>
                    <p className="text-sm text-muted-foreground">Verified badge increases trust</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-background">
                    <Eye className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Priority Placement</p>
                    <p className="text-sm text-muted-foreground">Appear first in search results</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-background">
                    <BarChart3 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Analytics Dashboard</p>
                    <p className="text-sm text-muted-foreground">Track views and conversions</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-background">
                    <Users className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Tenant Screening</p>
                    <p className="text-sm text-muted-foreground">View verified student profiles</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-background">
                    <Sparkles className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">AI Listing Generator</p>
                    <p className="text-sm text-muted-foreground">Create listings with voice input</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
              <CardContent className="p-6">
                <p className="text-sm font-semibold text-muted-foreground mb-4">VERIFIED LANDLORD STATS</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-3xl font-bold text-foreground">86%</p>
                    <p className="text-sm text-muted-foreground">Higher inquiry rate</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">2.3x</p>
                    <p className="text-sm text-muted-foreground">Faster bookings</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">4.8★</p>
                    <p className="text-sm text-muted-foreground">Average rating</p>
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