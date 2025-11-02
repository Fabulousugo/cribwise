import Link from "next/link";
import { 
  CreditCard,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ArrowLeft,
  Shield,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  ChevronRight,
  Wallet,
  RefreshCw,
  XCircle,
  Info,
  ExternalLink,
  Ban,
  Lock,
  Smartphone
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PaymentIssuesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-background to-slate-50 dark:from-slate-950 dark:via-background dark:to-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Breadcrumbs */}
          <nav className="text-sm mb-6 flex items-center gap-2 text-green-100">
            <Link href="/support" className="hover:text-white transition">
              Support
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/help" className="hover:text-white transition">
              Help Center
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white font-medium">Payment & Booking Help</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/20 backdrop-blur px-4 py-2 rounded-full mb-4">
            <CreditCard className="h-4 w-4" /> 
            Payment Help
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Payment & Booking Help
          </h1>

          {/* Summary */}
          <p className="text-xl text-green-100 mb-6 leading-relaxed max-w-3xl">
            Having trouble with payments or bookings? Find solutions to common issues and learn how our payment system works.
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Badge className="bg-white/20 backdrop-blur text-white border-white/30">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              8 min read
            </Badge>
            <Badge className="bg-white/20 backdrop-blur text-white border-white/30">
              Last updated: January 2025
            </Badge>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Info className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">Jump to Section</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    <a href="#how-it-works" className="text-sm text-green-700 dark:text-green-300 hover:underline">
                      → How Payment Works
                    </a>
                    <a href="#payment-methods" className="text-sm text-green-700 dark:text-green-300 hover:underline">
                      → Accepted Payment Methods
                    </a>
                    <a href="#common-issues" className="text-sm text-green-700 dark:text-green-300 hover:underline">
                      → Common Payment Issues
                    </a>
                    <a href="#refunds" className="text-sm text-green-700 dark:text-green-300 hover:underline">
                      → Refunds & Cancellations
                    </a>
                    <a href="#security" className="text-sm text-green-700 dark:text-green-300 hover:underline">
                      → Payment Security
                    </a>
                    <a href="#contact" className="text-sm text-green-700 dark:text-green-300 hover:underline">
                      → Contact Support
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <article className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border-2 border-slate-200 dark:border-slate-800 p-8 md:p-12 space-y-12">
            
            {/* How Payment Works */}
            <div id="how-it-works">
              <h2 className="text-3xl font-bold mb-6 pb-3 border-b-2">
                How Payment Works on CribWise
              </h2>

              <div className="space-y-6">
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  CribWise uses a secure, step-by-step booking process to protect both students and property owners.
                </p>

                {/* Process Steps */}
                <div className="space-y-4">
                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-green-700 dark:text-green-300">1</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">Browse & Select Property</CardTitle>
                          <CardDescription className="mt-1">
                            Search for housing, view photos, check details, and contact the landlord
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-green-700 dark:text-green-300">2</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">Visit Property (Recommended)</CardTitle>
                          <CardDescription className="mt-1">
                            Schedule an inspection to verify the property condition before booking
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-green-700 dark:text-green-300">3</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">Make Booking Request</CardTitle>
                          <CardDescription className="mt-1">
                            Submit your booking with preferred dates and any special requests
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-green-700 dark:text-green-300">4</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">Landlord Approval</CardTitle>
                          <CardDescription className="mt-1">
                            Landlord reviews your request and approves or declines within 24-48 hours
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-green-700 dark:text-green-300">5</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">Make Payment</CardTitle>
                          <CardDescription className="mt-1">
                            Once approved, pay securely through our platform using your preferred method
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-green-700 dark:text-green-300">6</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">Move In</CardTitle>
                          <CardDescription className="mt-1">
                            Complete documentation, collect keys, and move into your new home!
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>

                <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          <strong>Payment Protection:</strong> Your payment is held securely until you've moved in and confirmed everything is as described. This protects you from fraud and ensures quality.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Payment Methods */}
            <div id="payment-methods">
              <h2 className="text-3xl font-bold mb-6 pb-3 border-b-2">
                Accepted Payment Methods
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <CardTitle>Debit/Credit Cards</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Visa, Mastercard, Verve</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Instant processing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Secure 3D authentication</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>No extra charges</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <Smartphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle>Bank Transfer</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>All Nigerian banks supported</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>May take 1-3 hours to confirm</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Send proof of payment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Manual verification required</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <Wallet className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <CardTitle>Mobile Money</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>USSD banking (*737#, *894#, etc.)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Quick and convenient</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Works on any phone</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Instant confirmation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                        <Lock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <CardTitle>Paystack/Flutterwave</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Trusted payment gateways</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Bank-level encryption</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Multiple payment options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Instant confirmation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Common Issues */}
            <div id="common-issues">
              <h2 className="text-3xl font-bold mb-6 pb-3 border-b-2">
                Common Payment Issues & Solutions
              </h2>

              <div className="space-y-6">
                {/* Issue 1 */}
                <Card className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <CardTitle className="text-lg text-red-700 dark:text-red-300">
                          Payment Failed or Declined
                        </CardTitle>
                        <CardDescription className="mt-2 space-y-2">
                          <p><strong>Common Causes:</strong></p>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Insufficient funds in account</li>
                            <li>Card limit exceeded</li>
                            <li>Incorrect card details (CVV, expiry date)</li>
                            <li>International transactions blocked</li>
                            <li>Bank security declined the transaction</li>
                          </ul>
                          <p className="mt-3"><strong>Solutions:</strong></p>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Check your account balance</li>
                            <li>Verify all card details are correct</li>
                            <li>Contact your bank to authorize the transaction</li>
                            <li>Try a different payment method</li>
                            <li>Use a different card if available</li>
                          </ul>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Issue 2 */}
                <Card className="border-l-4 border-l-orange-500">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <CardTitle className="text-lg text-orange-700 dark:text-orange-300">
                          Payment Pending/Processing
                        </CardTitle>
                        <CardDescription className="mt-2 space-y-2">
                          <p><strong>What This Means:</strong></p>
                          <p className="text-sm">
                            Your payment was received but is awaiting confirmation from the payment gateway or bank. This usually takes a few minutes but can take up to 24 hours for bank transfers.
                          </p>
                          <p className="mt-3"><strong>What to Do:</strong></p>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Wait 10-15 minutes and refresh the page</li>
                            <li>Check your email for payment confirmation</li>
                            <li>Don&apos;t make duplicate payments</li>
                            <li>If still pending after 24 hours, contact support</li>
                            <li>Keep your transaction reference number</li>
                          </ul>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Issue 3 */}
                <Card className="border-l-4 border-l-yellow-500">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <CardTitle className="text-lg text-yellow-700 dark:text-yellow-300">
                          Charged But Booking Not Confirmed
                        </CardTitle>
                        <CardDescription className="mt-2 space-y-2">
                          <p><strong>What Happened:</strong></p>
                          <p className="text-sm">
                            Your bank/card was charged but the booking didn't complete. This is usually a temporary glitch.
                          </p>
                          <p className="mt-3"><strong>Solutions:</strong></p>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Check your email for confirmation</li>
                            <li>Look in your account dashboard for the booking</li>
                            <li>Wait 1-2 hours for system sync</li>
                            <li>Contact support with transaction reference</li>
                            <li>We'll verify and confirm your booking manually</li>
                            <li>If booking can't be completed, full refund within 7 days</li>
                          </ul>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Issue 4 */}
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Ban className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                          Unable to Complete Transaction
                        </CardTitle>
                        <CardDescription className="mt-2 space-y-2">
                          <p><strong>Possible Reasons:</strong></p>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Internet connection interrupted</li>
                            <li>Session timeout (took too long)</li>
                            <li>Browser compatibility issues</li>
                            <li>Payment gateway maintenance</li>
                            <li>Ad blocker interfering</li>
                          </ul>
                          <p className="mt-3"><strong>Try These:</strong></p>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Use Chrome or Safari browser</li>
                            <li>Disable ad blockers temporarily</li>
                            <li>Clear browser cache and cookies</li>
                            <li>Try from a different device</li>
                            <li>Use mobile app if available</li>
                            <li>Wait 30 minutes and try again</li>
                          </ul>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </div>

            {/* Refunds */}
            <div id="refunds">
              <h2 className="text-3xl font-bold mb-6 pb-3 border-b-2">
                Refunds & Cancellations
              </h2>

              <div className="space-y-6">
                <p className="text-lg text-slate-700 dark:text-slate-300">
                  Our refund policy protects both students and landlords while being fair to all parties.
                </p>

                <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      Eligible for Full Refund
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        <span>Property not as described</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        <span>Landlord cancelled the booking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        <span>You cancel within 24 hours of booking (and move-in is 14+ days away)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        <span>Payment error or duplicate charge</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        <span>Property has major safety issues</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      Partial Refund or No Refund
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 dark:text-orange-400">→</span>
                        <span><strong>50% refund:</strong> Cancel 7-13 days before move-in</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 dark:text-orange-400">→</span>
                        <span><strong>25% refund:</strong> Cancel 3-6 days before move-in</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 dark:text-orange-400">→</span>
                        <span><strong>No refund:</strong> Cancel less than 3 days before move-in</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 dark:text-orange-400">→</span>
                        <span><strong>No refund:</strong> No-show on move-in date</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 dark:text-orange-400">→</span>
                        <span><strong>No refund:</strong> Change of mind after moving in</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <RefreshCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Refund Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">1.</span>
                        <span><strong>Request refund</strong> through your booking dashboard or contact support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">2.</span>
                        <span><strong>Provide reason</strong> and any supporting evidence (photos, messages, etc.)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">3.</span>
                        <span><strong>Review process</strong> takes 2-5 business days</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">4.</span>
                        <span><strong>Approved refunds</strong> are processed within 7-14 business days</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">5.</span>
                        <span><strong>Money returns</strong> to your original payment method</span>
                      </li>
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Security */}
            <div id="security">
              <h2 className="text-3xl font-bold mb-6 pb-3 border-b-2">
                Payment Security & Protection
              </h2>

              <div className="space-y-6">
                <p className="text-lg text-slate-700 dark:text-slate-300">
                  Your financial safety is our top priority. Here's how we protect you:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-2 border-purple-200 dark:border-purple-800">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <Lock className="h-6 w-6 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold mb-1">SSL Encryption</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Bank-level 256-bit encryption protects all transactions
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold mb-1">PCI DSS Compliant</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            We meet international payment security standards
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-200 dark:border-green-800">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold mb-1">Payment Holding</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Funds held securely until you confirm move-in
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-orange-200 dark:border-orange-800">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold mb-1">Fraud Detection</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            AI monitors for suspicious activity 24/7
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold mb-2 text-red-700 dark:text-red-300">Important Security Tips</h4>
                        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                          <li className="flex items-start gap-2">
                            <span className="text-red-600 dark:text-red-400">⚠</span>
                            <span><strong>Never pay outside the platform</strong> - All payments must go through CribWise for protection</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-600 dark:text-red-400">⚠</span>
                            <span><strong>Don't share card details</strong> directly with landlords or via WhatsApp</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-600 dark:text-red-400">⚠</span>
                            <span><strong>Verify property first</strong> - Visit before paying when possible</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-600 dark:text-red-400">⚠</span>
                            <span><strong>Watch for scams</strong> - Deals too good to be true usually are</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-600 dark:text-red-400">⚠</span>
                            <span><strong>Report suspicious activity</strong> immediately to support</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-3xl font-bold mb-6 pb-3 border-b-2">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                      How long does payment processing take?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Card payments are instant. Bank transfers take 1-3 hours. USSD is instant. Once confirmed, your booking is immediately secured.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                      Can I pay in installments?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Some landlords offer installment plans. Look for "Installment Available" badge on listings or ask the landlord directly. Terms vary by property.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                      What if I'm charged twice?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Duplicate charges are automatically refunded within 7 business days. Contact support immediately with both transaction references to speed up the process.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                      Do you accept international cards?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Yes! Visa and Mastercard from any country work. Some banks may charge foreign transaction fees - check with your bank.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                      Is there a booking fee?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      CribWise charges a small service fee (3-5% of rent) to cover payment processing, customer support, and platform maintenance. This is shown clearly before payment.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Contact Support */}
      <section id="contact" className="py-12 px-4 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Still Having Payment Issues?</h2>
          <p className="text-xl text-green-100 mb-8">
            Our support team is here to help you complete your booking
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 text-white" />
                <h3 className="font-bold mb-2">Live Chat</h3>
                <p className="text-sm text-green-100 mb-4">Usually replies in 2 mins</p>
                <Button className="w-full bg-white text-green-600 hover:bg-green-50">
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-6 text-center">
                <Phone className="h-12 w-12 mx-auto mb-3 text-white" />
                <h3 className="font-bold mb-2">WhatsApp</h3>
                <p className="text-sm text-green-100 mb-4">9 AM - 9 PM (WAT)</p>
                <Button className="w-full bg-white text-green-600 hover:bg-green-50">
                  Message Us
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-6 text-center">
                <Mail className="h-12 w-12 mx-auto mb-3 text-white" />
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-sm text-green-100 mb-4">Response in 24 hours</p>
                <Button className="w-full bg-white text-green-600 hover:bg-green-50">
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-sm text-green-100">
            <p>💡 <strong>Pro Tip:</strong> Have your transaction reference number ready when contacting support for faster resolution</p>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <section className="py-8 px-4 bg-slate-100 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button variant="outline" asChild>
              <Link href="/help">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Help Center
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/support">
                Contact Support
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}