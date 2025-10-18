// ==========================================
// FILE: app/dashboard/alumni/page.tsx
// Dashboard for Alumni
// ==========================================
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  Briefcase,
  Users,
  Calendar,
  Award,
  Heart,
  TrendingUp,
  BookOpen,
  Gift,
  MessageSquare,
  GraduationCap
} from "lucide-react"

export default function AlumniDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-background to-orange-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Banner */}
        <Card className="border-2 border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-amber-900 dark:text-amber-100 mb-2">
                  Welcome Back, Alumni! 🎓
                </h2>
                <p className="text-amber-800 dark:text-amber-200">
                  Stay connected with your alma mater and fellow graduates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Users className="h-8 w-8 text-blue-600" />
                <span className="text-3xl font-black">250+</span>
              </div>
              <CardTitle className="text-sm text-muted-foreground">Network Connections</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Calendar className="h-8 w-8 text-green-600" />
                <span className="text-3xl font-black">5</span>
              </div>
              <CardTitle className="text-sm text-muted-foreground">Events Attended</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Heart className="h-8 w-8 text-red-600" />
                <span className="text-3xl font-black">₦50k</span>
              </div>
              <CardTitle className="text-sm text-muted-foreground">Contributions</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <MessageSquare className="h-8 w-8 text-purple-600" />
                <span className="text-3xl font-black">12</span>
              </div>
              <CardTitle className="text-sm text-muted-foreground">Mentoring Sessions</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-blue-400">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mb-3" />
              <CardTitle className="text-xl">Alumni Network</CardTitle>
              <CardDescription>Connect with fellow graduates</CardDescription>
              <Button className="mt-4 w-full">Browse Network</Button>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-green-400">
            <CardHeader>
              <Briefcase className="h-12 w-12 text-green-600 mb-3" />
              <CardTitle className="text-xl">Job Board</CardTitle>
              <CardDescription>Exclusive opportunities for alumni</CardDescription>
              <Button className="mt-4 w-full">View Jobs</Button>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-purple-400">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-purple-600 mb-3" />
              <CardTitle className="text-xl">Mentor Students</CardTitle>
              <CardDescription>Give back to current students</CardDescription>
              <Button className="mt-4 w-full">Start Mentoring</Button>
            </CardHeader>
          </Card>
        </div>

        {/* Upcoming Events & Opportunities */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-orange-600" />
                  <CardTitle>Alumni Events</CardTitle>
                </div>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    title: "Annual Alumni Reunion 2025", 
                    date: "Feb 14, 2025",
                    attendees: 150,
                    featured: true
                  },
                  { 
                    title: "Career Networking Mixer", 
                    date: "Jan 20, 2025",
                    attendees: 80,
                    featured: false
                  },
                  { 
                    title: "Fundraising Gala", 
                    date: "March 5, 2025",
                    attendees: 200,
                    featured: false
                  }
                ].map((event, i) => (
                  <div key={i} className={`p-4 rounded-lg border-2 ${
                    event.featured ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/20' : 'border-slate-200 dark:border-slate-700'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{event.title}</h4>
                      {event.featured && <Badge className="bg-amber-500">Featured</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{event.date}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
            
                    </div>
                    </div>
                  </div>
                )}


