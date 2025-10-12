"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

export default function DashboardRouter() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()

  useEffect(() => {
    if (loading) return

    if (!user) {
      // Not logged in - redirect to login
      router.push("/signin")
      return
    }

    if (!profile) {
      // No profile yet - redirect to choose status
      router.push("/choose-status")
      return
    }

    // Route based on user status
    const status = profile.status as string

    switch (status) {
      case "AGENT":
        router.push("/dashboard/agent")
        break
      
      case "PROSPECTIVE":
      case "ADMITTED":
      case "CURRENT":
      case "ALUMNI":
        router.push("/dashboard/student")
        break
      
      default:
        // Unknown status - let them choose
        router.push("/choose-status")
    }
  }, [user, profile, loading, router])

  // Show loading state
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-xl text-muted-foreground">Loading your dashboard...</p>
      </div>
    </div>
  )
}