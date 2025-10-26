import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  FileText, 
  GraduationCap, 
  Clock, 
  Calendar,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { getGuideBySlug, listGuides } from "@/lib/guides"; 
import { GuideProse } from "@/components/admissions/GuideProse";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function GuidePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return notFound();

  // Get other guides for recommendations
  const allGuides = await listGuides();
  const otherGuides = allGuides.filter(g => g.slug !== slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-background to-slate-50 dark:from-slate-950 dark:via-background dark:to-slate-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="text-sm mb-6 flex items-center gap-2 text-blue-100">
            <Link href="/admissions" className="hover:text-white transition">
              Admissions
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/admissions/guides" className="hover:text-white transition">
              Guides
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white font-medium">{guide.title}</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/20 backdrop-blur px-4 py-2 rounded-full mb-4">
            <GraduationCap className="h-4 w-4" /> 
            Admissions Guide
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            {guide.title}
          </h1>

          {/* Summary */}
          {guide.summary && (
            <p className="text-lg md:text-xl text-blue-100 mb-6 leading-relaxed max-w-3xl">
              {guide.summary}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {guide.readTime && (
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-lg">
                <Clock className="h-4 w-4" />
                <span>{guide.readTime}</span>
              </div>
            )}
            {guide.lastUpdated && (
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-lg">
                <Calendar className="h-4 w-4" />
                <span>Updated {guide.lastUpdated}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {guide.tags?.length ? (
            <div className="flex flex-wrap gap-2 mt-4">
              {guide.tags.map((tag: string) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="bg-white/20 backdrop-blur text-white border-white/30 hover:bg-white/30"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Action Bar */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admissions/guides">
                <ArrowLeft className="h-4 w-4 mr-2" />
                All Guides
              </Link>
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Bookmark className="h-4 w-4" />
                <span className="hidden sm:inline">Save</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick Navigation Card */}
        <Card className="mb-8 border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Quick Start Tip</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                  This is a comprehensive guide. Use the table of contents to jump to specific sections, or read straight through for complete understanding.
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/admissions/checklist">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Use Interactive Checklist
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Article Content */}
        <article className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 md:p-12">
          <GuideProse content={guide.body} />
        </article>

        {/* Bottom CTA */}
        <Card className="mt-8 border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
              Use our interactive checklists to track your progress through every step of the admission process.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" asChild>
                <Link href="/admissions/checklist">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Start Checklist
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/admissions/guides">
                  <FileText className="h-5 w-5 mr-2" />
                  More Guides
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Guides */}
        {otherGuides.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Continue Learning</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {otherGuides.map((relatedGuide) => (
                <Link 
                  key={relatedGuide.slug} 
                  href={`/admissions/guides/${relatedGuide.slug}`}
                  className="group"
                >
                  <Card className="h-full border-2 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                        <h4 className="font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition line-clamp-2">
                          {relatedGuide.title}
                        </h4>
                      </div>
                      {relatedGuide.summary && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
                          {relatedGuide.summary}
                        </p>
                      )}
                      {relatedGuide.readTime && (
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{relatedGuide.readTime}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Help Card */}
        <Card className="mt-8 border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold mb-2">Need More Help?</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                  Can't find what you're looking for? Our support team and community are here to help you navigate your admission journey.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/support">
                      Contact Support
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/community">
                      Join Community
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link href="/admissions/guides">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Guides
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admissions">
                Go to Admissions Hub
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}