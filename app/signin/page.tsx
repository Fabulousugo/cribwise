"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, Chrome, Facebook, Apple } from "lucide-react"

// Custom TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

export default function SignInPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<string>('')
  const [error, setError] = useState<string>('')
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error

      // Get user profile to determine redirect
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('status')
        .eq('id', data.user.id)
        .single()

      // Redirect based on user status
      if (profile?.status === 'agent') {
        router.push('/dashboard/agent')
      } else {
        router.push('/dashboard/student')
      }
      
      router.refresh()

    } catch (err: any) {
      console.error('Sign in error:', err)
      setError(err.message || 'Sign in failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider: 'google' | 'facebook' | 'apple') => {
    setOauthLoading(provider)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error

    } catch (err: any) {
      console.error('OAuth sign in error:', err)
      setError(err.message || 'OAuth sign in failed.')
      setOauthLoading('')
    }
  }

  // TikTok OAuth - requires custom implementation
  const handleTikTokSignIn = async () => {
    setOauthLoading('tiktok')
    setError('')
    
    try {
      // TikTok OAuth requires custom implementation
      // For now, show info message
      setError('TikTok sign-in coming soon! Use another method for now.')
      setOauthLoading('')
    } catch (err: any) {
      console.error('TikTok sign in error:', err)
      setError(err.message || 'TikTok sign in failed.')
      setOauthLoading('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900 flex items-center justify-center px-4 py-12">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse delay-75"></div>

      <Card className="max-w-md w-full border-2 border-purple-100 dark:border-purple-900/30 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-2">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
            Welcome Back! 👋
          </CardTitle>
          <CardDescription className="text-base dark:text-slate-400">
            Sign in to continue your journey
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-12 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-semibold"
              onClick={() => handleOAuthSignIn('google')}
              disabled={!!oauthLoading}
            >
              {oauthLoading === 'google' ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-600 border-t-transparent"></div>
              ) : (
                <>
                  <Chrome className="h-5 w-5 text-red-500" />
                  <span className="ml-2 hidden sm:inline">Google</span>
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="h-12 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-semibold"
              onClick={() => handleOAuthSignIn('apple')}
              disabled={!!oauthLoading}
            >
              {oauthLoading === 'apple' ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-600 border-t-transparent"></div>
              ) : (
                <>
                  <Apple className="h-5 w-5" />
                  <span className="ml-2 hidden sm:inline">Apple</span>
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="h-12 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-semibold"
              onClick={() => handleOAuthSignIn('facebook')}
              disabled={!!oauthLoading}
            >
              {oauthLoading === 'facebook' ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-600 border-t-transparent"></div>
              ) : (
                <>
                  <Facebook className="h-5 w-5 text-blue-600" />
                  <span className="ml-2 hidden sm:inline">Facebook</span>
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="h-12 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-semibold"
              onClick={handleTikTokSignIn}
              disabled={!!oauthLoading}
            >
              {oauthLoading === 'tiktok' ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-600 border-t-transparent"></div>
              ) : (
                <>
                  <TikTokIcon className="h-5 w-5" />
                  <span className="ml-2 hidden sm:inline">TikTok</span>
                </>
              )}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-slate-500 dark:text-slate-400 font-medium">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </label>
              <Input
                required
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </label>
              <Input
                required
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div className="flex items-center justify-end">
              <Link 
                href="/forgot-password" 
                className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={loading || !!oauthLoading} 
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl text-base shadow-lg hover:shadow-xl transition-all" 
              size="lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-700">
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