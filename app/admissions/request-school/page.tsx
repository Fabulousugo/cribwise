"use client"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  GraduationCap,
  ArrowLeft,
  Sparkles,
  Send,
  CheckCircle2,
  School,
  MapPin,
  Globe,
  FileText
} from "lucide-react";

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const universityTypes = [
  "Federal University",
  "State University",
  "Private University",
  "Polytechnic",
  "College of Education",
  "Other"
];

export default function RequestSchoolPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);

    // Redirect after 3 seconds
    setTimeout(() => {
      router.push("/admissions/schools");
    }, 3000);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-black mb-3">Request Submitted! 🎉</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              Thank you! We'll review your request and add the school to our platform as soon as possible.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Redirecting you back to schools...
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900">
      {/* Header */}
      <section className="relative py-12 px-4 overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse delay-75"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/admissions/schools" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Schools
            </Link>
          </Button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-full mb-4">
              <Sparkles className="h-4 w-4" /> Request School
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
              Can't Find Your School? 🎓
            </h1>
            
            <p className="text-slate-700 dark:text-slate-300 text-lg max-w-2xl mx-auto">
              Help us grow! Request your university and we'll add it to our platform with full admission details.
            </p>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="border-2 border-purple-100 dark:border-purple-900/30">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <School className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm font-semibold">150+ Schools</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Already listed</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-100 dark:border-pink-900/30">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm font-semibold">Fast Review</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Added within 48hrs</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100 dark:border-blue-900/30">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm font-semibold">100% Free</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">No cost to request</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <Card className="border-2 border-purple-100 dark:border-purple-900/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">School Information</CardTitle>
                <CardDescription className="dark:text-slate-400">
                  Provide details about the university you'd like us to add
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* School Name */}
                <div className="space-y-2">
                  <Label htmlFor="schoolName" className="text-base font-semibold flex items-center gap-2">
                    <School className="h-5 w-5" />
                    University/School Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="schoolName"
                    name="schoolName"
                    placeholder="e.g., University of Lagos"
                    required
                    className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Enter the full official name of the institution
                  </p>
                </div>

                {/* Abbreviation */}
                <div className="space-y-2">
                  <Label htmlFor="abbreviation" className="text-base font-semibold">
                    Common Abbreviation (Optional)
                  </Label>
                  <Input
                    id="abbreviation"
                    name="abbreviation"
                    placeholder="e.g., UNILAG"
                    className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    How students commonly refer to the school
                  </p>
                </div>

                {/* Type & State */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-base font-semibold">
                      Institution Type <span className="text-red-500">*</span>
                    </Label>
                    <Select name="type" required>
                      <SelectTrigger className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {universityTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-base font-semibold flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      State <span className="text-red-500">*</span>
                    </Label>
                    <Select name="state" required>
                      <SelectTrigger className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {nigerianStates.map((state) => (
                          <SelectItem key={state} value={state.toLowerCase()}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-base font-semibold">
                    City/Town <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="e.g., Yaba"
                    required
                    className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                {/* Website */}
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-base font-semibold flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Official Website (Optional)
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://www.unilag.edu.ng"
                    className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Help us verify the school faster
                  </p>
                </div>

                {/* Additional Info */}
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo" className="text-base font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Additional Information (Optional)
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    placeholder="Any additional details about the school, popular programs, admission requirements you know of, etc."
                    rows={5}
                    className="border-2 border-slate-200 dark:border-slate-700 rounded-xl resize-none"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    This helps us add more accurate information
                  </p>
                </div>

                {/* Your Contact (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-base font-semibold">
                    Your Email (Optional)
                  </Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    placeholder="your.email@example.com"
                    className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    We'll notify you when the school is added (optional)
                  </p>
                </div>

                {/* Info Box */}
                <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm mb-1">What Happens Next?</h4>
                        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                          <li>✓ We review your request within 24-48 hours</li>
                          <li>✓ Our team gathers official admission information</li>
                          <li>✓ School gets added with full details and requirements</li>
                          <li>✓ You'll be notified when it's live (if you provided email)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl h-12 text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Submit Request
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold rounded-xl h-12 px-6"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </section>
    </main>
  );
}