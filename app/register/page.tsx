/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<'status' | 'details'>('status')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    university: '',
    gender: ''
  })

  const statuses = [
    {
      value: 'prospective',
      title: '🎓 Prospective Student',
      description: 'Preparing or applying for admission',
      icon: '🎯'
    },
    {
      value: 'admitted',
      title: '✅ Admitted Student',
      description: 'Officially admitted but not yet on campus',
      icon: '🎉'
    },
    {
      value: 'current',
      title: '📚 Current Student',
      description: 'Active student with a school email',
      icon: '👨‍🎓'
    },
    {
      value: 'alumni',
      title: '🎖️ Alumni',
      description: 'Graduate or outgoing student',
      icon: '🎓'
    },
    {
      value: 'agent',
      title: '🏢 Agent/Landlord',
      description: 'Property owner or agent',
      icon: '🏠'
    }
  ]

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status)
    setStep('details')
  }

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setError('')

  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
        }
      }
    })

    if (authError) throw authError
    if (!authData.user) throw new Error('User creation failed')

    // 2. Create user profile WITH GENDER
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert([
        {
          id: authData.user.id,
          status: selectedStatus,
          full_name: formData.fullName,
          university: formData.university || null,
          gender: selectedStatus !== 'agent' ? formData.gender : null,  // ADD THIS
        }
      ])

    if (profileError) throw profileError

    // 3. Redirect
    if (selectedStatus === 'agent') {
      router.push('/dashboard/agent')
    } else {
      router.push('/dashboard/student')
    }

  } catch (err: any) {
    console.error('Registration error:', err)
    setError(err.message || 'Registration failed. Please try again.')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-background  py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Welcome to Cribwise</h1>
          <p className="text-xl text-slate-600">Let&apos;s get you started in just 2 steps</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${step === 'status' ? 'text-blue-600 font-semibold' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'status' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>
                1
              </div>
              <span>Choose Status</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-300"></div>
            <div className={`flex items-center gap-2 ${step === 'details' ? 'text-blue-600 font-semibold' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'details' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>
                2
              </div>
              <span>Your Details</span>
            </div>
          </div>
        </div>

        {/* Step 1: Select Status */}
        {step === 'status' && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">What best describes you?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {statuses.map((status) => (
                <Card 
                  key={status.value}
                  className={`cursor-pointer hover:shadow-lg hover:scale-105 transition-all ${
                    selectedStatus === status.value ? 'ring-2 ring-blue-600 shadow-lg' : ''
                  }`}
                  onClick={() => handleStatusSelect(status.value)}
                >
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">{status.icon}</div>
                    <CardTitle className="text-lg">{status.title}</CardTitle>
                    <CardDescription>{status.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Enter Details */}
        {step === 'details' && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Create Your Account</CardTitle>
              <CardDescription>
                Registering as: <strong className="text-blue-600">
                  {statuses.find(s => s.value === selectedStatus)?.title}
                </strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name *</label>
                  <Input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <Input
                    required
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  {selectedStatus !== 'agent' && (
                    <p className="text-xs text-slate-500 mt-1">
                      You will be able to add your school email (.edu.ng) later
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Password *</label>
                  <Input
                    required
                    type="password"
                    placeholder="Minimum 6 characters"
                    minLength={6}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>

                {selectedStatus !== 'agent' && (
                  <>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      University {selectedStatus === 'prospective' ? '(Target)' : ''}
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., University of Lagos"
                      value={formData.university}
                      onChange={(e) => setFormData({...formData, university: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Gender *</label>
                    <Select
                      required
                      value={formData.gender}
                      onValueChange={(value) => setFormData({...formData, gender: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-slate-500 mt-1">
                      Required for roommate matching and housing safety
                    </p>
                  </div>

                  </>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setStep('status')
                      setError('')
                    }}
                    className="flex-1"
                  >
                    ← Back
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </Button>
                </div>

                <p className="text-center text-sm text-slate-600 mt-4">
                  Already have an account?{' '}
                  <Link href="/signin" className="text-blue-600 hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}