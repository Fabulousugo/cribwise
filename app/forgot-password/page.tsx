"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Mail, ArrowRight, ArrowLeft, KeyRound, CheckCircle2, AlertCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      setSuccess(true)
    } catch (err: any) {
      console.error('Password reset error:', err)
      setError(err.message || 'Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
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
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-2">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Check Your Email! 📧
            </CardTitle>
            <CardDescription className="text-base dark:text-slate-400">
              Password reset instructions sent
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Success Message */}
            <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 p-6 rounded-xl">
              <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
                We've sent a password reset link to <strong className="font-bold">{email}</strong>
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-3">
                Click the link in the email to reset your password. The link will expire in 1 hour.
              </p>
            </div>

            {/* Instructions */}
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">What to do next:</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400">1</span>
                  </div>
                  <span>Check your email inbox (and spam folder)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400">2</span>
                  </div>
                  <span>Click the password reset link in the email</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400">3</span>
                  </div>
                  <span>Create a new secure password</span>
                </li>
              </ul>
            </div>

            {/* Resend Option */}
            <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Didn't receive the email?
              </p>
              <Button
                type="button"
                variant="outline"
                className="border-2 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-xl font-semibold"
                onClick={() => {
                  setSuccess(false)
                  setEmail('')
                }}
              >
                Try another email
              </Button>
            </div>

            {/* Back to Sign In */}
            <div className="text-center">
              <Link 
                href="/signin" 
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to sign in
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
            Forgot Password? 🔑
          </CardTitle>
          <CardDescription className="text-base dark:text-slate-400">
            No worries, we'll send you reset instructions
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Info Message */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800 p-4 rounded-xl">
            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <label 
                htmlFor="email"
                className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Email Address
              </label>
              <Input
                id="email"
                required
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('') // Clear error on input change
                }}
                className={`h-11 border-2 rounded-xl ${
                  error 
                    ? 'border-red-500 focus-visible:ring-red-500' 
                    : 'border-slate-200 dark:border-slate-700'
                }`}
                disabled={loading}
                autoComplete="email"
                aria-invalid={!!error}
                aria-describedby={error ? "email-error" : undefined}
              />
              {error && (
                <p id="email-error" className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {error}
                </p>
              )}
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
                  Sending Reset Link...
                </>
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          {/* Back to Sign In */}
          <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-700">
            <Link 
              href="/signin" 
              className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <Link 
                href="/register" 
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-bold"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}