// ==========================================
// FILE: app/dashboard/prospective/page.tsx
// Dashboard for Prospective Students
// ==========================================
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { 
  GraduationCap, 
  CheckCircle2, 
  FileText, 
  Calendar,
  BookOpen,
  MapPin,
  TrendingUp,
  Bell,
  Sparkles
} from "lucide-react"

export default function ProspectiveDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
            Welcome, Future Student! 🎓
          </h1>
          <p className="text-lg text-muted-foreground">
            Let's get you ready for your university journey
          </p>
        </div>

        {/* Admission Progress */}
        <Card className="border-2 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle>Your Admission Journey</CardTitle>
                <CardDescription>Complete these steps to increase your chances</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Overall Progress</span>
                <span className="font-bold text-purple-600">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-3 mt-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Profile Created</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">JAMB Registered</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                <span className="text-sm font-medium">Documents Uploaded</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                <span className="text-sm font-medium">School Applied</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/admissions/checklist">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-400">
              <CardHeader>
                <FileText className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle className="text-lg">Admission Checklist</CardTitle>
                <CardDescription>Track your application progress</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admissions">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-400">
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Browse Schools</CardTitle>
                <CardDescription>Find your perfect university</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/materials">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-400">
              <CardHeader>
                <BookOpen className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle className="text-lg">Study Materials</CardTitle>
                <CardDescription>Prep for entrance exams</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-orange-600" />
                <CardTitle>Upcoming Deadlines</CardTitle>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "JAMB Registration", date: "Dec 15, 2024", status: "urgent" },
                { title: "UNILAG Post-UTME", date: "Jan 20, 2025", status: "upcoming" },
                { title: "Document Submission", date: "Feb 1, 2025", status: "upcoming" }
              ].map((deadline, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{deadline.title}</h4>
                    <p className="text-sm text-muted-foreground">{deadline.date}</p>
                  </div>
                  <Bell className={`h-5 w-5 ${deadline.status === 'urgent' ? 'text-red-500' : 'text-orange-500'}`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}