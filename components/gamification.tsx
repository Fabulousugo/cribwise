"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Trophy, Star, Flame, Target, Award, TrendingUp, Zap, 
  CheckCircle2, Lock, Users, Building2, BookOpen, MessageSquare,
  Calendar, Eye, Plus, Mail, Home, Sparkles, Gift, Crown
} from "lucide-react"

// ============================================
// 1. PROFILE COMPLETION CARD
// ============================================
interface ProfileCompletionCardProps {
  profile: any
}

export function ProfileCompletionCard({ profile }: ProfileCompletionCardProps) {
  const tasks = [
    { id: "name", label: "Add your name", completed: !!profile?.full_name, xp: 10 },
    { id: "avatar", label: "Upload profile picture", completed: !!profile?.avatar_url, xp: 20 },
    { id: "phone", label: "Add phone number", completed: !!profile?.phone, xp: 10 },
    { id: "email", label: "Verify email", completed: !!profile?.school_email_verified_at, xp: 50 },
    { id: "university", label: "Add university", completed: !!profile?.university, xp: 15 },
    { id: "bio", label: "Write a bio", completed: !!profile?.bio, xp: 15 },
  ]

  const completedTasks = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length
  const completion = Math.round((completedTasks / totalTasks) * 100)
  const totalXp = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.xp, 0)

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Profile Completion</span>
          </div>
          <span className="text-3xl font-black text-primary">{completion}%</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={completion} className="h-3" />
        
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                task.completed
                  ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
                  : "border-border bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-3">
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-success" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-muted-foreground"></div>
                )}
                <span className={`text-sm ${task.completed ? "line-through text-muted-foreground" : "font-medium text-foreground"}`}>
                  {task.label}
                </span>
              </div>
              <Badge variant="secondary" className={task.completed ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-success" : ""}>
                +{task.xp} XP
              </Badge>
            </div>
          ))}
        </div>

        {completion < 100 && (
          <div className="pt-2">
            <Link href="/profile/edit">
              <Button className="w-full">Complete Profile</Button>
            </Link>
          </div>
        )}

        {completion === 100 && (
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
            <Trophy className="h-8 w-8 text-green-600 dark:text-success mx-auto mb-2" />
            <p className="font-bold text-green-600 dark:text-success">Profile Complete!</p>
            <p className="text-sm text-muted-foreground">You earned {totalXp} XP 🎉</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ============================================
// 2. LEVEL & XP CARD
// ============================================
interface LevelProgressCardProps {
  xp?: number
}

export function LevelProgressCard({ xp = 0 }: LevelProgressCardProps) {
  const xpPerLevel = 100
  const currentLevel = Math.floor(xp / xpPerLevel) + 1
  const xpInCurrentLevel = xp % xpPerLevel
  const xpToNextLevel = xpPerLevel - xpInCurrentLevel
  const progressPercent = (xpInCurrentLevel / xpPerLevel) * 100

  const getLevelTitle = (level: number) => {
    if (level < 5) return "Newbie"
    if (level < 10) return "Explorer"
    if (level < 20) return "Veteran"
    if (level < 50) return "Expert"
    return "Legend"
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-2 border-purple-200 dark:border-purple-800">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Level</p>
            <p className="text-5xl font-black bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              {currentLevel}
            </p>
            <p className="text-sm font-medium text-muted-foreground mt-1">{getLevelTitle(currentLevel)}</p>
          </div>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
            {currentLevel < 10 ? (
              <Trophy className="h-10 w-10 text-primary-foreground" />
            ) : currentLevel < 20 ? (
              <Star className="h-10 w-10 text-primary-foreground" />
            ) : (
              <Crown className="h-10 w-10 text-primary-foreground" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress to Level {currentLevel + 1}</span>
            <span className="font-bold text-foreground">{xpInCurrentLevel}/{xpPerLevel} XP</span>
          </div>
          <Progress value={progressPercent} className="h-3" />
          <p className="text-xs text-muted-foreground text-center">
            {xpToNextLevel} XP needed to level up
          </p>
        </div>

        <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">{xp}</p>
            <p className="text-xs text-muted-foreground">Total XP</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{currentLevel}</p>
            <p className="text-xs text-muted-foreground">Current Level</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// 3. ACHIEVEMENT BADGES
// ============================================
interface AchievementBadgesProps {
  profile: any
  stats?: any
}

export function AchievementBadges({ profile, stats = {} }: AchievementBadgesProps) {
  const badges = [
    {
      id: "verified",
      icon: Award,
      name: "Verified",
      description: "Completed verification",
      unlocked: profile?.school_email_verified_at !== null || profile?.landlord_verified,
      color: "from-green-500 to-emerald-500",
      textColor: "text-green-600 dark:text-success"
    },
    {
      id: "early_adopter",
      icon: Star,
      name: "Early Adopter",
      description: "Joined in first 1000",
      unlocked: parseInt(profile?.id) < 1000,
      color: "from-yellow-500 to-orange-500",
      textColor: "text-yellow-600 dark:text-yellow-400"
    },
    {
      id: "streak_7",
      icon: Flame,
      name: "On Fire",
      description: "7-day login streak",
      unlocked: (stats?.loginStreak || 0) >= 7,
      color: "from-orange-500 to-red-500",
      textColor: "text-orange-600 dark:text-orange-400"
    },
    {
      id: "social",
      icon: Users,
      name: "Networker",
      description: "10+ connections",
      unlocked: (stats?.connections || 0) >= 10,
      color: "from-primary to-accent",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      id: "helpful",
      icon: Gift,
      name: "Helper",
      description: "5+ resources shared",
      unlocked: (stats?.resourcesShared || 0) >= 5,
      color: "from-purple-500 to-pink-500",
      textColor: "text-purple-600 dark:text-purple-400"
    },
    {
      id: "explorer",
      icon: Eye,
      name: "Explorer",
      description: "Viewed 50+ properties",
      unlocked: (stats?.propertiesViewed || 0) >= 50,
      color: "from-teal-500 to-cyan-500",
      textColor: "text-teal-600 dark:text-teal-400"
    }
  ]

  const unlockedCount = badges.filter(b => b.unlocked).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span>Achievements</span>
          </div>
          <Badge variant="secondary">{unlockedCount}/{badges.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`relative p-4 rounded-xl border-2 text-center transition-all hover:scale-105 ${
                badge.unlocked
                  ? "border-primary/20 bg-gradient-to-br from-primary/5 to-transparent cursor-pointer"
                  : "border-muted bg-muted/30 opacity-50"
              }`}
            >
              {badge.unlocked ? (
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg`}>
                  <badge.icon className="h-6 w-6 text-primary-foreground" />
                </div>
              ) : (
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
                  <Lock className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <p className={`font-bold text-sm mb-1 ${badge.unlocked ? badge.textColor : "text-muted-foreground"}`}>
                {badge.name}
              </p>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
              {badge.unlocked && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// 4. STREAK COUNTER
// ============================================
interface StreakCounterProps {
  streak?: number
}

export function StreakCounter({ streak = 0 }: StreakCounterProps) {
  const getStreakMessage = (streak: number) => {
    if (streak === 0) return "Start your streak today!"
    if (streak < 3) return "Keep it going!"
    if (streak < 7) return "You're on fire! 🔥"
    if (streak < 30) return "Amazing streak!"
    return "Legendary! 🏆"
  }

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-2 border-orange-200 dark:border-orange-800">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">Daily Streak</p>
            <p className="text-5xl font-black text-foreground mb-2">{streak}</p>
            <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
              {getStreakMessage(streak)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Login daily to maintain your streak
            </p>
          </div>
          <Flame className={`h-16 w-16 ${streak > 0 ? "text-orange-500" : "text-muted-foreground"}`} />
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// 5. DAILY CHALLENGES
// ============================================
interface DailyChallengesProps {
  challenges?: any[]
}

export function DailyChallenges({ challenges }: DailyChallengesProps) {
  const defaultChallenges = [
    { 
      id: "view_properties", 
      title: "View 5 properties", 
      description: "Browse housing options",
      progress: 2, 
      goal: 5, 
      xp: 25, 
      icon: Building2,
      completed: false 
    },
    { 
      id: "send_messages", 
      title: "Send 3 messages", 
      description: "Connect with others",
      progress: 0, 
      goal: 3, 
      xp: 30, 
      icon: MessageSquare,
      completed: false 
    },
    { 
      id: "check_materials", 
      title: "Browse study materials", 
      description: "Check out resources",
      progress: 0, 
      goal: 1, 
      xp: 15, 
      icon: BookOpen,
      completed: false 
    },
    { 
      id: "attend_event", 
      title: "RSVP to an event", 
      description: "Join campus activities",
      progress: 0, 
      goal: 1, 
      xp: 20, 
      icon: Calendar,
      completed: false 
    },
  ]

  const activeChallenges = challenges || defaultChallenges
  const completedCount = activeChallenges.filter(c => c.completed).length

  return (
    <Card className="border-2 border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            <span>Daily Challenges</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{completedCount}/{activeChallenges.length}</Badge>
            <Badge variant="outline" className="text-xs">Resets in 18h</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeChallenges.map((challenge) => {
          const progressPercent = (challenge.progress / challenge.goal) * 100

          return (
            <div
              key={challenge.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                challenge.completed
                  ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 rounded-lg ${challenge.completed ? "bg-green-100 dark:bg-green-900/30" : "bg-primary/10"}`}>
                  <challenge.icon className={`h-5 w-5 ${challenge.completed ? "text-green-600 dark:text-success" : "text-primary"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`font-bold ${challenge.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {challenge.title}
                    </p>
                    <Badge 
                      variant="secondary" 
                      className={challenge.completed ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-success" : ""}
                    >
                      +{challenge.xp} XP
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{challenge.description}</p>
                  <Progress value={progressPercent} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {challenge.progress}/{challenge.goal} completed
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

// ============================================
// 6. ACTIVITY FEED
// ============================================
interface ActivityFeedProps {
  activities?: any[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const defaultActivities = [
    { id: 1, text: "Viewed Modern 2BR Apartment", time: "2 hours ago", icon: Eye, xp: 5, type: "view" },
    { id: 2, text: "Sent message to landlord", time: "5 hours ago", icon: MessageSquare, xp: 10, type: "message" },
    { id: 3, text: "Completed profile", time: "1 day ago", icon: CheckCircle2, xp: 50, type: "achievement" },
    { id: 4, text: "Added roommate preferences", time: "2 days ago", icon: Users, xp: 30, type: "profile" },
    { id: 5, text: "Downloaded study materials", time: "3 days ago", icon: BookOpen, xp: 15, type: "resource" },
  ]

  const feed = activities || defaultActivities

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {feed.map((activity) => {
            const IconComponent = activity.icon

            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <IconComponent className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    {activity.xp && (
                      <Badge variant="secondary" className="text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-success">
                        +{activity.xp} XP
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// 7. REFERRAL CARD
// ============================================
interface ReferralCardProps {
  referralCode?: string
  referralCount?: number
}

export function ReferralCard({ referralCode = "CRIB123", referralCount = 0 }: ReferralCardProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://cribwise.com/register?ref=${referralCode}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const xpEarned = referralCount * 100

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-200 dark:border-purple-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span>Refer & Earn</span>
          </div>
          <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
            100 XP per friend
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">Your Referral Code</p>
          <p className="text-2xl font-black text-foreground font-mono tracking-wider">{referralCode}</p>
        </div>

        <div className="flex gap-2">
          <input title="referralCode"
            type="text"
            value={`cribwise.com/register?ref=${referralCode}`}
            readOnly
            className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
          />
          <Button onClick={handleCopy} className="flex-shrink-0">
            {copied ? "Copied!" : "Copy Link"}
          </Button>
        </div>

        {referralCount > 0 && (
          <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
            <p className="text-sm font-bold text-green-600 dark:text-success text-center">
              🎉 {referralCount} friends joined • {xpEarned} XP earned!
            </p>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center">
          Share with friends to earn rewards for both of you
        </p>
      </CardContent>
    </Card>
  )
}

// ============================================
// 8. LEADERBOARD CARD
// ============================================
interface LeaderboardCardProps {
  users?: any[]
  currentUserId?: string
}

export function LeaderboardCard({ users = [], currentUserId }: LeaderboardCardProps) {
  const defaultUsers = [
    { id: "1", name: "Sarah Johnson", points: 2450, avatar: null, level: 24 },
    { id: "2", name: "Michael Chen", points: 2380, avatar: null, level: 23 },
    { id: "3", name: "Amara Okafor", points: 2100, avatar: null, level: 21 },
    { id: "4", name: "David Adeyemi", points: 1950, avatar: null, level: 19 },
    { id: "5", name: "Grace Nwosu", points: 1850, avatar: null, level: 18 },
  ]

  const topUsers = users.length > 0 ? users.slice(0, 10) : defaultUsers

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span>Leaderboard</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">Top contributors this week</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {topUsers.map((user, index) => {
            const isCurrentUser = user.id === currentUserId
            const medalColors = ["text-yellow-500", "text-gray-400", "text-orange-500"]

            return (
              <div
                key={user.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isCurrentUser
                    ? "bg-primary/10 border-2 border-primary"
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  index < 3
                    ? "bg-gradient-to-br from-yellow-200 to-yellow-300 dark:from-yellow-800 dark:to-yellow-900 text-yellow-900 dark:text-yellow-100"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm truncate ${isCurrentUser ? "text-primary" : "text-foreground"}`}>
                    {user.name}
                    {isCurrentUser && " (You)"}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{user.points.toLocaleString()} XP</span>
                    <span>•</span>
                    <span>Level {user.level}</span>
                  </div>
                </div>

                {index < 3 && (
                  <Trophy className={`h-5 w-5 ${medalColors[index]}`} />
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}