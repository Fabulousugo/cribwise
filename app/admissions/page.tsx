import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GraduationCap, School, Clock, FileText, Sparkles, Zap, Target, TrendingUp } from "lucide-react";
import { getSchools } from "@/lib/admissions"; 

export default async function AdmissionsHome() {
  const schools = await getSchools();
  const featured = schools.slice(0, 8);

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      {/* HERO - Main Character Energy */}
      <section className="relative min-h-screen flex items-center py-20 px-4 overflow-hidden">
        {/* Gradient Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-300 dark:bg-yellow-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse delay-75"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse delay-150"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-full mb-6 shadow-lg animate-bounce">
            <Sparkles className="h-4 w-4" /> Your Era Starts Here
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent leading-tight">
            No Cap,<br />Let's Get You In 🎓
          </h1>
          
          <p className="text-slate-700 dark:text-slate-300 text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-medium">
            All the tea on admissions ☕ — requirements, deadlines & checklists for Nigerian unis. It's giving organized bestie energy ✨
          </p>

          {/* SEARCH */}
          <form action="/admissions/search" className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Input 
                name="q" 
                placeholder="Search schools or programmes... (manifesting your acceptance rn 🙏)" 
                className="text-lg h-14 pl-6 pr-32 rounded-2xl border-2 border-purple-200 dark:border-purple-700 focus:border-purple-500 dark:focus:border-purple-400 shadow-lg dark:bg-slate-800 dark:text-white"
              />
              <Button 
                type="submit" 
                className="absolute right-2 top-2 h-10 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-bold"
              >
                Search 🔍
              </Button>
            </div>
          </form>

          {/* QUICK LINKS - Bento Style */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">  
            <Link
              href="/admissions/checklist"
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 text-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <FileText className="h-8 w-8 mb-2" />
              <div className="font-bold text-lg">My Checklist</div>
              <div className="text-sm text-purple-100 dark:text-purple-200">Stay on track fr</div>
            </Link>

            <Link
              href="/admissions/deadlines"
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 dark:from-pink-600 dark:to-rose-700 text-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <Clock className="h-8 w-8 mb-2" />
              <div className="font-bold text-lg">Deadlines</div>
              <div className="text-sm text-pink-100 dark:text-pink-200">Don't ghost these</div>
            </Link>

            <Link
              href="/admissions/guides"
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 dark:from-blue-600 dark:to-cyan-700 text-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl col-span-2 md:col-span-1"
            >
              <Sparkles className="h-8 w-8 mb-2" />
              <div className="font-bold text-lg">Pro Guides</div>
              <div className="text-sm text-blue-100 dark:text-blue-200">Get the cheat codes</div>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-center">
            <div className="space-y-1">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">150+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Universities Listed</div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">50k+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Students Helped</div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-black bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">24/7</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Updated Info</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SCHOOLS */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-full mb-4">
              <TrendingUp className="h-4 w-4" /> Trending Schools
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              Schools That Slap 🔥
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">The most searched unis rn — peep the vibes</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {featured.map((s, idx) => (
              <Link 
                key={s.slug} 
                href={`/admissions/${s.slug}`} 
                className="group relative border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-6 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-2xl transition-all duration-300 bg-white dark:bg-card hover:-translate-y-2"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Icon Circle */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <School className="h-6 w-6 text-white" />
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-1">
                    {s.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    📍 {s.city}, {s.state}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 px-3 py-2 rounded-xl">
                  <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" /> 
                  <span className="text-slate-700 dark:text-slate-300">
                    {s.nextDeadline ?? "TBA"}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/admissions/school">
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30 font-bold text-purple-700 dark:text-purple-300 px-8"
              >
                View All Schools →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-3">Why We're Different 💅</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Not your parents' admission guide — we get it</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-card rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow border-2 border-purple-100 dark:border-purple-900">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-Time Updates</h3>
              <p className="text-slate-600 dark:text-slate-400">We stay up so you don't miss deadlines. Updated daily, no cap.</p>
            </div>

            <div className="bg-white dark:bg-card rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow border-2 border-blue-100 dark:border-blue-900">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 rounded-2xl flex items-center justify-center mb-4">
                <Target className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Personalized Checklists</h3>
              <p className="text-slate-600 dark:text-slate-400">Custom roadmap for YOUR school + programme. It's giving main character.</p>
            </div>

            <div className="bg-white dark:bg-card rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow border-2 border-pink-100 dark:border-pink-900">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 dark:from-pink-600 dark:to-rose-600 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">WhatsApp Reminders</h3>
              <p className="text-slate-600 dark:text-slate-400">Get pinged before deadlines. Like a bestie who actually remembers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Final Boss Energy */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-95"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-300 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse delay-75"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-sm font-bold bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" /> Plot Twist: You're Getting In
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Your Acceptance Letter Era Starts Now ✨
          </h2>
          
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto font-medium">
            Generate your personalized checklist, get WhatsApp reminders, and secure that admission. Periodt.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/admissions/checklist">
              <Button 
                size="lg" 
                className="bg-white text-purple-700 hover:bg-slate-100 font-bold text-lg px-8 py-6 rounded-2xl shadow-2xl hover:scale-105 transition-all"
              >
                <FileText className="h-5 w-5 mr-2" /> Create My Checklist
              </Button>
            </Link>

            <Link href="/admissions/guides">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6 rounded-2xl backdrop-blur-sm"
              >
                <Sparkles className="h-5 w-5 mr-2" /> Read the Guides
              </Button>
            </Link>
          </div>

          <p className="text-white/70 text-sm mt-8">
            Join 50,000+ students who are already locked in 🔒
          </p>
        </div>
      </section>

      {/* Footer Tagline */}
      <section className="py-12 px-4 bg-slate-900 dark:bg-slate-950 text-center">
        <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">
          Built different, for students who are different 💜
        </p>
      </section>
    </main>
  );
}