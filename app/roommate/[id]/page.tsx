/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { 
  ArrowLeft, CheckCircle, MapPin, GraduationCap, Calendar, DollarSign,
  Home, Users, Coffee, Moon, Music, Utensils, Dumbbell, PartyPopper,
  MessageCircle, Mail, AlertCircle
} from "lucide-react"

type RoommateProfile = {
  id: number
  user_id: string
  full_name: string
  gender: string
  age: number | null
  university: string
  faculty: string | null
  department: string | null
  course_of_study: string | null
  year_of_study: number | null
  religion: string | null
  state_of_origin: string | null
  languages: string[] | null
  bio: string | null
  interests: string[] | null
  budget_min: number
  budget_max: number
  preferred_location: string | null
  preferred_property_type: string | null
  move_in_date: string | null
  looking_for_gender: string | null
  preferred_age_min: number | null
  preferred_age_max: number | null
  preferred_religion: string | null
  verified: boolean
  lifestyle_preferences: any
  created_at: string
}

export default function RoommateProfilePage() {
  const router = useRouter()
  const params = useParams()
  const { user, profile, loading } = useAuth()
  const [roommate, setRoommate] = useState<RoommateProfile | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [userProfile, setUserProfile] = useState<RoommateProfile | null>(null)
  const [compatibility, setCompatibility] = useState<number | null>(null)
  const [startingChat, setStartingChat] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      loadRoommateProfile()
      loadUserProfile()
    }
  }, [user, params.id])

  async function loadRoommateProfile() {
    setLoadingProfile(true)
    try {
      const { data, error } = await supabase
        .from('roommate_profiles')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) throw error

      setRoommate(data)
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoadingProfile(false)
    }
  }

  async function loadUserProfile() {
    if (!user) return

    const { data } = await supabase
      .from('roommate_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    setUserProfile(data)
  }

  useEffect(() => {
    if (roommate && userProfile) {
      calculateCompatibility()
    }
  }, [roommate, userProfile])

  function calculateCompatibility() {
    if (!roommate || !userProfile) return

    let score = 0
    let factors = 0

    // Budget overlap (20 points)
    if (roommate.budget_max >= userProfile.budget_min && 
        roommate.budget_min <= userProfile.budget_max) {
      score += 20
    }
    factors++

    // Same university (15 points)
    if (roommate.university === userProfile.university) {
      score += 15
    }
    factors++

    // Same faculty (10 points)
    if (roommate.faculty && userProfile.faculty && 
        roommate.faculty === userProfile.faculty) {
      score += 10
    }
    factors++

    // Same department (15 points)
    if (roommate.department && userProfile.department && 
        roommate.department === userProfile.department) {
      score += 15
    }
    factors++

    // Lifestyle compatibility (40 points total)
    const roommateLifestyle = roommate.lifestyle_preferences || {}
    const userLifestyle = userProfile.lifestyle_preferences || {}

    // Cleanliness (10 points)
    if (roommateLifestyle.cleanliness === userLifestyle.cleanliness) {
      score += 10
    }

    // Study habits (10 points)
    if (roommateLifestyle.study_habits === userLifestyle.study_habits) {
      score += 10
    }

    // Sleep schedule (10 points)
    if (roommateLifestyle.sleep_schedule === userLifestyle.sleep_schedule) {
      score += 10
    }

    // Noise level (10 points)
    if (roommateLifestyle.noise_level === userLifestyle.noise_level) {
      score += 10
    }

    // Common interests (bonus up to 10 points)
    const commonInterests = (roommate.interests || []).filter(
      interest => (userProfile.interests || []).includes(interest)
    )
    score += Math.min(commonInterests.length * 2, 10)

    // Calculate percentage
    const percentage = Math.round(score)
    setCompatibility(Math.min(percentage, 100))
  }

  function getCompatibilityColor(score: number) {
    if (score >= 80) return 'text-green-600 bg-green-50'
    if (score >= 60) return 'text-blue-600 bg-blue-50'
    if (score >= 40) return 'text-yellow-600 bg-yellow-50'
    return 'text-slate-600 bg-slate-50'
  }

  function getCompatibilityLabel(score: number) {
    if (score >= 80) return 'Excellent Match!'
    if (score >= 60) return 'Good Match'
    if (score >= 40) return 'Potential Match'
    return 'Fair Match'
  }

  if (loading || loadingProfile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-2xl">Loading profile...</div>
      </div>
    )
  }

  if (!user || !roommate) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Profile Not Found</CardTitle>
            <CardDescription>This roommate profile doesn&apos;t exist</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/roommate/browse">
              <Button>Back to Browse</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const lifestyle = roommate.lifestyle_preferences || {}
  const yearLabel = roommate.year_of_study === 0 ? 'Prospective' : `Year ${roommate.year_of_study}`

  
    async function handleStartConversation() {
      setStartingChat(true)
      try {
        // Call the get_or_create_conversation function
        const { data, error } = await supabase.rpc('get_or_create_conversation', {
          user_a: user!.id,
          user_b: roommate.user_id
        })

        if (error) throw error

        // Redirect to conversation
        router.push(`/messages/${data}`)

      } catch (error) {
        console.error('Error starting conversation:', error)
        alert('Failed to start conversation')
      } finally {
        setStartingChat(false)
      }
    }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link href="/roommate/browse">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Button>
        </Link>

        {/* Header Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl">
                  {roommate.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{roommate.full_name}</h1>
                  {roommate.verified && (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-lg text-slate-600 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    {roommate.course_of_study || roommate.department || 'Student'} • {yearLabel}
                  </p>
                  <p className="text-slate-600 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {roommate.university}
                  </p>
                  {roommate.age && (
                    <p className="text-slate-600">
                      {roommate.age} years old • {roommate.gender}
                    </p>
                  )}
                </div>

                {/* Compatibility Score */}
                {compatibility !== null && userProfile && (
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${getCompatibilityColor(compatibility)}`}>
                    <Users className="h-5 w-5" />
                    {compatibility}% Match • {getCompatibilityLabel(compatibility)}
                  </div>
                )}
              </div>

              {/* Contact Button */}
              <div className="flex flex-col gap-2">
                {!userProfile ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800 mb-2">
                      Create your profile to contact roommates
                    </p>
                    <Link href="/roommate/create">
                      <Button size="sm" className="w-full">Create Profile</Button>
                    </Link>
                  </div>
                ) : (
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={handleStartConversation}
                    disabled={startingChat}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {startingChat ? 'Loading...' : 'Send Message'}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - About & Details */}
          <div className="md:col-span-2 space-y-6">
            {/* About Me */}
            {roommate.bio && (
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 whitespace-pre-line">{roommate.bio}</p>
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
                    <p className="font-medium">{roommate.university}</p>
                  </div>
                  {roommate.faculty && (
                    <div>
                      <p className="text-sm text-slate-500">Faculty</p>
                      <p className="font-medium">{roommate.faculty}</p>
                    </div>
                  )}
                  {roommate.department && (
                    <div>
                      <p className="text-sm text-slate-500">Department</p>
                      <p className="font-medium">{roommate.department}</p>
                    </div>
                  )}
                  {roommate.course_of_study && (
                    <div>
                      <p className="text-sm text-slate-500">Course of Study</p>
                      <p className="font-medium">{roommate.course_of_study}</p>
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
                      ₦{roommate.budget_min.toLocaleString()} - ₦{roommate.budget_max.toLocaleString()}/year
                    </p>
                  </div>
                </div>

                {roommate.preferred_location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Preferred Location</p>
                      <p className="font-medium">{roommate.preferred_location}</p>
                    </div>
                  </div>
                )}

                {roommate.preferred_property_type && (
                  <div className="flex items-center gap-3">
                    <Home className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Preferred Property Type</p>
                      <p className="font-medium">{roommate.preferred_property_type}</p>
                    </div>
                  </div>
                )}

                {roommate.move_in_date && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Preferred Move-in Date</p>
                      <p className="font-medium">
                        {new Date(roommate.move_in_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Lifestyle Preferences */}
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

                  {lifestyle.cooking && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <Utensils className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Cooking</p>
                        <p className="font-medium">{lifestyle.cooking}</p>
                      </div>
                    </div>
                  )}

                  {lifestyle.party_lifestyle && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-pink-50 rounded-lg">
                        <PartyPopper className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Social Life</p>
                        <p className="font-medium">{lifestyle.party_lifestyle}</p>
                      </div>
                    </div>
                  )}

                  {lifestyle.fitness_habits && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-50 rounded-lg">
                        <Dumbbell className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Fitness</p>
                        <p className="font-medium">{lifestyle.fitness_habits}</p>
                      </div>
                    </div>
                  )}

                  {lifestyle.visitors && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-teal-50 rounded-lg">
                        <Users className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Visitors</p>
                        <p className="font-medium">{lifestyle.visitors}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional preferences */}
                <div className="mt-6 pt-6 border-t space-y-2">
                  {lifestyle.music_preference && (
                    <div>
                      <p className="text-sm text-slate-500">Music Preference</p>
                      <p className="font-medium">{lifestyle.music_preference}</p>
                    </div>
                  )}
                  {lifestyle.food_preferences && (
                    <div>
                      <p className="text-sm text-slate-500">Food Preferences</p>
                      <p className="font-medium">{lifestyle.food_preferences}</p>
                    </div>
                  )}
                  
                  {/* Checkboxes */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {lifestyle.smoking && (
                      <Badge variant="secondary">🚬 Smoker</Badge>
                    )}
                    {lifestyle.drinking && (
                      <Badge variant="secondary">🍺 Drinks Alcohol</Badge>
                    )}
                    {lifestyle.pets && (
                      <Badge variant="secondary">🐾 Has/Wants Pets</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            {/* Personal Details */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {roommate.religion && (
                  <div>
                    <p className="text-sm text-slate-500">Religion</p>
                    <p className="font-medium">{roommate.religion}</p>
                  </div>
                )}
                {roommate.state_of_origin && (
                  <div>
                    <p className="text-sm text-slate-500">State of Origin</p>
                    <p className="font-medium">{roommate.state_of_origin}</p>
                  </div>
                )}
                {roommate.languages && roommate.languages.length > 0 && (
                  <div>
                    <p className="text-sm text-slate-500 mb-2">Languages</p>
                    <div className="flex flex-wrap gap-1">
                      {roommate.languages.map((lang, i) => (
                        <Badge key={i} variant="outline">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Interests */}
            {roommate.interests && roommate.interests.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Interests & Hobbies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {roommate.interests.map((interest, i) => (
                      <Badge key={i} variant="secondary">{interest}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Roommate Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Looking For</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {roommate.looking_for_gender && (
                  <div>
                    <p className="text-sm text-slate-500">Gender Preference</p>
                    <p className="font-medium">{roommate.looking_for_gender}</p>
                  </div>
                )}
                {(roommate.preferred_age_min || roommate.preferred_age_max) && (
                  <div>
                    <p className="text-sm text-slate-500">Age Range</p>
                    <p className="font-medium">
                      {roommate.preferred_age_min || '18'} - {roommate.preferred_age_max || '30'} years
                    </p>
                  </div>
                )}
                {roommate.preferred_religion && roommate.preferred_religion !== 'Any' && (
                  <div>
                    <p className="text-sm text-slate-500">Religion Preference</p>
                    <p className="font-medium">{roommate.preferred_religion}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Member Since */}
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-slate-500">Member Since</p>
                <p className="font-medium">
                  {new Date(roommate.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}