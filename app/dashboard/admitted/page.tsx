// ==========================================
// FILE: app/dashboard/admitted/page.tsx
// Dashboard for Admitted Students
// ==========================================
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  Home,
  Users,
  FileCheck,
  CreditCard,
  MapPin,
  Sparkles,
  CheckCircle2,
  Calendar
} from "lucide-react"

export default function AdmittedDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Congratulations Banner */}
        <Card className="border-2 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-green-900 dark:text-green-100 mb-2">
                  🎉 Congratulations on Your Admission!
                </h2>
                <p className="text-green-800 dark:text-green-200">
                  You've been admitted to <span className="font-bold">University of Lagos</span>. Let's get you settled in!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pre-Arrival Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Pre-Arrival Checklist</CardTitle>
            <CardDescription>Complete these before resumption</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { task: "Accept Admission on JAMB CAPS", done: true },
              { task: "Pay Acceptance Fee", done: true },
              { task: "Find Accommodation", done: false, urgent: true },
              { task: "Find Roommate", done: false, urgent: true },
              { task: "Pay School Fees", done: false },
              { task: "Register for Courses", done: false }
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                item.done ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' :
                item.urgent ? 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800' :
                'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}>
                <div className="flex items-center gap-3">
                  {item.done ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                  )}
                  <span className="font-medium">{item.task}</span>
                </div>
                {item.urgent && !item.done && (
                  <Badge className="bg-orange-500">Urgent</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6">
          <Link href="/properties">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-400">
              <CardHeader>
                <Home className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Find Housing</CardTitle>
                <CardDescription>Search verified properties</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/roommates">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-400">
              <CardHeader>
                <Users className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle className="text-lg">Find Roommate</CardTitle>
                <CardDescription>Get matched with peers</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admissions/checklist/view">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-400">
              <CardHeader>
                <FileCheck className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle className="text-lg">My Checklist</CardTitle>
                <CardDescription>Track your progress</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/marketplace">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-orange-400">
              <CardHeader>
                <CreditCard className="h-10 w-10 text-orange-600 mb-2" />
                <CardTitle className="text-lg">Buy Essentials</CardTitle>
                <CardDescription>Student marketplace</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Important Dates */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-blue-600" />
              <CardTitle>Important Dates</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { event: "Matriculation Ceremony", date: "March 15, 2025" },
                { event: "Orientation Week", date: "March 8-12, 2025" },
                { event: "First Day of Classes", date: "March 18, 2025" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{item.event}</span>
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
