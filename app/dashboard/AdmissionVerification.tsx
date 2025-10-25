// ==========================================
// FILE: components/dashboard/AdmissionVerification.tsx
// Hybrid Admission Verification Component
// ==========================================
"use client"

import { SetStateAction, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Upload, 
  FileCheck, 
  CheckCircle2, 
  Clock,
  Award,
  Zap,
  AlertCircle,
  Shield,
  X
} from "lucide-react"
import { toast } from "sonner"

interface AdmissionVerificationProps {
  profile: {
    admission_number?: string
    admission_year?: number
    admission_letter_url?: string
    admission_verified?: boolean
    admission_verified_at?: string
  }
  onUpdate?: () => void
}

export function AdmissionVerification({ profile, onUpdate }: AdmissionVerificationProps) {
  const [uploading, setUploading] = useState(false)
  const [letterFile, setLetterFile] = useState<File | null>(null)
  const [letterPreview, setLetterPreview] = useState<string | null>(profile.admission_letter_url || null)
  
  const [admissionNumber, setAdmissionNumber] = useState(profile.admission_number || "")
  const [admissionYear, setAdmissionYear] = useState(profile.admission_year?.toString() || "")
  
  const [step, setStep] = useState<'info' | 'upload' | 'review'>('info')

  // Calculate verification progress
  const hasAdmissionNumber = !!admissionNumber
  const hasAdmissionYear = !!admissionYear
  const hasLetter = !!letterPreview
  const isVerified = profile.admission_verified

  const completionSteps = [
    { done: hasAdmissionNumber, label: "Admission Number" },
    { done: hasAdmissionYear, label: "Admission Year" },
    { done: hasLetter, label: "Upload Letter" },
    { done: isVerified, label: "Admin Verification" }
  ]

  const progress = (completionSteps.filter(s => s.done).length / completionSteps.length) * 100

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file
    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload PDF, JPG, or PNG")
      return
    }

    if (file.size > maxSize) {
      toast.error("File too large. Maximum size is 5MB")
      return
    }

    setLetterFile(file)
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLetterPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setLetterPreview(null) // PDF - no preview
    }
  }

  // Handle submission
  const handleSubmit = async () => {
    setUploading(true)

    try {
      // Step 1: Upload file to Supabase Storage (if new file)
      let fileUrl = letterPreview
      
      if (letterFile) {
        // TODO: Replace with actual Supabase upload
        // const { data, error } = await supabase.storage
        //   .from('admission-letters')
        //   .upload(`${userId}/${Date.now()}_${letterFile.name}`, letterFile)
        
        // if (error) throw error
        
        // const { data: { publicUrl } } = supabase.storage
        //   .from('admission-letters')
        //   .getPublicUrl(data.path)
        
        // fileUrl = publicUrl
        
        // Mock upload for now
        fileUrl = URL.createObjectURL(letterFile)
      }

      // Step 2: Save admission details to database
      // TODO: Replace with actual Supabase update
      // await supabase
      //   .from('user_profiles')
      //   .update({
      //     admission_number: admissionNumber,
      //     admission_year: parseInt(admissionYear),
      //     admission_letter_url: fileUrl,
      //     admission_verified: false, // Pending admin review
      //     updated_at: new Date()
      //   })
      //   .eq('id', userId)

      // Step 3: Award XP
      // await awardXP(userId, 200, "admission_details_submitted")

      toast.success("Admission details submitted! +200 XP earned 🎉", {
        description: "Your details are under review. You'll be notified once verified."
      })

      onUpdate?.()
      setStep('review')
    } catch (error) {
      console.error("Submission error:", error)
      toast.error("Failed to submit. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  // Render verification status badge
  const renderStatusBadge = () => {
    if (isVerified) {
      return (
        <Badge className="bg-green-500 text-white">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Verified
        </Badge>
      )
    }
    
    if (hasLetter && hasAdmissionNumber) {
      return (
        <Badge variant="secondary" className="bg-amber-500/20 text-amber-700 dark:text-amber-400">
          <Clock className="h-3 w-3 mr-1" />
          Under Review
        </Badge>
      )
    }

    return (
      <Badge variant="outline">
        <AlertCircle className="h-3 w-3 mr-1" />
        Not Verified
      </Badge>
    )
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Verify Your Admission
            </CardTitle>
            <CardDescription>
              Upload your admission letter and details to unlock all features
            </CardDescription>
          </div>
          {renderStatusBadge()}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Verification Progress</span>
            <span className="text-primary font-semibold">
              {completionSteps.filter(s => s.done).length}/{completionSteps.length} completed
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {completionSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-1 text-xs">
                {step.done ? (
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                ) : (
                  <div className="h-3 w-3 rounded-full border-2 border-muted" />
                )}
                <span className={step.done ? "text-foreground" : "text-muted-foreground"}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* If already verified */}
        {isVerified && (
          <div className="bg-green-50 dark:bg-green-950/20 border-2 border-green-500 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500 rounded-full">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-green-900 dark:text-green-100 text-lg mb-1">
                  ✓ Admission Verified!
                </h4>
                <p className="text-green-700 dark:text-green-300 text-sm mb-3">
                  Your admission has been verified by our admin team. You now have full access to all features!
                </p>
                <Badge className="bg-green-500 text-white">
                  +500 XP Earned
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Under Review */}
        {!isVerified && hasLetter && hasAdmissionNumber && (
          <div className="bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-500 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-500 rounded-full animate-pulse">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 dark:text-amber-100 text-lg mb-1">
                  Under Review
                </h4>
                <p className="text-amber-700 dark:text-amber-300 text-sm mb-3">
                  Your admission details are being reviewed by our team. This usually takes 24-48 hours.
                  You will receive +500 XP once verified!
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Admission Number: {admissionNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Year: {admissionYear}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Letter Uploaded</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form - Show if not yet submitted */}
        {!isVerified && (!hasLetter || !hasAdmissionNumber) && (
          <div className="space-y-6">
            {/* Step 1: Admission Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  hasAdmissionNumber && hasAdmissionYear 
                    ? 'bg-green-500' 
                    : 'bg-primary'
                }`}>
                  {hasAdmissionNumber && hasAdmissionYear ? (
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  ) : (
                    <span className="text-white font-bold">1</span>
                  )}
                </div>
                <h4 className="font-semibold text-lg">Enter Admission Details</h4>
                <Badge variant="secondary" className="ml-auto">
                  <Zap className="h-3 w-3 mr-1" />
                  +100 XP
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4 ml-10">
                <div>
                  <Label htmlFor="admission-number">Admission Number *</Label>
                  <Input
                    id="admission-number"
                    placeholder="e.g., UNILAG/2025/12345"
                    value={admissionNumber}
                    onChange={(e: { target: { value: SetStateAction<string> } }) => setAdmissionNumber(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="admission-year">Admission Year *</Label>
                  <Input
                    id="admission-year"
                    type="number"
                    placeholder="e.g., 2025"
                    min="2020"
                    max="2030"
                    value={admissionYear}
                    onChange={(e: { target: { value: SetStateAction<string> } }) => setAdmissionYear(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Upload Letter */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  hasLetter ? 'bg-green-500' : 'bg-primary'
                }`}>
                  {hasLetter ? (
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  ) : (
                    <span className="text-white font-bold">2</span>
                  )}
                </div>
                <h4 className="font-semibold text-lg">Upload Admission Letter</h4>
                <Badge variant="secondary" className="ml-auto">
                  <Zap className="h-3 w-3 mr-1" />
                  +200 XP
                </Badge>
              </div>

              <div className="ml-10">
                {!letterPreview ? (
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="letter-upload"
                    />
                    <label htmlFor="letter-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm font-medium text-foreground mb-1">
                        Click to upload admission letter
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, JPG, PNG (Max 5MB)
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="relative border-2 border-green-500 rounded-lg p-4 bg-green-50 dark:bg-green-950/20">
                    <div className="flex items-center gap-3">
                      <FileCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
                      <div className="flex-1">
                        <p className="font-medium text-green-900 dark:text-green-100">
                          {letterFile?.name || "Admission Letter"}
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-300">
                          {letterFile ? `${(letterFile.size / 1024).toFixed(2)} KB` : "Uploaded"}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setLetterFile(null)
                          setLetterPreview(null)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {letterPreview && letterFile?.type.startsWith('image/') && (
                      <img 
                        src={letterPreview} 
                        alt="Letter preview" 
                        className="mt-4 rounded border max-h-64 object-contain mx-auto"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                <p>Total XP to earn: <span className="font-bold text-primary">+300 XP</span></p>
                <p className="text-xs">+500 XP bonus after admin verification</p>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={!admissionNumber || !admissionYear || !letterPreview || uploading}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Submit for Verification
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}