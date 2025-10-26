// ==========================================
// FILE: app/safety/tips/page.tsx
// Safety Tips — immersive checklist for students (REDESIGNED)
// ==========================================
import Link from "next/link";
import {
  ShieldCheck,
  MapPin,
  Banknote,
  Users,
  MessageSquareWarning,
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  Camera,
  FileText,
  Eye,
  XCircle,
  ArrowRight,
  Lightbulb,
  Shield,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SafetyTipsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 shadow-lg border border-blue-200 dark:border-blue-800">
              <ShieldCheck className="h-4 w-4" />
              <span>ESSENTIAL SAFETY GUIDE</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Smart Moves
              </span>
              <br />
              <span className="text-slate-900 dark:text-white">Before You Pay or Visit</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              House hunting doesn&apos;t have to be scary. Follow these tips to stay safe, avoid scams, and find your perfect place with confidence. 🏠✨
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link href="#visit">
                <Button variant="outline" className="font-semibold border-2">
                  <MapPin className="mr-2 h-4 w-4" />
                  Visit Tips
                </Button>
              </Link>
              <Link href="#payment">
                <Button variant="outline" className="font-semibold border-2">
                  <Banknote className="mr-2 h-4 w-4" />
                  Payment Safety
                </Button>
              </Link>
              <Link href="#red-flags">
                <Button variant="outline" className="font-semibold border-2">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Red Flags
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">95%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Scams Prevented</div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400">12k+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Safe Transactions</div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-black text-purple-600 dark:text-purple-400">8k+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Students Protected</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-16 space-y-12">
        {/* Visit Checklist */}
        <div id="visit" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl shadow-lg">
              <MapPin className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black">On-Site Visit Checklist</h2>
              <p className="text-slate-600 dark:text-slate-400">Your safety guide for property tours</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-900/10 dark:to-green-900/10 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center">
                    <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <CardTitle className="text-lg">Visit in Daylight</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Always schedule tours between 10am-5pm.</strong> You will see the property clearly, the neighborhood feels safer, and you can spot issues like poor lighting or security concerns.
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Pro tip: Avoid evening or night visits, even if the landlord insists
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-900/10 dark:to-green-900/10 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center">
                    <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <CardTitle className="text-lg">Bring a Friend</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Never go alone.</strong> Bring a roommate, friend, or family member. Two sets of eyes catch more details, and you will feel safer throughout the visit.
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Pro tip: Share your live location with someone not attending the tour
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-900/10 dark:to-green-900/10 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <CardTitle className="text-lg">Verify the Location</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Meet at the exact address in the app.</strong> If they suggest meeting elsewhere first, that&apos;s a red flag. The property should match the GPS pin perfectly.
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Pro tip: Use Google Maps to verify the location before you go
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-900/10 dark:to-green-900/10 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center">
                    <Eye className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <CardTitle className="text-lg">Inspect Everything</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Test locks, taps, power outlets, and WiFi signal.</strong> Check for damp spots, roof leaks, cracked walls, and pest signs. Take photos/videos for reference.
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Pro tip: Record a walkthrough video on your phone for later review
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Payment Safety */}
        <div id="payment" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
              <Banknote className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black">Payment Safety Rules</h2>
              <p className="text-slate-600 dark:text-slate-400">Protect your money from scammers</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:to-cyan-900/10 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-lg">Use In-App Booking</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Always use our booking/deposit flow.</strong> It&apos;s protected, tracked, and refundable if things go wrong. Avoid cash payments to random individuals.
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    We hold your deposit safely until you confirm everything is legit
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:to-cyan-900/10 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-lg">Never Pay Third Parties</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Only pay the verified landlord/agent.</strong> If someone asks you to pay a &quot;friend,&quot; a &quot;assistant,&quot; or different account, that&apos;s a scam. Walk away immediately.
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    The name on the bank account must match the verified profile
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:to-cyan-900/10 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-lg">Keep Payment Proof</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Save receipts, transaction IDs, and bank alerts.</strong> Screenshots can be edited, so keep original emails/SMS from your bank or payment provider.
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Take a photo of receipts as backup, store in cloud storage
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:to-cyan-900/10 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-lg">No Rush Payments</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Take your time to decide.</strong> Legitimate landlords don&apos;t pressure you with &quot;pay now or lose it&quot; tactics. If you feel rushed, it&apos;s probably a scam.
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Sleep on it. Good deals will still be there tomorrow
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Communication Tips */}
        <div id="communication" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
              <Users className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black">Smart Communication</h2>
              <p className="text-slate-600 dark:text-slate-400">Keep your conversations safe</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center">
                    <MessageSquareWarning className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-base">Stay On Platform</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Keep early chats on CribWise. We mask phone numbers when possible and monitor for scam phrases to protect you.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center">
                    <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-base">Watch Pressure Tactics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Be cautious of scammers who pressure you with &quot;pay today or lose it&quot; messages. Real landlords understand you need time to decide.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-base">Report Suspicious Links</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  If someone asks you to move to WhatsApp immediately or click suspicious links, report them to us right away.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Red Flags */}
        <div id="red-flags" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl shadow-lg">
              <AlertTriangle className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black">Major Red Flags 🚩</h2>
              <p className="text-slate-600 dark:text-slate-400">Walk away if you see these warning signs</p>
            </div>
          </div>

          <Card className="border-2 border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 shadow-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-red-200 dark:border-red-800">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-slate-900 dark:text-white">Requests Off-Platform Payment</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Pushes you to pay via personal accounts, crypto, or gift cards</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-red-200 dark:border-red-800">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-slate-900 dark:text-white">Won&apos;t Meet at Location</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Unwilling to meet at the exact pinned address or keeps changing locations</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-red-200 dark:border-red-800">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-slate-900 dark:text-white">Demands Full Payment Upfront</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Asks for full rent before viewing or signing a proper contract</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-red-200 dark:border-red-800">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-slate-900 dark:text-white">Name Inconsistencies</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Different names on bank account, ID, and verified profile</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-red-200 dark:border-red-800">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-slate-900 dark:text-white">Too Good to Be True</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Price far below market or “luxury” listing with urgent availability</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-red-200 dark:border-red-800">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-slate-900 dark:text-white">No Verification Badge</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Profile lacks a verification checkmark or shows recent revocation</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-red-200 dark:border-red-800">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-slate-900 dark:text-white">Refuses ID or Contract</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Won’t share valid ID, proof of ownership, or a clear written agreement</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 rounded-xl border-2 border-red-300 dark:border-red-700">
                <p className="text-sm font-bold text-red-800 dark:text-red-200 flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5" />
                  If you spot ANY of these red flags:
                </p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Stop all communication immediately, don&apos;t send money, and report the listing to us. Trust your gut — if something feels wrong, it probably is.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-black">Encountered a Scam?</h2>
                  <p className="text-white/90">We are here to help 24/7</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Emergency Hotline
                  </h3>
                  <p className="text-2xl font-black mb-2">0800-CRIBWISE</p>
                  <p className="text-sm text-white/80">Available 24/7 for urgent safety concerns</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <MessageSquareWarning className="h-5 w-5" />
                    Report Center
                  </h3>
                  <Link href="/report">
                    <Button className="w-full bg-white text-purple-600 hover:bg-slate-100 font-bold">
                      File a Report
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <p className="text-sm text-white/80 mt-2">We investigate all reports within 24 hours</p>
                </div>
              </div>

              <p className="text-sm text-white/90 text-center">
                Your safety reports help protect thousands of other students. Thank you for keeping CribWise safe. 🙏
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reference Checklist */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Your Quick Safety Checklist
            </span>
          </h2>
        <p className="text-slate-600 dark:text-slate-400">Screenshot this and keep it handy!</p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-black text-xl mb-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="h-6 w-6" />
                  Before You Visit
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">Check landlord&apos;s verification badge</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">Schedule during daylight hours (10am-5pm)</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">Bring a friend or family member</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">Share live location with someone</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">Verify address matches GPS pin</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-black text-xl mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <CheckCircle className="h-6 w-6" />
                  Before You Pay
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">Use in-app booking flow only</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">Verify bank account name matches profile</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">Never rush — take time to decide</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">Save all payment receipts and IDs</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">Read contract thoroughly before signing</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Stay Smart. Stay Safe. 🛡️</h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Bookmark this page and share it with your friends. Together, we can make student housing safer for everyone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/safety">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-slate-100 font-bold px-8 py-6 text-lg">
                <ShieldCheck className="mr-2 h-5 w-5" />
                Learn About Verification
              </Button>
            </Link>
            <Link href="/report">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-purple-600 hover:bg-white/10 font-bold px-8 py-6 text-lg backdrop-blur-sm"
              >
                <AlertTriangle className="mr-2 h-5 w-5" />
                Report a Scam
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/safety" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            ← Safety & Verification
          </Link>
          <span className="text-slate-400">•</span>
          <Link href="/report" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Report an Issue
          </Link>
          <span className="text-slate-400">•</span>
          <Link href="/verify" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Get Verified
          </Link>
          <span className="text-slate-400">•</span>
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
