/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  User,
  Home,
  Building2,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  Shield,
  Settings,
  LogOut,
  LayoutDashboard,
  Plus,
  Users,
  GraduationCap,
  BookOpen,
  Store,
  Calendar,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/** -----------------------------
 * Types
 * ----------------------------- */
type StudentStatus = "PROSPECTIVE" | "ADMITTED" | "CURRENT" | "ALUMNI";
type AgentStatus = "AGENT";
type ProfileStatus = StudentStatus | AgentStatus;

interface Profile {
  status?: ProfileStatus | null;
  admission_status?: "ADMITTED" | string | null;
  full_name?: string | null;
  email?: string | null;
  landlord_verified?: boolean | null;
  school_email_verified_at?: string | null;
  enforce_school_email_at?: string | null;
}

/** -----------------------------
 * Helpers
 * ----------------------------- */

const isStudentStatus = (s?: string | null): s is StudentStatus =>
  !!s && ["PROSPECTIVE", "ADMITTED", "CURRENT", "ALUMNI"].includes(s);

const isActive = (pathname: string | null, href: string) =>
  pathname === href || (href !== "/" && !!pathname && pathname.startsWith(`${href}/`));

/**
 * Show banner if student is unverified and either:
 * - the enforcement date has passed, or
 * - it's within 7 days.
 */
function getSchoolEmailEnforcement(profile?: Profile | null) {
  if (!profile) return { show: false as const, daysLeft: null as number | null };
  if (!isStudentStatus(profile.status || null)) return { show: false as const, daysLeft: null };

  const verified = profile.school_email_verified_at != null;
  if (verified) return { show: false as const, daysLeft: null };

  const enforceAt = profile.enforce_school_email_at
    ? new Date(profile.enforce_school_email_at).getTime()
    : null;

  if (!enforceAt) return { show: false as const, daysLeft: null };

  const now = Date.now();
  const msLeft = enforceAt - now;
  const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));

  // Show when overdue or within a week
  const show = daysLeft <= 7;
  return { show, daysLeft };
}

function statusChipText(profile?: Profile | null) {
  const s = profile?.status;
  if (!s) return undefined;
  if (s === "AGENT") return "Agent";
  if (s === "CURRENT") return "Student";
  if (s === "ADMITTED") return "Admitted";
  if (s === "PROSPECTIVE") return "Prospective";
  if (s === "ALUMNI") return "Alumni";
  return s.toLowerCase();
}

/** Small skeleton to avoid layout shifts while auth loads */
function AuthSkeleton() {
  return (
    <div className="hidden md:flex items-center gap-3">
      <div className="h-9 w-9 rounded-md bg-muted animate-pulse" />
      <div className="h-9 w-24 rounded-md bg-muted animate-pulse" />
      <div className="h-9 w-28 rounded-md bg-muted animate-pulse" />
    </div>
  );
}

/** -----------------------------
 * Component
 * ----------------------------- */
