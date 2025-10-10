"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, User, Home } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter, usePathname } from "next/navigation"

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const { user, profile, loading, signOut } = useAuth()
  
  const isOnDashboard = pathname?.startsWith('/dashboard')

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }
  
  return (
    <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Cribwise
          </Link>
          
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
          
          <div className="hidden md:flex items-center gap-3">
            {!loading && (
              user ? (
                <>
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
          
          <button 
            title="Menu"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
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
                  <div className="px-3 py-2 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-600">
                      {profile?.full_name || 'User'}
                    </p>
                    <p className="text-xs text-blue-500 capitalize">
                      {profile?.status}
                    </p>
                  </div>
                  
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