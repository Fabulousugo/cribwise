// ==========================================
// FILE: app/safety/page.tsx
// Safety & Verification — explains CribWise Trust Pack (IMMERSIVE VERSION)
// ==========================================
import Link from "next/link";
import { ShieldCheck, UserCheck, Building2, MapPinCheck, Camera, AlertTriangle, Lock, HelpCircle, CheckCircle, Sparkles, Eye, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Gradient */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-emerald-950 dark:via-blue-950 dark:to-purple-950 overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 shadow-lg border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="h-4 w-4" /> 
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent font-bold">CribWise Trust Pack™</span>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sleep Better. 
              </span>
              <br />
              <span className="text-slate-900 dark:text-white">We've Got Your Back.</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Finding a place shouldn't feel sketchy. Our <strong>multi-layer verification system</strong> keeps scammers out and gives you (and your parents) total peace of mind. 🛡️
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-emerald-600 dark:text-emerald-400">98%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Verified Listings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400">24/7</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Safety Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-purple-600 dark:text-purple-400">15k+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Protected Students</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/verify">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Get Verified Now
                </Button>
              </Link>
              <Link href="/safety/tips">
                <Button size="lg" variant="outline" className="font-bold px-8 py-6 text-lg border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300">
                  <Eye className="mr-2 h-5 w-5" />
                  Safety Tips
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">
            <Sparkles className="h-4 w-4" />
            THE TRUST PACK
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Four Layers of <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Protection</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Every student, landlord, and listing goes through our verification gauntlet. No shortcuts. No exceptions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1: Verified Students */}
          <Card className="relative overflow-hidden border-2 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 hover:shadow-2xl group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full"></div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <UserCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">Verified Students</CardTitle>
                    <CardDescription className="text-sm">Real students, zero catfish 🎓</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                  <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>School Email Check:</strong> Must verify <code className="bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded text-xs">.edu.ng</code> within 90 days of admission
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                  <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>ID Upload:</strong> Optional student ID or admission letter for extra trust points
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                  <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>Smart Monitoring:</strong> Suspicious activity? We'll ask you to re-verify (takes 2 mins)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Verified Landlords */}
          <Card className="relative overflow-hidden border-2 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-2xl group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full"></div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">Verified Landlords</CardTitle>
                    <CardDescription className="text-sm">Know who you're dealing with 🏠</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>NIN + Phone Check:</strong> Government ID verified, no bank statements needed
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>Face Match:</strong> Selfie vs. ID comparison when risk signals pop up
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>WhatsApp Lock:</strong> One-tap number binding to stop impersonators in their tracks
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Verified Listings */}
          <Card className="relative overflow-hidden border-2 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 hover:shadow-2xl group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full"></div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <MapPinCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">Verified Listings</CardTitle>
                    <CardDescription className="text-sm">What you see is what you get 📍</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                  <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>Auto GPS Tag:</strong> Photos taken on-site via WhatsApp link or camera capture
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                  <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>EXIF Analysis:</strong> We check for freshness, tamper signs, and stolen photos
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                  <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>Micro-Deposit:</strong> Small refundable deposit deters scammers before they start
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Safe Payments */}
          <Card className="relative overflow-hidden border-2 hover:border-pink-500 dark:hover:border-pink-400 transition-all duration-300 hover:shadow-2xl group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-transparent rounded-bl-full"></div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Lock className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">Protected Messages</CardTitle>
                    <CardDescription className="text-sm">Stay safe, stay on-platform 💬</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors">
                  <CheckCircle className="h-5 w-5 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>Smart Alerts:</strong> We flag risky phrases like "send money to this account"
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors">
                  <CheckCircle className="h-5 w-5 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>Verified-Only Bookings:</strong> Only verified users can request deposits/bookings
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors">
                  <CheckCircle className="h-5 w-5 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong>Phone Masking:</strong> Relay numbers available to limit off-platform scams
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 mb-4">
              <Camera className="h-4 w-4" />
              BEHIND THE SCENES
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              How We <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Verify Everything</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our verification isn't just a checkbox. It's a full-stack security system working 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Photo Capture Flow</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                <p>Agents follow our <strong>4-shot capture guide</strong>: front view, room interior, facilities, and neighborhood. Works on any phone, even low-spec devices.</p>
                <div className="bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 p-3 rounded-lg border border-pink-200 dark:border-pink-800">
                  <p className="text-xs font-semibold text-pink-700 dark:text-pink-300">🎯 Pro tip: Our WhatsApp link makes it super easy for landlords</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <MapPinCheck className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Location Lock</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                <p>GPS is captured <em>automatically</em> when photos are taken. Pins are <strong>not draggable</strong> by agents. We hash the geo-token for privacy.</p>
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">🔒 Result: No fake addresses, no catfishing locations</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">AI Risk Scoring</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                <p>Signals from identity, device fingerprints, media quality, and user history determine if we need extra verification before going live.</p>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">⚡ High-risk? Face match required. Low-risk? Instant approval.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Report & Enforcement Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400 mb-4">
            <AlertTriangle className="h-4 w-4" />
            SAFETY FIRST
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            See Something? <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Say Something.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Your reports help us keep CribWise clean. We take every flag seriously.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="border-2 border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle className="text-xl font-bold">Report Suspicious Activity</CardTitle>
              </div>
              <CardDescription className="text-slate-700 dark:text-slate-300">We prioritize reports from verified students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Every property page has a <strong>Report</strong> button. Use it if you see fake photos, price manipulation, or sketchy behavior.
              </p>
              <Link href="/report">
                <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  File a Report Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                  <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl font-bold">Essential Safety Tips</CardTitle>
              </div>
              <CardDescription className="text-slate-700 dark:text-slate-300">Read before you pay or visit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Tour in <strong>daylight</strong>, preferably with a friend</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Use our <strong>booking flow</strong> — avoid cash handoffs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Confirm landlord ID matches their <strong>verified profile</strong></span>
                </li>
              </ul>
              <Link href="/safety/tips">
                <Button variant="outline" className="w-full border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-bold">
                  <Eye className="mr-2 h-4 w-4" />
                  Read All Safety Tips
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Parents Section */}
      <section className="bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-violet-950 dark:via-purple-950 dark:to-pink-950 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 mb-4">
            <Heart className="h-4 w-4" />
            FOR PARENTS
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">Your Child's Safety</span> Is Our Priority
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            We know you want the best for your kids. That's why we've built verification systems that give you visibility and control — without being invasive.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">Full Transparency</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">See verified landlord info, exact GPS location, and authentic photos</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">Verified Everyone</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Students, landlords, and listings all pass our security checks</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">Always Reachable</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">24/7 support for urgent safety concerns or suspicious activity</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
            <p className="text-slate-700 dark:text-slate-300 italic mb-4">
              "As a parent, I was worried about my daughter moving off-campus. CribWise's verification badges gave me peace of mind. I could actually see the landlord's real identity and location before she paid anything."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                MO
              </div>
              <div className="text-left">
                <div className="font-bold">Mrs. Oluwatoyin</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Parent, UI Student</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold text-sm">GET YOUR TRUST BADGE</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Ready to Join the Verified Community?
            </h2>
            
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Get your verification badge in under 5 minutes. Stand out from the crowd, build trust instantly, and unlock full platform access.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link href="/verify">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-slate-100 font-bold px-10 py-7 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <ShieldCheck className="mr-2 h-6 w-6" />
                  Start Verification
                </Button>
              </Link>
              <Link href="/properties">
                <Button size="lg" variant="outline" className="border-2 border-white text-purple-600 hover:bg-white/10 font-bold px-10 py-7 text-lg backdrop-blur-sm">
                  Browse Safe Listings
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Takes 5 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>No hidden fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            ← Back to Home
          </Link>
          <span className="text-slate-400">•</span>
          <Link href="/safety/tips" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Safety Tips
          </Link>
          <span className="text-slate-400">•</span>
          <Link href="/report" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Report an Issue
          </Link>
          <span className="text-slate-400">•</span>
          <Link href="/faq" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            FAQ
          </Link>
        </div>
      </div>
    </main>
  );
}