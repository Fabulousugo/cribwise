"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { 
  ArrowLeft, Edit, MapPin, GraduationCap, Calendar, DollarSign,
  Home, Users, Coffee, Moon, Music, Utensils, Dumbbell, PartyPopper,
  CheckCircle, AlertCircle, Eye, EyeOff
} from "lucide-react"

export default function MyRoommateProfile() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()
  const [roommateProfile, setRoommateProfile] = useState<any>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      loadMyProfile()
    }
  }, [user])

  async function loadMyProfile() {
    setLoadingProfile(true)
    try {
      const { data, error } = await supabase
        .from('roommate_profiles')
        .select('*')
        .eq('user_id', user!.id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No profile exists
          setRoommateProfile(null)
        } else {
          throw error
        }
      } else {
        setRoommateProfile(data)
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoadingProfile(false)
    }
  }

  async function toggleActive() {
    if (!roommateProfile) return

    try {
      const { error } = await supabase
        .from('roommate_profiles')
        .update({ active: !roommateProfile.active })
        .eq('user_id', user!.id)

      if (error) throw error

      // Reload profile
      loadMyProfile()
    } catch (error) {
      console.error('Error toggling profile:', error)
      alert('Failed to update profile status')
    }
  }

  if (loading || loadingProfile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-2xl">Loading your profile...</div>
      </div>
    )
  }

  if (!user) return null

  // No profile exists
  if (!roommateProfile) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>

          <Card>
            <CardHeader>
              <CardTitle>No Roommate Profile Yet</CardTitle>
              <CardDescription>Create your profile to start finding compatible roommates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                You haven't created a roommate profile yet. Create one to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Find compatible roommates at your university</li>
                <li>Match based on lifestyle and preferences</li>
                <li>Connect with students before school starts</li>
                <li>Coordinate housing together</li>
              </ul>
              <Link href="/roommate/create">
                <Button size="lg" className="w-full">Create Roommate Profile</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const lifestyle = roommateProfile.lifestyle_preferences || {}
  const yearLabel = roommateProfile.year_of_study === 0 ? 'Prospective' : `Year ${roommateProfile.year_of_study}`

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/dashboard">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="flex gap-2">
            <Link href="/roommate/browse">
              <Button variant="outline">Browse Roommates</Button>
            </Link>
            <Link href="/roommate/edit">
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Status Banner */}
        <Card className={`mb-6 ${roommateProfile.active ? 'border-green-300 bg-green-50' : 'border-yellow-300 bg-yellow-50'}`}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {roommateProfile.active ? (
                  <>
                    <Eye className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">Profile is Active</p>
                      <p className="text-sm text-green-700">Other students can see and contact you</p>
                    </div>
                  </>
                ) : (
                  <>
                    <EyeOff className="h-6 w-6 text-yellow-600" />
                    <div>
                      <p className="font-semibold text-yellow-800">Profile is Inactive</p>
                      <p className="text-sm text-yellow-700">Your profile is hidden from search</p>
                    </div>
                  </>
                )}
              </div>
              <Button
                variant={roommateProfile.active ? 'outline' : 'default'}
                onClick={toggleActive}
              >
                {roommateProfile.active ? 'Deactivate' : 'Activate'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Header Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl">
                  {roommateProfile.full_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{roommateProfile.full_name}</h1>
                  {roommateProfile.verified && (
                    <CheckCircle className="h-6 w-6 text-green-600" title="Verified Student" />
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-lg text-slate-600 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    {roommateProfile.course_of_study || roommateProfile.department || 'Student'} • {yearLabel}
                  </p>
                  <p className="text-slate-600 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {roommateProfile.university}
                  </p>
                  {roommateProfile.age && (
                    <p className="text-slate-600">
                      {roommateProfile.age} years old • {roommateProfile.gender}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - About & Details */}
          <div className="md:col-span-2 space-y-6">
            {/* About Me */}
            {roommateProfile.bio && (
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 whitespace-pre-line">{roommateProfile.bio}</p>
                </CardContent>
              </Card>
            )}

            {/* Academic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">University</p>
                    <p className="font-medium">{roommateProfile.university}</p>
                  </div>
                  {roommateProfile.faculty && (
                    <div>
                      <p className="text-sm text-slate-500">Faculty</p>
                      <p className="font-medium">{roommateProfile.faculty}</p>
                    </div>
                  )}
                  {roommateProfile.department && (
                    <div>
                      <p className="text-sm text-slate-500">Department</p>
                      <p className="font-medium">{roommateProfile.department}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Housing Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Housing Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Budget Range</p>
                    <p className="font-medium">
                      ₦{roommateProfile.budget_min.toLocaleString()} - ₦{roommateProfile.budget_max.toLocaleString()}/year
                    </p>
                  </div>
                </div>

                {roommateProfile.preferred_location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Preferred Location</p>
                      <p className="font-medium">{roommateProfile.preferred_location}</p>
                    </div>
                  </div>
                )}

                {roommateProfile.move_in_date && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Move-in Date</p>
                      <p className="font-medium">
                        {new Date(roommateProfile.move_in_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Lifestyle Preferences */}
            {(lifestyle.cleanliness || lifestyle.study_habits) && (
              <Card>
                <CardHeader>
                  <CardTitle>Lifestyle & Habits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {lifestyle.cleanliness && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Home className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Cleanliness</p>
                          <p className="font-medium">{lifestyle.cleanliness}</p>
                        </div>
                      </div>
                    )}

                    {lifestyle.study_habits && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-50 rounded-lg">
                          <GraduationCap className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Study Habits</p>
                          <p className="font-medium">{lifestyle.study_habits}</p>
                        </div>
                      </div>
                    )}

                    {lifestyle.sleep_schedule && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                          <Moon className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Sleep Schedule</p>
                          <p className="font-medium">{lifestyle.sleep_schedule}</p>
                        </div>
                      </div>
                    )}

                    {lifestyle.noise_level && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                          <Music className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Noise Level</p>
                          <p className="font-medium">{lifestyle.noise_level}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            {/* Personal Details */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {roommateProfile.religion && (
                  <div>
                    <p className="text-sm text-slate-500">Religion</p>
                    <p className="font-medium">{roommateProfile.religion}</p>
                  </div>
                )}
                {roommateProfile.state_of_origin && (
                  <div>
                    <p className="text-sm text-slate-500">State of Origin</p>
                    <p className="font-medium">{roommateProfile.state_of_origin}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Interests */}
            {roommateProfile.interests && roommateProfile.interests.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Interests & Hobbies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {roommateProfile.interests.map((interest: string, i: number) => (
                      <Badge key={i} variant="secondary">{interest}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Profile Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <p className="font-medium">
                    {roommateProfile.active ? '✅ Active' : '⏸️ Inactive'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Verified</p>
                  <p className="font-medium">
                    {roommateProfile.verified ? '✅ Verified' : '⏳ Pending'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Member Since</p>
                  <p className="font-medium">
                    {new Date(roommateProfile.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/roommate/edit">
                  <Button variant="outline" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/roommate/browse">
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Browse Roommates
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}