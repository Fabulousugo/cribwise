"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, User } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export function Navbar() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
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
          <div className="hidden md:flex gap-3">
            {!loading && (
              user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline">
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
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
            <div className="flex flex-col gap-2 pt-4">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Dashboard</Button>
                  </Link>
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