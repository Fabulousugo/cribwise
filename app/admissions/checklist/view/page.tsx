"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CheckCircle2, 
  Circle,
  Clock, 
  Target,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Bell,
  Download,
  Share2,
  Settings,
  TrendingUp,
  Lightbulb,
  ExternalLink,
  ArrowLeft
} from "lucide-react";
import { allChecklists, type Checklist, type ChecklistStep } from "@/lib/admissions-checklists";

export default function ChecklistViewPage() {
  // Load selected checklists from localStorage (in real app)
  const [selectedChecklistIds, setSelectedChecklistIds] = useState<string[]>([]);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [expandedChecklists, setExpandedChecklists] = useState<Record<string, boolean>>({});

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("selectedChecklists");
    const completed = localStorage.getItem("completedSteps");
    
    if (saved) {
      setSelectedChecklistIds(JSON.parse(saved));
    } else {
      // Default to recommended checklists
      setSelectedChecklistIds(["documents", "post-jamb"]);
    }
    
    if (completed) {
      setCompletedSteps(JSON.parse(completed));
    }

    // Expand first checklist by default
    const firstId = saved ? JSON.parse(saved)[0] : "documents";
    if (firstId) {
      setExpandedChecklists({ [firstId]: true });
    }
  }, []);

  // Save to localStorage whenever completedSteps changes
  useEffect(() => {
    localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
  }, [completedSteps]);

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const toggleChecklist = (checklistId: string) => {
    setExpandedChecklists(prev => ({
      ...prev,
      [checklistId]: !prev[checklistId]
    }));
  };

  const handleExport = () => {
    // Create text content for export
    let content = `MY ADMISSION CHECKLIST\n`;
    content += `Progress: ${completedCount}/${totalSteps} steps (${progressPercent}%)\n`;
    content += `Generated: ${new Date().toLocaleDateString()}\n\n`;
    content += `=`.repeat(50) + `\n\n`;

    selectedChecklists.forEach((checklist) => {
      const progress = getChecklistProgress(checklist);
      content += `${checklist.icon} ${checklist.name.toUpperCase()}\n`;
      content += `Progress: ${progress.completed}/${progress.total} steps\n`;
      content += `-`.repeat(50) + `\n\n`;

      checklist.steps.forEach((step, index) => {
        const isCompleted = completedSteps[step.id] || false;
        content += `${isCompleted ? '✓' : '☐'} STEP ${index + 1}: ${step.title}\n`;
        content += `   ${step.description}\n`;
        content += `   Time: ${step.estimatedTime} | Category: ${step.category}\n`;
        if (step.deadline) content += `   Deadline: ${step.deadline}\n`;
        content += `\n`;
      });

      content += `\n`;
    });

    // Create and download file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admission-checklist-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareText = `Check out my admission progress! 🎓\n\n${completedCount}/${totalSteps} steps completed (${progressPercent}%)\n\nI'm using this awesome checklist to track my university admission journey!\n\n${window.location.origin}/admissions/checklist`;

    // Try native share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Admission Checklist',
          text: shareText,
          url: window.location.href
        });
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          // Fallback to clipboard
          copyToClipboard(shareText);
        }
      }
    } else {
      // Fallback to clipboard for desktop
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('✓ Link copied to clipboard! Share it with your friends.');
    }).catch(() => {
      alert('Could not copy to clipboard. Please try again.');
    });
  };

  const selectedChecklists = allChecklists.filter(c => selectedChecklistIds.includes(c.id));
  
  // Calculate overall progress
  const totalSteps = selectedChecklists.reduce((sum, c) => sum + c.steps.length, 0);
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  // Calculate per-checklist progress
  const getChecklistProgress = (checklist: Checklist) => {
    const checklistStepIds = checklist.steps.map(s => s.id);
    const completed = checklistStepIds.filter(id => completedSteps[id]).length;
    const percent = Math.round((completed / checklist.steps.length) * 100);
    return { completed, total: checklist.steps.length, percent };
  };

  if (selectedChecklists.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-2 border-slate-200 dark:border-slate-700">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No Checklists Selected</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              You haven't selected any checklists yet. Let's get you started!
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl w-full"
              asChild
            >
              <Link href="/admissions/checklist">
                Select Your Checklists
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      {/* Header */}
      <section className="relative py-8 px-4 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admissions/checklist" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Change Selection
              </Link>
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2" onClick={handleExport}>
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-white dark:bg-card rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-800 shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-black mb-1">Your Progress</h1>
                <p className="text-slate-600 dark:text-slate-400">
                  {completedCount} of {totalSteps} steps completed
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                    {progressPercent}%
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Complete</p>
                </div>
              </div>
            </div>

            <Progress value={progressPercent} className="h-3" />

            {progressPercent === 100 && (
              <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-900 dark:text-green-100">🎉 All Done!</h3>
                    <p className="text-sm text-green-700 dark:text-green-300">You've completed all your checklist steps. Great job!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reminder CTA */}
      <section className="py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Never Miss a Deadline</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Get WhatsApp reminders for important tasks</p>
                </div>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl whitespace-nowrap">
                Enable Reminders
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Checklists */}
      <section className="py-6 px-4 pb-20">
        <div className="max-w-5xl mx-auto space-y-6">
          {selectedChecklists.map((checklist) => {
            const progress = getChecklistProgress(checklist);
            const isExpanded = expandedChecklists[checklist.id];

            return (
              <Card 
                key={checklist.id}
                className="border-2 border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Checklist Header */}
                <CardHeader 
                  className={`cursor-pointer bg-gradient-to-r ${checklist.color} bg-opacity-10 hover:bg-opacity-20 transition-all`}
                  onClick={() => toggleChecklist(checklist.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 bg-gradient-to-br ${checklist.color} rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                        {checklist.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">{checklist.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {progress.completed}/{progress.total}
                          </Badge>
                        </div>
                        <CardDescription className="dark:text-slate-400">
                          {checklist.description}
                        </CardDescription>
                        
                        {/* Progress bar */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                            <span className="font-medium">{progress.percent}% Complete</span>
                            <span>{progress.completed} of {progress.total} steps</span>
                          </div>
                          <Progress value={progress.percent} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <Button variant="ghost" size="sm" className="flex-shrink-0">
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </Button>
                  </div>
                </CardHeader>

                {/* Checklist Steps */}
                {isExpanded && (
                  <CardContent className="p-6 space-y-4">
                    {checklist.steps.map((step, index) => {
                      const isCompleted = completedSteps[step.id] || false;

                      return (
                        <div 
                          key={step.id}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            isCompleted 
                              ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20' 
                              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-purple-300 dark:hover:border-purple-700'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <Checkbox
                              checked={isCompleted}
                              onCheckedChange={() => toggleStep(step.id)}
                              className="mt-1 h-5 w-5"
                            />

                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                                    STEP {index + 1}
                                  </span>
                                  {step.priority === "high" && (
                                    <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs">
                                      High Priority
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <h4 className={`font-bold text-lg mb-2 ${isCompleted ? 'line-through text-slate-500' : ''}`}>
                                {step.title}
                              </h4>
                              
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                {step.description}
                              </p>

                              {/* Meta info */}
                              <div className="flex flex-wrap gap-3 text-xs text-slate-600 dark:text-slate-400 mb-3">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>{step.estimatedTime}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Target className="h-3.5 w-3.5" />
                                  <span>{step.category}</span>
                                </div>
                                {step.deadline && (
                                  <div className="flex items-center gap-1 font-medium text-orange-600 dark:text-orange-400">
                                    <TrendingUp className="h-3.5 w-3.5" />
                                    <span>Deadline: {step.deadline}</span>
                                  </div>
                                )}
                              </div>

                              {/* Tips */}
                              {step.tips && step.tips.length > 0 && (
                                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-3">
                                  <div className="flex items-start gap-2">
                                    <Lightbulb className="h-4 w-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                      <h5 className="font-bold text-sm text-yellow-900 dark:text-yellow-100 mb-1">Pro Tips:</h5>
                                      <ul className="space-y-1 text-xs text-yellow-800 dark:text-yellow-200">
                                        {step.tips.map((tip, i) => (
                                          <li key={i} className="flex items-start gap-1">
                                            <span className="text-yellow-600 dark:text-yellow-400">•</span>
                                            <span>{tip}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Resources */}
                              {step.resources && step.resources.length > 0 && (
                                <div className="space-y-2">
                                  <h5 className="font-bold text-sm text-slate-700 dark:text-slate-300">Helpful Resources:</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {step.resources.map((resource, i) => (
                                      <a
                                        key={i}
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors border border-blue-200 dark:border-blue-800"
                                      >
                                        <span>{resource.title}</span>
                                        <ExternalLink className="h-3 w-3" />
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}