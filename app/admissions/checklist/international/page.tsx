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
  Globe,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Plane,
  Shield
} from "lucide-react"

interface ChecklistItem {
  id: string
  title: string
  description: string
  tips?: string[]
  resources?: { name: string; url: string }[]
  estimatedCost?: string
  priority: "high" | "medium" | "low"
}

const internationalChecklist: ChecklistItem[] = [
  {
    id: "admission-letter",
    title: "Obtain Admission Letter",
    description: "Get your official letter of admission from a recognized Nigerian university",
    tips: [
      "Must be from NUC-accredited institution",
      "Letter should state your course of study and duration",
      "Request multiple certified copies",
      "Keep both digital and physical copies",
      "Admission letter is required for visa application"
    ],
    priority: "high"
  },
  {
    id: "passport",
    title: "Valid International Passport",
    description: "Ensure your passport is valid for at least 6 months beyond intended stay",
    tips: [
      "Passport must have at least 2 blank pages",
      "If expired, renew immediately (can take 4-8 weeks)",
      "Make photocopies of passport bio-data page",
      "Take digital photos of all passport pages",
      "Consider getting extra passport photos (red background)"
    ],
    estimatedCost: "Varies by country",
    priority: "high"
  },
  {
    id: "student-visa",
    title: "Apply for Nigerian Student Visa (STR)",
    description: "Obtain Study Temporary Residence (STR) visa from Nigerian Immigration",
    tips: [
      "Apply at Nigerian Embassy/Consulate in your country",
      "Required documents: passport, admission letter, proof of funds",
      "Processing time: 4-6 weeks typically",
      "STR visa is usually valid for 12 months initially",
      "Must be renewed annually while studying",
      "Apply at least 8 weeks before departure"
    ],
    resources: [
      { name: "Nigeria Immigration Service", url: "https://immigration.gov.ng" },
      { name: "Visa Application Guide", url: "https://portal.immigration.gov.ng" }
    ],
    estimatedCost: "$180 - $250 USD",
    priority: "high"
  },
  {
    id: "yellow-fever",
    title: "Yellow Fever Vaccination Certificate",
    description: "Get vaccinated and obtain WHO-approved yellow fever certificate",
    tips: [
      "Mandatory for entry into Nigeria",
      "Must be done at least 10 days before travel",
      "Certificate is valid for life",
      "Keep original with passport always",
      "Available at authorized vaccination centers",
      "Cost varies by country"
    ],
    estimatedCost: "$50 - $150 USD",
    priority: "high"
  },
  {
    id: "proof-of-funds",
    title: "Financial Documentation",
    description: "Provide evidence of sufficient funds for tuition and living expenses",
    tips: [
      "Bank statements (last 6 months)",
      "Sponsor's affidavit of support",
      "Scholarship award letters (if applicable)",
      "Proof of payment for first semester tuition",
      "Budget at least ₦1.5M - ₦2.5M per year for living expenses",
      "Some universities require proof of funds in escrow account"
    ],
    priority: "high"
  },
  {
    id: "medical-requirements",
    title: "Medical Examinations & Health Insurance",
    description: "Complete required medical tests and obtain health insurance",
    tips: [
      "HIV test (required for STR application)",
      "Tuberculosis screening may be required",
      "Hepatitis B test recommended",
      "Get comprehensive health insurance valid in Nigeria",
      "Carry prescription medications with doctor's letter",
      "Mental health: prepare for cultural adjustment"
    ],
    estimatedCost: "$200 - $500 USD",
    priority: "high"
  },
  {
    id: "academic-credentials",
    title: "Educational Credential Evaluation",
    description: "Get your previous qualifications evaluated and certified",
    tips: [
      "WAEC or NECO equivalency certificate required",
      "Some universities require JAMB UTME exemption",
      "Transcripts must be notarized and translated (if not in English)",
      "Contact university's international office for specific requirements",
      "Allow 4-6 weeks for credential evaluation",
      "May need to take supplementary exams"
    ],
    estimatedCost: "$100 - $300 USD",
    priority: "medium"
  },
  {
    id: "accommodation",
    title: "Secure Accommodation",
    description: "Arrange housing before arrival in Nigeria",
    tips: [
      "Apply for on-campus housing early (limited spaces)",
      "Research off-campus options near university",
      "Use verified platforms like CribWise",
      "Avoid paying full rent before viewing property",
      "Budget: ₦150K - ₦500K per year depending on location",
      "Join university's international student WhatsApp groups"
    ],
    priority: "medium"
  },
  {
    id: "travel-arrangements",
    title: "Book Flights & Travel Documents",
    description: "Arrange transportation and necessary travel documents",
    tips: [
      "Book flights at least 4 weeks in advance for better rates",
      "Major airports: Lagos (LOS), Abuja (ABJ), Port Harcourt (PHC)",
      "Arrive at least 2 weeks before academic session starts",
      "Pack essential documents in carry-on luggage",
      "Inform your bank about international travel",
      "Download offline maps and translation apps"
    ],
    estimatedCost: "Varies by country",
    priority: "medium"
  },
  {
    id: "orientation",
    title: "Attend International Student Orientation",
    description: "Participate in university orientation programs",
    tips: [
      "Contact international student office upon arrival",
      "Learn about local laws and cultural norms",
      "Open a Nigerian bank account (bring passport and admission letter)",
      "Get a local SIM card (MTN, Airtel, Glo)",
      "Register with your country's embassy/consulate in Nigeria",
      "Join student associations and support groups"
    ],
    priority: "low"
  }
]

