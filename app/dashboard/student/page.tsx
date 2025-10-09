"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function StudentDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/signin')
        return
      }

      // Get profile
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(profileData)
    } catch (error) {
      console.error('Error:', error)
      router.push('/signin')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-2">Loading...</div>
          <p className="text-slate-600">Setting up your dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome, {profile?.full_name || 'Student'}! 👋</h1>
          <p className="text-slate-600">Status: <span className="font-semibold capitalize">{profile?.status}</span></p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Browse Properties</CardTitle>
              <CardDescription>Find your perfect student accommodation</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/properties">
                <Button className="w-full">Start Browsing</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>Update your information</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Profile</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Requests</CardTitle>
              <CardDescription>View your property inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Coming Soon</Button>
            </CardContent>
          </Card>
        </div>

        {!profile?.school_email_verified && profile?.status !== 'prospective' && (
          <Card className="mt-6 border-yellow-300 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">⚠️ Verify Your School Email</CardTitle>
              <CardDescription className="text-yellow-700">
                Add your official .edu.ng email to unlock full features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="default">Verify Now</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}