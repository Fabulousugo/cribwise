"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Building2,
  TrendingUp,
  Shield,
  MessageSquare,
  BarChart3,
  CheckCircle2,
  Users,
  Clock,
  Zap,
  Star,
  ArrowRight,
  Phone,
  Mail,
  Award,
  Target,
  HeartHandshake,
  Sparkles
} from "lucide-react"

export default function AgentPage() {
  const features = [
    {
      icon: Building2,
      title: "List Your Properties",
      description: "Showcase your properties with high-quality photos, detailed descriptions, and virtual tours"
    },
    {
      icon: Users,
      title: "Reach Thousands of Students",
      description: "Connect with verified students actively searching for accommodation across Nigeria"
    },
    {
      icon: MessageSquare,
      title: "Direct Inquiries",
      description: "Receive and manage student inquiries through our integrated messaging system"
    },
    {
      icon: Shield,
      title: "Verification Badge",
      description: "Get verified to build trust and stand out from unverified landlords"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track views, inquiries, and performance metrics for all your listings"
    },
    {
      icon: TrendingUp,
      title: "Increase Bookings",
      description: "Higher visibility means more inquiries and faster occupancy rates"
    }
  ]

  const benefits = [
    {
      icon: Zap,
      title: "Quick Setup",
      description: "List your first property in under 10 minutes"
    },
    {
      icon: Target,
      title: "Targeted Audience",
      description: "Reach students at specific universities"
    },
    {
      icon: Clock,
      title: "24/7 Visibility",
      description: "Your properties are always accessible to students"
    },
    {
      icon: HeartHandshake,
      title: "Trusted Platform",
      description: "Students trust verified CribWise landlords"
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description: "Sign up as a landlord or agent in seconds",
      icon: Users
    },
    {
      number: "02",
      title: "Get Verified",
      description: "Submit your documents for quick verification",
      icon: Shield
    },
    {
      number: "03",
      title: "List Properties",
      description: "Add your properties with photos and details",
      icon: Building2
    },
    {
      number: "04",
      title: "Receive Inquiries",
      description: "Connect with interested students instantly",
      icon: MessageSquare
    }
  ]

  const testimonials = [
    {
      name: "Chukwudi Okafor",
      role: "Property Manager, Lagos",
      content: "Since joining CribWise, my occupancy rate has increased by 40%. The platform makes it so easy to reach verified students.",
      rating: 5
    },
    {
      name: "Amina Mohammed",
      role: "Landlord, Ibadan",
      content: "The verification badge has helped build trust with students. I get quality inquiries and fill my properties faster than ever.",
      rating: 5
    },
    {
      name: "Emeka Nwosu",
      role: "Real Estate Agent, Abuja",
      content: "CribWise analytics help me understand what students want. I've optimized my listings and seen a 3x increase in inquiries.",
      rating: 5
    }
  ]

  const stats = [
    { number: "50K+", label: "Active Students" },
    { number: "200+", label: "Universities Covered" },
    { number: "10K+", label: "Properties Listed" },
    { number: "95%", label: "Satisfaction Rate" }
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="decorative-orb-purple top-0 right-0 opacity-30"></div>
        <div className="decorative-orb-pink bottom-0 left-0 opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-40">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium">For Landlords & Agents</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                List Properties & Connect with Students
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Join Nigeria&apos;s leading student housing platform. Reach thousands of verified students actively searching for accommodation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <Link href="/register">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-10 py-7 rounded-xl shadow-2xl">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-7 rounded-xl">
                    Talk to Sales
                    <Phone className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">Free to Join</div>
                    <div className="text-white/80">No upfront costs or subscriptions</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">Quick Listing</div>
                    <div className="text-white/80">List properties in minutes</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">Verified Badge</div>
                    <div className="text-white/80">Build trust with students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-section-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to <span className="text-gradient-brand">Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Powerful tools designed to help you list, manage, and fill your properties faster
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-xl">
                  <CardHeader className="space-y-6 pb-8">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get Started in <span className="text-gradient-brand">4 Simple Steps</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From signup to receiving inquiries in less than a day
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative">
                  <Card className="border-2 hover:border-primary/50 transition-all h-full">
                    <CardContent className="p-8 text-center space-y-6">
                      <div className="text-7xl font-bold text-primary/10">
                        {step.number}
                      </div>
                      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto">
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="font-semibold text-xl">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                  
                  {/* Arrow connector (hidden on mobile and last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-5 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-10 w-10 text-primary/30" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="text-center mt-16">
            <Link href="/register">
              <Button size="lg" className="text-lg px-10 py-7 rounded-xl shadow-xl">
                Start Listing Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-section-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Why Choose <span className="text-gradient-brand">CribWise</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                We have built the most trusted student housing platform in Nigeria. Here&apos;s why landlords and agents love us:
              </p>

              <div className="space-y-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div key={index} className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground text-base leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-8">
              <Card className="border-2 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                <CardContent className="p-8">
                  <div className="flex items-start gap-5">
                    <Award className="h-10 w-10 text-green-600 flex-shrink-0 mt-1" />
                    <div className="space-y-4">
                      <h3 className="font-semibold text-xl">Verified Landlord Program</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Stand out with our verified badge. Students trust verified landlords 3x more.
                      </p>
                      <Link href="/verify/verify-landlord">
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white mt-2">
                          Learn About Verification
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
                <CardContent className="p-8">
                  <div className="flex items-start gap-5">
                    <BarChart3 className="h-10 w-10 text-blue-600 flex-shrink-0 mt-1" />
                    <div className="space-y-4">
                      <h3 className="font-semibold text-xl">Advanced Analytics</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Track property views, inquiry rates, and optimize your listings for maximum visibility.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                <CardContent className="p-8">
                  <div className="flex items-start gap-5">
                    <MessageSquare className="h-10 w-10 text-purple-600 flex-shrink-0 mt-1" />
                    <div className="space-y-4">
                      <h3 className="font-semibold text-xl">Seamless Communication</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Manage all student inquiries in one place with our built-in messaging system.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What <span className="text-gradient-brand">Landlords Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join hundreds of successful landlords and agents already using CribWise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:shadow-xl transition-all">
                <CardContent className="p-8 space-y-6">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="pt-4 border-t">
                    <div className="font-semibold text-lg">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-purple-600 to-pink-600 text-white" id="contact">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to Fill Your Properties Faster?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
            Join CribWise today and start connecting with thousands of students searching for accommodation
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
            <Link href="/register">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-10 py-7 rounded-xl shadow-2xl">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="mailto:agents@cribwise.ng">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-7 rounded-xl">
                <Mail className="mr-2 h-5 w-5" />
                Contact Sales
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-12 pt-16 border-t border-white/20">
            <div>
              <div className="text-5xl font-bold mb-3">Free</div>
              <div className="text-white/80 text-lg">No setup or monthly fees</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-3">10 min</div>
              <div className="text-white/80 text-lg">Average time to list property</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-3">24/7</div>
              <div className="text-white/80 text-lg">Support when you need it</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-gradient-brand">Questions</span>
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader className="space-y-3 p-8">
                <CardTitle className="text-xl">Is there a fee to list properties?</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  No! Signing up and listing properties on CribWise is completely free. We only succeed when you do.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader className="space-y-3 p-8">
                <CardTitle className="text-xl">How does verification work?</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Submit your property ownership documents or agent credentials. Our team reviews them within 24-48 hours. Verified landlords get a special badge and higher visibility.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader className="space-y-3 p-8">
                <CardTitle className="text-xl">How do I receive inquiries?</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Students can contact you directly through our messaging system. You will receive email notifications and can respond through the platform or via email.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader className="space-y-3 p-8">
                <CardTitle className="text-xl">Can I list multiple properties?</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Yes! You can list as many properties as you want. Use our dashboard to manage all your listings in one place.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader className="space-y-3 p-8">
                <CardTitle className="text-xl">What areas do you cover?</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  We cover all major universities across Nigeria. If your property is near a university, students are looking for it on CribWise.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}