/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, User, Home, GraduationCap, BookOpen, Store, Calendar, ShieldCheck, Building2, ChevronDown, AlertTriangle } from "lucide-react";
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

// Helper to check enforcement deadline
function needsSchoolEmailLink(profile: any) {
  if (!profile) return false;
  if (profile.admission_status !== "ADMITTED") return false;
  if (profile.school_email_verified_at) return false;
  const enforceAt = profile.enforce_school_email_at ? new Date(profile.enforce_school_email_at).getTime() : null;
  if (!enforceAt) return false;
  return Date.now() >= enforceAt;
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

  const primaryLinks = [
    { href: "/properties", label: "Housing", icon: Building2 },
    { href: "/admissions", label: "Admissions", icon: GraduationCap },
    { href: "/materials", label: "Materials", icon: BookOpen },
    { href: "/market", label: "Marketplace", icon: Store },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/safety", label: "Safety", icon: ShieldCheck },
  ];

  const statusText = profile?.status ? (profile.status as string).toLowerCase() : undefined;

  return (
    <>
      <nav className="border-b bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CribWise
            </Link>

            {/* Desktop primary links */}
            <div className="hidden md:flex items-center gap-6">
              {primaryLinks.map(({ href, label }) => (
                <Link 
                  key={href} 
                  href={href} 
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Status chooser / Dashboard */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <User className="h-4 w-4" />
                    {user ? (statusText ? statusText : "Account") : "Choose Status"}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <DropdownMenuLabel className="text-slate-900 dark:text-white">Dashboards</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
                  <DropdownMenuItem asChild className="text-slate-700 dark:text-slate-300 focus:bg-slate-100 dark:focus:bg-slate-700">
                    <Link href="/choose-status">Choose / Change Status</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-slate-700 dark:text-slate-300 focus:bg-slate-100 dark:focus:bg-slate-700">
                    <Link href="/dashboard">Open Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
                  {user ? (
                    <DropdownMenuItem onClick={handleSignOut} className="text-slate-700 dark:text-slate-300 focus:bg-slate-100 dark:focus:bg-slate-700">
                      Sign Out
                    </DropdownMenuItem>
                  ) : (
                    <>
                      <DropdownMenuItem asChild className="text-slate-700 dark:text-slate-300 focus:bg-slate-100 dark:focus:bg-slate-700">
                        <Link href="/signin">Sign In</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="text-slate-700 dark:text-slate-300 focus:bg-slate-100 dark:focus:bg-slate-700">
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
                    <Button variant="outline" size="sm" className="gap-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <Home className="h-4 w-4" /> Home
                    </Button>
                  </Link>
                ) : (
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="gap-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <User className="h-4 w-4" /> Dashboard
                    </Button>
                  </Link>
                )
              )}

              {/* Auth buttons when logged out */}
              {!loading && !user && (
                <>
                  <Link href="/signin">
                    <Button variant="outline" className="border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button 
                title="Menu" 
                className="p-2" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6 text-slate-700 dark:text-slate-300" />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              {primaryLinks.map(({ href, label, icon: Icon }) => (
                <Link 
                  key={href} 
                  href={href} 
                  className="flex items-center gap-2 py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-4 w-4" /> {label}
                </Link>
              ))}

              <div className="flex flex-col gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                {user ? (
                  <>
                    <div className="px-3 py-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{profile?.full_name || "User"}</p>
                      <p className="text-xs text-blue-500 dark:text-blue-300 capitalize">{statusText}</p>
                    </div>

                    {isOnDashboard ? (
                      <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                          <Home className="h-4 w-4 mr-2" /> Home
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                          <User className="h-4 w-4 mr-2" /> Dashboard
                        </Button>
                      </Link>
                    )}

                    <Link href="/choose-status" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full text-slate-700 dark:text-slate-300">
                        Choose / Change Status
                      </Button>
                    </Link>

                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-slate-700 dark:text-slate-300"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* School email enforcement banner */}
        {user && (showLinkWarning || (typeof dLeft === "number" && dLeft <= 7)) && (
          <div className="border-t bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-start gap-3 text-amber-800 dark:text-amber-200">
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
                      <Link href="/link-school-email">
                        <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                          Verify School Email
                        </Button>
                      </Link>
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