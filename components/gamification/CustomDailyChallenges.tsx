// ==========================================
// FILE: components/gamification/CustomDailyChallenges.tsx
// Customizable Daily Challenges Component
// ==========================================
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, Target, Star, Check } from "lucide-react"

const iconMap = {
  Target: Target,
  Zap: Zap,
  Star: Star,
}

export function CustomDailyChallenges({ 
  challenges 
}: { 
  challenges: Array<{
    task: string
    progress: number
    total: number
    xp: number
    icon: keyof typeof iconMap
  }>
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-600" />
          Daily Challenges
        </CardTitle>
        <CardDescription>Complete tasks to earn bonus XP</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {challenges.map((challenge, i) => {
            const progress = (challenge.progress / challenge.total) * 100
            const isComplete = challenge.progress >= challenge.total
            const Icon = iconMap[challenge.icon]

            return (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${isComplete ? 'text-green-600' : 'text-slate-400'}`} />
                    <span className="font-medium">{challenge.task}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={isComplete ? 'default' : 'outline'} className="text-xs">
                      +{challenge.xp} XP
                    </Badge>
                    {isComplete && <Check className="h-5 w-5 text-green-600" />}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={progress} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground">
                    {challenge.progress}/{challenge.total}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
