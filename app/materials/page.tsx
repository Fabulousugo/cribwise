import Link from "next/link";
import { Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMaterials, getMaterialFilters } from "@/lib/materials";
import { getSchools } from "@/lib/admissions";
import { BookOpen, Search, Filter, Download, FileText, BookMarked, GraduationCap, Sparkles, TrendingUp, Zap } from "lucide-react";
import type { School } from "../types/admissions";

export default async function MaterialsHome({ searchParams }: { searchParams?: Record<string, string | string[]> }) {
  const q = typeof searchParams?.q === "string" ? searchParams.q : "";
  const rawSchool = typeof searchParams?.school === "string" ? searchParams.school : "";
  const rawLevel  = typeof searchParams?.level  === "string" ? searchParams.level  : "";
  const programme = typeof searchParams?.programme === "string" ? searchParams.programme : "";
  const course    = typeof searchParams?.course    === "string" ? searchParams.course    : "";

  const school = rawSchool === "all" ? "" : rawSchool;
  const level  = rawLevel  === "any" ? "" : rawLevel;

  const schools = await getSchools();
  const filters = await getMaterialFilters();
  const materials = await getMaterials({ q, schoolSlug: school, programmeSlug: programme, level, courseCode: course });

  const hasActiveFilters = q || school || level || programme || course;

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse delay-75"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-full mb-6">
            <BookOpen className="h-4 w-4" /> Study Resources
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
            Level Up Your Study Game 📚
          </h1>
          
          <p className="text-slate-700 dark:text-slate-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Past questions, lecture notes, and syllabi — all the materials you need to ace your exams, no cap
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 text-sm font-bold border-2 border-purple-200 dark:border-purple-800">
              <BookMarked className="h-4 w-4 mr-2" />
              {materials.length}+ Resources
            </Badge>
            <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 text-sm font-bold border-2 border-blue-200 dark:border-blue-800">
              <GraduationCap className="h-4 w-4 mr-2" />
              All Levels
            </Badge>
            <Badge className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-4 py-2 text-sm font-bold border-2 border-pink-200 dark:border-pink-800">
              <Download className="h-4 w-4 mr-2" />
              Free Downloads
            </Badge>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="border-2 border-purple-100 dark:border-purple-900/30 shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-xl flex items-center justify-center">
                  <Filter className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Find Exactly What You Need</CardTitle>
                  <CardDescription className="dark:text-slate-400">
                    Filter by school, programme, level, or course code
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <form className="space-y-4" action="/materials" method="get">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input 
                    name="q" 
                    defaultValue={q} 
                    placeholder="Search titles (e.g., Calculus, Thermodynamics, CSC201)…"
                    className="pl-12 h-12 text-base border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                {/* Filter Grid */}
                <div className="grid md:grid-cols-4 gap-3">
                  {/* School */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">School</label>
                    <Select name="school" defaultValue={rawSchool || "all"}>
                      <SelectTrigger className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl">
                        <SelectValue placeholder="All schools" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All schools</SelectItem>
                        {schools.map((s: School) => (
                          <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Programme */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Programme</label>
                    <Input 
                      name="programme" 
                      defaultValue={programme} 
                      placeholder="e.g., computer-science"
                      className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>

                  {/* Level */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Level</label>
                    <Select name="level" defaultValue={rawLevel || "any"}>
                      <SelectTrigger className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl">
                        <SelectValue placeholder="Any level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any level</SelectItem>
                        {(filters.levels || ["100","200","300","400","500"]).map((lv: string) => (
                          <SelectItem key={lv} value={lv}>{lv} level</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Course Code */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Course Code</label>
                    <Input 
                      name="course" 
                      defaultValue={course} 
                      placeholder="e.g., CSC201"
                      className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl px-6"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Apply Filters
                  </Button>
                  <Link href="/materials">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold rounded-xl"
                    >
                      Reset All
                    </Button>
                  </Link>
                  {hasActiveFilters && (
                    <Badge variant="outline" className="px-3 py-2">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Filters Active
                    </Badge>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Results Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-1">
                {materials.length === 0 ? "No Materials Found" : `Found ${materials.length} Resources`}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                {materials.length === 0 ? "Try adjusting your filters" : "Click any card to view or download"}
              </p>
            </div>
          </div>

          {materials.length === 0 ? (
            <Card className="border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-800 dark:to-purple-950/20">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">No materials match your search 🤔</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                  Try removing some filters or searching by course code instead. We're constantly adding new resources!
                </p>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                  <p>💡 <span className="font-semibold">Pro tip:</span> Search by course code (e.g., CSC201) for best results</p>
                  <p>📚 <span className="font-semibold">Browse:</span> Try checking other levels (100–500)</p>
                  <p>🎓 <span className="font-semibold">Alternative:</span> Filter by school only to see all available materials</p>
                </div>
                <Link href="/materials">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl">
                    Clear All Filters
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((m) => (
                <Link key={m.id} href={`/materials/${m.id}`}>
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 group">
                    {/* Header with Material Type */}
                    <div className={`h-3 w-full rounded-t-xl ${
                      m.kind === "past-question" ? "bg-gradient-to-r from-purple-500 to-pink-500" :
                      m.kind === "lecture-note" ? "bg-gradient-to-r from-blue-500 to-cyan-500" :
                      m.kind === "syllabus" ? "bg-gradient-to-r from-green-500 to-emerald-500" :
                      "bg-gradient-to-r from-yellow-500 to-orange-500"
                    }`}></div>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge className={`${
                          m.kind === "past-question" ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" :
                          m.kind === "lecture-note" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" :
                          m.kind === "syllabus" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" :
                          "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                        } font-bold text-xs`}>
                          {m.kind.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </Badge>
                        {m.year && (
                          <Badge variant="outline" className="text-xs">
                            {m.year}
                          </Badge>
                        )}
                      </div>

                      <CardTitle className="text-lg line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {m.title}
                      </CardTitle>
                      
                      <CardDescription className="text-sm dark:text-slate-400">
                        <div className="space-y-1 mt-2">
                          <p className="font-medium text-slate-700 dark:text-slate-300">
                            📍 {m.schoolName}
                          </p>
                          {m.programmeName && (
                            <p className="text-xs">🎓 {m.programmeName}</p>
                          )}
                          <p className="text-xs flex items-center gap-2">
                            <span className="font-semibold">Level {m.level}</span>
                            {m.courseCode && (
                              <>
                                <span>•</span>
                                <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                                  {m.courseCode}
                                </span>
                              </>
                            )}
                          </p>
                        </div>
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl group-hover:scale-105 transition-transform"
                        size="sm"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        View Material
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-95"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-sm font-bold bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" /> Can't Find What You Need?
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Request Study Materials ✨
          </h2>
          
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Missing a past question or lecture note? Let us know and we'll source it for you. We're here to help you succeed!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-purple-700 hover:bg-slate-100 font-bold rounded-2xl px-8"
            >
              <FileText className="h-5 w-5 mr-2" />
              Request Material
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-bold rounded-2xl backdrop-blur-sm"
              asChild
            >
              <Link href="/admissions">
                <GraduationCap className="h-5 w-5 mr-2" />
                Back to Admissions
              </Link>
            </Button>
          </div>

          <p className="text-white/70 text-sm mt-8">
            Helping 50,000+ students ace their exams 📖
          </p>
        </div>
      </section>
    </main>
  );
}