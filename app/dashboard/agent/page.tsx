"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Building2, Plus, Eye, MessageSquare, TrendingUp, CheckCircle2, Lock, Award, DollarSign, Users, BarChart3, Sparkles } from "lucide-react"
import { 
  LevelProgressCard,
  StreakCounter,
  ProfileCompletionCard,
  AchievementBadges,
  ActivityFeed,
  ReferralCard,
  LeaderboardCard
} from "@/components/gamification"
import { getUserStats, updateLoginStreak } from "../../../lib/xp-systems"

export default function AgentDashboard() {
  const { profile, user } = useAuth()
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // Check verification status
  const isVerified = profile?.landlord_verified === true

  // Load user stats
  useEffect(() => {
    async function loadStats() {
      if (!user?.id) return
      
      try {
        await updateLoginStreak(user.id)
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
      <section className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 py-12 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Welcome, {profile?.full_name?.split(' ')[0] || 'Agent'}! 🏘️
              </h1>
              <p className="text-xl text-muted-foreground">
                {isVerified 
                  ? "Manage your properties and connect with quality tenants" 
                  : "Get verified to unlock premium landlord features"}
              </p>
            </div>
            {!isVerified && (
              <Link href="/verify-landlord">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                  <Award className="mr-2 h-5 w-5" />
                  Get Verified Badge
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
                    <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Become a Verified Landlord - Get 3x More Inquiries
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Verified landlords get a trust badge, priority placement, and access to premium features like AI listing generator and tenant screening.
                    </p>
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Trust Badge</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <span>Priority Listing</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <span>AI Generator</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <span>Analytics Dashboard</span>
                      </div>
                    </div>
                    <Link href="/verify-landlord">
                      <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                        Start Verification
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
            Your Performance
          </h2>

          {/* Top Row - Main Progress Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <LevelProgressCard xp={stats?.xp || 0} />
            <StreakCounter streak={stats?.loginStreak || 0} />
            <ProfileCompletionCard profile={profile} />
          </div>

          {/* Achievements & Leaderboard */}
          <div className="grid lg:grid-cols-2 gap-6">
            <AchievementBadges profile={profile} stats={stats} />
            <LeaderboardCard currentUserId={user?.id} />
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Overview</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20">
                    <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  {isVerified && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">5</p>
                <p className="text-sm text-muted-foreground">Active Listings</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/20">
                    <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">1.2K</p>
                <p className="text-sm text-muted-foreground">Total Views (30d)</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20">
                    <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">23</p>
                <p className="text-sm text-muted-foreground">New Inquiries</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/20">
                    <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">+18%</p>
                <p className="text-sm text-muted-foreground">Growth Rate</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Property Management</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Add Property */}
            <Link href="/agent/properties/add">
              <Card className="group hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-blue-500/50">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                      <Plus className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">Add New Property</CardTitle>
                  <CardDescription className="text-base">
                    List a new property to reach thousands of students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Create Listing</Button>
                </CardContent>
              </Card>
            </Link>

            {/* AI Generator */}
            <Link href={isVerified ? "/agent/properties/generate" : "/verify-landlord"}>
              <Card className="group hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-purple-500/50">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    {!isVerified && <Lock className="h-5 w-5 text-muted-foreground" />}
                  </div>
                  <CardTitle className="text-2xl">AI Listing Generator</CardTitle>
                  <CardDescription className="text-base">
                    Create professional listings with AI & voice input
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant={isVerified ? "default" : "outline"}>
                    {isVerified ? "Generate Listing" : "Unlock with Verification"}
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* My Properties */}
            <Link href="/agent/properties">
              <Card className="group hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-green-500/50">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle className="text-2xl">My Properties</CardTitle>
                  <CardDescription className="text-base">
                    Manage, edit, and track your listings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View All</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Activity & Referrals */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Activity & Growth</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <ActivityFeed />
            <ReferralCard 
              referralCode={profile?.referral_code || 'CRIB123'} 
              referralCount={stats?.referralCount || 0} 
            />
          </div>
        </div>
      </section>

      {/* Premium Features (Locked if not verified) */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Premium Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Analytics */}
            <Card className={!isVerified ? "opacity-60" : ""}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 inline-flex">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  {!isVerified && <Lock className="h-5 w-5 text-muted-foreground" />}
                </div>
                <h3 className="font-bold text-lg mb-2">Analytics Dashboard</h3>
                <p className="text-sm text-muted-foreground mb-4">Track views, inquiries, and conversion rates</p>
                <Button variant="ghost" size="sm" className="w-full" disabled={!isVerified}>
                  {isVerified ? "View Analytics" : "Requires Verification"}
                </Button>
              </CardContent>
            </Card>

            {/* Tenant Screening */}
            <Card className={!isVerified ? "opacity-60" : ""}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 inline-flex">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  {!isVerified && <Lock className="h-5 w-5 text-muted-foreground" />}
                </div>
                <h3 className="font-bold text-lg mb-2">Tenant Screening</h3>
                <p className="text-sm text-muted-foreground mb-4">View verified student profiles and ratings</p>
                <Button variant="ghost" size="sm" className="w-full" disabled={!isVerified}>
                  {isVerified ? "Screen Tenants" : "Requires Verification"}
                </Button>
              </CardContent>
            </Card>

            {/* Revenue Tracking */}
            <Card className={!isVerified ? "opacity-60" : ""}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 inline-flex">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  {!isVerified && <Lock className="h-5 w-5 text-muted-foreground" />}
                </div>
                <h3 className="font-bold text-lg mb-2">Revenue Tracking</h3>
                <p className="text-sm text-muted-foreground mb-4">Monitor payments and rental income</p>
                <Button variant="ghost" size="sm" className="w-full" disabled={!isVerified}>
                  {isVerified ? "View Revenue" : "Requires Verification"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Messages Preview */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Recent Inquiries</h2>
            <Link href="/messages">
              <Button variant="outline">View All Messages</Button>
            </Link>
          </div>
          <div className="grid gap-4">
            {/* Sample Message 1 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-foreground">Chioma Adeleke</p>
                        <p className="text-sm text-muted-foreground">University of Lagos Student</p>
                      </div>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      "Hi! I'm interested in your 2-bedroom apartment in Yaba. Is it still available? Can I schedule a viewing?"
                    </p>
                    <Link href="/messages/1">
                      <Button size="sm">Reply to Inquiry</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sample Message 2 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-foreground">Emmanuel Okafor</p>
                        <p className="text-sm text-muted-foreground">UNILAG Student</p>
                      </div>
                      <span className="text-xs text-muted-foreground">1 day ago</span>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      "What's the payment plan for the self-contain in Akoka? Do you accept installments?"
                    </p>
                    <Link href="/messages/2">
                      <Button size="sm" variant="outline">Reply</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tips for Agents */}
      <section className="py-12 px-4 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Tips to Get More Tenants</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">📸</div>
                <h3 className="font-bold text-lg mb-2 text-foreground">High-Quality Photos</h3>
                <p className="text-sm text-muted-foreground">
                  Properties with 5+ clear photos get 3x more inquiries. Show every room in good lighting.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Quick Responses</h3>
                <p className="text-sm text-muted-foreground">
                  Reply to inquiries within 2 hours. Fast responses increase your booking rate by 60%.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Get Verified</h3>
                <p className="text-sm text-muted-foreground">
                  Verified landlords appear first in search and earn 3x more trust from students.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}