"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()

  useEffect(() => {
    // Don't redirect while loading
    if (loading) return

    // No user - go to signin
    if (!user) {
      router.replace('/signin')
      return
    }

    // No profile yet - wait for it
    if (!profile) return

    // Redirect based on status
    if (profile.status === 'agent') {
      router.replace('/dashboard/agent')
    } else {
      router.replace('/dashboard/student')
    }
  }, [user, profile, loading, router])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-2xl mb-2">Redirecting...</div>
        <p className="text-slate-600">Taking you to your dashboard</p>
      </div>
    </div>
  )
}