"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft, Save, Mail, CheckCircle, AlertCircle } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    full_name: '',
    university: '',
    phone: '',
    school_email: '',
    nin: ''
  })

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/signin')
        return
      }

      setUser(user)

      // Get profile
      const { data: profileData, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error

      setProfile(profileData)
      
      // Populate form
      setFormData({
        full_name: profileData.full_name || '',
        university: profileData.university || '',
        phone: profileData.phone || '',
        school_email: profileData.school_email || '',
        nin: profileData.nin || ''
      })

    } catch (error) {
      console.error('Error loading profile:', error)
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: formData.full_name,
          university: formData.university,
          phone: formData.phone,
          school_email: formData.school_email,
          nin: formData.nin,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) throw error

      setSuccess('Profile updated successfully!')
      
      // Refresh profile data
      await loadProfile()

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000)

    } catch (error: any) {
      console.error('Error updating profile:', error)
      setError(error.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-2">Loading profile...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-slate-600">Manage your account information</p>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium capitalize">
            {profile?.status}
          </span>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email (Login)</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email}
                  disabled
                  className="bg-slate-100"
                />
                <p className="text-xs text-slate-500 mt-1">
                  This is your login email and cannot be changed
                </p>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="080XXXXXXXX"
                />
              </div>

              {profile?.status !== 'agent' && (
                <div>
                  <Label htmlFor="university">University</Label>
                  <Input
                    id="university"
                    value={formData.university}
                    onChange={(e) => setFormData({...formData, university: e.target.value})}
                    placeholder="e.g., University of Lagos"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* School Email Verification (For Students) */}
          {profile?.status !== 'agent' && (
            <Card>
              <CardHeader>
                <CardTitle>School Email Verification</CardTitle>
                <CardDescription>
                  Add your official .edu.ng email to unlock full features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="school_email">School Email (.edu.ng)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="school_email"
                      type="email"
                      value={formData.school_email}
                      onChange={(e) => setFormData({...formData, school_email: e.target.value})}
                      placeholder="your.name@unilag.edu.ng"
                      disabled={profile?.school_email_verified}
                    />
                    {profile?.school_email_verified ? (
                      <Button type="button" disabled className="bg-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Verified
                      </Button>
                    ) : (
                      <Button type="button" variant="outline" disabled>
                        <Mail className="h-4 w-4 mr-2" />
                        Verify
                      </Button>
                    )}
                  </div>
                  {profile?.school_email_verified ? (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ Your school email has been verified
                    </p>
                  ) : (
                    <p className="text-xs text-slate-500 mt-1">
                      Save your profile first, then we'll send a verification email
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Agent Verification (For Agents) */}
          {profile?.status === 'agent' && (
            <Card>
              <CardHeader>
                <CardTitle>Agent Verification</CardTitle>
                <CardDescription>
                  Provide your NIN to get verified and list properties
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="nin">National Identity Number (NIN)</Label>
                  <Input
                    id="nin"
                    value={formData.nin}
                    onChange={(e) => setFormData({...formData, nin: e.target.value})}
                    placeholder="Enter your 11-digit NIN"
                    maxLength={11}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Your NIN will be verified manually. This is required to list properties.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Save Button */}
          <div className="flex gap-3">
            <Button 
              type="submit" 
              disabled={saving}
              className="flex-1"
              size="lg"
            >
              {saving ? (
                'Saving...'
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}