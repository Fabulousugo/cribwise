"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, User, Home, GraduationCap, BookOpen, Store, Calendar, ShieldCheck, Building2, ChevronDown, AlertTriangle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Helper to check enforcement deadline
function needsSchoolEmailLink(profile: any) {
  if (!profile) return false;
  if (profile.admission_status !== "ADMITTED") return false;
  if (profile.school_email_verified_at) return false;
  const enforceAt = profile.enforce_school_email_at ? new Date(profile.enforce_school_email_at).getTime() : null;
  if (!enforceAt) return false;
  return Date.now() >= enforceAt; // after deadline
}

function daysLeft(profile: any) {
  if (!profile?.enforce_school_email_at) return null;
  const ms = new Date(profile.enforce_school_email_at).getTime() - Date.now();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, loading, signOut } = useAuth();

  const isOnDashboard = pathname?.startsWith("/dashboard");
  const showLinkWarning = needsSchoolEmailLink(profile);
  const dLeft = daysLeft(profile);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  // Condense primary nav links here for reuse (desktop + mobile)
  const primaryLinks = [
    { href: "/housing", label: "Housing", icon: Building2 },
    { href: "/admissions", label: "Admissions", icon: GraduationCap },
    { href: "/materials", label: "Materials", icon: BookOpen },
    { href: "/market", label: "Marketplace", icon: Store },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/safety", label: "Safety", icon: ShieldCheck },
  ];

  // Optional: status pill text
  const statusText = useMemo(() => {
    const s = profile?.status as string | undefined; // PROSPECTIVE | ADMITTED | CURRENT | ALUMNI | AGENT
    if (!s) return undefined;
    return s.toLowerCase();
  }, [profile?.status]);

  return (
    <>
      <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              CribWise
            </Link>

            {/* Desktop primary links */}
            <div className="hidden md:flex items-center gap-6">
              {primaryLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="hover:text-blue-600 transition">
                  {label}
                </Link>
              ))}
            </div>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Status chooser / Dashboard */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User className="h-4 w-4" />
                    {user ? (statusText ? statusText : "Account") : "Choose Status"}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Dashboards</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/choose-status">Choose / Change Status</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Open Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user ? (
                    <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/signin">Sign In</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/register">Get Started</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Quick jump between Home and Dashboard */}
              {user && (
                isOnDashboard ? (
                  <Link href="/">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Home className="h-4 w-4" /> Home
                    </Button>
                  </Link>
                ) : (
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="gap-2">
                      <User className="h-4 w-4" /> Dashboard
                    </Button>
                  </Link>
                )
              )}

              {/* Auth buttons when logged out */}
              {!loading && !user && (
                <>
                  <Link href="/signin">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/register">
                    <Button>Get Started</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button title="Menu" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              {primaryLinks.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} className="flex items-center gap-2 py-2 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
                  <Icon className="h-4 w-4" /> {label}
                </Link>
              ))}

              <div className="flex flex-col gap-2 pt-4 border-t">
                {user ? (
                  <>
                    <div className="px-3 py-2 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-600">{profile?.full_name || "User"}</p>
                      <p className="text-xs text-blue-500 capitalize">{statusText}</p>
                    </div>

                    {isOnDashboard ? (
                      <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          <Home className="h-4 w-4 mr-2" /> Home
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          <User className="h-4 w-4 mr-2" /> Dashboard
                        </Button>
                      </Link>
                    )}

                    <Link href="/choose-status" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full">Choose / Change Status</Button>
                    </Link>

                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* School email enforcement banner (shows only when required) */}
        {user && (showLinkWarning || (typeof dLeft === "number" && dLeft <= 7)) && (
          <div className="border-t bg-amber-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-start gap-3 text-amber-800">
              <AlertTriangle className="h-5 w-5 mt-0.5" />
              <div className="text-sm">
                {!profile?.school_email_verified_at ? (
                  <>
                    <strong>Action needed:</strong> Link and verify your <em>school email</em>
                    {typeof dLeft === "number" && dLeft > 0 ? (
                      <> within <strong>{dLeft} day{dLeft === 1 ? "" : "s"}</strong> to avoid restrictions.</>
                    ) : (
                      <> to regain full access.</>
                    )}
                    <div className="mt-2">
                      <Link href="/link-school-email"><Button size="sm">Verify School Email</Button></Link>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
