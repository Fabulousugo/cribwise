// ==========================================
// FILE: components/onboarding/DepartmentStep.tsx
// Faculty and Department Selection
// ==========================================
"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Book, Search } from "lucide-react"

// Mock Faculty/Department Data - You'll populate from DB
const FACULTIES_AND_DEPARTMENTS: Record<string, string[]> = {
  "Engineering": [
    "Computer Engineering",
    "Electrical/Electronics Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Petroleum Engineering",
    "Mechatronics Engineering"
  ],
  "Sciences": [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Biochemistry",
    "Microbiology"
  ],
  "Social Sciences": [
    "Economics",
    "Political Science",
    "Sociology",
    "Psychology",
    "Mass Communication",
    "International Relations"
  ],
  "Management Sciences": [
    "Accounting",
    "Business Administration",
    "Banking & Finance",
    "Marketing",
    "Insurance"
  ],
  "Arts": [
    "English",
    "History",
    "Philosophy",
    "Theatre Arts",
    "Languages"
  ],
  "Law": ["Law"],
  "Medicine": [
    "Medicine & Surgery",
    "Nursing",
    "Pharmacy",
    "Dentistry",
    "Physiotherapy"
  ],
  "Environmental Sciences": [
    "Architecture",
    "Estate Management",
    "Urban & Regional Planning",
    "Quantity Surveying"
  ]
}

export function DepartmentStep({ 
  university,
  value,
  onFacultyChange,
  onDepartmentChange
}: { 
  university: string
  value: string
  onFacultyChange: (value: string) => void
  onDepartmentChange: (value: string) => void
}) {
  const [selectedFaculty, setSelectedFaculty] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")

  const handleFacultySelect = (faculty: string) => {
    setSelectedFaculty(faculty)
    onFacultyChange(faculty)
    onDepartmentChange("") // Reset department when faculty changes
  }

  const handleDepartmentSelect = (dept: string) => {
    onDepartmentChange(dept)
  }

  const filteredDepartments = selectedFaculty
    ? FACULTIES_AND_DEPARTMENTS[selectedFaculty].filter(dept =>
        dept.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
          <Book className="h-8 w-8 text-green-600 dark:text-success" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          What&apos;s Your Department?
        </h2>
        <p className="text-muted-foreground">
          First select your faculty, then your department
        </p>
      </div>

      {/* Faculty Selection */}
      {!selectedFaculty && (
        <div>
          <h3 className="font-semibold text-lg mb-4 text-foreground">Select Your Faculty</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {Object.keys(FACULTIES_AND_DEPARTMENTS).map((faculty) => (
              <Card
                key={faculty}
                onClick={() => handleFacultySelect(faculty)}
                className="p-4 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] border hover:border-green-300"
              >
                <span className="font-medium text-foreground">{faculty}</span>
                <p className="text-xs text-muted-foreground mt-1">
                  {FACULTIES_AND_DEPARTMENTS[faculty].length} departments
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Department Selection */}
      {selectedFaculty && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-foreground">
              Select Your Department in {selectedFaculty}
            </h3>
            <button
              onClick={() => setSelectedFaculty("")}
              className="text-sm text-blue-600 hover:underline"
            >
              Change Faculty
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2">
            {filteredDepartments.map((department) => (
              <Card
                key={department}
                onClick={() => handleDepartmentSelect(department)}
                className={`p-4 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] ${
                  value === department
                    ? 'border-2 border-green-500 bg-green-50 dark:bg-green-950/20'
                    : 'border hover:border-green-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{department}</span>
                  {value === department && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}