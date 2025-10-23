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
  BookOpen,
  ArrowLeft,
  Sparkles,
  Send,
  CheckCircle2,
  FileText,
  GraduationCap,
  Calendar,
  Lightbulb
} from "lucide-react";

const materialTypes = [
  "Past Question",
  "Lecture Note",
  "Textbook",
  "Syllabus",
  "Assignment Solution",
  "Lab Manual",
  "Study Guide",
  "Other"
];

const academicLevels = [
  "100 Level",
  "200 Level",
  "300 Level",
  "400 Level",
  "500 Level",
  "600 Level",
  "Postgraduate"
];

export default function RequestMaterialPage() {
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
      router.push("/materials");
    }, 3000);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-violet-50 via-background to-blue-50 dark:from-slate-900 dark:via-background dark:to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-black mb-3">Request Submitted! 🎉</h2>
            <p className="text-slate-700 dark:text-muted-foreground mb-6">
              Thank you! We&apos;ll search for the material you requested and add it to our library as soon as we find it.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Redirecting you back to materials...
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
            <Link href="/materials" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Materials
            </Link>
          </Button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-primary-foreground px-5 py-2 rounded-full mb-4">
              <Sparkles className="h-4 w-4" /> Request Material
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
              Can&apos;t Find What You Need? 📚
            </h1>
            
            <p className="text-slate-700 dark:text-muted-foreground text-lg max-w-2xl mx-auto">
              Request the study material you need and we&apos;ll source it for you. Help us build the best academic library!
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
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                <p className="text-sm font-semibold">5,000+ Materials</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Already available</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-100 dark:border-pink-900/30">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <p className="text-sm font-semibold">Quick Response</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Within 2-3 days</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100 dark:border-blue-900/30">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
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
                <CardTitle className="text-2xl">Material Details</CardTitle>
                <CardDescription className="dark:text-slate-400">
                  Tell us what study material you&apos;re looking for
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Material Type */}
                <div className="space-y-2">
                  <Label htmlFor="materialType" className="text-base font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Material Type <span className="text-red-500">*</span>
                  </Label>
                  <Select name="materialType" required>
                    <SelectTrigger className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl">
                      <SelectValue placeholder="Select material type" />
                    </SelectTrigger>
                    <SelectContent>
                      {materialTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Course Code & Title */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="courseCode" className="text-base font-semibold">
                      Course Code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="courseCode"
                      name="courseCode"
                      placeholder="e.g., CSC 201"
                      required
                      className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      As shown on your course outline
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="courseTitle" className="text-base font-semibold">
                      Course Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="courseTitle"
                      name="courseTitle"
                      placeholder="e.g., Data Structures"
                      required
                      className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                {/* School & Department */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="school" className="text-base font-semibold flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      University/School <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="school"
                      name="school"
                      placeholder="e.g., UNILAG"
                      required
                      className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-base font-semibold">
                      Department/Faculty <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="department"
                      name="department"
                      placeholder="e.g., Computer Science"
                      required
                      className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                {/* Level & Academic Year */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level" className="text-base font-semibold">
                      Academic Level <span className="text-red-500">*</span>
                    </Label>
                    <Select name="level" required>
                      <SelectTrigger className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {academicLevels.map((level) => (
                          <SelectItem key={level} value={level.toLowerCase().replace(/\s+/g, '-')}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-base font-semibold flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Academic Year (Optional)
                    </Label>
                    <Input
                      id="year"
                      name="year"
                      placeholder="e.g., 2023/2024"
                      className="h-11 border-2 border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                {/* Specific Details */}
                <div className="space-y-2">
                  <Label htmlFor="specificDetails" className="text-base font-semibold flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Specific Details <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="specificDetails"
                    name="specificDetails"
                    placeholder="Describe what you're looking for in detail. E.g., 'Past questions from 2020-2023', 'Lecture slides for Module 3', 'Textbook by Prof. Adeyemi', etc."
                    required
                    rows={5}
                    className="border-2 border-slate-200 dark:border-slate-700 rounded-xl resize-none"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    The more specific you are, the easier it is for us to find exactly what you need
                  </p>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="additionalNotes" className="text-base font-semibold">
                    Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    placeholder="Any other information that might help us find the material..."
                    rows={3}
                    className="border-2 border-slate-200 dark:border-slate-700 rounded-xl resize-none"
                  />
                </div>

                {/* Your Contact */}
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
                    We&apos;ll notify you when the material is available
                  </p>
                </div>

                {/* Info Box */}
                <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm mb-1">What Happens Next?</h4>
                        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                          <li>✓ Our team searches for the material from verified sources</li>
                          <li>✓ We reach out to top students and lecturers for contributions</li>
                          <li>✓ Material is verified for accuracy and quality</li>
                          <li>✓ You&apos;ll be notified when it&apos;s uploaded (if email provided)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Priority Notice */}
                <Card className="border-2 border-yellow-200 dark:border-yellow-800 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm mb-1">💡 Pro Tip</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Have the material yourself? Consider uploading it directly to help other students! Contact us at materials@cribwise.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-primary-foreground font-bold rounded-xl h-12 text-base"
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