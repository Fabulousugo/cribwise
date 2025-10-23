// ==========================================
// FILE: components/onboarding/UniversityStep.tsx
// University Selection with Search
// ==========================================
"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Building2, Search } from "lucide-react"

// Mock Nigerian Universities - You'll populate this from DB
const NIGERIAN_UNIVERSITIES = [
  "University of Lagos (UNILAG)",
  "University of Ibadan (UI)",
  "Obafemi Awolowo University (OAU)",
  "University of Nigeria, Nsukka (UNN)",
  "Ahmadu Bello University (ABU)",
  "University of Benin (UNIBEN)",
  "University of Ilorin (UNILORIN)",
  "Federal University of Technology, Akure (FUTA)",
  "Federal University of Technology, Minna (FUTMINNA)",
  "Lagos State University (LASU)",
  "Covenant University",
  "Babcock University",
  "Pan-Atlantic University",
  "Bowen University",
  "Redeemer's University"
].sort()

export function UniversityStep({ 
  value, 
  onChange 
}: { 
  value: string
  onChange: (value: string) => void
}) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUniversities = NIGERIAN_UNIVERSITIES.filter(uni =>
    uni.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4">
          <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Which University Do You Attend?
        </h2>
        <p className="text-muted-foreground">
          Select from our list of Nigerian universities
        </p>
      </div>

      {/* Search Box */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search universities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* University List */}
      <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2">
        {filteredUniversities.map((university) => (
          <Card
            key={university}
            onClick={() => onChange(university)}
            className={`p-4 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] ${
              value === university
                ? 'border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                : 'border hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">{university}</span>
              {value === university && (
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredUniversities.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No universities found. Try a different search term.</p>
        </div>
      )}
    </div>
  )
}