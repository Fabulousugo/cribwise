"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
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
            <Button variant="outline">Sign In</Button>
            <Button>List Property</Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button title="Menu"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link href="/properties" className="block py-2 hover:text-blue-600">
              Browse Properties
            </Link>
            <Link href="/how-it-works" className="block py-2 hover:text-blue-600">
              How It Works
            </Link>
            <Link href="/safety" className="block py-2 hover:text-blue-600">
              Safety & Verification
            </Link>
            <Link href="/landlords" className="block py-2 hover:text-blue-600">
              For Landlords
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="outline" className="w-full">Sign In</Button>
              <Button className="w-full">List Property</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}