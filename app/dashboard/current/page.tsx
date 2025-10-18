// ==========================================
// FILE: app/dashboard/current/page.tsx
// Fixed Current Student Dashboard
// ==========================================
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  BookOpen,
  Calendar,
  ShoppingBag,
  Users,
  GraduationCap,
  Bell,
  Shield,
  CheckCircle2,
  Clock,
  TrendingUp,
  Sparkles,
  Star,
  Lock
} from "lucide-react"
import { ActivityFeed, ReferralCard } from "@/components/gamification"

export default function CurrentStudentDashboard() {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [stats, setStats] = useState<any>({
    xp: 0,
    loginStreak: 0,
    propertiesViewed: 0,
    connections: 0,
    materialsDownloaded: 0,
    messagesSent: 0
  })

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProfile({
        full_name: "Student User",
        school_email_verified_at: null
      })
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const isVerified = profile?.school_email_verified_at !== null

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-background to-purple-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      {/* Welcome Header */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 py-12 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}! 👋
              </h1>
              <p className="text-xl text-muted-foreground">
                {isVerified 
                  ? "Here's what's happening today" 
                  : "Complete verification to unlock all features"}
              </p>
            </div>
            {!isVerified && (
              <Link href="/verify">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <Shield className="mr-2 h-5 w-5" />
                  Get Verified
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Verification Banner */}
      {!isVerified && (
        <section className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-y border-amber-200 dark:border-amber-800 py-6 px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="border-2 border-amber-500/50 bg-background/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-amber-500/20 flex-shrink-0">
                    <Star className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Unlock Premium Features with Verification
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Verify your student status to access roommate matching, exclusive materials, event RSVPs, and priority support.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <span>Roommate Matching</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <span>Premium Materials</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <span>Event Access</span>
                      </div>
                    </div>
                    <Link href="/verify">
                      <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                        Verify Now - It's Free
                        <Sparkles className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Quick Stats */}
      <section className="py-8 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Academic Overview</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                  <span className="text-3xl font-black">3.8</span>
                </div>
                <CardTitle className="text-sm text-muted-foreground">Current GPA</CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <BookOpen className="h-8 w-8 text-green-600" />
                  <span className="text-3xl font-black">6</span>
                </div>
                <CardTitle className="text-sm text-muted-foreground">Active Courses</CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Calendar className="h-8 w-8 text-orange-600" />
                  <span className="text-3xl font-black">3</span>
                </div>
                <CardTitle className="text-sm text-muted-foreground">Upcoming Tests</CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <span className="text-3xl font-black">92%</span>
                </div>
                <CardTitle className="text-sm text-muted-foreground">Attendance</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Study Materials */}
            <Link href="/materials">
              <Card className="group hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-purple-500/50 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle className="text-2xl">Study Materials</CardTitle>
                  <CardDescription className="text-base">
                    Access notes and past questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Browse Materials</Button>
                </CardContent>
              </Card>
            </Link>

            {/* Marketplace */}
            <Link href="/marketplace">
              <Card className="group hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-orange-500/50 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600">
                      <ShoppingBag className="h-6 w-6 text-white" />
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle className="text-2xl">Marketplace</CardTitle>
                  <CardDescription className="text-base">
                    Buy & sell campus essentials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Browse Market</Button>
                </CardContent>
              </Card>
            </Link>

            {/* Campus Events */}
            <Link href="/events">
              <Card className="group hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-blue-500/50 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle className="text-2xl">Campus Events</CardTitle>
                  <CardDescription className="text-base">
                    Discover what's happening
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Events</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Classes/Deadlines */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>This Week's Classes</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { course: "Data Structures", time: "Mon 9:00 AM", room: "LT5" },
                    { course: "Database Systems", time: "Wed 11:00 AM", room: "Lab 3" },
                    { course: "Software Engineering", time: "Fri 2:00 PM", room: "LT2" }
                  ].map((cls, i) => (
                    <div key={i} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <h4 className="font-semibold">{cls.course}</h4>
                      <p className="text-sm text-muted-foreground">{cls.time} • {cls.room}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { task: "CS201 Assignment", due: "Tomorrow", urgent: true },
                    { task: "Database Project", due: "Dec 20", urgent: false },
                    { task: "SE Group Presentation", due: "Dec 25", urgent: false }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <h4 className="font-semibold">{item.task}</h4>
                        <p className="text-sm text-muted-foreground">Due: {item.due}</p>
                      </div>
                      {item.urgent && <Bell className="h-5 w-5 text-red-500" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Activity & Referral */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Activity & Rewards</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <ActivityFeed />
            <ReferralCard 
              referralCode={profile?.referral_code || 'CRIB123'} 
              referralCount={stats?.referralCount || 0} 
            />
          </div>
        </div>
      </section>

      {/* Your Impact Stats */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Your Impact</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20">
                    <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">{stats.propertiesViewed}</p>
                    <p className="text-sm text-muted-foreground">Properties Viewed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/20">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">{stats.connections}</p>
                    <p className="text-sm text-muted-foreground">Connections Made</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20">
                    <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">{stats.materialsDownloaded}</p>
                    <p className="text-sm text-muted-foreground">Materials Downloaded</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/20">
                    <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">{stats.messagesSent}</p>
                    <p className="text-sm text-muted-foreground">Messages Sent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}