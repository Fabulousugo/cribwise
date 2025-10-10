"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, User, Home } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter, usePathname } from "next/navigation"

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // Check if currently on dashboard
  const isOnDashboard = pathname?.startsWith('/dashboard')
  
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null)
      
      // Get user profile if logged in
      if (session?.user) {
        const { data: profileData } = await supabase
          .from('user_profiles')
          .select('full_name, status')
          .eq('id', session.user.id)
          .single()
        
        setProfile(profileData)
      }
      
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      
      if (session?.user) {
        const { data: profileData } = await supabase
          .from('user_profiles')
          .select('full_name, status')
          .eq('id', session.user.id)
          .single()
        
        setProfile(profileData)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setProfile(null)
    router.push('/')
    router.refresh()
  }
  
  return (
    <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Cribwise
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/properties" className="hover:text-blue-600 transition">
              Browse Properties
            </Link>
            <Link href="/how-it-works" className="hover:text-blue-600 transition">
              How It Works
            </Link>
            <Link href="/safety" className="hover:text-blue-600 transition">
              Safety & Verification
            </Link>
            <Link href="/landlords" className="hover:text-blue-600 transition">
              For Landlords
            </Link>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!loading && (
              user ? (
                <>
                  {/* Show user name and home icon when on dashboard */}
                  {isOnDashboard ? (
                    <>
                      <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
                        <User className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">
                          {profile?.full_name || 'User'}
                        </span>
                      </div>
                      <Link href="/">
                        <Button variant="outline" size="sm">
                          <Home className="h-4 w-4 mr-2" />
                          Home
                        </Button>
                      </Link>
                    </>
                  ) : (
                    // Show dashboard button when NOT on dashboard
                    <Link href="/dashboard">
                      <Button variant="outline">
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/signin">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/register">
                    <Button>Get Started</Button>
                  </Link>
                </>
              )
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            title="Menu"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link href="/properties" className="block py-2 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
              Browse Properties
            </Link>
            <Link href="/how-it-works" className="block py-2 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
              How It Works
            </Link>
            <Link href="/safety" className="block py-2 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
              Safety & Verification
            </Link>
            <Link href="/landlords" className="block py-2 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
              For Landlords
            </Link>
            
            <div className="flex flex-col gap-2 pt-4 border-t">
              {user ? (
                <>
                  {/* Show user info */}
                  <div className="px-3 py-2 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-600">
                      {profile?.full_name || 'User'}
                    </p>
                    <p className="text-xs text-blue-500 capitalize">
                      {profile?.status}
                    </p>
                  </div>
                  
                  {/* Show appropriate button based on location */}
                  {isOnDashboard ? (
                    <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        <Home className="h-4 w-4 mr-2" />
                        Home
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  
                  <Button variant="ghost" onClick={() => {
                    handleSignOut()
                    setMobileMenuOpen(false)
                  }} className="w-full">
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}