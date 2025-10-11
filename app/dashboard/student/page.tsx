"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default function StudentDashboard() {
  const router = useRouter()
  const { user, profile, loading, refreshProfile } = useAuth()  // Add refreshProfile
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin")
    }
  }, [user, loading, router])

  // NEW: Refresh profile when dashboard loads
  useEffect(() => {
    if (user) {
      refreshProfile()
    }
  }, [])

  useEffect(() => {
    if (profile?.avatar_url) {
      setAvatarUrl(profile.avatar_url)
    }
  }, [profile])


  function initials(name?: string | null) {
    if (!name) return "ST"
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("") || "ST"
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !user?.id) return

    setUploading(true)
    try {
      const ext = file.name.split(".").pop()
      const path = `${user.id}/${Date.now()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false,
        })

      if (uploadError) throw uploadError

      const { data: publicURLData } = supabase.storage
        .from("avatars")
        .getPublicUrl(path)
      
      const url = publicURLData.publicUrl

      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({ avatar_url: url })
        .eq("id", user.id)

      if (updateError) throw updateError

      setAvatarUrl(url)
      
    } catch (err) {
      console.error("Avatar upload failed:", err)
      alert("Failed to upload avatar. Please try again.")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-2">Loading...</div>
          <p className="text-slate-600">Setting up your dashboard</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage 
                src={avatarUrl || undefined} 
                alt={profile?.full_name || "Student"} 
              />
              <AvatarFallback className="text-lg">
                {initials(profile?.full_name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-1">
              Welcome, {profile?.full_name || "Student"}! 👋
            </h1>
            <p className="text-slate-600">
              Status:{" "}
              <span className="font-semibold capitalize">
                {profile?.status || "unknown"}
              </span>
            </p>
            <div className="mt-3 flex items-center gap-2">
              <input
                title="Upload avatar"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload new photo"}
              </Button>
              {avatarUrl && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => window.open(avatarUrl, '_blank')}
                  className="text-slate-600 hover:text-slate-800 p-0 h-auto"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View current
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Browse Properties</CardTitle>
              <CardDescription>Find your perfect student accommodation</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/properties">
                <Button className="w-full">Start Browsing</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>Update your information</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/profile">
                <Button variant="outline" className="w-full">View Profile</Button>
              </Link>
            </CardContent>
          </Card>
            <Card>
            <CardHeader>
              <CardTitle>Find Roommates</CardTitle>
              <CardDescription>Browse compatible roommates</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/roommate/browse">
                <Button className="w-full">Browse Roommates</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Contact Requests</CardTitle>
              <CardDescription>View your property inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Coming Soon</Button>
            </CardContent>
          </Card>
        </div>

        {!profile?.school_email_verified && profile?.status !== "prospective" && (
          <Card className="mt-6 border-yellow-300 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">
                ⚠️ Verify Your School Email
              </CardTitle>
              <CardDescription className="text-yellow-700">
                Add your official .edu.ng email to unlock full features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/profile">
                <Button variant="default">Verify Now</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}