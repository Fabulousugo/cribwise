/* eslint-disable @typescript-eslint/no-explicit-any */
// ==========================================
// FILE: app/dashboard/alumni/page.tsx
// Dashboard for Alumni with Gamification
// ==========================================
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  Briefcase,
  Users,
  Calendar,
  Award,
  Heart,
  TrendingUp,
  BookOpen,
  Gift,
  MessageSquare,
  GraduationCap,
  ExternalLink,
  ArrowRight
} from "lucide-react"
import { GamificationSection } from "../GamificationSection"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function AlumniDashboard() {
  const supabase = createClientComponentClient()
  const [profile, setProfile] = useState<any>(null)
  const [userId, setUserId] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          setUserId(session.user.id)
          
          const { data } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
          
          setProfile(data)
        }
      } catch (error) {
        console.error("Error loading profile:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [supabase])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your alumni dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-background to-orange-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Banner */}
        <Card className="border-2 border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-amber-900 dark:text-amber-100 mb-2">
                  Welcome Back, {profile?.full_name?.split(' ')[0] || 'Alumni'}! 🎓
                </h2>
                <p className="text-amber-800 dark:text-amber-200">
                  Stay connected with your alma mater and fellow graduates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Users className="h-8 w-8 text-blue-600" />
                <span className="text-3xl font-black">250+</span>
              </div>
              <CardTitle className="text-sm text-muted-foreground">Network Connections</CardTitle>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Calendar className="h-8 w-8 text-green-600" />
                <span className="text-3xl font-black">5</span>
              </div>
              <CardTitle className="text-sm text-muted-foreground">Events Attended</CardTitle>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Heart className="h-8 w-8 text-red-600" />
                <span className="text-3xl font-black">₦50k</span>
              </div>
              <CardTitle className="text-sm text-muted-foreground">Contributions</CardTitle>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <MessageSquare className="h-8 w-8 text-purple-600" />
                <span className="text-3xl font-black">12</span>
              </div>
              <CardTitle className="text-sm text-muted-foreground">Mentoring Sessions</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Actions */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Alumni Hub</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/alumni/network">
              <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-blue-500/50">
                <CardHeader>
                  <div className="p-3 w-fit bg-blue-100 dark:bg-blue-900/20 rounded-xl mb-3">
                    <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">Alumni Network</CardTitle>
                  <CardDescription>Connect with 10,000+ fellow graduates worldwide</CardDescription>
                  <Button className="mt-4 w-full group">
                    Browse Network
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/alumni/jobs">
              <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-green-500/50">
                <CardHeader>
                  <div className="p-3 w-fit bg-green-100 dark:bg-green-900/20 rounded-xl mb-3">
                    <Briefcase className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl">Job Board</CardTitle>
                  <CardDescription>Exclusive opportunities for verified alumni</CardDescription>
                  <Button className="mt-4 w-full group">
                    View Jobs
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/alumni/mentoring">
              <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-purple-500/50">
                <CardHeader>
                  <div className="p-3 w-fit bg-purple-100 dark:bg-purple-900/20 rounded-xl mb-3">
                    <BookOpen className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-xl">Mentor Students</CardTitle>
                  <CardDescription>Give back by guiding current students</CardDescription>
                  <Button className="mt-4 w-full group">
                    Start Mentoring
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>

        {/* Gamification Section */}
        {userId && profile && (
          <GamificationSection userId={userId} profile={profile} />
        )}

        {/* Upcoming Events & Giving Back */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Alumni Events */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-orange-600" />
                  <CardTitle>Alumni Events</CardTitle>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/alumni/events">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    title: "Annual Alumni Reunion 2025", 
                    date: "Feb 14, 2025",
                    location: "Main Campus",
                    attendees: 150,
                    featured: true
                  },
                  { 
                    title: "Career Networking Mixer", 
                    date: "Jan 20, 2025",
                    location: "Virtual",
                    attendees: 80,
                    featured: false
                  },
                  { 
                    title: "Fundraising Gala", 
                    date: "March 5, 2025",
                    location: "Grand Ballroom",
                    attendees: 200,
                    featured: false
                  }
                ].map((event, i) => (
                  <div key={i} className={`p-4 rounded-lg border transition-colors hover:shadow-md cursor-pointer ${
                    event.featured 
                      ? 'border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/20' 
                      : 'border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{event.title}</h4>
                      {event.featured && (
                        <Badge className="bg-amber-500 text-white">Featured</Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {event.date}
                      </p>
                      <p className="flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        {event.attendees} registered
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      Register Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Give Back Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-red-600" />
                  <CardTitle>Give Back</CardTitle>
                </div>
              </div>
              <CardDescription>Support your alma mater and future students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Donation CTA */}
              <Card className="border-2 border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-950/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <Gift className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">
                        Alumni Fund Drive 2025
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Help provide scholarships for underprivileged students
                      </p>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">₦12M / ₦20M</span>
                        </div>
                        <div className="h-2 bg-red-200 dark:bg-red-900/30 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-red-500 to-pink-500" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white">
                        Donate Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Other Ways to Give */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Other Ways to Contribute</h4>
                
                <Link href="/alumni/mentoring">
                  <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded">
                        <BookOpen className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Mentor a Student</p>
                        <p className="text-xs text-muted-foreground">Share your expertise</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Card>
                </Link>

                <Link href="/alumni/guest-lecture">
                  <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded">
                        <GraduationCap className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Guest Lecture</p>
                        <p className="text-xs text-muted-foreground">Speak to current students</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Card>
                </Link>

                <Link href="/alumni/internships">
                  <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded">
                        <Briefcase className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Offer Internships</p>
                        <p className="text-xs text-muted-foreground">Hire student interns</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Card>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Stories & Recognition */}
        <Card className="border-2 border-amber-500/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-amber-600" />
              <CardTitle>Alumni Spotlight</CardTitle>
            </div>
            <CardDescription>Celebrating outstanding alumni achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  name: "Dr. Ada Okafor",
                  achievement: "Named Top 40 Under 40 in Tech",
                  year: "Class of 2015",
                  company: "Google AI"
                },
                {
                  name: "Chidi Nwosu",
                  achievement: "Founded $10M Series A Startup",
                  year: "Class of 2017",
                  company: "PayStack (Acquired by Stripe)"
                }
              ].map((alumni, i) => (
                <Card key={i} className="p-4 bg-muted/30 border-none">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      {alumni.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{alumni.name}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{alumni.year}</p>
                      <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">
                        {alumni.achievement}
                      </p>
                      <p className="text-xs text-muted-foreground">{alumni.company}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}