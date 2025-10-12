"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { 
  GraduationCap,
  Building2,
  Users,
  BookOpen,
  Home,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award
} from "lucide-react"

type StatusOption = {
  value: string
  title: string
  description: string
  icon: any
  color: string
  features: string[]
  recommended?: boolean
}

export default function ChooseStatusPage() {
  const router = useRouter()
  const { user, profile } = useAuth()
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const studentOptions: StatusOption[] = [
    {
      value: "PROSPECTIVE",
      title: "Prospective Student",
      description: "Planning to apply to university",
      icon: GraduationCap,
      color: "from-blue-500 to-blue-600",
      features: [
        "Admissions guides & resources",
        "University comparison tools",
        "Application deadline tracking",
        "Browse properties early"
      ]
    },
    {
      value: "ADMITTED",
      title: "Admitted Student",
      description: "Just got accepted",
      icon: Award,
      color: "from-green-500 to-green-600",
      features: [
        "Housing search tools",
        "Roommate matching",
        "Enrollment support",
        "Welcome resources"
      ],
      recommended: true
    },
    {
      value: "CURRENT",
      title: "Current Student",
      description: "Already enrolled",
      icon: BookOpen,
      color: "from-purple-500 to-purple-600",
      features: [
        "Full platform access",
        "Study materials",
        "Event calendar",
        "Marketplace access"
      ],
      recommended: true
    },
    {
      value: "ALUMNI",
      title: "Alumni",
      description: "Graduated",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      features: [
        "Alumni network",
        "Mentorship opportunities",
        "Career resources",
        "Stay connected"
      ]
    }
  ]

  const agentOption: StatusOption = {
    value: "AGENT",
    title: "Property Owner / Agent",
    description: "I have properties to rent",
    icon: Building2,
    color: "from-emerald-500 to-green-500",
    features: [
      "List unlimited properties",
      "AI listing generator",
      "Tenant management",
      "Analytics dashboard",
      "Priority support"
    ]
  }

  const handleSubmit = async () => {
    if (!selectedStatus) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from("user_profiles")
        .update({ status: selectedStatus })
        .eq("id", user?.id)

      if (error) throw error

      // Redirect based on status
      if (selectedStatus === "AGENT") {
        router.push("/dashboard/agent")
      } else {
        router.push("/dashboard/student")
      }
    } catch (err) {
      console.error("Error updating status:", err)
      alert("Failed to update status. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Welcome to CribWise! 👋
          </h1>
          <p className="text-xl text-muted-foreground">
            Tell us about yourself to personalize your experience
          </p>
        </div>

        {/* Student Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Users className="h-6 w-6" />
            I'm a Student
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentOptions.map((option) => (
              <Card
                key={option.value}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedStatus === option.value
                    ? "border-2 border-primary ring-4 ring-primary/20"
                    : "border-2 border-transparent hover:border-muted-foreground/20"
                } ${option.recommended ? "relative" : ""}`}
                onClick={() => setSelectedStatus(option.value)}
              >
                {option.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      POPULAR
                    </span>
                  </div>
                )}
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-4`}>
                    <option.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-4 text-muted-foreground">OR</span>
          </div>
        </div>

        {/* Agent Option */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            I'm a Property Owner / Agent
          </h2>
          <Card
            className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] max-w-3xl mx-auto ${
              selectedStatus === agentOption.value
                ? "border-2 border-emerald-500 ring-4 ring-emerald-500/20"
                : "border-2 border-transparent hover:border-muted-foreground/20"
            }`}
            onClick={() => setSelectedStatus(agentOption.value)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agentOption.color} flex items-center justify-center`}>
                    <agentOption.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{agentOption.title}</CardTitle>
                    <CardDescription className="text-base">{agentOption.description}</CardDescription>
                  </div>
                </div>
                <Sparkles className="h-6 w-6 text-emerald-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {agentOption.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={!selectedStatus || loading}
            className="text-lg px-12 py-6"
          >
            {loading ? "Setting up..." : "Continue"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Don't worry, you can always change this later in your settings
        </p>
      </div>
    </main>
  )
}