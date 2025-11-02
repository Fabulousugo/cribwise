"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, KeyRound } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validSession, setValidSession] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)

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

  const passwordStrength = getPasswordStrength(password)

  // Check for valid session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session) {
          setValidSession(true)
        } else {
          setError('Invalid or expired reset link. Please request a new one.')
        }
      } catch (err) {
        console.error('Session check error:', err)
        setError('Failed to verify reset link. Please try again.')
      } finally {
        setCheckingSession(false)
      }
    }

    checkSession()
  }, [])

  const validatePassword = (): boolean => {
    if (!password) {
      setError('Password is required')
      return false
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return false
    }
    if (!/(?=.*[a-z])/.test(password)) {
      setError('Password must contain a lowercase letter')
      return false
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      setError('Password must contain an uppercase letter')
      return false
    }
    if (!/(?=.*\d)/.test(password)) {
      setError('Password must contain a number')
      return false
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    return true
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validatePassword()) {
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) throw error

      setSuccess(true)
      
      // Redirect to sign in after 3 seconds
      setTimeout(() => {
        router.push('/signin')
      }, 3000)

    } catch (err: any) {
      console.error('Password reset error:', err)
      setError(err.message || 'Failed to reset password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Loading State
  if (checkingSession) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900 flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Verifying reset link...</p>
        </div>
      </div>
    )
  }

  // Success State
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900 flex items-center justify-center px-4 py-12">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse delay-75"></div>

        <Card className="max-w-md w-full border-2 border-purple-100 dark:border-purple-900/30 shadow-2xl relative z-10">
          <CardHeader className="text-center space-y-2 pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-2 animate-bounce">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Password Reset! 🎉
            </CardTitle>
            <CardDescription className="text-base dark:text-slate-400">
              Your password has been updated successfully
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Success Message */}
            <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 p-6 rounded-xl text-center">
              <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
                Your password has been successfully reset. You can now sign in with your new password.
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Redirecting you to sign in...
              </p>
              <Link href="/signin">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl">
                  Go to Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Invalid Session State
  if (!validSession) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900 flex items-center justify-center px-4 py-12">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse delay-75"></div>

        <Card className="max-w-md w-full border-2 border-purple-100 dark:border-purple-900/30 shadow-2xl relative z-10">
          <CardHeader className="text-center space-y-2 pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-2">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-black bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 dark:from-red-400 dark:via-orange-400 dark:to-yellow-400 bg-clip-text text-transparent">
              Invalid Link ⚠️
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 p-6 rounded-xl">
              <p className="text-sm text-red-800 dark:text-red-200 leading-relaxed text-center">
                {error}
              </p>
            </div>

            <div className="space-y-3">
              <Link href="/forgot-password">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl">
                  Request New Reset Link
                </Button>
              </Link>
              <Link href="/signin">
                <Button variant="outline" className="w-full border-2 rounded-xl font-semibold">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Form State
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900 flex items-center justify-center px-4 py-12">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse delay-75"></div>

      <Card className="max-w-md w-full border-2 border-purple-100 dark:border-purple-900/30 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-2">
            <KeyRound className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
            Reset Password 🔐
          </CardTitle>
          <CardDescription className="text-base dark:text-slate-400">
            Enter your new password below
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Form */}
          <form onSubmit={handleResetPassword} className="space-y-4">
            {/* New Password */}
            <div className="space-y-2">
              <label 
                htmlFor="password"
                className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"
              >
                <Lock className="h-4 w-4" />
                New Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  className={`h-11 border-2 rounded-xl pr-10 ${
                    error 
                      ? 'border-red-500 focus-visible:ring-red-500' 
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                  disabled={loading}
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
              
              {/* Password Strength */}
              {password && (
                <div className="space-y-1">
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
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label 
                htmlFor="confirmPassword"
                className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"
              >
                <Lock className="h-4 w-4" />
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setError('')
                  }}
                  className={`h-11 border-2 rounded-xl pr-10 ${
                    error 
                      ? 'border-red-500 focus-visible:ring-red-500' 
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                  disabled={loading}
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

            {/* Password Requirements */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800 p-4 rounded-xl">
              <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-2">Password must contain:</p>
              <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className={`h-3 w-3 ${password.length >= 8 ? 'text-green-500' : 'text-slate-400'}`} />
                  At least 8 characters
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className={`h-3 w-3 ${/(?=.*[a-z])/.test(password) ? 'text-green-500' : 'text-slate-400'}`} />
                  One lowercase letter
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className={`h-3 w-3 ${/(?=.*[A-Z])/.test(password) ? 'text-green-500' : 'text-slate-400'}`} />
                  One uppercase letter
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className={`h-3 w-3 ${/(?=.*\d)/.test(password) ? 'text-green-500' : 'text-slate-400'}`} />
                  One number
                </li>
              </ul>
            </div>

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl text-base shadow-lg hover:shadow-xl transition-all" 
              size="lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Resetting Password...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>

          {/* Back to Sign In */}
          <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-700">
            <Link 
              href="/signin" 
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm transition-colors"
            >
              Back to sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}