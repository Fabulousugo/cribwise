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
  DollarSign,
  AlertCircle,
  ExternalLink,
  Sparkles,
  TrendingUp
} from "lucide-react"

interface ChecklistItem {
  id: string
  title: string
  description: string
  tips?: string[]
  resources?: { name: string; url: string }[]
  priority: "high" | "medium" | "low"
}

const scholarshipChecklist: ChecklistItem[] = [
  {
    id: "research-opportunities",
    title: "Research Available Scholarships",
    description: "Identify scholarships you're eligible for based on academic performance, state of origin, and course of study",
    tips: [
      "Check your university's scholarship portal regularly",
      "Look for federal government scholarships (NBTE, PTDF, etc.)",
      "Search for state government bursaries and scholarships",
      "Consider private sector scholarships (Shell, MTN, etc.)",
      "Join scholarship alert groups on WhatsApp and Telegram"
    ],
    resources: [
      { name: "Nigeria Scholarship Portal", url: "https://www.scholars4dev.com" },
      { name: "Scholarship Region", url: "https://www.scholarshipregion.com" }
    ],
    priority: "high"
  },
  {
    id: "academic-records",
    title: "Gather Academic Documents",
    description: "Compile all academic credentials and transcripts",
    tips: [
      "Request official transcripts from your school",
      "Get certified true copies of certificates",
      "Prepare a summary of your academic achievements",
      "Calculate your current CGPA/GPA accurately",
      "Get recommendation letters from at least 2 lecturers"
    ],
    priority: "high"
  },
  {
    id: "personal-statement",
    title: "Write Compelling Personal Statement",
    description: "Craft a strong essay explaining why you deserve the scholarship",
    tips: [
      "Start with a powerful opening that grabs attention",
      "Explain your academic goals and career aspirations",
      "Highlight your achievements and leadership roles",
      "Demonstrate financial need (if applicable)",
      "Show how the scholarship aligns with your future plans",
      "Keep it concise: 500-1000 words typically",
      "Proofread multiple times for grammar and spelling"
    ],
    priority: "high"
  },
  {
    id: "recommendation-letters",
    title: "Secure Strong Recommendation Letters",
    description: "Get compelling recommendations from professors, mentors, or employers",
    tips: [
      "Ask lecturers who know you well and taught you recently",
      "Provide them with your CV and scholarship details",
      "Give them at least 2-3 weeks notice",
      "Follow up politely a week before the deadline",
      "Request letters on official letterhead",
      "Thank them after they submit"
    ],
    priority: "high"
  },
  {
    id: "financial-documents",
    title: "Prepare Financial Documentation",
    description: "Gather documents proving financial need (if required)",
    tips: [
      "Parent/guardian income statements or tax returns",
      "Bank statements (last 6 months)",
      "Proof of other family expenses",
      "Evidence of other scholarships/financial aid received",
      "Affidavit of financial support (if applicable)"
    ],
    priority: "medium"
  },
  {
    id: "extra-curriculars",
    title: "Document Extracurricular Activities",
    description: "Compile evidence of leadership, community service, and achievements",
    tips: [
      "List all clubs, societies, and organizations you belong to",
      "Document volunteer work and community service",
      "Include awards, competitions, and recognitions",
      "Get certificates for workshops and training attended",
      "Quantify your impact (e.g., 'Led team of 20 students')",
      "Prepare a portfolio for creative/technical achievements"
    ],
    priority: "medium"
  },
  {
    id: "application-submission",
    title: "Complete and Submit Applications",
    description: "Fill out applications carefully and submit before deadlines",
    tips: [
      "Read all instructions carefully before starting",
      "Create a spreadsheet tracking all deadlines",
      "Fill out applications in a Word doc first, then copy",
      "Double-check all information for accuracy",
      "Submit at least 2-3 days before the deadline",
      "Save confirmation emails and reference numbers",
      "Apply to multiple scholarships (don't put all eggs in one basket)"
    ],
    priority: "high"
  }
]

const scholarshipTips = [
  {
    title: "Start Early",
    description: "Begin searching for scholarships at least 6 months before you need funding",
    icon: "⏰"
  },
  {
    title: "Apply Widely",
    description: "Apply to as many scholarships as you qualify for - the more you apply, the better your chances",
    icon: "🎯"
  },
  {
    title: "Tailor Each Application",
    description: "Customize your personal statement for each scholarship based on their specific criteria",
    icon: "✍️"
  },
  {
    title: "Follow Up",
    description: "After submitting, follow up politely to confirm receipt and check status",
    icon: "📧"
  }
]

export default function ScholarshipChecklistPage() {
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

  const progress = (completedItems.size / scholarshipChecklist.length) * 100
  const highPriorityRemaining = scholarshipChecklist.filter(
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
      <section className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/admissions/checklist" 
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Checklists
          </Link>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">💰</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Scholarship Applications Checklist
              </h1>
              <p className="text-yellow-100 text-lg">
                Apply for financial aid and scholarship opportunities
              </p>
            </div>
          </div>

          {/* Progress Stats */}
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-bold">
                  {completedItems.size} / {scholarshipChecklist.length} completed
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

      {/* Success Tips */}
      <section className="py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                Keys to Scholarship Success
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {scholarshipTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-orange-200 dark:border-orange-800">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <h4 className="font-bold text-sm text-foreground mb-1">{tip.title}</h4>
                      <p className="text-xs text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Checklist Items */}
      <section className="py-6 px-4 pb-12">
        <div className="max-w-4xl mx-auto space-y-4">
          {scholarshipChecklist.map((item, index) => {
            const isCompleted = completedItems.has(item.id)
            
            return (
              <Card
                key={item.id}
                className={`border-2 transition-all ${
                  isCompleted 
                    ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800" 
                    : "border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-700"
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

                <CardContent className="space-y-4">
                  {/* Tips */}
                  {item.tips && item.tips.length > 0 && (
                    <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        <span className="text-sm font-bold text-foreground">Pro Tips:</span>
                      </div>
                      <ul className="space-y-1.5">
                        {item.tips.map((tip, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-yellow-600 dark:text-yellow-400">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Resources */}
                  {item.resources && item.resources.length > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-2 mb-2">
                        <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-bold text-foreground">Helpful Resources:</span>
                      </div>
                      <div className="space-y-2">
                        {item.resources.map((resource, idx) => (
                          <a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            <span>{resource.name}</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
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
                  Ready to Apply!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Excellent! You've completed all preparation steps. 
                  Now start submitting your scholarship applications. Good luck!
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button asChild>
                    <Link href="/admissions/checklist">
                      View Other Checklists
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/admissions/scholarships">
                      Browse Scholarships
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
                You're {Math.round(progress)}% done. Complete all steps to maximize your chances of winning scholarships.
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