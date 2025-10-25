// ==========================================
// EXAMPLE: Prospective Student Dashboard with Gamification
// FILE: app/dashboard/prospective/page.tsx
// ==========================================
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GraduationCap, FileText, BookOpen, TrendingUp } from "lucide-react"
import {
  LevelProgressCard,
  StreakCounter,
  ProfileCompletionCard,
  LeaderboardCard,
  ActivityFeed,
  ReferralCard
} from "@/components/gamification"
import { CustomDailyChallenges } from "@/components/gamification/CustomDailyChallenges"
import { CustomAchievements } from "@/components/gamification/CustomAchievements"
import { prospectiveStudentChallenges, prospectiveAchievements } from "@/lib/gamification-configs"

export default function ProspectiveDashboard() {
  const [stats, setStats] = useState({
    xp: 750,
    loginStreak: 3,
    referralCount: 1
  })
  
  const [profile] = useState({
    full_name: "Future Student",
    avatar_url: null,
    bio: null,
    school_email_verified_at: null,
    preferences: null,
    referral_code: "ADMIT2025"
  })

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      {/* Welcome Header */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 py-12 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent mb-2">
            Welcome, Future Student! 🎓
          </h1>
          <p className="text-lg text-muted-foreground">
            Let&apos;s get you ready for your university journey
          </p>
        </div>
      </section>

      {/* GAMIFICATION SECTION */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            Your Admission Progress
          </h2>

          {/* Progress Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <LevelProgressCard xp={stats.xp} />
            <StreakCounter streak={stats.loginStreak} />
            <ProfileCompletionCard profile={profile} />
          </div>

          {/* Admission Challenges */}
          <div className="mb-8">
            <CustomDailyChallenges challenges={prospectiveStudentChallenges} />
          </div>

          {/* Achievements & Leaderboard */}
          <div className="grid lg:grid-cols-2 gap-6">
            <CustomAchievements achievements={prospectiveAchievements} stats={stats} />
            <LeaderboardCard currentUserId="prospective-user" />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Get Started</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/admissions/checklist">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
                <CardHeader>
                  <FileText className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle className="text-lg">Admission Checklist</CardTitle>
                  <CardDescription>Track your application progress</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/admissions">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
                <CardHeader>
                  <GraduationCap className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">Browse Schools</CardTitle>
                  <CardDescription>Find your perfect university</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/materials">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-green-600 mb-2" />
                  <CardTitle className="text-lg">Study Materials</CardTitle>
                  <CardDescription>Prep for entrance exams</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Activity & Referral */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            <ActivityFeed />
            <ReferralCard 
              referralCode={profile.referral_code} 
              referralCount={stats.referralCount} 
            />
          </div>
        </div>
      </section>
    </main>
  )
}