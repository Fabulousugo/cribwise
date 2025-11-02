import Link from "next/link"
import { 
  GraduationCap, 
  FileText, 
  Search, 
  Calendar, 
  Mail,
  Clock,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Shield,
  FileCheck,
  TrendingUp
} from "lucide-react"

// TEMP data (replace with DB later)
const GUIDES = [
  {
    slug: "admissions-basics-nigeria",
    title: "Admissions Basics in Nigeria",
    summary: "Understand JAMB/UTME, post‑UTME, cut‑offs, and direct entry in one comprehensive guide.",
    tags: ["JAMB", "UTME", "Post‑UTME"],
    icon: GraduationCap,
    color: "from-purple-500 to-blue-500",
    readTime: "8 min read",
    difficulty: "Beginner"
  },
  {
    slug: "how-to-track-deadlines",
    title: "How to Track Admissions Deadlines",
    summary: "Never miss a window: portals to check, timelines, and reminder setup for every application.",
    tags: ["Deadlines", "Portals", "Reminders"],
    icon: Clock,
    color: "from-orange-500 to-red-500",
    readTime: "5 min read",
    difficulty: "Beginner"
  },
  {
    slug: "link-your-school-email",
    title: "Link Your School Email",
    summary: "When to link it, accepted domains, and what happens if you don't verify your student status.",
    tags: ["School Email", "Verification"],
    icon: Shield,
    color: "from-green-500 to-emerald-500",
    readTime: "4 min read",
    difficulty: "Easy"
  },
  {
    slug: "prepare-documents",
    title: "Documents You Need for Applications",
    summary: "From O'Level to transcripts: a printable checklist with examples and common mistakes.",
    tags: ["Documents", "Checklist"],
    icon: FileCheck,
    color: "from-pink-500 to-purple-500",
    readTime: "6 min read",
    difficulty: "Intermediate"
  },
]

const CATEGORIES = [
  { id: "all", label: "All Guides", count: GUIDES.length },
  { id: "deadlines", label: "Deadlines", count: 1 },
  { id: "documents", label: "Documents", count: 1 },
  { id: "policy", label: "Policy", count: 1 },
  { id: "beginner", label: "Beginner Friendly", count: 2 },
]

const QUICK_LINKS = [
  {
    title: "Need urgent help?",
    description: "Chat with our support team",
    icon: Mail,
    href: "/support",
    color: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
  },
  {
    title: "Can't find a guide?",
    description: "Request a specific topic",
    icon: BookOpen,
    href: "/admissions/request-guide",
    color: "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300"
  }
]

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-75"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border-2 border-purple-200 dark:border-purple-800 rounded-full mb-6">
            <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-bold text-purple-900 dark:text-purple-100">Admissions Guides</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
              Step‑by‑Step Guides
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Clear, Nigerian‑specific how‑tos to get you from interest to admission. 
            <span className="block mt-2 text-slate-600 dark:text-slate-400">Master the process with expert guidance.</span>
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search guides by topic, keyword, or question..."
                className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-lg"
              />
            </div>
          </div>
        </header>

        {/* Categories Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  category.id === "all"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md"
                }`}
              >
                <span>{category.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  category.id === "all"
                    ? "bg-white/20"
                    : "bg-slate-100 dark:bg-slate-700"
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
          <div className="text-center p-4 bg-white dark:bg-slate-800 border-2 border-purple-100 dark:border-purple-900/30 rounded-xl">
            <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              {GUIDES.length}
            </div>
            <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">Total Guides</div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-800 border-2 border-green-100 dark:border-green-900/30 rounded-xl">
            <div className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              23m
            </div>
            <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">Avg Read Time</div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-800 border-2 border-orange-100 dark:border-orange-900/30 rounded-xl">
            <div className="text-3xl font-black bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
              98%
            </div>
            <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">Helpful Rate</div>
          </div>
        </div>

        {/* Guides Grid */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {GUIDES.map((guide) => {
            const Icon = guide.icon
            return (
              <Link 
                key={guide.slug} 
                href={`/admissions/guides/${guide.slug}`}
                className="group relative bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700"
              >
                {/* Icon Badge */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${guide.color} mb-4 shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    {guide.readTime}
                  </span>
                  <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-semibold">
                    {guide.difficulty}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Link */}
                <div className="flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 group-hover:gap-3 transition-all">
                  <span>Read Guide</span>
                  <ArrowRight className="h-4 w-4" />
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
              </Link>
            )
          })}
        </section>

        {/* Quick Links */}
        <section className="grid md:grid-cols-2 gap-4 mb-12 max-w-4xl mx-auto">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-start gap-4 p-5 border-2 rounded-xl hover:shadow-lg transition-all ${link.color}`}
              >
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{link.title}</h3>
                  <p className="text-sm opacity-80">{link.description}</p>
                </div>
              </Link>
            )
          })}
        </section>

        {/* Popular Topics */}
        <section className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Popular Topics</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Understanding JAMB Registration",
              "Post-UTME Preparation Tips",
              "How to Check Admission Status",
              "Required Documents Checklist",
              "Application Deadline Calendar",
              "Student Loan Applications"
            ].map((topic, index) => (
              <button
                key={index}
                className="flex items-center gap-3 p-3 text-left border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all group"
              >
                <CheckCircle2 className="h-4 w-4 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-purple-700 dark:group-hover:text-purple-300">
                  {topic}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Back Link */}
        <div className="text-center">
          <Link 
            href="/admissions" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg transition-all"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Admissions
          </Link>
        </div>
      </div>
    </main>
  )
}