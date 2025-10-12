"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Building2, Users, BookOpen, Calendar, ShoppingBag, Shield, CheckCircle2, Lock, Sparkles, TrendingUp, Clock, Star } from "lucide-react"
import { 
  ProfileCompletionCard,
  LevelProgressCard,
  StreakCounter,
  AchievementBadges,
  DailyChallenges,
  ActivityFeed,
  ReferralCard,
  LeaderboardCard
} from "@/components/gamification"
import { getUserStats, updateLoginStreak } from "../../../lib/xp-systems"

export default function StudentDashboard() {
  const { profile, user } = useAuth()
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // Check verification status
  const isVerified = profile?.school_email_verified_at !== null

  // Load user stats and update streak on mount
  useEffect(() => {
    async function loadStats() {
      if (!user?.id) return
      
      try {
        // Update login streak (awards XP automatically)
        await updateLoginStreak(user.id)
        
        // Get user stats
        const userStats = await getUserStats(user.id)
        setStats(userStats)
      } catch (error) {
        console.error("Error loading stats:", error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [user?.id])

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

  return (
    <main className="min-h-screen bg-background">
      {/* Welcome Header */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 py-12 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}! 👋
              </h1>
              <p className="text-xl text-muted-foreground">
                {isVerified 
                  ? "Your dashboard is ready. Let's make today count!" 
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

      {/* Verification Banner (if not verified) */}
      {!isVerified && (
        <section className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-y border-amber-200 dark:border-amber-800 py-6 px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="border-2 border-amber-500/50 bg-background/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-amber-500/20">
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

      {/* GAMIFICATION SECTION - Progress & Stats */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            Your Progress
          </h2>

          {/* Top Row - Main Progress Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <LevelProgressCard xp={stats?.xp || 0} />
            <StreakCounter streak={stats?.loginStreak || 0} />
            <ProfileCompletionCard profile={profile} />
          </div>

          {/* Daily Challenges */}
          <div className="mb-8">
            <DailyChallenges />
          </div>

          {/* Second Row - Achievements & Leaderboard */}
          <div className="grid lg:grid-cols-2 gap-6">
            <AchievementBadges profile={profile} stats={stats} />
            <LeaderboardCard currentUserId={user?.id} />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Housing Search */}
            <Link href="/properties">
              <Card className="group hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-blue-500/50">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    {isVerified ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <CardTitle className="text-2xl">Find Housing</CardTitle>
                  <CardDescription className="text-base">
                    Browse verified properties near your campus
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant={isVerified ? "default" : "outline"}>
                    {isVerified ? "Search Properties" : "Unlock with Verification"}
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Roommate Matching */}
            <Link href={isVerified ? "/roommate/browse" : "/verify"}>
              <Card className="group hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-purple-500/50">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    {isVerified ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <CardTitle className="text-2xl">Find Roommates</CardTitle>
                  <CardDescription className="text-base">
                    AI-powered matching with compatible students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant={isVerified ? "default" : "outline"}>
                    {isVerified ? "Browse Roommates" : "Unlock with Verification"}
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Study Materials */}
            <Link href="/materials">
              <Card className="group hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-green-500/50">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle className="text-2xl">Study Materials</CardTitle>
                  <CardDescription className="text-base">
                    Access notes, past questions, and guides
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Browse Materials</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Activity & Social Section */}
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

      {/* More Tools */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">More Tools</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {/* Events */}
            <Link href="/events">
              <Card className="hover:shadow-lg transition-all h-full">
                <CardContent className="p-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 inline-flex mb-4">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Campus Events</h3>
                  <p className="text-sm text-muted-foreground mb-4">Discover parties & workshops</p>
                  <Button variant="ghost" size="sm" className="w-full">View Events</Button>
                </CardContent>
              </Card>
            </Link>

            {/* Marketplace */}
            <Link href="/market">
              <Card className="hover:shadow-lg transition-all h-full">
                <CardContent className="p-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 inline-flex mb-4">
                    <ShoppingBag className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Marketplace</h3>
                  <p className="text-sm text-muted-foreground mb-4">Buy & sell student items</p>
                  <Button variant="ghost" size="sm" className="w-full">Browse Market</Button>
                </CardContent>
              </Card>
            </Link>

            {/* Safety Hub */}
            <Link href="/safety">
              <Card className="hover:shadow-lg transition-all h-full">
                <CardContent className="p-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-red-600 inline-flex mb-4">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Safety Hub</h3>
                  <p className="text-sm text-muted-foreground mb-4">Emergency & support</p>
                  <Button variant="ghost" size="sm" className="w-full">Safety Info</Button>
                </CardContent>
              </Card>
            </Link>

            {/* Profile */}
            <Link href="/profile">
              <Card className="hover:shadow-lg transition-all h-full">
                <CardContent className="p-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 inline-flex mb-4">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">My Profile</h3>
                  <p className="text-sm text-muted-foreground mb-4">Manage your account</p>
                  <Button variant="ghost" size="sm" className="w-full">View Profile</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 px-4 bg-gradient-to-br from-primary/5 to-purple-500/5">
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
                    <p className="text-3xl font-bold text-foreground">{stats?.propertiesViewed || 0}</p>
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
                    <p className="text-3xl font-bold text-foreground">{stats?.connections || 0}</p>
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
                    <p className="text-3xl font-bold text-foreground">{stats?.materialsDownloaded || 0}</p>
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
                    <p className="text-3xl font-bold text-foreground">{stats?.messagesSent || 0}</p>
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