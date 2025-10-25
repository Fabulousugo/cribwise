/* eslint-disable @typescript-eslint/no-explicit-any */
// ==========================================
// FILE: components/dashboard/GamificationSection.tsx
// Fixed Gamification Component with Error Handling
// ==========================================
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Award, Zap } from "lucide-react"
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

// Import your XP functions (but wrapped in try-catch)
import { getUserStats, updateLoginStreak } from "@/lib/xp-systems"

export function GamificationSection({ 
  userId, 
  profile 
}: { 
  userId: string
  profile: any 
}) {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStats() {
      // Don't try to load if userId is a placeholder
      if (!userId || userId === 'user-id-placeholder' || userId === 'placeholder') {
        console.log("Using mock data - no real userId provided")
        setStats({
          xp: 0,
          level: 1,
          loginStreak: 0,
          totalAchievements: 0,
          referralCount: 0
        })
        setLoading(false)
        return
      }
      
      try {
        // Try to update login streak
        await updateLoginStreak(userId)
        
        // Get user stats
        const userStats = await getUserStats(userId)
        setStats(userStats)
        setError(null)
      } catch (error) {
        console.error("Error loading gamification stats:", error)
        setError("Failed to load stats")
        
        // Set default mock stats on error
        setStats({
          xp: 0,
          level: 1,
          loginStreak: 0,
          totalAchievements: 0,
          referralCount: 0
        })
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [userId])

  if (loading) {
    return (
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-48"></div>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show error state if needed (but don't block the UI)
  if (error) {
    return (
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            Your Progress
          </h2>

          {/* Error Card */}
          <Card className="border-2 border-amber-500/50 bg-amber-50 dark:bg-amber-950/20 mb-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/20">
                  <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Gamification Setup Needed
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Your gamification stats couldn&apos;t be loaded. This usually means the database tables haven&apos;t been set up yet.
                  </p>
                  <details className="text-sm text-muted-foreground">
                    <summary className="cursor-pointer font-medium">View Setup Instructions</summary>
                    <div className="mt-2 p-3 bg-muted/50 rounded">
                      <p className="mb-2">Run these SQL commands in Supabase:</p>
                      <code className="text-xs block">
                        -- See lib/xp-systems.ts for full schema
                      </code>
                    </div>
                  </details>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Show mock UI anyway */}
          <div className="grid md:grid-cols-3 gap-6 mb-8 opacity-50">
            <LevelProgressCard xp={0} />
            <StreakCounter streak={0} />
            <ProfileCompletionCard profile={profile} />
          </div>

          <p className="text-center text-muted-foreground">
            Setup gamification database to enable XP, levels, and achievements
          </p>
        </div>
      </section>
    )
  }

  return (
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
          <LeaderboardCard currentUserId={userId} />
        </div>
      </div>
    </section>
  )
}