"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Save, AlertCircle } from "lucide-react"

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara"
]

const FACULTIES = [
  "Science", "Arts", "Engineering", "Law", "Medicine", "Social Sciences",
  "Education", "Environmental Sciences", "Agriculture", "Pharmacy", "Technology",
  "Management Sciences", "Administration"
]

export default function CreateRoommateProfile() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    // Basic Info
    full_name: '',
    age: '',
    university: '',
    
    // Academic
    faculty: '',
    department: '',
    course_of_study: '',
    year_of_study: '',
    
    // Personal/Cultural
    religion: '',
    state_of_origin: '',
    languages: '',
    looking_for_gender: '',
    
    // About
    bio: '',
    interests: '',
    
    // Housing Preferences
    budget_min: '',
    budget_max: '',
    preferred_location: '',
    preferred_property_type: '',
    move_in_date: '',
    
    // Roommate Preferences
    preferred_age_min: '',
    preferred_age_max: '',
    preferred_religion: 'Any',
    
    // Lifestyle
    cleanliness: '',
    noise_level: '',
    study_habits: '',
    sleep_schedule: '',
    cooking: '',
    smoking: false,
    drinking: false,
    pets: false,
    visitors: '',
    party_lifestyle: '',
    fitness_habits: '',
    music_preference: '',
    food_preferences: ''
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        full_name: profile.full_name || '',
        university: profile.university || ''
      }))
      checkExistingProfile()
    }
  }, [profile])

  async function checkExistingProfile() {
    if (!user) return
    const { data } = await supabase
      .from('roommate_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()
    
    if (data) {
      router.push('/roommate/edit')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  
  // Validate gender exists
  if (!profile?.gender) {
    setError('Please add your gender in your profile before creating a roommate profile.')
    return
  }
  
  setSaving(true)
  setError('')

  try {
    // Convert and validate data
    const interestsArray = formData.interests
      .split(',')
      .map(i => i.trim())
      .filter(Boolean)

    const languagesArray = formData.languages
      .split(',')
      .map(l => l.trim())
      .filter(Boolean)

    // Prepare the insert data
    const insertData = {
      user_id: user!.id,
      full_name: formData.full_name,
      gender: profile.gender,
      age: formData.age ? parseInt(formData.age) : null,
      university: formData.university,
      faculty: formData.faculty || null,
      department: formData.department || null,
      course_of_study: formData.course_of_study || null,
      year_of_study: formData.year_of_study ? parseInt(formData.year_of_study) : null,
      religion: formData.religion || null,
      state_of_origin: formData.state_of_origin || null,
      languages: languagesArray.length > 0 ? languagesArray : null,
      bio: formData.bio || null,
      interests: interestsArray.length > 0 ? interestsArray : null,
      budget_min: parseInt(formData.budget_min),
      budget_max: parseInt(formData.budget_max),
      preferred_location: formData.preferred_location || null,
      preferred_property_type: formData.preferred_property_type || null,
      move_in_date: formData.move_in_date || null,
      looking_for_gender: profile.gender, // Same gender only
      preferred_age_min: formData.preferred_age_min ? parseInt(formData.preferred_age_min) : null,
      preferred_age_max: formData.preferred_age_max ? parseInt(formData.preferred_age_max) : null,
      preferred_religion: formData.preferred_religion || 'Any',
      lifestyle_preferences: {
        cleanliness: formData.cleanliness || "",
        noise_level: formData.noise_level || "",
        study_habits: formData.study_habits || "",
        sleep_schedule: formData.sleep_schedule || "",
        cooking: formData.cooking || "",
        smoking: formData.smoking,
        drinking: formData.drinking,
        pets: formData.pets,
        visitors: formData.visitors || "",
        party_lifestyle: formData.party_lifestyle || "",
        fitness_habits: formData.fitness_habits || "",
        music_preference: formData.music_preference || "",
        food_preferences: formData.food_preferences || ""
      },
      verified: profile?.school_email_verified || false,
      active: true
    }

    console.log('Inserting data:', insertData) // DEBUG

    const { data, error: insertError } = await supabase
      .from('roommate_profiles')
      .insert([insertData])
      .select()

    if (insertError) {
      console.error('Insert error details:', insertError)
      throw insertError
    }

    console.log('Insert successful:', data) // DEBUG

    // Redirect to browse roommates
    router.push('/roommate/browse')

  } catch (error: any) {
    console.error('Error creating profile:', error)
    setError(error.message || 'Failed to create profile. Please check all required fields.')
  } finally {
    setSaving(false)
  }
}

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Create Your Roommate Profile</h1>
          <p className="text-slate-600">
            Find compatible roommates who match your lifestyle and preferences
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Tell us about yourself</CardDescription>
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

              <div className="grid md:grid-cols-2 gap-4">
                
            <div>
            <Label>Gender</Label>
            <div className="px-3 py-2 bg-slate-100 rounded-md text-slate-700">
                {profile?.gender || 'Not specified'}
                {profile?.gender_verified && (
                <span className="ml-2 text-green-600 text-xs">✓ Verified</span>
                )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
                Gender is taken from your profile. 
                {!profile?.gender && ' Please update your profile to add gender.'}
            </p>
            </div>

                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="16"
                    max="99"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    placeholder="e.g., 20"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="religion">Religion</Label>
                <Select
                  value={formData.religion}
                  onValueChange={(value) => setFormData({...formData, religion: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select religion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Christianity">Christianity</SelectItem>
                    <SelectItem value="Islam">Islam</SelectItem>
                    <SelectItem value="Traditional">Traditional</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="state_of_origin">State of Origin</Label>
                <Select
                  value={formData.state_of_origin}
                  onValueChange={(value) => setFormData({...formData, state_of_origin: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {NIGERIAN_STATES.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="languages">Languages Spoken</Label>
                <Input
                  id="languages"
                  value={formData.languages}
                  onChange={(e) => setFormData({...formData, languages: e.target.value})}
                  placeholder="e.g., English, Yoruba, Igbo (comma-separated)"
                />
                <p className="text-xs text-slate-500 mt-1">Separate languages with commas</p>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>Your university details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="university">University *</Label>
                <Input
                  id="university"
                  required
                  value={formData.university}
                  onChange={(e) => setFormData({...formData, university: e.target.value})}
                  placeholder="e.g., University of Lagos"
                />
              </div>

              <div>
                <Label htmlFor="faculty">Faculty</Label>
                <Select
                  value={formData.faculty}
                  onValueChange={(value) => setFormData({...formData, faculty: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    {FACULTIES.map(faculty => (
                      <SelectItem key={faculty} value={faculty}>{faculty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  placeholder="e.g., Computer Science"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="course_of_study">Course of Study</Label>
                  <Input
                    id="course_of_study"
                    value={formData.course_of_study}
                    onChange={(e) => setFormData({...formData, course_of_study: e.target.value})}
                    placeholder="e.g., B.Sc Computer Science"
                  />
                </div>

                <div>
                  <Label htmlFor="year_of_study">Year of Study</Label>
                  <Select
                    value={formData.year_of_study}
                    onValueChange={(value) => setFormData({...formData, year_of_study: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Prospective (Not yet admitted)</SelectItem>
                      <SelectItem value="1">Year 1</SelectItem>
                      <SelectItem value="2">Year 2</SelectItem>
                      <SelectItem value="3">Year 3</SelectItem>
                      <SelectItem value="4">Year 4</SelectItem>
                      <SelectItem value="5">Year 5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Me */}
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
              <CardDescription>Share more about yourself</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  placeholder="Tell potential roommates about yourself..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="interests">Interests & Hobbies</Label>
                <Input
                  id="interests"
                  value={formData.interests}
                  onChange={(e) => setFormData({...formData, interests: e.target.value})}
                  placeholder="e.g., Reading, Football, Music, Cooking (comma-separated)"
                />
              </div>
            </CardContent>
          </Card>

          {/* Housing Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Housing Preferences</CardTitle>
              <CardDescription>What are you looking for?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget_min">Min Budget (₦/year) *</Label>
                  <Input
                    id="budget_min"
                    type="number"
                    required
                    value={formData.budget_min}
                    onChange={(e) => setFormData({...formData, budget_min: e.target.value})}
                    placeholder="e.g., 80000"
                  />
                </div>

                <div>
                  <Label htmlFor="budget_max">Max Budget (₦/year) *</Label>
                  <Input
                    id="budget_max"
                    type="number"
                    required
                    value={formData.budget_max}
                    onChange={(e) => setFormData({...formData, budget_max: e.target.value})}
                    placeholder="e.g., 150000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="preferred_location">Preferred Location</Label>
                <Input
                  id="preferred_location"
                  value={formData.preferred_location}
                  onChange={(e) => setFormData({...formData, preferred_location: e.target.value})}
                  placeholder="e.g., Akoka, Yaba"
                />
              </div>

              <div>
                <Label htmlFor="preferred_property_type">Preferred Property Type</Label>
                <Select
                  value={formData.preferred_property_type}
                  onValueChange={(value) => setFormData({...formData, preferred_property_type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Shared Apartment">Shared Apartment</SelectItem>
                    <SelectItem value="Self-Contain">Self-Contain</SelectItem>
                    <SelectItem value="Flat">Flat</SelectItem>
                    <SelectItem value="Studio">Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="move_in_date">Preferred Move-in Date</Label>
                <Input
                  id="move_in_date"
                  type="date"
                  value={formData.move_in_date}
                  onChange={(e) => setFormData({...formData, move_in_date: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Roommate Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Roommate Preferences</CardTitle>
              <CardDescription>What kind of roommate are you looking for?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="looking_for_gender">Looking for Roommate (Gender)</Label>
                <Select
                    value={formData.looking_for_gender}
                    onValueChange={(value) => setFormData({...formData, looking_for_gender: value})}
                >
                    <SelectTrigger>
                    <SelectValue placeholder="Same gender only" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="Same">Same Gender as Me</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-xs text-slate-500 mt-1">
                    For safety, Cribwise only allows same-gender roommate matching
                </p>
                </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferred_age_min">Min Age Preference</Label>
                  <Input
                    id="preferred_age_min"
                    type="number"
                    value={formData.preferred_age_min}
                    onChange={(e) => setFormData({...formData, preferred_age_min: e.target.value})}
                    placeholder="e.g., 18"
                  />
                </div>

                <div>
                  <Label htmlFor="preferred_age_max">Max Age Preference</Label>
                  <Input
                    id="preferred_age_max"
                    type="number"
                    value={formData.preferred_age_max}
                    onChange={(e) => setFormData({...formData, preferred_age_max: e.target.value})}
                    placeholder="e.g., 25"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="preferred_religion">Preferred Religion</Label>
                <Select
                  value={formData.preferred_religion}
                  onValueChange={(value) => setFormData({...formData, preferred_religion: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any religion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Any">Any Religion</SelectItem>
                    <SelectItem value="Christianity">Christianity</SelectItem>
                    <SelectItem value="Islam">Islam</SelectItem>
                    <SelectItem value="Same as mine">Same as Mine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lifestyle Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Lifestyle Preferences</CardTitle>
              <CardDescription>Help us find your perfect match</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Cleanliness Level</Label>
                  <Select
                    value={formData.cleanliness}
                    onValueChange={(value) => setFormData({...formData, cleanliness: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Very neat">Very Neat</SelectItem>
                      <SelectItem value="Moderately clean">Moderately Clean</SelectItem>
                      <SelectItem value="Relaxed">Relaxed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Noise Tolerance</Label>
                  <Select
                    value={formData.noise_level}
                    onValueChange={(value) => setFormData({...formData, noise_level: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Quiet">Prefer Quiet</SelectItem>
                      <SelectItem value="Moderate">Moderate OK</SelectItem>
                      <SelectItem value="Lively">Like Lively</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Study Habits</Label>
                  <Select
                    value={formData.study_habits}
                    onValueChange={(value) => setFormData({...formData, study_habits: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select habit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Night owl">Night Owl</SelectItem>
                      <SelectItem value="Early bird">Early Bird</SelectItem>
                      <SelectItem value="Flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Sleep Schedule</Label>
                  <Select
                    value={formData.sleep_schedule}
                    onValueChange={(value) => setFormData({...formData, sleep_schedule: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Early to bed">Early (Before 11pm)</SelectItem>
                      <SelectItem value="Late sleeper">Late (After 12am)</SelectItem>
                      <SelectItem value="Varies">Varies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Cooking Frequency</Label>
                  <Select
                    value={formData.cooking}
                    onValueChange={(value) => setFormData({...formData, cooking: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Often">Often (3-5x/week)</SelectItem>
                      <SelectItem value="Sometimes">Sometimes</SelectItem>
                      <SelectItem value="Rarely">Rarely</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Party/Social Life</Label>
                  <Select
                    value={formData.party_lifestyle}
                    onValueChange={(value) => setFormData({...formData, party_lifestyle: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select lifestyle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Homebody">Homebody</SelectItem>
                      <SelectItem value="Sometimes">Social Sometimes</SelectItem>
                      <SelectItem value="Very social">Very Social</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Visitors Frequency</Label>
                  <Select
                    value={formData.visitors}
                    onValueChange={(value) => setFormData({...formData, visitors: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rarely">Rarely</SelectItem>
                      <SelectItem value="Sometimes">Sometimes</SelectItem>
                      <SelectItem value="Often">Often</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Fitness/Exercise</Label>
                  <Select
                    value={formData.fitness_habits}
                    onValueChange={(value) => setFormData({...formData, fitness_habits: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select habit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Very active">Very Active</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Not active">Not Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Music Preference</Label>
                <Input
                  value={formData.music_preference}
                  onChange={(e) => setFormData({...formData, music_preference: e.target.value})}
                  placeholder="e.g., Afrobeats, Hip-hop, Gospel, Quiet"
                />
              </div>

              <div>
                <Label>Food Preferences/Restrictions</Label>
                <Input
                  value={formData.food_preferences}
                  onChange={(e) => setFormData({...formData, food_preferences: e.target.value})}
                  placeholder="e.g., Vegetarian, Halal, No restrictions"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input title="smoking"
                    type="checkbox"
                    id="smoking"
                    checked={formData.smoking}
                    onChange={(e) => setFormData({...formData, smoking: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="smoking" className="cursor-pointer">I smoke</Label>
                </div>

                <div className="flex items-center gap-2">
                  <input title="habits"
                    type="checkbox"
                    id="drinking"
                    checked={formData.drinking}
                    onChange={(e) => setFormData({...formData, drinking: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="drinking" className="cursor-pointer">I drink alcohol</Label>
                </div>

                <div className="flex items-center gap-2">
                  <input title="pets"
                    type="checkbox"
                    id="pets"
                    checked={formData.pets}
                    onChange={(e) => setFormData({...formData, pets: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="pets" className="cursor-pointer">I have/want pets</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <Button type="submit" disabled={saving} size="lg" className="w-full">
            {saving ? 'Creating Profile...' : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Roommate Profile
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}