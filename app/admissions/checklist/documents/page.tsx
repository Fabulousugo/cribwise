"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  Download,
  AlertCircle,
  Clock,
  Sparkles
} from "lucide-react"

interface ChecklistItem {
  id: string
  title: string
  description: string
  tips?: string[]
  deadline?: string
  priority: "high" | "medium" | "low"
}

const documentChecklist: ChecklistItem[] = [
  {
    id: "birth-certificate",
    title: "Original Birth Certificate",
    description: "Get your original birth certificate or certified copy from National Population Commission",
    tips: [
      "Must be government-issued and certified",
      "Get at least 2 photocopies",
      "If lost, apply for a replacement immediately (can take 4-8 weeks)"
    ],
    priority: "high"
  },
  {
    id: "local-govt",
    title: "Local Government Identification Letter",
    description: "Obtain proof of origin from your Local Government Area office",
    tips: [
      "Visit your LGA secretariat",
      "Bring your birth certificate and valid ID",
      "Usually costs ₦500 - ₦2,000",
      "Processing takes 1-3 days"
    ],
    priority: "high"
  },
  {
    id: "jamb-result",
    title: "JAMB Result Slip",
    description: "Print your original UTME result slip from JAMB portal",
    tips: [
      "Log in to jamb.gov.ng with your email/phone",
      "Click 'Check 2024 UTME Result'",
      "Print in color if possible",
      "Keep both digital and physical copies"
    ],
    priority: "high"
  },
  {
    id: "olevel-results",
    title: "O'Level Results (WAEC/NECO)",
    description: "Get original certificates and statement of results",
    tips: [
      "WAEC: Order online at waecdirect.org",
      "NECO: Visit www.mynecoexams.com",
      "Allow 2-3 weeks for delivery",
      "Verify results are correctly uploaded to JAMB portal",
      "You may need both scratch card and statement of result"
    ],
    priority: "high"
  },
  {
    id: "passport-photos",
    title: "Passport Photographs",
    description: "Get recent passport photos (white or red background)",
    tips: [
      "Take at least 12 copies",
      "White background for most schools",
      "Red background for some specific forms",
      "Must be recent (taken within last 3 months)",
      "Wear formal attire",
      "No smiling, glasses, or hats"
    ],
    priority: "medium"
  },
  {
    id: "medical-certificate",
    title: "Medical Fitness Certificate",
    description: "Get a health certificate from a recognized hospital",
    tips: [
      "Visit any government or teaching hospital",
      "Must be signed by a medical doctor",
      "Tests may include: HIV, Hepatitis B, drug screening",
      "Cost ranges from ₦3,000 - ₦10,000",
      "Valid for 6 months"
    ],
    priority: "medium"
  },
  {
    id: "additional-docs",
    title: "Other Supporting Documents",
    description: "Prepare additional documents that may be required",
    tips: [
      "Photocopies of parents' ID cards",
      "Proof of address (utility bill, tenancy agreement)",
      "Change of name certificate (if applicable)",
      "Marriage certificate (for married applicants)",
      "Previous university transcripts (for transfer students)"
    ],
    priority: "low"
  }
]

export default function DocumentChecklistPage() {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    setCompletedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const progress = (completedItems.size / documentChecklist.length) * 100
  const highPriorityRemaining = documentChecklist.filter(
    item => item.priority === "high" && !completedItems.has(item.id)
  ).length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
      case "low":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
      default:
        return ""
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/admissions/checklist" 
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Checklists
          </Link>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">📄</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Document Preparation Checklist
              </h1>
              <p className="text-blue-100 text-lg">
                Gather all required documents before application deadlines
              </p>
            </div>
          </div>

          {/* Progress Stats */}
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-bold">
                  {completedItems.size} / {documentChecklist.length} completed
                </span>
              </div>
              <Progress value={progress} className="h-2 bg-white/20" />
              
              {highPriorityRemaining > 0 && (
                <div className="flex items-center gap-2 mt-3 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{highPriorityRemaining} high priority item{highPriorityRemaining > 1 ? 's' : ''} remaining</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Important Timeline</h3>
                  <p className="text-sm text-muted-foreground">
                    Start gathering documents at least <strong>4-6 weeks before</strong> your application deadline. 
                    Some documents (like O'Level results) can take several weeks to obtain.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Checklist Items */}
      <section className="py-6 px-4 pb-12">
        <div className="max-w-4xl mx-auto space-y-4">
          {documentChecklist.map((item, index) => {
            const isCompleted = completedItems.has(item.id)
            
            return (
              <Card
                key={item.id}
                className={`border-2 transition-all ${
                  isCompleted 
                    ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800" 
                    : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={isCompleted}
                      onCheckedChange={() => toggleItem(item.id)}
                      className="mt-1 h-6 w-6"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-muted-foreground">
                              Step {index + 1}
                            </span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getPriorityColor(item.priority)}`}
                            >
                              {item.priority.toUpperCase()} PRIORITY
                            </Badge>
                          </div>
                          <CardTitle className={`text-lg ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                            {item.title}
                          </CardTitle>
                        </div>
                        
                        {isCompleted && (
                          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                        )}
                      </div>
                      
                      <CardDescription className="text-sm">
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                {item.tips && item.tips.length > 0 && (
                  <CardContent>
                    <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-bold text-foreground">Pro Tips:</span>
                      </div>
                      <ul className="space-y-1.5">
                        {item.tips.map((tip, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-blue-600 dark:text-blue-400">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>
      </section>

      {/* Bottom Action */}
      <section className="py-8 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          {progress === 100 ? (
            <Card className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  All Documents Ready!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Great job! You've gathered all the necessary documents. 
                  Keep them safe and organized for your application.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button asChild>
                    <Link href="/admissions/checklist">
                      View Other Checklists
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/admissions/guides">
                      Read Application Guides
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Keep Going! 💪
              </h3>
              <p className="text-muted-foreground mb-6">
                You're {Math.round(progress)}% done. Complete all items to be fully prepared.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="outline" asChild>
                  <Link href="/admissions/checklist">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to All Checklists
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}