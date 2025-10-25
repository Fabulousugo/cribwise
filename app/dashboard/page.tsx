// ==========================================
// FILE: app/dashboard/page.tsx
// Enhanced Dashboard Router with Onboarding Check
// ==========================================
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/signin')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('user_type, status, school_email_verified_at, onboarding_completed')
    .eq('id', session.user.id)
    .single()

  // NEW: Check if profile exists
  if (!profile) {
    redirect('/onboarding')
  }

  // NEW: Check if onboarding is completed
  // If user hasn't completed onboarding, redirect them there
  if (!profile.onboarding_completed) {
    redirect('/onboarding')
  }

  // Route based on user type (existing logic)
  switch (profile.user_type) {
    case 'prospective':
      redirect('/dashboard/prospective')
    case 'admitted':
      redirect('/dashboard/admitted')
    case 'current':
      redirect('/dashboard/current')
    case 'alumni':
      redirect('/dashboard/alumni')
    case 'agent':
    case 'landlord':
      redirect('/dashboard/agent')
    default:
      redirect('/dashboard/current')
  }
}