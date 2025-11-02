import Link from "next/link";
import { 
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Smartphone,
  Globe,
  Trash2,
  Download,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ArrowLeft,
  ChevronRight,
  Settings,
  Key,
  Camera,
  MapPin,
  Phone,
  Calendar,
  CreditCard,
  MessageCircle,
  Info,
  Image as ImageIcon,
  UserCog,
  Languages
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AccountSettingsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-background to-slate-50 dark:from-slate-950 dark:via-background dark:to-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Breadcrumbs */}
          <nav className="text-sm mb-6 flex items-center gap-2 text-cyan-100">
            <Link href="/support" className="hover:text-white transition">
              Support
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/help" className="hover:text-white transition">
              Help Center
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white font-medium">Account Management</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/20 backdrop-blur px-4 py-2 rounded-full mb-4">
            <UserCog className="h-4 w-4" /> 
            Account Settings
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Account Management Guide
          </h1>

          {/* Summary */}
          <p className="text-xl text-cyan-100 mb-6 leading-relaxed max-w-3xl">
            Learn how to manage your profile, update security settings, control notifications, and customize your CribWise experience.
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Badge className="bg-white/20 backdrop-blur text-white border-white/30">
              <Settings className="h-3.5 w-3.5 mr-1.5" />
              Complete Guide
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
          <Card className="border-2 border-cyan-200 dark:border-cyan-800 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Info className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">Jump to Section</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    <a href="#profile" className="text-sm text-cyan-700 dark:text-cyan-300 hover:underline">
                      → Profile Settings
                    </a>
                    <a href="#security" className="text-sm text-cyan-700 dark:text-cyan-300 hover:underline">
                      → Security & Password
                    </a>
                    <a href="#notifications" className="text-sm text-cyan-700 dark:text-cyan-300 hover:underline">
                      → Notifications
                    </a>
                    <a href="#privacy" className="text-sm text-cyan-700 dark:text-cyan-300 hover:underline">
                      → Privacy Controls
                    </a>
                    <a href="#verification" className="text-sm text-cyan-700 dark:text-cyan-300 hover:underline">
                      → Email Verification
                    </a>
                    <a href="#delete" className="text-sm text-cyan-700 dark:text-cyan-300 hover:underline">
                      → Delete Account
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
            
            {/* Profile Settings */}
            <div id="profile">
              <h2 className="text-3xl font-bold mb-6 pb-3 border-b-2 flex items-center gap-3">
                <User className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                Profile Settings
              </h2>

              <div className="space-y-6">
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  Your profile is your identity on CribWise. Keep it updated for better connections with landlords and fellow students.
                </p>

                {/* How to Access */}
                <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      How to Access Profile Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">1.</span>
                        <span>Click your <strong>profile picture</strong> or <strong>name</strong> in the top-right corner</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">2.</span>
                        <span>Select <strong>&quot;Account Settings&quot;</strong> from the dropdown menu</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">3.</span>
                        <span>Navigate to the <strong>&quot;Profile&quot;</strong> tab</span>
                      </li>
                    </ol>
                  </CardContent>
                </Card>

                {/* What You Can Edit */}
                <div>
                  <h3 className="text-2xl font-bold mb-4">What You Can Edit</h3>
                  
                  <div className="space-y-4">
                    {/* Profile Photo */}
                    <Card className="border-l-4 border-l-purple-500">
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <Camera className="h-6 w-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <CardTitle className="text-lg">Profile Photo</CardTitle>
                            <CardDescription className="mt-2 space-y-2">
                              <p><strong>How to Change:</strong></p>
                              <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                                <li>Click on your current profile photo</li>
                                <li>Select &quot;Upload New Photo&quot;</li>
                                <li>Choose image from your device</li>
                                <li>Crop and adjust as needed</li>
                                <li>Click &quot;Save&quot;</li>
                              </ol>
                              <p className="mt-3"><strong>Requirements:</strong></p>
                              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                                <li>Format: JPG, PNG, or WEBP</li>
                                <li>Size: Maximum 5MB</li>
                                <li>Recommended: Square image, 400x400px minimum</li>
                                <li>Must show your face clearly</li>
                              </ul>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>

                    {/* Personal Info */}
                    <Card className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <User className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <CardTitle className="text-lg">Personal Information</CardTitle>
                            <CardDescription className="mt-2">
                              <div className="space-y-3 text-sm">
                                <div>
                                  <p className="font-semibold mb-1">Full Name</p>
                                  <p className="text-slate-600 dark:text-slate-400">
                                    • Must match your school ID<br/>
                                    • Required for verification<br/>
                                    • Visible to landlords when you apply
                                  </p>
                                </div>
                                <div>
                                  <p className="font-semibold mb-1">Bio/About Me</p>
                                  <p className="text-slate-600 dark:text-slate-400">
                                    • Up to 500 characters<br/>
                                    • Tell landlords about yourself<br/>
                                    • Optional but recommended
                                  </p>
                                </div>
                                <div>
                                  <p className="font-semibold mb-1">Date of Birth</p>
                                  <p className="text-slate-600 dark:text-slate-400">
                                    • Cannot be changed after verification<br/>
                                    • Must be 16+ years old<br/>
                                    • Used for age verification only
                                  </p>
                                </div>
                              </div>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>

                    {/* Contact Info */}
                    <Card className="border-l-4 border-l-green-500">
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <Phone className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <CardTitle className="text-lg">Contact Information</CardTitle>
                            <CardDescription className="mt-2">
                              <div className="space-y-3 text-sm">
                                <div>
                                  <p className="font-semibold mb-1">Phone Number</p>
                                  <p className="text-slate-600 dark:text-slate-400">
                                    • Used for booking confirmations<br/>
                                    • Required for WhatsApp notifications<br/>
                                    • Verify with OTP after changing
                                  </p>
                                </div>
                                <div>
                                  <p className="font-semibold mb-1">WhatsApp Number</p>
                                  <p className="text-slate-600 dark:text-slate-400">
                                    • Can be different from phone number<br/>
                                    • Used for property inquiries<br/>
                                    • Optional but recommended
                                  </p>
                                </div>
                              </div>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>

                    {/* University Info */}
                    <Card className="border-l-4 border-l-orange-500">
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <MapPin className="h-6 w-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <CardTitle className="text-lg">University Information</CardTitle>
                            <CardDescription className="mt-2">
                              <div className="space-y-3 text-sm">
                                <div>
                                  <p className="font-semibold mb-1">University/Institution</p>
                                  <p className="text-slate-600 dark:text-slate-400">
                                    • Select from dropdown<br/>
                                    • Must match your school email<br/>
                                    • Shows on your profile
                                  </p>
                                </div>
                                <div>
                                  <p className="font-semibold mb-1">Department/Faculty</p>
                                  <p className="text-slate-600 dark:text-slate-400">
                                    • Optional information<br/>
                                    • Helps connect with coursemates<br/>
                                    • Visible to other students
                                  </p>
                                </div>
                                <div>
                                  <p className="font-semibold mb-1">Year of Study</p>
                                  <p className="text-slate-600 dark:text-slate-400">
                                    • 100, 200, 300, 400 level, etc.<br/>
                                    • Updates automatically each year<br/>
                                    • Optional but helpful
                                  </p>
                                </div>
                              </div>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                </div>

                {/* Tips */}
                <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold mb-2">Profile Best Practices</p>
                        <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                          <li>✓ Use a clear, recent photo of yourself</li>
                          <li>✓ Complete all required fields for better matches</li>
                          <li>✓ Write a friendly bio to introduce yourself</li>
                          <li>✓ Keep contact information up to date</li>
                          <li>✓ Verify your school email for &quot;Verified Student&quot; badge</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Security & Password */}
            <div id="security">
              <h2 className="text-3xl font-bold mb-6 pb-3 border-b-2 flex items-center gap-3">
                <Lock className="h-8 w-8 text-red-600 dark:text-red-400" />
                Security & Password
              </h2>

              <div className="space-y-6">
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  Protect your account with strong security settings and keep your information safe.
                </p>

                {/* Change Password */}
                <Card className="border-2 border-red-200 dark:border-red-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5 text-red-600 dark:text-red-400" />
                      Change Password
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold mb-2">Step-by-Step:</p>
                        <ol className="space-y-2 text-sm">
                          <li className="flex items-start gap-3">
                            <span className="font-bold text-red-600 dark:text-red-400 flex-shrink-0">1.</span>
                            <span>Go to Account Settings → Security tab</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="font-bold text-red-600 dark:text-red-400 flex-shrink-0">2.</span>
                            <span>Click &quot;Change Password&quot;</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="font-bold text-red-600 dark:text-red-400 flex-shrink-0">3.</span>
                            <span>Enter your <strong>current password</strong></span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="font-bold text-red-600 dark:text-red-400 flex-shrink-0">4.</span>
                            <span>Enter your <strong>new password</strong> (minimum 8 characters)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="font-bold text-red-600 dark:text-red-400 flex-shrink-0">5.</span>
                            <span>Confirm new password by typing it again</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="font-bold text-red-600 dark:text-red-400 flex-shrink-0">6.</span>
                            <span>Click &quot;Update Password&quot;</span>
                          </li>
                        </ol>
                      </div>

                      <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
                        <CardContent className="p-4">
                          <p className="font-semibold mb-2 flex items-center gap-2">
                            <Shield className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                            Strong Password Requirements:
                          </p>
                          <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                            <li>✓ At least 8 characters long</li>
                            <li>✓ Mix of uppercase and lowercase letters</li>
                            <li>✓ At least one number</li>
                            <li>✓ At least one special character (!@#$%^&*)</li>
                            <li>✓ Different from your old password</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                {/* Forgot Password */}
                <Card className="border-l-4 border-l-orange-500">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <CardTitle className="text-lg">Forgot Your Password?</CardTitle>
                        <CardDescription className="mt-2">
                          <ol className="space-y-2 text-sm">
                            <li className="flex items-start gap-3">
                              <span className="font-bold flex-shrink-0">1.</span>
                              <span>Go to the login page</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="font-bold flex-shrink-0">2.</span>
                              <span>Click &quot;Forgot Password?&quot;</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="font-bold flex-shrink-0">3.</span>
                              <span>Enter your email address</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="font-bold flex-shrink-0">4.</span>
                              <span>Check your email for reset link (check spam folder)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="font-bold flex-shrink-0">5.</span>
                              <span>Click the link and create a new password</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="font-bold flex-shrink-0">6.</span>
                              <span>Link expires in 1 hour - act quickly!</span>
                            </li>
                          </ol>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Two-Factor Authentication */}
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Smartphone className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <CardTitle className="text-lg">Two-Factor Authentication (Coming Soon)</CardTitle>
                        <CardDescription className="mt-2 text-sm">
                          We are working on adding 2FA for extra security. This will require a code from your phone each time you log in from a new device.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Security Tips */}
                <Card className="border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold mb-2 text-red-700 dark:text-red-300">Security Best Practices</p>
                        <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                          <li>⚠ Never share your password with anyone</li>
                          <li>⚠ Don&apos;t use the same password on multiple websites</li>
                          <li>⚠ Log out from public or shared computers</li>
                          <li>⚠ Be wary of phishing emails asking for your password</li>
                          <li>⚠ Change your password if you suspect unauthorized access</li>
                          <li>⚠ CribWise will NEVER ask for your password via email</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Notifications */}
            <div id="notifications">
              <h2 className="text-3xl font-bold mb-6 pb-3 border-b-2 flex items-center gap-3">
                <Bell className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                Notification Settings
              </h2>

              <div className="space-y-6">
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  Control how and when you receive updates from CribWise.
                </p>

                {/* Notification Types */}
                <div className="space-y-4">
                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="text-lg">Booking Notifications</CardTitle>
                      <CardDescription className="mt-2">
                        <p className="text-sm mb-3">Get notified about your booking status and updates:</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center justify-between">
                            <span>• Booking confirmed</span>
                            <Badge variant="outline" className="text-green-600 border-green-600">Recommended</Badge>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>• Booking declined</span>
                            <Badge variant="outline" className="text-green-600 border-green-600">Recommended</Badge>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>• Payment received</span>
                            <Badge variant="outline" className="text-green-600 border-green-600">Recommended</Badge>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>• Move-in reminders</span>
                            <Badge variant="outline">Optional</Badge>
                          </li>
                        </ul>
                        <p className="text-xs mt-3 text-slate-500">Channels: Email, SMS, Push, WhatsApp</p>
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle className="text-lg">Messages & Inquiries</CardTitle>
                      <CardDescription className="mt-2">
                        <p className="text-sm mb-3">Stay updated on conversations:</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center justify-between">
                            <span>• New message from landlord</span>
                            <Badge variant="outline" className="text-green-600 border-green-600">Recommended</Badge>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>• Landlord replied to inquiry</span>
                            <Badge variant="outline" className="text-green-600 border-green-600">Recommended</Badge>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>• Message read receipts</span>
                            <Badge variant="outline">Optional</Badge>
                          </li>
                        </ul>
                        <p className="text-xs mt-3 text-slate-500">Channels: Email, Push, WhatsApp</p>
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <CardTitle className="text-lg">Property Alerts</CardTitle>
                      <CardDescription className="mt-2">
                        <p className="text-sm mb-3">New listings and recommendations:</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center justify-between">
                            <span>• New properties near my school</span>
                            <Badge variant="outline">Optional</Badge>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>• Price drops on saved properties</span>
                            <Badge variant="outline">Optional</Badge>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>• Properties matching my preferences</span>
                            <Badge variant="outline">Optional</Badge>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>• Saved search alerts</span>
                            <Badge variant="outline">Optional</Badge>
                          </li>
                        </ul>
                        <p className="text-xs mt-3 text-slate-500">Channels: Email, Push</p>
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-l-4 border-l-orange-500">
                    <CardHeader>
                      <CardTitle className="text-lg">Platform Updates</CardTitle>
                      <CardDescription className="mt-2">
                        <p className="text-sm mb-3">News and feature announcements:</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center justify-between">
                            <span>• New features and improvements</span>
                            <Badge variant="outline">Optional</Badge>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>• CribWise blog posts</span>
                            <Badge variant="outline">Optional</Badge>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>• Tips and guides for students</span>
                            <Badge variant="outline">Optional</Badge>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>• Special offers and promotions</span>
                            <Badge variant="outline">Optional</Badge>
                          </li>
                        </ul>
                        <p className="text-xs mt-3 text-slate-500">Channels: Email only</p>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                {/* How to Manage */}
                <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      How to Manage Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">1.</span>
                        <span>Go to Account Settings → Notifications</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">2.</span>
                        <span>Toggle switches on/off for each notification type</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">3.</span>
                        <span>Choose channels: Email, SMS, Push, WhatsApp</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">4.</span>
                        <span>Changes save automatically</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">5.</span>
                        <span>You can also unsubscribe from emails using the link at the bottom of any email</span>
                      </li>
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Privacy Controls */}
            <div id="privacy">
              <h2 className="text-3xl font-bold mb-6 pb-3 border-b-2 flex items-center gap-3">
                <Eye className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                Privacy Controls
              </h2>

              <div className="space-y-6">
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  Control who can see your information and how your data is used.
                </p>

                <div className="space-y-4">
                  {/* Profile Visibility */}
                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <CardTitle className="text-lg">Profile Visibility</CardTitle>
                          <CardDescription className="mt-2">
                            <p className="text-sm mb-3">Choose who can see your profile:</p>
                            <div className="space-y-3">
                              <div className="border-l-2 border-purple-300 dark:border-purple-700 pl-4">
                                <p className="font-semibold text-sm">Public</p>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Anyone can see your profile, including search engines</p>
                              </div>
                              <div className="border-l-2 border-purple-300 dark:border-purple-700 pl-4">
                                <p className="font-semibold text-sm">Students Only (Recommended)</p>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Only verified students and landlords can see your profile</p>
                              </div>
                              <div className="border-l-2 border-purple-300 dark:border-purple-700 pl-4">
                                <p className="font-semibold text-sm">Private</p>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Only you and people you have messaged can see your profile</p>
                              </div>
                            </div>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Contact Info Privacy */}
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <CardTitle className="text-lg">Contact Information Privacy</CardTitle>
                          <CardDescription className="mt-2 text-sm">
                            <p className="mb-2">Control who sees your phone and email:</p>
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span><strong>Hide from everyone:</strong> Contact info hidden until you share</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span><strong>Show to landlords:</strong> Visible when you apply or inquire</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span><strong>Show to everyone:</strong> Public on your profile</span>
                              </li>
                            </ul>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Data Usage */}
                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <Globe className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <CardTitle className="text-lg">Data Usage Preferences</CardTitle>
                          <CardDescription className="mt-2 text-sm">
                            <p className="mb-2">Control how we use your data:</p>
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400">✓</span>
                                <span><strong>Personalized recommendations:</strong> Show properties matching your preferences</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400">✓</span>
                                <span><strong>Analytics:</strong> Help us improve the platform</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400">✓</span>
                                <span><strong>Marketing:</strong> Send relevant updates and offers</span>
                              </li>
                            </ul>
                            <p className="mt-3 text-xs text-slate-500">Toggle each option on/off in privacy settings</p>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Download Your Data */}
                  <Card className="border-l-4 border-l-cyan-500">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <Download className="h-6 w-6 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <CardTitle className="text-lg">Download Your Data</CardTitle>
                          <CardDescription className="mt-2 text-sm">
                            <p className="mb-3">You can download a copy of all your data:</p>
                            <ol className="space-y-2">
                              <li className="flex items-start gap-3">
                                <span className="font-bold flex-shrink-0">1.</span>
                                <span>Go to Privacy Settings</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="font-bold flex-shrink-0">2.</span>
                                <span>Click &quot;Download My Data&quot;</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="font-bold flex-shrink-0">3.</span>
                                <span>We will email you a link within 24 hours</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="font-bold flex-shrink-0">4.</span>
                                <span>Download includes: profile, messages, bookings, searches</span>
                              </li>
                            </ol>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>

            {/* Email Verification */}
            <div id="verification">
              <h2 className="text-3xl font-bold mb-6 pb-3 border-b-2 flex items-center gap-3">
                <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
                Email Verification
              </h2>

              <div className="space-y-6">
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  Verify your school email to unlock student-only features and get the &quot;Verified Student&quot; badge.
                </p>

                {/* Why Verify */}
                <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      Benefits of Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        <span><strong>Verified Student badge</strong> on your profile</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        <span>Access <strong>student-only housing listings</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        <span>Join your <strong>campus community</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        <span>Landlords <strong>trust you more</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        <span>Get <strong>priority support</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        <span>Access to <strong>student discounts</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* How to Verify */}
                <Card className="border-2 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      How to Verify Your Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">1.</span>
                        <span>Go to Account Settings → Email Verification</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">2.</span>
                        <span>Enter your <strong>university email address</strong> (must end in .edu.ng)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">3.</span>
                        <span>Click &quot;Send Verification Code&quot;</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">4.</span>
                        <span>Check your school email inbox (and spam folder)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">5.</span>
                        <span>Copy the 6-digit code</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">6.</span>
                        <span>Paste the code and click &quot;Verify&quot;</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">7.</span>
                        <span>✓ You are now verified! Badge appears immediately</span>
                      </li>
                    </ol>
                  </CardContent>
                </Card>

                {/* Troubleshooting */}
                <Card className="border-l-4 border-l-orange-500">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <CardTitle className="text-lg">Verification Issues?</CardTitle>
                        <CardDescription className="mt-2 text-sm">
                          <p className="mb-3"><strong>Didn&apos;t receive the email?</strong></p>
                          <ul className="space-y-2 mb-4">
                            <li>• Check your spam/junk folder</li>
                            <li>• Wait 5-10 minutes and try resending</li>
                            <li>• Make sure your email ends in .edu.ng</li>
                            <li>• Verify your inbox isn&apos;t full</li>
                          </ul>

                          <p className="mb-3"><strong>School email not working?</strong></p>
                          <ul className="space-y-2 mb-4">
                            <li>• Contact your university&apos;s ICT center</li>
                            <li>• Activate your school email if it&apos;s new</li>
                            <li>• Ensure you can log into your school email</li>
                          </ul>

                          <p className="mb-2"><strong>Still stuck?</strong></p>
                          <p>Contact support with:</p>
                          <ul className="space-y-1 mt-1">
                            <li>• Your school name</li>
                            <li>• Your school email address</li>
                            <li>• Screenshot of your student ID (optional)</li>
                          </ul>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Full Guide Link */}
                <div className="text-center">
                  <Button variant="outline" asChild>
                    <Link href="/admissions/guides/link-your-school-email">
                      Read Full Email Verification Guide
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Delete Account */}
            <div id="delete">
              <h2 className="text-3xl font-bold mb-6 pb-3 border-b-2 flex items-center gap-3">
                <Trash2 className="h-8 w-8 text-red-600 dark:text-red-400" />
                Delete Account
              </h2>

              <div className="space-y-6">
                <Card className="border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold mb-2 text-red-700 dark:text-red-300">Before You Delete</p>
                        <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                          Deleting your account is <strong>permanent and cannot be undone</strong>. Please read carefully before proceeding.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* What Happens */}
                <Card className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <CardTitle className="text-lg">What Happens When You Delete Your Account</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="font-semibold mb-2 text-red-600 dark:text-red-400">✗ You Will Lose:</p>
                        <ul className="space-y-1 ml-4">
                          <li>• Your profile and all personal information</li>
                          <li>• All saved properties and searches</li>
                          <li>• Message history with landlords</li>
                          <li>• Booking history (completed bookings)</li>
                          <li>• Reviews and ratings you have left</li>
                          <li>• Community memberships</li>
                          <li>• Verified student status</li>
                        </ul>
                      </div>

                      <div>
                        <p className="font-semibold mb-2 text-orange-600 dark:text-orange-400">⚠ What Remains:</p>
                        <ul className="space-y-1 ml-4">
                          <li>• Active booking obligations (you must complete these first)</li>
                          <li>• Payment history (for legal/tax purposes, 7 years)</li>
                          <li>• Anonymized analytics data</li>
                        </ul>
                      </div>

                      <div>
                        <p className="font-semibold mb-2 text-green-600 dark:text-green-400">✓ We Will:</p>
                        <ul className="space-y-1 ml-4">
                          <li>• Send confirmation email before deletion</li>
                          <li>• Give you 30 days to change your mind</li>
                          <li>• Remove your data from our active database</li>
                          <li>• Delete backups within 90 days</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card className="border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      Requirements Before Deletion
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 dark:text-orange-400 font-bold">1.</span>
                        <span><strong>No active bookings:</strong> Complete or cancel all current bookings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 dark:text-orange-400 font-bold">2.</span>
                        <span><strong>No pending payments:</strong> Settle all outstanding payments or refunds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 dark:text-orange-400 font-bold">3.</span>
                        <span><strong>No disputes:</strong> Resolve any open disputes or issues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 dark:text-orange-400 font-bold">4.</span>
                        <span><strong>Download your data:</strong> Get a copy if you want to keep records</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* How to Delete */}
                <Card className="border-2 border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle>How to Delete Your Account</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="font-bold flex-shrink-0">1.</span>
                        <span>Go to Account Settings → Privacy & Security</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold flex-shrink-0">2.</span>
                        <span>Scroll to the bottom and click &quot;Delete Account&quot;</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold flex-shrink-0">3.</span>
                        <span>Read the warning and check that you understand</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold flex-shrink-0">4.</span>
                        <span>Select reason for leaving (optional feedback)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold flex-shrink-0">5.</span>
                        <span>Enter your password to confirm</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold flex-shrink-0">6.</span>
                        <span>Click &quot;Delete My Account&quot;</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold flex-shrink-0">7.</span>
                        <span>Check email for confirmation link</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold flex-shrink-0">8.</span>
                        <span>Click the link to finalize deletion</span>
                      </li>
                    </ol>

                    <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <p className="text-sm font-semibold mb-2">30-Day Grace Period</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        Your account will be deactivated immediately but not deleted for 30 days. During this time, you can log in to cancel the deletion. After 30 days, deletion is final.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Alternatives */}
                <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
                  <CardHeader>
                    <CardTitle>Alternatives to Deleting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Before you delete, consider these options:</p>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <EyeOff className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Make Profile Private</p>
                          <p className="text-slate-600 dark:text-slate-400">Hide your profile without losing data</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Disable Notifications</p>
                          <p className="text-slate-600 dark:text-slate-400">Stop emails but keep your account</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Talk to Support</p>
                          <p className="text-slate-600 dark:text-slate-400">We might be able to help with your concerns</p>
                        </div>
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
                      <HelpCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                      Can I change my email address?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Yes! Go to Account Settings → Profile → Email Address. Enter your new email, verify it with a code, and it will be updated. Your school email verification is separate.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                      How do I recover a deleted account?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      You have 30 days to cancel deletion by logging in. After 30 days, the account is permanently deleted and cannot be recovered. You will need to create a new account.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                      Can I have multiple accounts?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      No, our terms of service allow only one account per person. Multiple accounts may be suspended. If you need to switch universities, update your profile instead.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                      Why can&apos;t I change my date of birth?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Date of birth is locked after verification for security and age verification purposes. If you entered it incorrectly, contact support with your ID for manual correction.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                      How do I enable/disable browser notifications?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Browser notifications are controlled by your browser settings. In Chrome: Settings → Privacy → Site Settings → Notifications. Find CribWise and toggle on/off.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-12 px-4 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
          <p className="text-xl text-cyan-100 mb-8">
            Our support team is ready to assist with account issues
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 text-white" />
                <h3 className="font-bold mb-2">Live Chat</h3>
                <p className="text-sm text-cyan-100 mb-4">Usually replies in 2 mins</p>
                <Button className="w-full bg-white text-cyan-600 hover:bg-cyan-50">
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-6 text-center">
                <Phone className="h-12 w-12 mx-auto mb-3 text-white" />
                <h3 className="font-bold mb-2">WhatsApp</h3>
                <p className="text-sm text-cyan-100 mb-4">9 AM - 9 PM (WAT)</p>
                <Button className="w-full bg-white text-cyan-600 hover:bg-cyan-50">
                  Message Us
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-6 text-center">
                <Mail className="h-12 w-12 mx-auto mb-3 text-white" />
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-sm text-cyan-100 mb-4">Response in 24 hours</p>
                <Button className="w-full bg-white text-cyan-600 hover:bg-cyan-50">
                  Send Email
                </Button>
              </CardContent>
            </Card>
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