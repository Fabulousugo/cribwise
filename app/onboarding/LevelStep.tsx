// ==========================================
// FILE: components/onboarding/LevelStep.tsx
// Level Selection (100L - 600L)
// ==========================================
"use client"

import { Card } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

const LEVELS = [
  { value: "100", label: "100 Level", subtitle: "First Year" },
  { value: "200", label: "200 Level", subtitle: "Second Year" },
  { value: "300", label: "300 Level", subtitle: "Third Year" },
  { value: "400", label: "400 Level", subtitle: "Fourth Year" },
  { value: "500", label: "500 Level", subtitle: "Fifth Year" },
  { value: "600", label: "600 Level", subtitle: "Sixth Year (Medicine/Pharmacy)" }
]

export function LevelStep({ 
  value, 
  onChange 
}: { 
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full mb-4">
          <GraduationCap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          What Level Are You In?
        </h2>
        <p className="text-muted-foreground">
          Select your current academic level
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {LEVELS.map((level) => (
          <Card
            key={level.value}
            onClick={() => onChange(level.value)}
            className={`p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] ${
              value === level.value
                ? 'border-2 border-purple-500 bg-purple-50 dark:bg-purple-950/20'
                : 'border hover:border-purple-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-foreground">{level.label}</h3>
              {value === level.value && (
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{level.subtitle}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}