const importantNotes = [
  {
    title: "Start Early",
    description: "Begin visa application process at least 3-4 months before intended travel date",
    icon: "⏰"
  },
  {
    title: "Budget Wisely",
    description: "Total cost (visa, travel, initial expenses) typically ranges from $2,000 - $5,000 USD",
    icon: "💵"
  },
  {
    title: "Stay Connected",
    description: "Join international student communities online for support and advice",
    icon: "🤝"
  },
  {
    title: "Embassy Contact",
    description: "Register with your embassy in Nigeria for consular support and emergency assistance",
    icon: "🏛️"
  }
]

export default function InternationalChecklistPage() {
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

  const progress = (completedItems.size / internationalChecklist.length) * 100
  const highPriorityRemaining = internationalChecklist.filter(
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
      <section className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/admissions/checklist" 
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Checklists
          </Link>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">🌍</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                International Students Checklist
              </h1>
              <p className="text-teal-100 text-lg">
                Additional requirements for foreign applicants studying in Nigeria
              </p>
            </div>
          </div>

          {/* Progress Stats */}
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-bold">
                  {completedItems.size} / {internationalChecklist.length} completed
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

      {/* Important Notes */}
      <section className="py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-cyan-200 dark:border-cyan-800 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                Essential Information for International Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {importantNotes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-cyan-200 dark:border-cyan-800">
                    <span className="text-2xl">{note.icon}</span>
                    <div>
                      <h4 className="font-bold text-sm text-foreground mb-1">{note.title}</h4>
                      <p className="text-xs text-muted-foreground">{note.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Warning Card */}
      <section className="px-4 pb-6">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Timeline & Planning</h3>
                  <p className="text-sm text-muted-foreground">
                    The entire process can take <strong>3-6 months</strong> from application to arrival. 
                    Start as early as possible and contact your university's international office for guidance.
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
          {internationalChecklist.map((item, index) => {
            const isCompleted = completedItems.has(item.id)
            
            return (
              <Card
                key={item.id}
                className={`border-2 transition-all ${
                  isCompleted 
                    ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800" 
                    : "border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700"
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
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-sm font-bold text-muted-foreground">
                              Step {index + 1}
                            </span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getPriorityColor(item.priority)}`}
                            >
                              {item.priority.toUpperCase()} PRIORITY
                            </Badge>
                            {item.estimatedCost && (
                              <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-950/30">
                                💵 {item.estimatedCost}
                              </Badge>
                            )}
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
                    <div className="bg-cyan-50 dark:bg-cyan-950/20 rounded-lg p-4 border border-cyan-200 dark:border-cyan-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                        <span className="text-sm font-bold text-foreground">Important Notes:</span>
                      </div>
                      <ul className="space-y-1.5">
                        {item.tips.map((tip, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-cyan-600 dark:text-cyan-400">•</span>
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
                <div className="text-6xl mb-4">✈️</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Ready for Your Journey!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Congratulations! You've completed all requirements. 
                  Welcome to Nigeria - we wish you success in your studies! 🇳🇬
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button asChild>
                    <Link href="/admissions/checklist">
                      View Other Checklists
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/properties">
                      Find Housing
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Keep Going! 🌟
              </h3>
              <p className="text-muted-foreground mb-6">
                You're {Math.round(progress)}% done. Complete all steps to ensure a smooth transition to studying in Nigeria.
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