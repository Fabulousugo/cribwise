import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Sparkles, 
  Heart, 
  Zap, 
  Shield, 
  CheckCircle2, 
  UserPlus, 
  Search,
  Target,
  TrendingUp,
  Clock,
  MessageSquare,
  Star,
  ArrowRight
} from "lucide-react";

export default function RoommatesLandingPage() {
  // Sample roommate preview data
  const sampleMatches = [
    {
      id: 1,
      name: "Chidi O.",
      major: "CS Major",
      school: "UNILAG",
      gradient: "from-purple-400 to-pink-400",
      tags: ["Early Bird", "Clean", "Quiet"],
      match: 98
    },
    {
      id: 2,
      name: "Amaka N.",
      major: "Law",
      school: "UI",
      gradient: "from-pink-400 to-orange-400",
      tags: ["Social", "Music", "Active"],
      match: 95
    },
    {
      id: 3,
      name: "Tunde A.",
      major: "Engineering",
      school: "OAU",
      gradient: "from-blue-400 to-cyan-400",
      tags: ["Quiet", "Study", "Tech"],
      match: 92
    },
    {
      id: 4,
      name: "Blessing M.",
      major: "Medicine",
      school: "UNIBEN",
      gradient: "from-green-400 to-emerald-400",
      tags: ["Organized", "Night Owl", "Focused"],
      match: 94
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse delay-75"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg">
                <Sparkles className="h-5 w-5" />
                🔥 AI-Powered Matching
              </div>

              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
                Find Your Perfect Roommate Match
              </h1>

              <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed">
                Our smart AI connects you with compatible roommates based on lifestyle, study habits, and preferences. Say goodbye to awkward living situations! 🎯
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/roommate/browse">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl px-8 py-6 text-lg shadow-xl hover:scale-105 transition-all"
                  >
                    <Search className="mr-2 h-5 w-5" />
                    Browse Roommates
                  </Button>
                </Link>
                <Link href="/roommate/create">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30 font-bold rounded-2xl px-8 py-6 text-lg"
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    Create Profile
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">1,200+ Successful Matches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">98% Satisfaction Rate</span>
                </div>
              </div>
            </div>

            {/* Right: Sample Cards Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                {sampleMatches.map((match, index) => (
                  <Card 
                    key={match.id}
                    className={`group hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-400 dark:hover:border-purple-500 hover:-translate-y-2 ${
                      index % 2 === 1 ? 'mt-8' : ''
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${match.gradient} mb-4 mx-auto`}></div>
                      <h4 className="font-bold text-center mb-1">{match.name}</h4>
                      <p className="text-sm text-center text-muted-foreground mb-3">
                        {match.major} • {match.school}
                      </p>
                      <div className="space-y-2">
                        {match.tags.slice(0, 2).map((tag, i) => (
                          <div key={i} className="flex justify-center">
                            <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
                              {tag}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <span className="text-green-600 dark:text-green-400 font-bold text-sm">
                          {match.match}% Match
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-orange-400 text-white font-black px-6 py-3 rounded-2xl shadow-2xl rotate-12">
                <p className="text-sm">AI Powered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">How It Works ⚡</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Find your perfect roommate in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="border-2 border-purple-100 dark:border-purple-900/30 hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-black">1</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">Create Your Profile</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Tell us about your lifestyle, habits, and what you're looking for in a roommate
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-2 border-pink-100 dark:border-pink-900/30 hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-black">2</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">Get AI Matches</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Our algorithm finds compatible roommates based on your preferences
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-2 border-blue-100 dark:border-blue-900/30 hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-black">3</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">Connect & Move In</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Message your matches and find your perfect living arrangement
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Student-Only Notice */}
          <Card className="mt-12 border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
                    Student-to-Student Only 🎓
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 mb-3">
                    This feature is exclusively for students. No agents or landlords — just genuine peer-to-peer connections.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-400">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Authentic matches:</span> Connect with real students
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-400">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Your space:</span> One person rents, then sublets
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-400">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Safe & private:</span> No commercial interference
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-400">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Verified students:</span> Student ID required
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Why Students Love Us 💜</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Smart features that make finding roommates easy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-2 border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-3">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Smart AI Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Advanced algorithm analyzes 50+ compatibility factors to find your perfect match
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2 border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-3">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Lifestyle Compatibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Match on sleep schedules, cleanliness, study habits, and social preferences
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2 border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Verified Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  All profiles verified with student ID for safety and authenticity
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-2 border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-3">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Secure Messaging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Chat safely in-app before sharing personal contact information
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-2 border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-3">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Advanced Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Filter by school, budget, move-in date, and specific preferences
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="border-2 border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Quick & Easy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Create your profile in under 5 minutes and start matching instantly
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Student Success Stories 🌟</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Real stories from students who found their perfect match
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-4 italic">
                  "Found my perfect roommate in less than a week! The compatibility matching is spot on. We even have the same sleep schedule!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
                  <div>
                    <p className="font-bold">Chioma A.</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">UNILAG • Law Student</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="border-2 border-pink-200 dark:border-pink-800">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-4 italic">
                  "Best decision ever! My roommate and I are now best friends. The AI matching really works!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-orange-400"></div>
                  <div>
                    <p className="font-bold">Emeka O.</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">UI • Engineering</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-4 italic">
                  "So much better than random roommate assignment. We share the same study habits and it makes everything easier!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400"></div>
                  <div>
                    <p className="font-bold">Fatima M.</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">OAU • Medicine</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-95"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-sm font-bold bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" /> Join 1,200+ Students
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Ready to Find Your Perfect Roommate? 🎉
          </h2>
          
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            Create your profile in minutes and start connecting with compatible roommates today. It's free!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/roommate/create">
              <Button 
                size="lg"
                className="bg-white text-purple-700 hover:bg-slate-100 font-bold text-xl px-10 py-7 rounded-2xl shadow-2xl hover:scale-105 transition-all"
              >
                <UserPlus className="h-6 w-6 mr-2" />
                Create Your Profile
              </Button>
            </Link>
            <Link href="/roommate/browse">
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-bold text-xl px-10 py-7 rounded-2xl backdrop-blur-sm"
              >
                <Search className="h-6 w-6 mr-2" />
                Browse Profiles
              </Button>
            </Link>
          </div>

          <p className="text-white/70 text-sm mt-8">
            No credit card required • 100% Free • Secure & Private
          </p>
        </div>
      </section>
    </main>
  );
}