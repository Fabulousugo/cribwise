/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { Search, Filter, MapPin, GraduationCap, Calendar, DollarSign, CheckCircle, X , User, Edit} from "lucide-react"


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
  verified: boolean
  lifestyle_preferences: any
  created_at: string
}

export default function BrowseRoommates() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()
  const [roommates, setRoommates] = useState<RoommateProfile[]>([])
  const [filteredRoommates, setFilteredRoommates] = useState<RoommateProfile[]>([])
  const [loadingRoommates, setLoadingRoommates] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [hasProfile, setHasProfile] = useState(false)

  const [filters, setFilters] = useState({
    university: '',
    faculty: '',
    department: '',
    gender: '',
    minAge: '',
    maxAge: '',
    religion: '',
    minBudget: '',
    maxBudget: '',
    location: '',
    yearOfStudy: '',
    searchQuery: ''
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && profile) {
      checkUserProfile()
      loadRoommates()
    }
  }, [user, profile])

  useEffect(() => {
    applyFilters()
  }, [filters, roommates])

  async function checkUserProfile() {
    if (!user) return

    const { data } = await supabase
      .from('roommate_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    setHasProfile(!!data)
  }

  async function loadRoommates() {
  setLoadingRoommates(true)
  try {
    // Get user's gender first
    const userGender = profile?.gender

    if (!userGender) {
      setRoommates([])
      setFilteredRoommates([])
      setLoadingRoommates(false)
      return
    }

    // Get all active roommate profiles except user's own
    const { data, error } = await supabase
      .from('roommate_profiles')
      .select('*')
      .eq('active', true)
      .eq('gender', userGender)  // ONLY SAME GENDER
      .neq('user_id', user!.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    setRoommates(data || [])
    setFilteredRoommates(data || [])

  } catch (error) {
    console.error('Error loading roommates:', error)
  } finally {
    setLoadingRoommates(false)
  }
}

  function applyFilters() {
    let filtered = [...roommates]

    // Search query (name, bio, interests)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(r => 
        r.full_name.toLowerCase().includes(query) ||
        r.bio?.toLowerCase().includes(query) ||
        r.course_of_study?.toLowerCase().includes(query) ||
        r.department?.toLowerCase().includes(query) ||
        r.interests?.some(i => i.toLowerCase().includes(query))
      )
    }

    // University
    if (filters.university) {
      filtered = filtered.filter(r => 
        r.university.toLowerCase().includes(filters.university.toLowerCase())
      )
    }

    // Faculty
    if (filters.faculty) {
      filtered = filtered.filter(r => r.faculty === filters.faculty)
    }

    // Department
    if (filters.department) {
      filtered = filtered.filter(r => 
        r.department?.toLowerCase().includes(filters.department.toLowerCase())
      )
    }

    // Gender (already filtered in load, but can override)
    if (filters.gender) {
      filtered = filtered.filter(r => r.gender === filters.gender)
    }

    // Age range
    if (filters.minAge) {
      filtered = filtered.filter(r => r.age && r.age >= parseInt(filters.minAge))
    }
    if (filters.maxAge) {
      filtered = filtered.filter(r => r.age && r.age <= parseInt(filters.maxAge))
    }

    // Religion
    if (filters.religion) {
      filtered = filtered.filter(r => r.religion === filters.religion)
    }

    // Budget overlap
    if (filters.minBudget || filters.maxBudget) {
      filtered = filtered.filter(r => {
        const userMin = parseInt(filters.minBudget) || 0
        const userMax = parseInt(filters.maxBudget) || Infinity
        // Check if budgets overlap
        return r.budget_max >= userMin && r.budget_min <= userMax
      })
    }

    // Location
    if (filters.location) {
      filtered = filtered.filter(r => 
        r.preferred_location?.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    // Year of study
    if (filters.yearOfStudy) {
      filtered = filtered.filter(r => r.year_of_study === parseInt(filters.yearOfStudy))
    }

    setFilteredRoommates(filtered)
  }

  function clearFilters() {
    setFilters({
      university: '',
      faculty: '',
      department: '',
      gender: '',
      minAge: '',
      maxAge: '',
      religion: '',
      minBudget: '',
      maxBudget: '',
      location: '',
      yearOfStudy: '',
      searchQuery: ''
    })
  }

  if (loading || loadingRoommates) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-2">Loading roommates...</div>
          <p className="text-slate-600">Finding your perfect match</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Find Your Roommate</h1>
          <p className="text-slate-600">
            Browse {filteredRoommates.length} potential roommates at your university
          </p>
        </div>
        {/* Quick Navigation */}
        <div className="flex gap-2 mb-6">
        <Link href="/roommate/my-profile">
            <Button variant="outline">
            <User className="h-4 w-4 mr-2" />
            My Profile
            </Button>
        </Link>
        {hasProfile && (
            <Link href="/roommate/edit">
            <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
            </Button>
            </Link>
        )}
        </div>

        {/* Create Profile CTA */}
        {!hasProfile && (
          <Card className="mb-6 border-blue-300 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800">👋 Create Your Profile First!</CardTitle>
              <CardDescription className="text-blue-700">
                Other students can&apos;t see or contact you until you create your roommate profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/roommate/create">
                <Button>Create My Roommate Profile</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      
        {!profile?.gender && (
        <Card className="mb-6 border-red-300 bg-red-50">
            <CardHeader>
            <CardTitle className="text-red-800">⚠️ Gender Required</CardTitle>
            <CardDescription className="text-red-700">
                You must set your gender in your profile to browse roommates. This ensures safe, same-gender housing matches.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <Link href="/profile">
                <Button variant="destructive">Update Profile</Button>
            </Link>
            </CardContent>
        </Card>
        )}

        {/* Search and Filter Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by name, course, interests..."
                    value={filters.searchQuery}
                    onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters {Object.values(filters).filter(v => v !== '').length > 0 && 
                  `(${Object.values(filters).filter(v => v !== '').length})`}
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
            <div className="mt-6 pt-6 border-t space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                {/* University */}
                <div>
                    <label className="text-sm font-medium mb-2 block">University</label>
                    <Input
                    placeholder="e.g., UNILAG"
                    value={filters.university}
                    onChange={(e) => setFilters({...filters, university: e.target.value})}
                    />
                </div>

                {/* Faculty */}
                <div>
                    <label className="text-sm font-medium mb-2 block">Faculty</label>
                    <Select
                    value={filters.faculty || "all"}
                    onValueChange={(value) => setFilters({...filters, faculty: value === "all" ? "" : value})}
                    >
                    <SelectTrigger>
                        <SelectValue placeholder="Any faculty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Any Faculty</SelectItem>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="Arts">Arts</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Law">Law</SelectItem>
                        <SelectItem value="Medicine">Medicine</SelectItem>
                        <SelectItem value="Social Sciences">Social Sciences</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Environmental Sciences">Environmental Sciences</SelectItem>
                        <SelectItem value="Agriculture">Agriculture</SelectItem>
                        <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Management Sciences">Management Sciences</SelectItem>
                        <SelectItem value="Administration">Administration</SelectItem>
                    </SelectContent>
                    </Select>
                </div>

                {/* Department */}
                <div>
                    <label className="text-sm font-medium mb-2 block">Department</label>
                    <Input
                    placeholder="e.g., Computer Science"
                    value={filters.department}
                    onChange={(e) => setFilters({...filters, department: e.target.value})}
                    />
                </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                {/* Age Range */}
                <div>
                    <label className="text-sm font-medium mb-2 block">Min Age</label>
                    <Input
                    type="number"
                    placeholder="18"
                    value={filters.minAge}
                    onChange={(e) => setFilters({...filters, minAge: e.target.value})}
                    />
                </div>

                <div>
                    <label className="text-sm font-medium mb-2 block">Max Age</label>
                    <Input
                    type="number"
                    placeholder="30"
                    value={filters.maxAge}
                    onChange={(e) => setFilters({...filters, maxAge: e.target.value})}
                    />
                </div>

                {/* Religion */}
                <div>
                    <label className="text-sm font-medium mb-2 block">Religion</label>
                    <Select
                    value={filters.religion || "all"}
                    onValueChange={(value) => setFilters({...filters, religion: value === "all" ? "" : value})}
                    >
                    <SelectTrigger>
                        <SelectValue placeholder="Any religion" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Any Religion</SelectItem>
                        <SelectItem value="Christianity">Christianity</SelectItem>
                        <SelectItem value="Islam">Islam</SelectItem>
                        <SelectItem value="Traditional">Traditional</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                {/* Budget Range */}
                <div>
                    <label className="text-sm font-medium mb-2 block">Min Budget (₦)</label>
                    <Input
                    type="number"
                    placeholder="50000"
                    value={filters.minBudget}
                    onChange={(e) => setFilters({...filters, minBudget: e.target.value})}
                    />
                </div>

                <div>
                    <label className="text-sm font-medium mb-2 block">Max Budget (₦)</label>
                    <Input
                    type="number"
                    placeholder="200000"
                    value={filters.maxBudget}
                    onChange={(e) => setFilters({...filters, maxBudget: e.target.value})}
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Input
                    placeholder="e.g., Akoka"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                    />
                </div>
                </div>

                <div className="flex gap-2">
                <Button variant="outline" onClick={clearFilters} size="sm">
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                </Button>
                </div>
            </div>
            )}
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-4 text-slate-600">
          Showing {filteredRoommates.length} of {roommates.length} roommates
        </div>

        {/* Roommate Cards */}
        {filteredRoommates.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-slate-600 mb-4">No roommates found matching your filters</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoommates.map((roommate) => (
              <Card key={roommate.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg">
                        {roommate.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{roommate.full_name}</CardTitle>
                        {roommate.verified && (
                          <CheckCircle className="h-4 w-4 text-green-600"  />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-slate-600 flex items-center gap-1">
                          <GraduationCap className="h-3 w-3" />
                          {roommate.course_of_study || roommate.department || 'Student'}
                        </p>
                        {roommate.age && (
                          <p className="text-sm text-slate-600">
                            {roommate.age} years • {roommate.gender}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* University */}
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-700">{roommate.university}</span>
                  </div>

                  {/* Budget */}
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-700">
                      ₦{roommate.budget_min.toLocaleString()} - ₦{roommate.budget_max.toLocaleString()}/year
                    </span>
                  </div>

                  {/* Move-in Date */}
                  {roommate.move_in_date && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-700">
                        Move-in: {new Date(roommate.move_in_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {/* Bio Preview */}
                  {roommate.bio && (
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {roommate.bio}
                    </p>
                  )}

                  {/* Interests */}
                  {roommate.interests && roommate.interests.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {roommate.interests.slice(0, 3).map((interest, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                      {roommate.interests.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{roommate.interests.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* View Profile Button */}
                  <Link href={`/roommate/${roommate.id}`}>
                    <Button className="w-full mt-4">View Full Profile</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}