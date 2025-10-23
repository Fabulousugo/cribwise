// ==========================================
// FILE: app/dashboard/admitted/page.tsx
// Dashboard for Admitted Students (Enhanced with Gamification)
// ==========================================
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { 
  Home,
  Users,
  FileCheck,
  CreditCard,
  MapPin,
  Sparkles,
  CheckCircle2,
  Calendar,
  Award,
  Zap,
  TrendingUp,
  Clock
} from "lucide-react"
import { GamificationSection } from "../GamificationSection"
import { VerificationBanner } from "../VerificationBanner"

const CHECKLIST_ITEMS = [
  { id: 1, task: "Accept Admission on JAMB CAPS", done: true, xp: 50 },
  { id: 2, task: "Pay Acceptance Fee", done: true, xp: 100 },
  { id: 3, task: "Find Accommodation", done: false, urgent: true, xp: 200 },
  { id: 4, task: "Find Roommate", done: false, urgent: true, xp: 150 },
  { id: 5, task: "Pay School Fees", done: false, xp: 100 },
  { id: 6, task: "Register for Courses", done: false, xp: 150 },
  { id: 7, task: "Attend Orientation", done: false, xp: 100 },
  { id: 8, task: "Get Student ID", done: false, xp: 75 }
]

export default function AdmittedDashboard() {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [checklist, setChecklist] = useState(CHECKLIST_ITEMS)
  const [showXPAnimation, setShowXPAnimation] = useState(false)
  const [earnedXP, setEarnedXP] = useState(0)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProfile({
        full_name: "Admitted Student",
        school_email_verified_at: null, // Change to Date for verified
        university: "University of Lagos",
        department: "Computer Science",
        admission_year: "2025"
      })
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleChecklistToggle = (id: number) => {
    const item = checklist.find(i => i.id === id)
    if (!item || item.done) return

    // Toggle item
    setChecklist(prev => prev.map(i => 
      i.id === id ? { ...i, done: true } : i
    ))

    // Award XP
    setEarnedXP(item.xp)
    setShowXPAnimation(true)
    setTimeout(() => setShowXPAnimation(false), 2000)

    // TODO: Save to database and award actual XP
    // await awardXP(userId, item.xp, `checklist_${id}`)
  }

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
  const completedTasks = checklist.filter(item => item.done).length
  const totalTasks = checklist.length
  const progressPercentage = (completedTasks / totalTasks) * 100
  const totalPossibleXP = checklist.reduce((sum, item) => sum + item.xp, 0)
  const earnedTotalXP = checklist.filter(i => i.done).reduce((sum, item) => sum + item.xp, 0)

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      {/* XP Animation */}
      {showXPAnimation && (
        <div className="fixed top-20 right-8 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-primary-foreground px-6 py-3 rounded-full shadow-2xl flex items-center gap-2">
            <Zap className="h-5 w-5" />
            <span className="font-bold">+{earnedXP} XP</span>
          </div>
        </div>
      )}

      {/* Welcome Header */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 py-12 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Welcome, {profile?.full_name?.split(' ')[0] || 'Future Student'}! 🎓
              </h1>
              <p className="text-xl text-muted-foreground">
                You've been admitted to {profile?.university}
              </p>
              <p className="text-muted-foreground mt-1">
                {profile?.department} • Class of {profile?.admission_year}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Banner */}
      <VerificationBanner isVerified={isVerified} />

      {/* Congratulations Card */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="border-2 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-black text-green-900 dark:text-green-100 mb-2">
                    🎉 Congratulations on Your Admission!
                  </h2>
                  <p className="text-green-800 dark:text-green-200 mb-4">
                    You've been admitted to <span className="font-bold">{profile?.university}</span>. 
                    Complete your checklist below to get ready for resumption!
                  </p>
                  
                  {/* Progress Summary */}
                  <div className="bg-white/50 dark:bg-slate-900/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold">Overall Progress</span>
                      <span className="text-green-700 dark:text-success font-bold">
                        {completedTasks}/{totalTasks} tasks completed
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{Math.round(progressPercentage)}% Complete</span>
                      <span className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {earnedTotalXP}/{totalPossibleXP} XP
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pre-Arrival Checklist */}
      <section className="py-8 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <FileCheck className="h-6 w-6 text-primary" />
                    Pre-Arrival Checklist
                  </CardTitle>
                  <CardDescription>Complete these before resumption to earn XP!</CardDescription>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Award className="h-4 w-4 mr-2" />
                  {earnedTotalXP} XP
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {checklist.map((item) => (
                <div 
                  key={item.id} 
                  className={`group flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                    item.done 
                      ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                      : item.urgent 
                        ? 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800 hover:shadow-md cursor-pointer' 
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-md cursor-pointer'
                  }`}
                  onClick={() => handleChecklistToggle(item.id)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    {item.done ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-primary flex-shrink-0"></div>
                    )}
                    <div className="flex-1">
                      <span className={`font-medium ${item.done ? 'line-through text-muted-foreground' : ''}`}>
                        {item.task}
                      </span>
                      {!item.done && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Click to mark as complete • Earn {item.xp} XP
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.urgent && !item.done && (
                      <Badge className="bg-orange-500">Urgent</Badge>
                    )}
                    {!item.done && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        {item.xp} XP
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Link href="/properties">
              <Card className="group hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-blue-500/50 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                      <Home className="h-6 w-6 text-primary-foreground" />
                    </div>
                    {!isVerified && <Badge variant="outline">Verify to unlock</Badge>}
                  </div>
                  <CardTitle className="text-xl">Find Housing</CardTitle>
                  <CardDescription>Search verified properties near campus</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Browse Properties</Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/roommates">
              <Card className="group hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-purple-500/50 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600">
                      <Users className="h-6 w-6 text-primary-foreground" />
                    </div>
                    {!isVerified && <Badge variant="outline">Verify to unlock</Badge>}
                  </div>
                  <CardTitle className="text-xl">Find Roommate</CardTitle>
                  <CardDescription>Get matched with peers</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Find Match</Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/materials">
              <Card className="group hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-green-500/50 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600">
                      <FileCheck className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">Survival Guide</CardTitle>
                  <CardDescription>Download fresher materials</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Get Materials</Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/marketplace">
              <Card className="group hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-orange-500/50 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600">
                      <CreditCard className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">Buy Essentials</CardTitle>
                  <CardDescription>Student marketplace</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Browse Market</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-2xl">Important Dates</CardTitle>
              </div>
              <CardDescription>Mark your calendar for these key events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { event: "Matriculation Ceremony", date: "March 15, 2025", days: 142 },
                  { event: "Orientation Week", date: "March 8-12, 2025", days: 135 },
                  { event: "First Day of Classes", date: "March 18, 2025", days: 145 }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <span className="font-semibold text-foreground block">{item.event}</span>
                        <span className="text-sm text-muted-foreground">{item.date}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.days} days
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Gamification Section */}
      <GamificationSection 
        userId="user-id-placeholder" 
        profile={profile} 
      />

      {/* Stats Overview */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Your Preparation Stats</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20">
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-success" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">{completedTasks}</p>
                    <p className="text-sm text-muted-foreground">Tasks Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/20">
                    <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">{earnedTotalXP}</p>
                    <p className="text-sm text-muted-foreground">XP Earned</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20">
                    <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">{Math.round(progressPercentage)}%</p>
                    <p className="text-sm text-muted-foreground">Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/20">
                    <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">135</p>
                    <p className="text-sm text-muted-foreground">Days Until Start</p>
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