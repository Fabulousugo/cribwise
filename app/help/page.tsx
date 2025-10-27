import Link from "next/link";
import {
  HelpCircle,
  Search,
  Settings,
  CreditCard,
  UserCog,
  Shield,
  Bell,
  Mail,
  MessageSquare,
  ChevronRight,
  ArrowLeft,
  Info,
  BookOpen,
  LifeBuoy,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Help Center landing page
export default function HelpCenterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-background to-slate-50 dark:from-slate-950 dark:via-background dark:to-slate-950">
      {/* Skip link for a11y */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-white focus:text-slate-900 focus:px-3 focus:py-2 focus:rounded-md focus:shadow"
      >
        Skip to content
      </a>

      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <nav aria-label="Breadcrumb" className="text-sm mb-6 flex items-center gap-2 text-cyan-100">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span className="text-white font-medium" aria-current="page">Help Center</span>
          </nav>

          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/20 backdrop-blur px-4 py-2 rounded-full mb-4">
            <HelpCircle className="h-4 w-4" aria-hidden="true" />
            <span>How can we help?</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">CribWise Help Center</h1>
          <p className="text-lg md:text-xl text-cyan-100 max-w-2xl mb-6">
            Browse guides, fix common issues, and learn tips to get the most out of CribWise.
          </p>

          {/* Search (placeholder – wire to your help search if available) */}
          <form action="/help/search" method="GET" className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-100" aria-hidden="true" />
              <Input
                name="q"
                placeholder="Search help articles (e.g., payments, account, messages)"
                className="pl-10 h-12 bg-white/90 text-slate-900 placeholder:text-slate-500"
                aria-label="Search help articles"
              />
            </div>
            <p className="text-xs text-cyan-100 mt-2">Try: “account settings”, “payment failed”, “verify email”.</p>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <Badge className="bg-white/20 backdrop-blur text-white border-white/30">Updated: Oct 2025</Badge>
            <Badge className="bg-white/20 backdrop-blur text-white border-white/30 flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              Student Housing Guides
            </Badge>
          </div>
        </div>
      </section>

      {/* Content */}
      <section id="content" className="py-10 px-4">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Quick links */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <Link href="/help/account-settings" className="block">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 grid place-content-center">
                      <UserCog className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>Account & Profile</CardTitle>
                      <CardDescription>Update profile, privacy & security</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <li>• Change password</li>
                    <li>• Verify school email</li>
                    <li>• Notifications & privacy</li>
                  </ul>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <Link href="/help/payment-issues" className="block">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 grid place-content-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>Payments & Bookings</CardTitle>
                      <CardDescription>Fix payment errors, refunds, receipts</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <li>• Payment failed / pending</li>
                    <li>• Duplicate charge</li>
                    <li>• Refund timelines</li>
                  </ul>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <Link href="/support" className="block">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 grid place-content-center">
                      <LifeBuoy className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>Contact Support</CardTitle>
                      <CardDescription>Chat, WhatsApp, or email us</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Get help from a human in minutes.</p>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Browse by category</h2>
              <Button asChild variant="outline">
                <Link href="/support">
                  Need help fast?
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-cyan-500">
                <Link href="/help/account-settings" className="block">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Settings className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                      <CardTitle>Account Settings</CardTitle>
                    </div>
                    <CardDescription>
                      Profile, email verification, password, and privacy controls.
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="border-l-4 border-l-emerald-500">
                <Link href="/help/payment-issues" className="block">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      <CardTitle>Payments & Refunds</CardTitle>
                    </div>
                    <CardDescription>
                      Payment methods, failures, receipts, refunds & timelines.
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <Link href="/help/messaging" className="block">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      <CardTitle>Messages & Inquiries</CardTitle>
                    </div>
                    <CardDescription>
                      Talk to landlords, read receipts, blocking & reporting.
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <Link href="/help/notifications" className="block">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      <CardTitle>Notifications</CardTitle>
                    </div>
                    <CardDescription>
                      Email, SMS, push, and WhatsApp alert preferences.
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="border-l-4 border-l-rose-500">
                <Link href="/help/privacy-security" className="block">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Shield className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                      <CardTitle>Privacy & Safety</CardTitle>
                    </div>
                    <CardDescription>
                      Keep your account safe, recognize scams, data controls.
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <Link href="/help/email-verification" className="block">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Mail className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      <CardTitle>Email & Verification</CardTitle>
                    </div>
                    <CardDescription>
                      Verify school email, change email, delivery troubleshooting.
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            </div>
          </div>

          {/* Featured guides */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Featured guides</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-cyan-200 dark:border-cyan-800 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCog className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    Account Management Guide
                  </CardTitle>
                  <CardDescription>Complete walkthrough to profile, security & privacy.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href="/help/account-settings">
                      Open guide
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    Payment & Booking Help
                  </CardTitle>
                  <CardDescription>Fix payment errors and understand refunds.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href="/help/payment-issues">
                      Open guide
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Still stuck */}
          <section className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8">
            <div className="flex items-start md:items-center gap-4 md:gap-6 flex-col md:flex-row">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 grid place-content-center flex-shrink-0">
                <Info className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">Still stuck?</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  Our team replies quickly. Reach out and we’ll help you get sorted.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/support">Start live chat</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/support#whatsapp">WhatsApp us</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/support#email">Send an email</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Back nav */}
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Shield className="h-3.5 w-3.5" />
              Content is for guidance only and may change without notice.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
