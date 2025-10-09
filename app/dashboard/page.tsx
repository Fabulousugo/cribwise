"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    async function checkUserAndRedirect() {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/signin')
        return
      }

      // Get user profile to determine which dashboard
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('status')
        .eq('id', user.id)
        .single()

      if (profile?.status === 'agent') {
        router.push('/dashboard/agent')
      } else {
        router.push('/dashboard/student')
      }
    }

    checkUserAndRedirect()
  }, [router])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-2xl mb-2">Redirecting...</div>
        <p className="text-slate-600">Taking you to your dashboard</p>
      </div>
    </div>
  )
}