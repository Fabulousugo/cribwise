// ==========================================
// FILE: app/dashboard/agent/page.tsx
// Agent/Landlord Dashboard - Business Focused (No Gamification)
// ==========================================
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { 
  Building2, 
  Plus, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle2, 
  Lock, 
  Award, 
  DollarSign, 
  Users, 
  BarChart3, 
  Sparkles,
  Clock,
  Star,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from "lucide-react"

export default function AgentDashboard() {
  const { profile, user } = useAuth()
  const [loading, setLoading] = useState(true)
  
  // Check verification status
  const isVerified = profile?.landlord_verified === true

  // Mock analytics data - replace with real Supabase queries
  const [analytics, setAnalytics] = useState({
    totalViews: 1247,
    viewsChange: +12.5,
    totalInquiries: 89,
    inquiriesChange: +8.2,
    responseTime: "1.2 hrs",
    responseImprovement: -0.3,
    conversionRate: 7.1,
    conversionChange: +2.3,
    totalProperties: 8,
    activeListings: 6,
    totalRevenue: 450000,
    revenueChange: +15.4,
    occupancyRate: 92,
    avgRating: 4.8
  })

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500)
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
  
  return (
    <main className="min-h-screen bg-background">
      {/* Welcome Header */}
      <section className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 py-12 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-foreground">
                  Welcome, {profile?.full_name?.split(' ')[0] || 'Agent'}! 🏘️
                </h1>
                {isVerified && (
                  <Badge className="bg-emerald-500 text-white">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
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

      {/* BUSINESS PERFORMANCE SECTION (Replaces Gamification) */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-primary" />
              Performance Analytics
            </h2>
            <Button variant="outline" asChild>
              <Link href="/analytics">View Detailed Report</Link>
            </Button>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {/* Total Views */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    analytics.viewsChange > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {analytics.viewsChange > 0 ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    <span className="font-semibold">{Math.abs(analytics.viewsChange)}%</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">
                  {analytics.totalViews.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Views (30 days)</p>
              </CardContent>
            </Card>

            {/* Inquiries */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    analytics.inquiriesChange > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {analytics.inquiriesChange > 0 ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    <span className="font-semibold">{Math.abs(analytics.inquiriesChange)}%</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{analytics.totalInquiries}</p>
                <p className="text-sm text-muted-foreground">Inquiries Received</p>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    analytics.responseImprovement < 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {analytics.responseImprovement < 0 ? (
                      <ArrowDownRight className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                    <span className="font-semibold">{Math.abs(analytics.responseImprovement)}h</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{analytics.responseTime}</p>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
              </CardContent>
            </Card>

            {/* Conversion Rate */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    analytics.conversionChange > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {analytics.conversionChange > 0 ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    <span className="font-semibold">{Math.abs(analytics.conversionChange)}%</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{analytics.conversionRate}%</p>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Insights */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue Tracking */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Revenue Overview
                  </CardTitle>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    +{analytics.revenueChange}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-foreground">
                        ₦{(analytics.totalRevenue / 1000).toFixed(0)}k
                      </span>
                      <span className="text-muted-foreground">this month</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Total rental income across all properties
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Occupancy Rate</span>
                      <span className="font-semibold">{analytics.occupancyRate}%</span>
                    </div>
                    <Progress value={analytics.occupancyRate} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{analytics.activeListings}</p>
                      <p className="text-xs text-muted-foreground">Active Listings</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{analytics.avgRating}</p>
                      <p className="text-xs text-muted-foreground">Avg Rating</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-600" />
                  Landlord Performance Score
                </CardTitle>
                <CardDescription>
                  Your overall performance across key metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Overall Score */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mb-4">
                      <span className="text-5xl font-black text-white">87</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You are in the <span className="font-semibold text-amber-600">Top 15%</span> of landlords
                    </p>
                  </div>

                  {/* Score Breakdown */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Listing Quality</span>
                        <span className="font-semibold">92/100</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Response Time</span>
                        <span className="font-semibold">85/100</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Tenant Satisfaction</span>
                        <span className="font-semibold">96/100</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions - Properties */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Property Management</h2>
            <Link href="/properties/new">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add New Property
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20">
                    <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground mb-2">{analytics.totalProperties}</p>
                <p className="text-sm text-muted-foreground">Total Properties</p>
                <Link href="/properties">
                  <Button variant="ghost" size="sm" className="w-full mt-3">
                    Manage All
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20">
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground mb-2">{analytics.activeListings}</p>
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <Link href="/properties?status=active">
                  <Button variant="ghost" size="sm" className="w-full mt-3">
                    View Active
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/20">
                    <Eye className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground mb-2">
                  {analytics.totalViews.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <Link href="/analytics">
                  <Button variant="ghost" size="sm" className="w-full mt-3">
                    View Report
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/20">
                    <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <Badge variant="destructive" className="animate-pulse">
                    {analytics.totalInquiries}
                  </Badge>
                </div>
                <p className="text-3xl font-bold text-foreground mb-2">New</p>
                <p className="text-sm text-muted-foreground">Inquiries</p>
                <Link href="/messages">
                  <Button variant="ghost" size="sm" className="w-full mt-3">
                    View Messages
                  </Button>
                </Link>
              </CardContent>
            </Card>
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
                <h3 className="font-bold text-lg mb-2">Advanced Analytics</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Track views, inquiries, and conversion rates with detailed charts
                </p>
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
                <p className="text-sm text-muted-foreground mb-4">
                  View verified student profiles, ratings, and rental history
                </p>
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
                <p className="text-sm text-muted-foreground mb-4">
                  Monitor payments, rental income, and financial reports
                </p>
                <Button variant="ghost" size="sm" className="w-full" disabled={!isVerified}>
                  {isVerified ? "View Revenue" : "Requires Verification"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Inquiries */}
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
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-foreground">Chioma Adeleke</p>
                        <p className="text-sm text-muted-foreground">University of Lagos Student • Verified</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                        <Badge variant="secondary" className="ml-2">New</Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      &quot;Hi! I&apos;m interested in your 2-bedroom apartment in Yaba. Is it still available? Can I schedule a viewing this weekend?&quot;
                    </p>
                    <div className="flex gap-2">
                      <Link href="/messages/1">
                        <Button size="sm">Reply to Inquiry</Button>
                      </Link>
                      <Button size="sm" variant="outline">View Profile</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sample Message 2 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-foreground">Emmanuel Okafor</p>
                        <p className="text-sm text-muted-foreground">UNILAG Student • Verified</p>
                      </div>
                      <span className="text-xs text-muted-foreground">1 day ago</span>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      &quot;What&apos;s the payment plan for the self-contain in Akoka? Do you accept installments?&quot;
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

      {/* Tips for Success */}
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