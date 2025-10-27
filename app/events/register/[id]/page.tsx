import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Mail,
  Phone,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  User,
  Building2,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  XCircle,
  Info
} from "lucide-react";
import { getEventById, isRegistrationOpen, getRegistrationBadge, getSpotsRemaining } from "@/lib/events";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default async function RegisterEventPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    return notFound();
  }

  // If event has external registration URL, redirect there
  if (event.registrationUrl && event.registrationRequired) {
    // Show info page with redirect option instead of auto-redirect
    // This gives users context before leaving the site
  }

  const registrationOpen = isRegistrationOpen(event);
  const registrationBadge = getRegistrationBadge(event);
  const spotsRemaining = getSpotsRemaining(event);

  // Format dates
  const startDate = new Date(event.startISO);
  const endDate = event.endISO ? new Date(event.endISO) : null;
  const registrationDeadline = event.registrationDeadline ? new Date(event.registrationDeadline) : null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-NG", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-NG", { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-background to-slate-50 dark:from-slate-950 dark:via-background dark:to-slate-950">
      {/* Hero Section with Event Image */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white overflow-hidden">
        {event.imageUrl && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className="relative max-w-5xl mx-auto px-4 py-12">
          {/* Back Button */}
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 mb-4" asChild>
            <Link href="/events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
          </Button>

          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/20 backdrop-blur px-4 py-2 rounded-full mb-4">
            <Tag className="h-4 w-4" /> 
            {event.category}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            {event.title}
          </h1>

          {/* Organizer & School */}
          <div className="flex flex-wrap items-center gap-4 text-lg mb-6">
            {event.organizer && (
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                <span>{event.organizer}</span>
              </div>
            )}
            {event.schoolName && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{event.schoolName}</span>
              </div>
            )}
          </div>

          {/* Key Info */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Calendar className="h-8 w-8 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-100">Date</p>
                  <p className="font-bold">{formatDate(startDate)}</p>
                  {endDate && (
                    <p className="text-sm">Until {formatDate(endDate)}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Clock className="h-8 w-8 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-100">Time</p>
                  <p className="font-bold">{formatTime(startDate)}</p>
                  {endDate && (
                    <p className="text-sm">- {formatTime(endDate)}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Users className="h-8 w-8 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-100">Capacity</p>
                  {event.maxAttendees ? (
                    <>
                      <p className="font-bold">
                        {event.currentAttendees || 0}/{event.maxAttendees}
                      </p>
                      {spotsRemaining !== null && spotsRemaining > 0 && (
                        <p className="text-sm">{spotsRemaining} spots left</p>
                      )}
                    </>
                  ) : (
                    <p className="font-bold">Unlimited</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Registration Status Alert */}
              {!registrationOpen && (
                <Card className="border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-lg text-red-700 dark:text-red-300 mb-2">
                          Registration Unavailable
                        </h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          {registrationBadge.label === "Fully Booked" 
                            ? "This event has reached maximum capacity. Check back in case spots open up."
                            : registrationBadge.label === "Registration Closed"
                            ? "Registration deadline has passed. Contact the organizer if you need assistance."
                            : "Registration is currently closed for this event."
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Almost Full Warning */}
              {registrationOpen && spotsRemaining !== null && spotsRemaining <= 10 && spotsRemaining > 0 && (
                <Card className="border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-orange-700 dark:text-orange-300">
                          Only {spotsRemaining} spot{spotsRemaining !== 1 ? "s" : ""} remaining!
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          Register now to secure your place.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* About Event */}
              <Card>
                <CardHeader>
                  <CardTitle>About This Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {event.description || "No description available."}
                  </p>

                  {/* Tags */}
                  {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-6">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Location */}
              {event.location && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {event.location.label && (
                      <p className="font-semibold text-lg mb-1">
                        {event.location.label}
                      </p>
                    )}
                    {event.location.address && (
                      <p className="text-slate-600 dark:text-slate-400">
                        {event.location.address}
                      </p>
                    )}
                    {/* Could add map integration here */}
                  </CardContent>
                </Card>
              )}

              {/* Contact Information */}
              {(event.contactEmail || event.contactPhone) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Organizer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {event.contactEmail && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <a 
                          href={`mailto:${event.contactEmail}`}
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {event.contactEmail}
                        </a>
                      </div>
                    )}
                    {event.contactPhone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <a 
                          href={`tel:${event.contactPhone}`}
                          className="text-green-600 dark:text-green-400 hover:underline"
                        >
                          {event.contactPhone}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Social Links */}
              {(event.facebookEventUrl || event.twitterHashtag || event.instagramHandle) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="h-5 w-5" />
                      Follow Event Updates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {event.facebookEventUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={event.facebookEventUrl} target="_blank" rel="noopener noreferrer">
                            <Facebook className="h-4 w-4 mr-2" />
                            Facebook Event
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </a>
                        </Button>
                      )}
                      {event.twitterHashtag && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={`https://twitter.com/hashtag/${event.twitterHashtag.replace('#', '')}`} target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-4 w-4 mr-2" />
                            {event.twitterHashtag}
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </a>
                        </Button>
                      )}
                      {event.instagramHandle && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={`https://instagram.com/${event.instagramHandle.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                            <Instagram className="h-4 w-4 mr-2" />
                            {event.instagramHandle}
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Registration Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <Card className="border-2 border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle>Registration</CardTitle>
                    <CardDescription>
                      {event.price?.isFree 
                        ? "Free Event" 
                        : event.price 
                        ? `${event.price.currency} ${event.price.amount.toLocaleString()}`
                        : "Free"
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Registration Deadline */}
                    {registrationDeadline && registrationOpen && (
                      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">
                          Registration Deadline
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          {formatDate(registrationDeadline)}
                        </p>
                      </div>
                    )}

                    {/* External Registration */}
                    {event.registrationUrl ? (
                      <div className="space-y-4">
                        <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                  Registration is handled externally. Click the button below to register.
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Button 
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          size="lg"
                          disabled={!registrationOpen}
                          asChild
                        >
                          <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                            {registrationOpen ? (
                              <>
                                Register Now
                                <ExternalLink className="h-4 w-4 ml-2" />
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4 mr-2" />
                                Registration Closed
                              </>
                            )}
                          </a>
                        </Button>

                        <p className="text-xs text-center text-slate-500">
                          You will be redirected to the registration platform
                        </p>
                      </div>
                    ) : (
                      /* Internal Registration Form */
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <Input 
                            type="text" 
                            placeholder="John Doe" 
                            required 
                            disabled={!registrationOpen}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <Input 
                            type="email" 
                            placeholder="john@example.com" 
                            required 
                            disabled={!registrationOpen}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <Input 
                            type="tel" 
                            placeholder="+234 801 234 5678" 
                            required 
                            disabled={!registrationOpen}
                          />
                        </div>

                        {event.schoolName && (
                          <div>
                            <label className="block text-sm font-semibold mb-2">
                              Student ID (Optional)
                            </label>
                            <Input 
                              type="text" 
                              placeholder="170101234" 
                              disabled={!registrationOpen}
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Additional Notes (Optional)
                          </label>
                          <Textarea 
                            placeholder="Any special requirements or questions?" 
                            rows={3}
                            disabled={!registrationOpen}
                          />
                        </div>

                        <div className="flex items-start gap-2">
                          <Checkbox id="terms" disabled={!registrationOpen} />
                          <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400">
                            I agree to the event terms and conditions and understand that my information will be shared with the organizer.
                          </label>
                        </div>

                        <Button 
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          size="lg"
                          disabled={!registrationOpen}
                        >
                          {registrationOpen ? (
                            <>
                              <CheckCircle2 className="h-5 w-5 mr-2" />
                              Complete Registration
                            </>
                          ) : (
                            <>
                              <XCircle className="h-5 w-5 mr-2" />
                              Registration Closed
                            </>
                          )}
                        </Button>

                        {registrationOpen && (
                          <p className="text-xs text-center text-slate-500">
                            You will receive a confirmation email after registration
                          </p>
                        )}
                      </form>
                    )}

                    {/* Price Info */}
                    {event.price && !event.price.isFree && (
                      <div className="mt-6 pt-6 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">Event Fee</span>
                          <span className="text-lg font-bold">
                            {event.price.currency} {event.price.amount.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          Payment details will be provided after registration
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Info Card */}
                <Card className="mt-4 border-slate-200 dark:border-slate-700">
                  <CardContent className="p-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Instant confirmation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Email reminders sent</span>
                    </div>
                    {event.price?.isFree && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>Free admission</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}