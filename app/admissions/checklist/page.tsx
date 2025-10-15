"use client"

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CheckCircle2, 
  Sparkles, 
  FileText,
  Clock,
  BookOpen,
  DollarSign,
  Globe,
  ArrowRight,
  Target,
  Zap
} from "lucide-react";

interface ChecklistOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  steps: number;
  estimatedTime: string;
  recommended: boolean;
  tags: string[];
}

const checklistOptions: ChecklistOption[] = [
  {
    id: "documents",
    name: "Document Preparation",
    description: "Gather all required documents before application deadlines",
    icon: "📄",
    color: "from-blue-500 to-cyan-500",
    steps: 7,
    estimatedTime: "2-4 weeks",
    recommended: true,
    tags: ["Essential", "All Students"]
  },
  {
    id: "post-jamb",
    name: "Post-JAMB Screening",
    description: "Navigate post-UTME and screening processes",
    icon: "📝",
    color: "from-purple-500 to-pink-500",
    steps: 8,
    estimatedTime: "4-6 weeks",
    recommended: true,
    tags: ["JAMB Candidates", "Essential"]
  },
  {
    id: "post-admission",
    name: "Post-Admission Setup",
    description: "Complete all requirements after receiving admission",
    icon: "🎉",
    color: "from-green-500 to-emerald-500",
    steps: 9,
    estimatedTime: "2-3 weeks",
    recommended: false,
    tags: ["Admitted Students"]
  },
  {
    id: "scholarship",
    name: "Scholarship Applications",
    description: "Apply for financial aid and scholarship opportunities",
    icon: "💰",
    color: "from-yellow-500 to-orange-500",
    steps: 7,
    estimatedTime: "4-8 weeks",
    recommended: false,
    tags: ["Financial Aid", "Optional"]
  },
  {
    id: "international",
    name: "International Students",
    description: "Additional requirements for foreign applicants",
    icon: "🌍",
    color: "from-teal-500 to-cyan-500",
    steps: 7,
    estimatedTime: "8-12 weeks",
    recommended: false,
    tags: ["International", "Visa Required"]
  }
];

export default function ChecklistSelectorPage() {
  const [selectedChecklists, setSelectedChecklists] = useState<string[]>(
    checklistOptions.filter(c => c.recommended).map(c => c.id)
  );

  const toggleChecklist = (id: string) => {
    setSelectedChecklists(prev => 
      prev.includes(id) 
        ? prev.filter(c => c !== id)
        : [...prev, id]
    );
  };

  const selectedCount = selectedChecklists.length;
  const totalSteps = checklistOptions
    .filter(c => selectedChecklists.includes(c.id))
    .reduce((sum, c) => sum + c.steps, 0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-12 px-4 overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse delay-75"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-full mb-4">
            <Target className="h-4 w-4" /> Personalized Planning
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
            Build Your Custom Checklist ✨
          </h1>
          
          <p className="text-slate-700 dark:text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-6">
            Select the checklists that match your journey. We'll create a personalized roadmap just for you.
          </p>

          {/* Current Selection Stats */}
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 text-base font-bold border-2 border-purple-200 dark:border-purple-800">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              {selectedCount} Checklist{selectedCount !== 1 ? 's' : ''} Selected
            </Badge>
            <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 text-base font-bold border-2 border-blue-200 dark:border-blue-800">
              <Clock className="h-5 w-5 mr-2" />
              {totalSteps} Total Steps
            </Badge>
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Not sure where to start?</CardTitle>
                  <CardDescription className="dark:text-slate-400">
                    We've pre-selected the essential checklists for most students
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-white dark:bg-slate-800">
                  ✅ Document Preparation (Must-have)
                </Badge>
                <Badge variant="outline" className="bg-white dark:bg-slate-800">
                  ✅ Post-JAMB Screening (Must-have)
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Checklist Selection Grid */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-black mb-2">
              Choose Your Checklists
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Select all that apply to your situation. You can always add more later.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {checklistOptions.map((checklist) => {
              const isSelected = selectedChecklists.includes(checklist.id);
              
              return (
                <Card
                  key={checklist.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    isSelected 
                      ? 'border-4 border-purple-500 dark:border-purple-400 bg-purple-50/50 dark:bg-purple-950/20' 
                      : 'border-2 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                  onClick={() => toggleChecklist(checklist.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-14 h-14 bg-gradient-to-br ${checklist.color} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                          {checklist.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2 flex items-center gap-2">
                            {checklist.name}
                            {checklist.recommended && (
                              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs">
                                Recommended
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription className="text-sm dark:text-slate-400">
                            {checklist.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleChecklist(checklist.id)}
                        className="mt-1 h-6 w-6"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {/* Stats */}
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <FileText className="h-4 w-4" />
                        <span className="font-medium">{checklist.steps} steps</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">{checklist.estimatedTime}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {checklist.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="text-xs bg-slate-50 dark:bg-slate-800"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Selected Indicator */}
                    {isSelected && (
                      <div className="flex items-center gap-2 text-sm font-bold text-purple-600 dark:text-purple-400 pt-2">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Added to your plan</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Action Section */}
      <section className="py-12 px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          {selectedCount > 0 ? (
            <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-black mb-2">
                      Ready to Get Started? 🚀
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                      You've selected <span className="font-bold text-purple-600 dark:text-purple-400">{selectedCount}</span> checklist{selectedCount !== 1 ? 's' : ''} with <span className="font-bold text-purple-600 dark:text-purple-400">{totalSteps}</span> total steps.
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Your progress will be saved automatically as you work through each task.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl px-8 text-lg"
                      asChild
                    >
                      <Link href="/admissions/checklist/view">
                        <Zap className="h-5 w-5 mr-2" />
                        View My Checklists
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Link>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30 font-bold rounded-xl"
                      asChild
                    >
                      <Link href="/admissions/guides">
                        <BookOpen className="h-5 w-5 mr-2" />
                        Read Detailed Guides
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">No Checklists Selected</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Select at least one checklist to get started with your admission journey.
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  We recommend starting with "Document Preparation" if you're unsure.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-8">
            Quick Questions? 💭
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-base">Can I add more checklists later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Absolutely! You can come back anytime and add more checklists as your needs evolve.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-base">Is my progress saved?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Yes! Your progress is auto-saved in your browser. Sign in to sync across devices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-base">Do I need all checklists?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  No! Select only what applies to you. Most students need Document Prep and Post-JAMB.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-base">Can I get reminders?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Yes! Sign in to enable WhatsApp and email reminders for important deadlines.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}