import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { School, Clock, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { getSchools } from "@/lib/admissions";

export default async function SchoolsListingPage() {
  const schools = await getSchools();

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      {/* Header */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse delay-75"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-full mb-6">
            <School className="h-4 w-4" /> All Universities
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
            Explore Nigerian Universities 🎓
          </h1>
          
          <p className="text-slate-700 dark:text-slate-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Browse all universities with admission requirements, deadlines, and program details
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-card rounded-3xl p-6 shadow-xl border-2 border-purple-100 dark:border-purple-900/30">
            <div className="grid md:grid-cols-12 gap-4">
              {/* Search */}
              <div className="md:col-span-6 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search by school name or city..."
                  className="pl-12 h-12 text-base border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              {/* State Filter */}
              <div className="md:col-span-3">
                <Select defaultValue="all">
                  <SelectTrigger className="h-12 border-2 border-slate-200 dark:border-slate-700 rounded-xl">
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    <SelectItem value="lagos">Lagos</SelectItem>
                    <SelectItem value="oyo">Oyo</SelectItem>
                    <SelectItem value="abuja">FCT Abuja</SelectItem>
                    <SelectItem value="rivers">Rivers</SelectItem>
                    <SelectItem value="enugu">Enugu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Type Filter */}
              <div className="md:col-span-3">
                <Select defaultValue="all">
                  <SelectTrigger className="h-12 border-2 border-slate-200 dark:border-slate-700 rounded-xl">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="federal">Federal</SelectItem>
                    <SelectItem value="state">State</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Showing <span className="font-bold text-purple-600 dark:text-purple-400">{schools.length}</span> universities
              </p>
              <Button variant="ghost" size="sm" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Advanced Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Schools Grid */}
      <section className="py-12 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((school, idx) => (
              <Link
                key={school.slug}
                href={`/admissions/${school.slug}`}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 overflow-hidden">
                  {/* Header with gradient */}
                  <div className="relative h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 dark:from-purple-600 dark:via-pink-600 dark:to-blue-600 overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <School className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-purple-700 hover:bg-white font-bold shadow-lg">
                        Featured
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                      {school.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>{school.city}, {school.state}</span>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {/* Deadline */}
                    <div className="flex items-center gap-2 text-sm bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 px-3 py-2 rounded-xl">
                      <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        Next: {school.nextDeadline ?? "TBA"}
                      </span>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex gap-2 text-xs">
                      <Badge variant="outline" className="bg-slate-50 dark:bg-slate-800">
                        50+ Programs
                      </Badge>
                      <Badge variant="outline" className="bg-slate-50 dark:bg-slate-800">
                        JAMB Required
                      </Badge>
                    </div>

                    <Button 
                      className="w-full mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl"
                      size="sm"
                    >
                      View Details →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline"
              className="rounded-full border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30 font-bold text-purple-700 dark:text-purple-300 px-8"
            >
              Load More Schools
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-95"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Can't Find Your School? 🤔
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Let us know and we'll add it ASAP. We're constantly updating our database!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-purple-700 hover:bg-slate-100 font-bold rounded-2xl px-8"
            >
              Request a School
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-bold rounded-2xl backdrop-blur-sm"
              asChild
            >
              <Link href="/admissions">← Back to Admissions</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}