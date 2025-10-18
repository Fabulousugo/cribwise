

// ==========================================
// FILE: components/dashboard/GamificationSection.tsx
// Shared Gamification Component for all dashboards
// ==========================================
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
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

  useEffect(() => {
    async function loadStats() {
      if (!userId) return
      
      try {
        await updateLoginStreak(userId)
        const userStats = await getUserStats(userId)
        setStats(userStats)
      } catch (error) {
        console.error("Error loading stats:", error)
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

