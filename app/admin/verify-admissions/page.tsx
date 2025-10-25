// ==========================================
// FILE: app/admin/verify-admissions/page.tsx
// Admin Dashboard for Verifying Student Admissions
// ==========================================
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Shield, 
  CheckCircle2, 
  XCircle,
  Clock,
  Search,
  FileText,
  User,
  Building2,
  Calendar
} from "lucide-react"
import { toast } from "sonner"

interface PendingVerification {
  id: string
  user_id: string
  full_name: string
  email: string
  university: string
  department: string
  admission_number: string
  admission_year: number
  admission_letter_url: string
  submitted_at: string
  user_type: string
}

export default function AdminVerifyAdmissionsPage() {
  const [loading, setLoading] = useState(true)
  const [pendingVerifications, setPendingVerifications] = useState<PendingVerification[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [processing, setProcessing] = useState<string | null>(null)

  useEffect(() => {
    fetchPendingVerifications()
  }, [])

  const fetchPendingVerifications = async () => {
    setLoading(true)
    
    // TODO: Replace with real Supabase query
    // const { data, error } = await supabase
    //   .from('user_profiles')
    //   .select('*')
    //   .eq('user_type', 'admitted')
    //   .eq('admission_verified', false)
    //   .not('admission_letter_url', 'is', null)
    //   .not('admission_number', 'is', null)
    //   .order('created_at', { ascending: false })

    // Mock data for now
    setTimeout(() => {
      setPendingVerifications([
        {
          id: "1",
          user_id: "user-1",
          full_name: "Chidera Okonkwo",
          email: "chidera@example.com",
          university: "University of Lagos",
          department: "Computer Science",
          admission_number: "UNILAG/2025/12345",
          admission_year: 2025,
          admission_letter_url: "https://example.com/letter1.pdf",
          submitted_at: "2025-01-15T10:30:00Z",
          user_type: "admitted"
        },
        {
          id: "2",
          user_id: "user-2",
          full_name: "Adebayo Oluwaseun",
          email: "adebayo@example.com",
          university: "University of Ibadan",
          department: "Electrical Engineering",
          admission_number: "UI/2025/67890",
          admission_year: 2025,
          admission_letter_url: "https://example.com/letter2.pdf",
          submitted_at: "2025-01-14T14:20:00Z",
          user_type: "admitted"
        }
      ])
      setLoading(false)
    }, 1000)
  }

  const handleApprove = async (verification: PendingVerification) => {
    setProcessing(verification.id)
    
    try {
      // TODO: Replace with real Supabase update
      // await supabase
      //   .from('user_profiles')
      //   .update({
      //     admission_verified: true,
      //     admission_verified_at: new Date(),
      //     verified_by: adminId
      //   })
      //   .eq('id', verification.user_id)

      // Award bonus XP
      // await awardXP(verification.user_id, 500, "admission_verified")

      // Send notification
      // await sendNotification(verification.user_id, {
      //   title: "Admission Verified! 🎉",
      //   body: "Your admission has been verified. You've earned +500 XP!"
      // })

      toast.success(`${verification.full_name}'s admission verified! +500 XP awarded to student.`)
      
      // Remove from pending list
      setPendingVerifications(prev => prev.filter(v => v.id !== verification.id))
    } catch (error) {
      console.error("Approval error:", error)
      toast.error("Failed to approve. Please try again.")
    } finally {
      setProcessing(null)
    }
  }

  const handleReject = async (verification: PendingVerification) => {
    if (!confirm(`Are you sure you want to reject ${verification.full_name}'s verification?`)) {
      return
    }

    setProcessing(verification.id)
    
    try {
      // TODO: Replace with real Supabase update
      // await supabase
      //   .from('user_profiles')
      //   .update({
      //     admission_letter_url: null,
      //     admission_number: null,
      //     admission_verified: false
      //   })
      //   .eq('id', verification.user_id)

      // Send notification
      // await sendNotification(verification.user_id, {
      //   title: "Verification Rejected",
      //   body: "Your admission verification was rejected. Please resubmit with correct details."
      // })

      toast.error(`${verification.full_name}'s verification rejected. Student has been notified.`)
      
      // Remove from pending list
      setPendingVerifications(prev => prev.filter(v => v.id !== verification.id))
    } catch (error) {
      console.error("Rejection error:", error)
      toast.error("Failed to reject. Please try again.")
    } finally {
      setProcessing(null)
    }
  }

  const filteredVerifications = pendingVerifications.filter(v =>
    v.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.admission_number.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading verifications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            Admission Verifications
          </h1>
          <p className="text-muted-foreground text-lg">
            Review and approve student admission verifications
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/20">
                  <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{pendingVerifications.length}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">0</p>
                  <p className="text-sm text-muted-foreground">Approved Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/20">
                  <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">0</p>
                  <p className="text-sm text-muted-foreground">Rejected Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, email, university, or admission number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </CardContent>
        </Card>

        {/* Verification List */}
        {filteredVerifications.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Pending Verifications
              </h3>
              <p className="text-muted-foreground">
                {searchTerm ? "No verifications match your search" : "All caught up! Check back later."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredVerifications.map((verification) => (
              <Card key={verification.id} className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-1">{verification.full_name}</CardTitle>
                        <CardDescription className="text-sm">
                          {verification.email}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-amber-500/20 text-amber-700 dark:text-amber-400">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Student Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">University</p>
                        <p className="font-semibold text-sm">{verification.university}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Department</p>
                        <p className="font-semibold text-sm">{verification.department}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Admission Number</p>
                        <p className="font-semibold text-sm">{verification.admission_number}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Admission Year</p>
                        <p className="font-semibold text-sm">{verification.admission_year}</p>
                      </div>
                    </div>
                  </div>

                  {/* Admission Letter */}
                  <div className="p-4 border-2 border-dashed rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">Admission Letter</span>
                      <Button variant="outline" size="sm" asChild>
                        <a href={verification.admission_letter_url} target="_blank" rel="noopener noreferrer">
                          <FileText className="h-4 w-4 mr-2" />
                          View Letter
                        </a>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Submitted {new Date(verification.submitted_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <Button
                      onClick={() => handleApprove(verification)}
                      disabled={processing === verification.id}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                    >
                      {processing === verification.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Approve & Award +500 XP
                        </>
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleReject(verification)}
                      disabled={processing === verification.id}
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}