export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, loading, signOut } = useAuth() as {
    user: React.ReactNode | object | null;
    profile: Profile | null;
    loading: boolean;
    signOut: () => Promise<void> | void;
  };

  const [isPending, startTransition] = useTransition();
  const [signingOut, setSigningOut] = useState(false);

  const isOnDashboard = pathname?.startsWith("/dashboard") ?? false;
  const isAgent = profile?.status === "AGENT";
  const isStudent = isStudentStatus(profile?.status || null);

  const isVerified = isAgent
    ? profile?.landlord_verified === true
    : profile?.school_email_verified_at != null;

  const { show: showSchoolBanner, daysLeft } = getSchoolEmailEnforcement(profile);

  const dashboardLink = isAgent ? "/dashboard/agent" : "/dashboard/student";

  /** Close mobile menu on navigation */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  /** More robust sign-out with guards + refresh */
  const handleSignOut = () => {
    if (signingOut) return;
    setSigningOut(true);

    Promise.resolve(signOut())
      .catch((err) => {
        console.error("signOut failed", err);
      })
      .finally(() => {
        startTransition(() => {
          router.replace("/");
          router.refresh(); // force revalidation of auth-aware UI
          setSigningOut(false);
        });
      });
  };

  /** Role-aware nav links (Events included for everyone) */
  const navLinks = useMemo(() => {
    if (isAgent) {
      return [
        { href: "/dashboard/agent", label: "Dashboard", icon: LayoutDashboard },
        { href: "/agent/properties", label: "My Properties", icon: Building2 },
        { href: "/agent/properties/add", label: "Add Property", icon: Plus },
        { href: "/messages", label: "Inquiries", icon: MessageSquare },
        { href: "/events", label: "Events", icon: Calendar }, // universal
      ];
    }
    if (isStudent) {
      return [
        { href: "/dashboard/student", label: "Dashboard", icon: LayoutDashboard },
        { href: "/properties", label: "Housing", icon: Building2 },
        { href: "/roommate/browse", label: "Roommates", icon: Users },
        { href: "/materials", label: "Materials", icon: BookOpen },
        { href: "/events", label: "Events", icon: Calendar }, // universal
      ];
    }
    // Guest
    return [
      { href: "/properties", label: "Housing", icon: Building2 },
      { href: "/admissions", label: "Admissions", icon: GraduationCap },
      { href: "/materials", label: "Materials", icon: BookOpen },
      { href: "/marketplace", label: "Marketplace", icon: Store },
      { href: "/events", label: "Events", icon: Calendar }, // universal
      { href: "/safety", label: "Safety", icon: ShieldCheck },
    ];
  }, [isAgent, isStudent]);

  const chipText = statusChipText(profile);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            aria-label="CribWise Home"
          >
            CribWise
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(pathname, href) ? "page" : undefined}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(pathname, href) ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {loading ? (
              <AuthSkeleton />
            ) : user ? (
              <>
                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2" disabled={isPending}>
                      <div className="flex items-center gap-2">
                        {isVerified && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                        <User className="h-4 w-4" />
                        <span className="max-w-[140px] truncate">
                          {profile?.full_name || "Account"}
                        </span>
                      </div>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-72">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {profile?.full_name || "Account"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {profile?.email}
                        </p>
                        {(chipText || isVerified) && (
                          <div className="flex items-center gap-2 mt-2">
                            {chipText && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                {chipText}
                              </span>
                            )}
                            {isVerified && (
                              <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                Verified
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    {!isOnDashboard && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href={dashboardLink} className="cursor-pointer">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}

                    {/* Agent-only */}
                    {isAgent && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/agent/properties" className="cursor-pointer">
                            <Building2 className="mr-2 h-4 w-4" />
                            <span>My Properties</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/agent/properties/add" className="cursor-pointer">
                            <Plus className="mr-2 h-4 w-4" />
                            <span>Add Property</span>
                          </Link>
                        </DropdownMenuItem>
                        {!isVerified && (
                          <DropdownMenuItem asChild>
                            <Link href="/verify-landlord" className="cursor-pointer">
                              <Shield className="mr-2 h-4 w-4 text-amber-500" />
                              <span className="text-amber-600 dark:text-amber-400">
                                Get Verified
                              </span>
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                      </>
                    )}

                    {/* Student-only */}
                    {isStudent && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/roommate/browse" className="cursor-pointer">
                            <Users className="mr-2 h-4 w-4" />
                            <span>Find Roommates</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/materials" className="cursor-pointer">
                            <BookOpen className="mr-2 h-4 w-4" />
                            <span>Study Materials</span>
                          </Link>
                        </DropdownMenuItem>
                        {!isVerified && (
                          <DropdownMenuItem asChild>
                            <Link href="/verify" className="cursor-pointer">
                              <Shield className="mr-2 h-4 w-4 text-amber-500" />
                              <span className="text-amber-600 dark:text-amber-400">
                                Verify Account
                              </span>
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                      </>
                    )}

                    {/* Common */}
                    <DropdownMenuItem asChild>
                      <Link href="/messages" className="cursor-pointer">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Messages</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="cursor-pointer text-red-600 dark:text-red-400"
                      disabled={signingOut || isPending}
                      aria-busy={signingOut || isPending}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{signingOut ? "Signing out…" : "Sign Out"}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Quick Home/Dashboard Toggle */}
                {isOnDashboard ? (
                  <Link href="/">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Home className="h-4 w-4" />
                      <span className="hidden lg:inline">Home</span>
                    </Button>
                  </Link>
                ) : (
                  <Link href={dashboardLink}>
                    <Button variant="default" size="sm" className="gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      <span className="hidden lg:inline">Dashboard</span>
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              // Guest Actions (only after loading is false)
              <>
                <Link href="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="p-2"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t pt-4">
            {/* Always show role-aware links */}
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors ${
                  isActive(pathname, href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive(pathname, href) ? "page" : undefined}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}

            <div className="border-t pt-4 mt-4">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-12 rounded-lg bg-muted animate-pulse" />
                  <div className="h-10 rounded-lg bg-muted animate-pulse" />
                </div>
              ) : user ? (
                <div className="space-y-3">
                  {/* User Info Card */}
                  <div className="px-3 py-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {profile?.full_name || "Account"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{profile?.email}</p>
                      </div>
                    </div>
                    {(chipText || isVerified) && (
                      <div className="flex items-center gap-2 mt-2">
                        {chipText && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {chipText}
                          </span>
                        )}
                        {isVerified && (
                          <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Verified
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Verification CTA */}
                  {!isVerified && (
                    <Link href={isAgent ? "/verify-landlord" : "/verify"}>
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                        <Shield className="mr-2 h-4 w-4" />
                        Get Verified
                      </Button>
                    </Link>
                  )}

                  {/* Quick Actions */}
                  {isOnDashboard ? (
                    <Link href="/">
                      <Button variant="outline" className="w-full">
                        <Home className="mr-2 h-4 w-4" />
                        Go to Home
                      </Button>
                    </Link>
                  ) : (
                    <Link href={dashboardLink}>
                      <Button variant="outline" className="w-full">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Go to Dashboard
                      </Button>
                    </Link>
                  )}

                  <Link href="/messages">
                    <Button variant="ghost" className="w-full justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Messages
                    </Button>
                  </Link>

                  <Link href="/profile">
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="w-full justify-start text-red-600 dark:text-red-400"
                    disabled={signingOut || isPending}
                    aria-busy={signingOut || isPending}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {signingOut ? "Signing out…" : "Sign Out"}
                  </Button>
                </div>
              ) : (
                // Guest Mobile Actions
                <div className="space-y-2">
                  <Link href="/signin">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      
      {user && isStudent && showSchoolBanner && (
        <div className="border-t bg-amber-50 dark:bg-amber-900/20">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-start gap-3 text-amber-800 dark:text-amber-200">
            <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div className="text-sm flex-1">
              <strong>Action needed:</strong> Link and verify your school email
              {typeof daysLeft === "number" && daysLeft > 0 ? (
                <>
                  {" "}
                  within <strong>{daysLeft} day{daysLeft === 1 ? "" : "s"}</strong> to
                  avoid restrictions.
                </>
              ) : (
                <> to regain full access.</>
              )}
            </div>
            <Link href="/verify">
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white flex-shrink-0">
                Verify Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
