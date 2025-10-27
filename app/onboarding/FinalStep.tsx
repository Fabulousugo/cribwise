/* eslint-disable @typescript-eslint/no-explicit-any */
// ==========================================
// FILE: components/onboarding/FinalStep.tsx
// Completion Celebration with XP Summary
// ==========================================
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Trophy, 
  Zap, 
  Building2, 
  GraduationCap, 
  Book,
  BookOpen,
  Sparkles,
  Award
} from "lucide-react"

export function FinalStep({ 
  formData,
  totalXP
}: { 
  formData: any
  totalXP: number
}) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4 animate-bounce">
          <Trophy className="h-10 w-10 text-primary-foreground" />
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-2">
          🎉 Profile Complete! 🎉
        </h2>
        <p className="text-xl text-muted-foreground mb-4">
          You have earned your first rewards!
        </p>
        
        {/* XP Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-primary-foreground px-6 py-3 rounded-full text-2xl font-bold shadow-xl">
          <Zap className="h-6 w-6" />
          {totalXP} XP Earned!
        </div>
      </div>

      {/* Summary Card */}
      <Card className="border-2 border-primary/20">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Your Profile Summary
          </h3>

          <div className="space-y-3">
            {/* University */}
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded">
                <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">University</p>
                <p className="font-semibold text-foreground">{formData.university}</p>
              </div>
            </div>

            {/* Level */}
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded">
                <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Level</p>
                <p className="font-semibold text-foreground">{formData.level} Level</p>
              </div>
            </div>

            {/* Department */}
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded">
                <Book className="h-5 w-5 text-green-600 dark:text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Department</p>
                <p className="font-semibold text-foreground">{formData.department}</p>
              </div>
            </div>

            {/* Courses */}
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded">
                <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-2">Courses Registered</p>
                <div className="flex flex-wrap gap-2">
                  {formData.courses.length > 0 ? (
                    formData.courses.slice(0, 6).map((course: string) => (
                      <Badge key={course} variant="secondary">
                        {course}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No courses selected</p>
                  )}
                  {formData.courses.length > 6 && (
                    <Badge variant="secondary">
                      +{formData.courses.length - 6} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievement Unlocked */}
      <Card className="border-2 border-amber-500/50 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl">
              <Award className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground">Achievement Unlocked!</h4>
              <p className="text-muted-foreground">Profile Pioneer</p>
              <p className="text-sm text-muted-foreground mt-1">
                Complete your profile in your first session
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-foreground mb-3">What&apos;s Next?</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Browse available accommodations near your campus</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Connect with roommates in your university</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Access study materials and resources</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Join campus events and communities</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>Click &quot;Complete Setup&quot; to enter your dashboard</p>
      </div>
    </div>
  )
}