"use client"

import { useAuth } from "@/lib/auth-context"

export default function DebugPage() {
  const { user, profile, loading } = useAuth()

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Auth Debug</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded">
          <h2 className="font-bold mb-2">User Object:</h2>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded">
          <h2 className="font-bold mb-2">Profile Object:</h2>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(profile, null, 2)}
          </pre>
        </div>

        <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded">
          <h2 className="font-bold mb-2">Checks:</h2>
          <p>User exists: {user ? "✅ YES" : "❌ NO"}</p>
          <p>Profile exists: {profile ? "✅ YES" : "❌ NO"}</p>
          <p>Profile status: <strong>{profile?.status || "NONE"}</strong></p>
          <p>Is Agent: {profile?.status === "AGENT" ? "✅ YES" : "❌ NO"}</p>
        </div>
      </div>
    </div>
  )
}