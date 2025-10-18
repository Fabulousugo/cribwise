// ==========================================
// FILE: components/dashboard/VerificationBanner.tsx
// Reusable Verification Banner
// ==========================================
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Star, Lock, Sparkles } from "lucide-react"

export function VerificationBanner({ isVerified }: { isVerified: boolean }) {
  if (isVerified) return null

  return (
    <section className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-y border-amber-200 dark:border-amber-800 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <Card className="border-2 border-amber-500/50 bg-background/50 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <Star className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Unlock Premium Features with Verification
                </h3>
                <p className="text-muted-foreground mb-4">
                  Verify your student status to access roommate matching, exclusive materials, event RSVPs, and priority support.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <span>Roommate Matching</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <span>Premium Materials</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <span>Event Access</span>
                  </div>
                </div>
                <Link href="/verify">
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    Verify Now - It's Free
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

