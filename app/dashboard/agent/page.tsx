"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AgentDashboard() {
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
          <h1 className="text-4xl font-bold mb-2">Agent Dashboard 🏠</h1>
          <p className="text-slate-600">Welcome, {profile?.full_name}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Property</CardTitle>
              <CardDescription>List a new property</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">+ Create Listing</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Listings</CardTitle>
              <CardDescription>Manage your properties</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Properties</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inquiries</CardTitle>
              <CardDescription>Student contact requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Inquiries</Button>
            </CardContent>
          </Card>
        </div>
        
        {!profile?.nin && (
          <Card className="mt-6 border-yellow-300 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">⚠️ Complete Your Verification</CardTitle>
              <CardDescription className="text-yellow-700">
                Add your NIN to get verified and list properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="default">Complete Verification</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}