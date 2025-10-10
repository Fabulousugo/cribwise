"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

type Profile = {
  id: string
  full_name?: string | null
  status?: string | null
  avatar_url?: string | null
  school_email_verified?: boolean | null
}

export default function StudentDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error

      if (!user) {
        router.push("/signin")
        return
      }

      const { data: profileData, error: profileErr } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (profileErr) throw profileErr
      setProfile(profileData as Profile)
    } catch (error) {
      console.error("Error:", error)
      router.push("/signin")
    } finally {
      setLoading(false)
    }
  }

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
  if (!file || !profile?.id) return

  try {
    const { data: { user } } = await supabase.auth.getUser()
    console.log('auth user:', user?.id) // must NOT be null

    const ext = file.name.split(".").pop()
    const path = `${profile.id}/${Date.now()}.${ext}`

    const uploadRes = await supabase.storage.from("avatars").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    })
    console.log('uploadRes:', uploadRes)
    if (uploadRes.error) throw uploadRes.error

    const { data: publicURLData } = supabase.storage.from("avatars").getPublicUrl(path)
    const url = publicURLData.publicUrl

    const updRes = await supabase
      .from("user_profiles")
      .update({ avatar_url: url })
      .eq("id", profile.id)
      .select("*")
      .single()
    console.log('profile update:', updRes)
    if (updRes.error) throw updRes.error

    setProfile(updRes.data as Profile)
  } catch (err) {
    console.error("Avatar upload failed:", err)
  } finally {
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

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || "Student"} />
              <AvatarFallback className="text-lg">{initials(profile?.full_name)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-1">
              Welcome, {profile?.full_name || "Student"}! 👋
            </h1>
            <p className="text-slate-600">
              Status:{" "}
              <span className="font-semibold capitalize">{profile?.status || "unknown"}</span>
            </p>
            <div className="mt-3 flex items-center gap-2">
              <input title="Upload avatar"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload new photo
              </Button>
              {profile?.avatar_url && (
                <a
                  href={profile.avatar_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-slate-600 underline"
                >
                  View current
                </a>
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
              <CardTitle className="text-yellow-800">⚠️ Verify Your School Email</CardTitle>
              <CardDescription className="text-yellow-700">
                Add your official .edu.ng email to unlock full features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="default">Verify Now</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
