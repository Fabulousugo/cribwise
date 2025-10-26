import Link from "next/link";
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock,
  Search,
  BookOpen,
  Users,
  HelpCircle,
  ChevronRight,
  Send,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  ExternalLink,
  CheckCircle2,
  Zap,
  Shield,
  Heart
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-background to-slate-50 dark:from-slate-950 dark:via-background dark:to-slate-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5))]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-sm font-semibold bg-white/20 backdrop-blur px-4 py-2 rounded-full mb-6">
              <Heart className="h-4 w-4" /> 
              We're Here to Help
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              How Can We Help You Today?
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Get support, find answers, or connect with our team. We're committed to making your experience smooth and stress-free.
            </p>

            {/* Quick Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search for help... (e.g., 'how to verify email', 'payment issues')"
                  className="w-full pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 -mt-16 relative z-10">
            <Card className="border-2 border-purple-200 dark:border-purple-800 shadow-xl hover:shadow-2xl transition-shadow bg-white dark:bg-slate-900">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Get instant help from our support team
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Start Chat
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
                <div className="flex items-center gap-2 mt-3 text-sm text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Usually replies in 2 mins</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 dark:border-blue-800 shadow-xl hover:shadow-2xl transition-shadow bg-white dark:bg-slate-900">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email Support</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Detailed help for complex issues
                </p>
                <Button variant="outline" className="w-full border-2 border-blue-300 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/30">
                  Send Email
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
                <div className="flex items-center gap-2 mt-3 text-sm text-slate-600 dark:text-slate-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Response within 24 hours</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 dark:border-green-800 shadow-xl hover:shadow-2xl transition-shadow bg-white dark:bg-slate-900">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">WhatsApp Support</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Quick answers on your phone
                </p>
                <Button variant="outline" className="w-full border-2 border-green-300 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-950/30">
                  Message Us
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
                <div className="flex items-center gap-2 mt-3 text-sm text-slate-600 dark:text-slate-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span>9 AM - 9 PM (WAT)</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Popular Help Topics
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Topic 1 */}
            <Link href="/verify" className="group">
              <Card className="border-2 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg transition-all h-full">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
                        How to Verify School Email
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Step-by-step guide to link and verify your university email address
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>

            {/* Topic 2 */}
            <Link href="/properties" className="group">
              <Card className="border-2 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all h-full">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                        Finding Student Housing
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Tips for searching, viewing, and securing safe accommodation
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>

            {/* Topic 3 */}
            <Link href="/help/payment-issues" className="group">
              <Card className="border-2 hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg transition-all h-full">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-green-600 dark:group-hover:text-green-400 transition">
                        Payment & Booking Help
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Understanding our booking process and payment options
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>

            {/* Topic 4 */}
            <Link href="/safety" className="group">
              <Card className="border-2 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-lg transition-all h-full">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-orange-600 dark:group-hover:text-orange-400 transition">
                        Safety & Security Tips
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Stay safe while searching for housing and meeting landlords
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>

            {/* Topic 5 */}
            <Link href="/admissions/checklist" className="group">
              <Card className="border-2 hover:border-pink-300 dark:hover:border-pink-700 hover:shadow-lg transition-all h-full">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-pink-600 dark:group-hover:text-pink-400 transition">
                        Admission Checklists
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Track your university admission process step-by-step
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>

            {/* Topic 6 */}
            <Link href="/help/account-settings" className="group">
              <Card className="border-2 hover:border-cyan-300 dark:hover:border-cyan-700 hover:shadow-lg transition-all h-full">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition">
                        Account Management
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Update profile, change password, and manage settings
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/help">
                <BookOpen className="h-5 w-5 mr-2" />
                Browse All Help Articles
                <ChevronRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-12 px-4 bg-slate-100 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              More Resources
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Everything you need to succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-slate-200 dark:border-slate-700">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Admission Guides</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Comprehensive guides on JAMB, Post-UTME, and university admissions
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/admissions/guides">
                    View Guides
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 dark:border-slate-700">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Student Community</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Connect with other students, share experiences, get peer support
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/community">
                    Join Community
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 dark:border-slate-700">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quick Tips</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Fast tips and tricks for housing search and student life
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/safety/tips">
                    View Tips
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Still Need Help?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Send us a message and we'll get back to you as soon as possible
            </p>
          </div>

          <Card className="border-2 border-purple-200 dark:border-purple-800">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Your Name
                    </label>
                    <Input placeholder="John Doe" className="h-11" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email Address
                    </label>
                    <Input type="email" placeholder="john@example.com" className="h-11" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Subject
                  </label>
                  <Input placeholder="What do you need help with?" className="h-11" />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Please describe your issue or question in detail..."
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </Button>

                <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                  We typically respond within 24 hours on business days
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 px-4 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <Mail className="h-8 w-8 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Email</h4>
              <a href="mailto:support@cribwise.com" className="text-blue-100 hover:text-white">
                support@cribwise.com
              </a>
            </div>

            <div>
              <Phone className="h-8 w-8 mx-auto mb-3" />
              <h4 className="font-bold mb-2">WhatsApp</h4>
              <a href="https://wa.me/2348012345678" className="text-blue-100 hover:text-white">
                +234 801 234 5678
              </a>
            </div>

            <div>
              <Clock className="h-8 w-8 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Support Hours</h4>
              <p className="text-blue-100">
                Mon-Sat: 9 AM - 9 PM WAT<br />
                Sun: 10 AM - 6 PM WAT
              </p>
            </div>

            <div>
              <Users className="h-8 w-8 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Follow Us</h4>
              <div className="flex justify-center gap-3 mt-3">
                <a href="#" className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}