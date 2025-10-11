"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, Home, MessageCircle, User, Wand2 } from "lucide-react"

export default function AgentDashboard() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()
  const [propertiesCount, setPropertiesCount] = useState(0)
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && profile?.status === 'agent') {
      loadStats()
    }
  }, [user, profile])

  async function loadStats() {
    try {
      // Count properties
      const { count } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })
        .eq('landlord_id', user!.id)

      setPropertiesCount(count || 0)
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoadingStats(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-2">Loading...</div>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Agent Dashboard 🏠</h1>
          <p className="text-slate-600">Welcome, {profile?.full_name}</p>
        </div>

        {/* Quick Stats */}
        {!loadingStats && (
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{propertiesCount}</p>
                  <p className="text-slate-600 mt-2">Total Properties</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">0</p>
                  <p className="text-slate-600 mt-2">Active Inquiries</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">
                    {profile?.nin ? '✓' : '⏳'}
                  </p>
                  <p className="text-slate-600 mt-2">
                    {profile?.nin ? 'Verified' : 'Pending Verification'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-purple-900">AI Listing Generator</CardTitle>
            </div>
            <CardDescription>Create professional listings in seconds</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/agent/properties/generate">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                ✨ Generate Listing with AI
              </Button>
            </Link>
          </CardContent>
        </Card>
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800">Add New Property</CardTitle>
              <CardDescription className="text-blue-700">
                List a new property for students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/agent/properties/add">
                <Button className="w-full" size="lg">
                  <Plus className="h-5 w-5 mr-2" />
                  Add Property
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Properties</CardTitle>
              <CardDescription>View and manage your listings</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/agent/properties">
                <Button variant="outline" className="w-full" size="lg">
                  <Home className="h-5 w-5 mr-2" />
                  View All Properties
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Chat with potential tenants</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/messages">
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  View Messages
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>Update your information</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/profile">
                <Button variant="outline" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Verification Warning */}
        {!profile?.nin && (
          <Card className="mt-6 border-yellow-300 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">⚠️ Complete Your Verification</CardTitle>
              <CardDescription className="text-yellow-700">
                Add your NIN to get verified and build trust with students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/profile">
                <Button variant="default">Complete Verification</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}