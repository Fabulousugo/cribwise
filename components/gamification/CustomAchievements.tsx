// ==========================================
// FILE: components/gamification/CustomAchievements.tsx
// Customizable Achievements Component
// ==========================================
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Award } from "lucide-react"

const iconMap = {
  Trophy: Trophy,
  Star: Star,
  Award: Award,
}

export function CustomAchievements({ 
  achievements,
  stats 
}: { 
  achievements: Array<{
    name: string
    description: string
    icon: keyof typeof iconMap
    unlocked: boolean
    color: string
  }>
  stats?: any
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-purple-600" />
          Achievements
        </CardTitle>
        <CardDescription>Unlock badges as you progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {achievements.map((achievement, i) => {
            const Icon = iconMap[achievement.icon]
            
            return (
              <div
                key={i}
                className={`p-4 rounded-xl border-2 transition-all ${
                  achievement.unlocked
                    ? 'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/20'
                    : 'border-slate-200 dark:border-slate-700 opacity-50'
                }`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${achievement.color} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-sm mb-1">{achievement.name}</h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                {achievement.unlocked && (
                  <Badge className="mt-2 text-xs">Unlocked!</Badge>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

