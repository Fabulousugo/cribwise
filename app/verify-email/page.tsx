"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [message, setMessage] = useState('')
  const [showStatusPrompt, setShowStatusPrompt] = useState(false)
  const [userStatus, setUserStatus] = useState<string>('')

  useEffect(() => {
    if (token) {
      verifyEmail(token)
    } else {
      setStatus('error')
      setMessage('Invalid verification link')
    }
  }, [token])

  async function verifyEmail(token: string) {
    try {
      // Find user with this token
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('school_email_verification_token', token)
        .single()

      if (error || !profile) {
        setStatus('error')
        setMessage('Invalid or expired verification link')
        return
      }

      // Update profile - mark as verified
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          school_email_verified: true,
          school_email_verification_token: null, // Clear token
        })
        .eq('id', profile.id)

      if (updateError) throw updateError

      setStatus('success')
      setMessage(`Email ${profile.school_email} verified successfully!`)

      // Check if user is prospective - prompt to update status
      if (profile.status === 'prospective') {
        setUserStatus(profile.status)
        setShowStatusPrompt(true)
      }

    } catch (error) {
      console.error('Verification error:', error)
      setStatus('error')
      setMessage('Failed to verify email. Please try again.')
    }
  }

  async function updateStatus(newStatus: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('user_profiles')
      .update({ status: newStatus })
      .eq('id', user.id)

    if (error) throw error

    setShowStatusPrompt(false)
    setMessage(`Status updated to ${newStatus}!`)
    
    // Redirect and force refresh
    setTimeout(() => {
      router.push('/dashboard?refresh=true')  // Add refresh param
      router.refresh()  // Force Next.js refresh
    }, 2000)

  } catch (error) {
    console.error('Status update error:', error)
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          {status === 'verifying' && (
            <>
              <Loader2 className="h-16 w-16 animate-spin text-blue-600 mx-auto mb-4" />
              <CardTitle>Verifying Your Email...</CardTitle>
              <CardDescription>Please wait while we verify your school email</CardDescription>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-green-600">Email Verified! ✓</CardTitle>
              <CardDescription>{message}</CardDescription>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <CardTitle className="text-red-600">Verification Failed</CardTitle>
              <CardDescription>{message}</CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {status === 'success' && showStatusPrompt && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-2">
                  Update Your Status
                </p>
                <p className="text-blue-700 text-xs mb-3">
                  You&apos;re currently listed as &quot;Prospective Student&quot; but you have a verified school email.
                  Would you like to update your status?
                </p>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button onClick={() => updateStatus('current')} className="w-full">
                  Update to Current Student
                </Button>
                <Button onClick={() => updateStatus('admitted')} variant="outline" className="w-full">
                  Update to Admitted Student
                </Button>
                <Button 
                  onClick={() => setShowStatusPrompt(false)} 
                  variant="ghost" 
                  size="sm"
                  className="w-full"
                >
                  Keep as Prospective
                </Button>
              </div>
            </div>
          )}

          {status === 'success' && !showStatusPrompt && (
          <Button 
            className="w-full"
            onClick={() => {
              router.push('/dashboard?refresh=true')
              router.refresh()
            }}
          >
            Go to Dashboard
          </Button>
        )}

          {status === 'error' && (
            <div className="space-y-2">
              <Link href="/profile">
                <Button className="w-full">Try Again</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full">Back to Dashboard</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}