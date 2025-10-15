import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { properties } from "@/lib/properties"
import { Building2, GraduationCap, BookOpen, Store, Calendar, ShieldCheck, Sparkles, ArrowRight, Search, CheckCircle2, Users, TrendingUp, Award, Clock } from "lucide-react"


export default function HomePage() {
  const featuredProperties = properties.filter(p => p.verified && p.available).slice(0, 3)


// Reusable section (same feel as Housing/Admissions)
function FeatureSection({
  icon: Icon,
  title,
  description,
  bullets,
  ctaHref,
  ctaLabel,
  imageSrc,
  gradientFrom,
  gradientTo,
  reverse = false,
}: {
  icon: React.ComponentType<any>
  title: string
  description: string
  bullets: string[]
  ctaHref: string
  ctaLabel: string
  imageSrc: string
  gradientFrom: string // e.g. "from-purple-500"
  gradientTo: string   // e.g. "to-purple-600"
  reverse?: boolean
}) {
  return (
    <div className={`grid lg:grid-cols-2 gap-12 items-center mb-32 ${reverse ? "" : ""}`}>
      {/* Media */}
      <div className={`relative group ${reverse ? "lg:order-2" : ""}`}>
        <div className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition`}></div>
        <div className="relative h-[500px] rounded-3xl overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      </div>

      {/* Copy */}
      <div className={`space-y-6 ${reverse ? "lg:order-1" : ""}`}>
        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-4xl md:text-5xl font-bold text-foreground">
          {title}
        </h3>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {description}
        </p>
        <ul className="space-y-4 text-lg">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="text-foreground">{b}</span>
            </li>
          ))}
        </ul>
        <Link href={ctaHref}>
          <Button size="lg" className="text-lg px-8 py-6 rounded-xl mt-4">
            {ctaLabel}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

  return (
    <main className="min-h-screen bg-background">
      {/* HERO - Full Screen, Bold */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-32 md:py-40">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8">
              <Award className="h-5 w-5 text-yellow-400" />
              <span className="text-white font-medium">Trusted by 2,500+ Students Across Nigeria</span>
            </div>

            {/* Main Headline - HUGE */}
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.1] mb-8">
              Your University
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-slate-300 mb-12 max-w-3xl leading-relaxed">
              The all-in-one platform for Nigerian students. Housing, admissions, materials, marketplace—everything you need to succeed.
            </p>

            {/* CTA - Prominent */}
            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <Link href="/register">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 text-xl px-10 py-8 rounded-2xl shadow-2xl hover:scale-105 transition-all">
                  Get Started Free
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="border-white/30 bg-white/5 backdrop-blur text-white hover:bg-white/10 text-xl px-10 py-8 rounded-2xl">
                  Explore Platform
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-lg">Verified Properties</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-lg">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-lg">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* FEATURES - Large Split Sections */}
      <section id="features" className="py-32 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Everything You Need
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              Six powerful tools designed for the modern Nigerian student
            </p>
          </div>

          {/* Housing - Large Feature */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition"></div>
              <div className="relative h-[500px] rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop" 
                  alt="Student Housing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-foreground">
                Find Your Perfect Home
              </h3>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Browse verified properties, match with compatible roommates, and secure housing near your campus. All listings are vetted for safety and authenticity.
              </p>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">AI-powered roommate matching</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">Verified landlords & properties</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">In-app secure messaging</span>
                </li>
              </ul>
              <Link href="/properties">
                <Button size="lg" className="text-lg px-8 py-6 rounded-xl mt-4">
                  Browse Properties
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Admissions - Reverse Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
            <div className="space-y-6 lg:order-1">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-foreground">
                Navigate Admissions
              </h3>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Complete guides, document checklists, and deadline tracking. Get accepted to your dream university with our step-by-step support.
              </p>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">University-specific requirements</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">Automated deadline reminders</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">Document templates & samples</span>
                </li>
              </ul>
              <Link href="/admissions">
                <Button size="lg" className="text-lg px-8 py-6 rounded-xl mt-4">
                  View Admissions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative group lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition"></div>
              <div className="relative h-[500px] rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop" 
                  alt="University Admissions"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* OTHER FEATURES — now split sections like the first two */}
          <section id="more-features" className="py-32 px-4 bg-background">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                  More Ways We Help
                </h2>
                <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
                  Deep, focused tools—presented big and bold.
                </p>
              </div>

              <FeatureSection
                icon={BookOpen}
                title="Study Materials"
                description="Access notes, past questions, and study guides shared by top students across 50+ universities."
                bullets={[
                  "Curated by high-performers",
                  "Past questions with solutions",
                  "Department & course filters",
                ]}
                ctaHref="/materials"
                ctaLabel="Browse Materials"
                imageSrc="/images/studentsHub.jpg"
                gradientFrom="from-purple-500"
                gradientTo="to-purple-600"
                reverse={false}
              />

              <FeatureSection
                icon={Store}
                title="Student Marketplace"
                description="Buy and sell textbooks, electronics, and campus essentials—rated sellers, dispute support, and secure checkout."
                bullets={[
                  "Verified sellers & ratings",
                  "Secure, escrow-style payments",
                  "Quick campus pickups",
                ]}
                ctaHref="/market"
                ctaLabel="Visit Market"
                imageSrc="/images/marketplace.jpg"
                gradientFrom="from-orange-500"
                gradientTo="to-orange-600"
                reverse={true}
              />

              <FeatureSection
                icon={Calendar}
                title="Campus Events"
                description="From parties to workshops—discover what’s happening around you and never miss a deadline or meetup."
                bullets={[
                  "Smart recommendations by interest",
                  "Add to calendar in one tap",
                  "RSVP & reminders built-in",
                ]}
                ctaHref="/events"
                ctaLabel="See Events"
                imageSrc="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop"
                gradientFrom="from-pink-500"
                gradientTo="to-pink-600"
                reverse={false}
              />

              <FeatureSection
                icon={ShieldCheck}
                title="Safety Hub"
                description="Emergency contacts, safety tips, incident reporting, and wellbeing resources—right when you need them."
                bullets={[
                  "One-tap campus emergency numbers",
                  "Anonymous incident reporting",
                  "24/7 wellbeing resources",
                ]}
                ctaHref="/safety"
                ctaLabel="Safety Resources"
                imageSrc="/images/Safety-2.jpg"
                gradientFrom="from-red-500"
                gradientTo="to-red-600"
                reverse={true}
              />
            </div>
          </section>

        </div>
      </section>

      {/* STATS - Bold Numbers */}
      <section className="py-32 px-4 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
                2.5K+
              </div>
              <p className="text-xl text-muted-foreground font-medium">Active Students</p>
            </div>
            <div>
              <div className="text-6xl md:text-7xl font-black bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-4">
                200+
              </div>
              <p className="text-xl text-muted-foreground font-medium">Verified Properties</p>
            </div>
            <div>
              <div className="text-6xl md:text-7xl font-black bg-gradient-to-r from-orange-600 to-pink-600 dark:from-orange-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
                50+
              </div>
              <p className="text-xl text-muted-foreground font-medium">Universities</p>
            </div>
            <div>
              <div className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
                5K+
              </div>
              <p className="text-xl text-muted-foreground font-medium">Resources Shared</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-32 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl font-bold text-foreground mb-4">Featured Properties</h2>
              <p className="text-xl text-muted-foreground">Verified cribs near your campus</p>
            </div>
            <Link href="/properties">
              <Button variant="outline" size="lg" className="text-lg px-6 py-6 rounded-xl">
                View All Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Link href={`/properties/${property.id}`} key={property.id}>
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50">
                  <div className="relative h-72 overflow-hidden bg-muted">
                    <img 
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      <CheckCircle2 className="h-4 w-4" />
                      Verified
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2 line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">{property.location}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                          ₦{property.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">per year</p>
                      </div>
                      <Button className="rounded-xl">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-4 bg-gradient-to-br from-blue-950 via-purple-950 to-slate-950 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to Transform Your
            <br />
            University Experience?
          </h2>
          <p className="text-2xl text-slate-300 mb-12">
            Join thousands of Nigerian students already thriving on CribWise
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 text-xl px-12 py-8 rounded-2xl shadow-2xl hover:scale-105 transition-all">
              Get Started Free
              <Sparkles className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
  
}