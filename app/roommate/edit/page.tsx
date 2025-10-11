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
import { ArrowLeft, Save, AlertCircle, CheckCircle, Trash2 } from "lucide-react"


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

export default function EditRoommateProfile() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()
  const [saving, setSaving] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [roommateProfile, setRoommateProfile] = useState<any>(null)

  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    university: '',
    faculty: '',
    department: '',
    course_of_study: '',
    year_of_study: '',
    religion: '',
    state_of_origin: '',
    languages: '',
    bio: '',
    interests: '',
    budget_min: '',
    budget_max: '',
    preferred_location: '',
    preferred_property_type: '',
    move_in_date: '',
    preferred_age_min: '',
    preferred_age_max: '',
    preferred_religion: 'Any',
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
    food_preferences: '',
    active: true
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && profile) {
      loadRoommateProfile()
    }
  }, [user, profile])

  async function loadRoommateProfile() {
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
          router.push('/roommate/create')
          return
        }
        throw error
      }

      setRoommateProfile(data)

      // Populate form
      const lifestyle = data.lifestyle_preferences || {}
      setFormData({
        full_name: data.full_name || '',
        age: data.age?.toString() || '',
        university: data.university || '',
        faculty: data.faculty || '',
        department: data.department || '',
        course_of_study: data.course_of_study || '',
        year_of_study: data.year_of_study?.toString() || '',
        religion: data.religion || '',
        state_of_origin: data.state_of_origin || '',
        languages: data.languages?.join(', ') || '',
        bio: data.bio || '',
        interests: data.interests?.join(', ') || '',
        budget_min: data.budget_min?.toString() || '',
        budget_max: data.budget_max?.toString() || '',
        preferred_location: data.preferred_location || '',
        preferred_property_type: data.preferred_property_type || '',
        move_in_date: data.move_in_date || '',
        preferred_age_min: data.preferred_age_min?.toString() || '',
        preferred_age_max: data.preferred_age_max?.toString() || '',
        preferred_religion: data.preferred_religion || 'Any',
        cleanliness: lifestyle.cleanliness || '',
        noise_level: lifestyle.noise_level || '',
        study_habits: lifestyle.study_habits || '',
        sleep_schedule: lifestyle.sleep_schedule || '',
        cooking: lifestyle.cooking || '',
        smoking: lifestyle.smoking || false,
        drinking: lifestyle.drinking || false,
        pets: lifestyle.pets || false,
        visitors: lifestyle.visitors || '',
        party_lifestyle: lifestyle.party_lifestyle || '',
        fitness_habits: lifestyle.fitness_habits || '',
        music_preference: lifestyle.music_preference || '',
        food_preferences: lifestyle.food_preferences || '',
        active: data.active ?? true
      })

    } catch (error: any) {
      console.error('Error loading profile:', error)
      setError('Failed to load profile')
    } finally {
      setLoadingProfile(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const interestsArray = formData.interests
        .split(',')
        .map(i => i.trim())
        .filter(Boolean)

      const languagesArray = formData.languages
        .split(',')
        .map(l => l.trim())
        .filter(Boolean)

      const { error: updateError } = await supabase
        .from('roommate_profiles')
        .update({
          full_name: formData.full_name,
          age: parseInt(formData.age) || null,
          university: formData.university,
          faculty: formData.faculty,
          department: formData.department,
          course_of_study: formData.course_of_study,
          year_of_study: parseInt(formData.year_of_study) || null,
          religion: formData.religion,
          state_of_origin: formData.state_of_origin,
          languages: languagesArray,
          bio: formData.bio,
          interests: interestsArray,
          budget_min: parseInt(formData.budget_min),
          budget_max: parseInt(formData.budget_max),
          preferred_location: formData.preferred_location,
          preferred_property_type: formData.preferred_property_type,
          move_in_date: formData.move_in_date || null,
          preferred_age_min: parseInt(formData.preferred_age_min) || null,
          preferred_age_max: parseInt(formData.preferred_age_max) || null,
          preferred_religion: formData.preferred_religion,
          lifestyle_preferences: {
            cleanliness: formData.cleanliness,
            noise_level: formData.noise_level,
            study_habits: formData.study_habits,
            sleep_schedule: formData.sleep_schedule,
            cooking: formData.cooking,
            smoking: formData.smoking,
            drinking: formData.drinking,
            pets: formData.pets,
            visitors: formData.visitors,
            party_lifestyle: formData.party_lifestyle,
            fitness_habits: formData.fitness_habits,
            music_preference: formData.music_preference,
            food_preferences: formData.food_preferences
          },
          active: formData.active,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user!.id)

      if (updateError) throw updateError

      setSuccess('Profile updated successfully!')
      setTimeout(() => {
        router.push('/roommate/browse')
      }, 1500)

    } catch (error: any) {
      console.error('Error updating profile:', error)
      setError(error.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  async function handleDeactivate() {
    if (!confirm('Are you sure you want to deactivate your roommate profile? You can reactivate it anytime.')) {
      return
    }

    try {
      const { error } = await supabase
        .from('roommate_profiles')
        .update({ active: false })
        .eq('user_id', user!.id)

      if (error) throw error

      router.push('/dashboard')
    } catch (error) {
      console.error('Error deactivating profile:', error)
      alert('Failed to deactivate profile')
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to DELETE your roommate profile? This cannot be undone!')) {
      return
    }

    const confirmText = prompt('Type "DELETE" to confirm deletion:')
    if (confirmText !== 'DELETE') {
      return
    }

    try {
      const { error } = await supabase
        .from('roommate_profiles')
        .delete()
        .eq('user_id', user!.id)

      if (error) throw error

      router.push('/dashboard')
    } catch (error) {
      console.error('Error deleting profile:', error)
      alert('Failed to delete profile')
    }
  }

  if (loading || loadingProfile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-2xl">Loading profile...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
        <Link href="/roommate/my-profile">
            <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Profile
            </Button>
        </Link>

        <Link href="/roommate/browse">
            <Button variant="outline">Browse Roommates</Button>
        </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Edit Your Roommate Profile</h1>
          <p className="text-slate-600">Update your information to find better matches</p>
        </div>

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

        {/* Profile Status Toggle */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Profile Status</CardTitle>
            <CardDescription>Control who can see your profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Profile is {formData.active ? 'Active' : 'Inactive'}</p>
                <p className="text-sm text-slate-500">
                  {formData.active ? 'Other students can see and contact you' : 'Your profile is hidden from search'}
                </p>
              </div>
              <Button
                variant={formData.active ? 'outline' : 'default'}
                onClick={() => setFormData({...formData, active: !formData.active})}
              >
                {formData.active ? 'Deactivate' : 'Activate'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                />
              </div>

              {/* Gender - Display Only */}
              <div>
                <Label>Gender</Label>
                <div className="px-3 py-2 bg-slate-100 rounded-md text-slate-700">
                  {profile?.gender || 'Not specified'}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Gender cannot be changed here. Update in your main profile.
                </p>
              </div>

              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
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

          {/* Save Button */}
          <div className="flex gap-3">
            <Button 
              type="submit" 
              disabled={saving}
              className="flex-1"
              size="lg"
            >
              {saving ? 'Saving...' : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Delete Profile</p>
                  <p className="text-sm text-slate-500">Permanently delete your roommate profile</p>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}