// ==========================================
// FILE: components/onboarding/CourseSelectionStep.tsx
// Easy Course Selection - Just Tick Boxes!
// ==========================================
"use client"

import { SetStateAction, useState } from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BookOpen, Search, CheckCircle2 } from "lucide-react"

// Mock Course Data - In production, this comes from DB filtered by department + level
const MOCK_COURSES: Record<string, Record<string, Array<{code: string, name: string, units: number}>>> = {
  "Computer Science": {
    "100": [
      { code: "CSC 101", name: "Introduction to Computer Science", units: 3 },
      { code: "CSC 102", name: "Introduction to Problem Solving", units: 3 },
      { code: "MTH 101", name: "Elementary Mathematics I", units: 3 },
      { code: "MTH 102", name: "Elementary Mathematics II", units: 3 },
      { code: "PHY 101", name: "General Physics I", units: 3 },
      { code: "PHY 102", name: "General Physics II", units: 3 },
      { code: "GST 101", name: "Use of English", units: 2 },
      { code: "GST 102", name: "Nigerian Peoples and Culture", units: 2 }
    ],
    "200": [
      { code: "CSC 201", name: "Computer Programming I", units: 3 },
      { code: "CSC 202", name: "Computer Programming II", units: 3 },
      { code: "CSC 203", name: "Discrete Structures", units: 3 },
      { code: "CSC 204", name: "Data Structures", units: 3 },
      { code: "MTH 201", name: "Mathematical Methods I", units: 3 },
      { code: "MTH 202", name: "Elementary Differential Equations", units: 3 },
      { code: "STA 201", name: "Statistics for Physical Sciences", units: 3 }
    ],
    "300": [
      { code: "CSC 301", name: "Algorithm Design and Analysis", units: 3 },
      { code: "CSC 302", name: "Database Management Systems", units: 3 },
      { code: "CSC 303", name: "Operating Systems", units: 3 },
      { code: "CSC 304", name: "Software Engineering", units: 3 },
      { code: "CSC 305", name: "Computer Architecture", units: 3 },
      { code: "CSC 306", name: "Programming Language Concepts", units: 3 }
    ],
    "400": [
      { code: "CSC 401", name: "Artificial Intelligence", units: 3 },
      { code: "CSC 402", name: "Computer Networks", units: 3 },
      { code: "CSC 403", name: "Theory of Computation", units: 3 },
      { code: "CSC 404", name: "Compiler Construction", units: 3 },
      { code: "CSC 499", name: "Final Year Project", units: 6 }
    ]
  },
  // Add more departments...
  "Electrical/Electronics Engineering": {
    "100": [
      { code: "EEE 101", name: "Introduction to Electrical Engineering", units: 2 },
      { code: "EEE 102", name: "Engineering Drawing", units: 2 },
      { code: "MTH 101", name: "Elementary Mathematics I", units: 3 },
      { code: "PHY 101", name: "General Physics I", units: 3 },
      { code: "CHM 101", name: "General Chemistry I", units: 3 }
    ]
  }
}

export function CourseSelectionStep({ 
  department,
  level,
  selectedCourses,
  onChange
}: { 
  department: string
  level: string
  selectedCourses: string[]
  onChange: (courses: string[]) => void
}) {
  const [searchTerm, setSearchTerm] = useState("")

  // Get courses for selected department and level
  const availableCourses = MOCK_COURSES[department]?.[level] || []
  
  const filteredCourses = availableCourses.filter(course =>
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleCourse = (courseCode: string) => {
    if (selectedCourses.includes(courseCode)) {
      onChange(selectedCourses.filter(c => c !== courseCode))
    } else {
      onChange([...selectedCourses, courseCode])
    }
  }

  const selectAll = () => {
    onChange(filteredCourses.map(c => c.code))
  }

  const clearAll = () => {
    onChange([])
  }

  const totalUnits = availableCourses
    .filter(course => selectedCourses.includes(course.code))
    .reduce((sum, course) => sum + course.units, 0)

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-full mb-4">
          <BookOpen className="h-8 w-8 text-amber-600 dark:text-amber-400" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Select Your Courses
        </h2>
        <p className="text-muted-foreground mb-4">
          Just tick the boxes - no typing needed! 🎯
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="secondary" className="text-base px-4 py-2">
            {selectedCourses.length} courses selected
          </Badge>
          <Badge variant="secondary" className="text-base px-4 py-2">
            {totalUnits} units total
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={selectAll}
          className="flex-1"
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Select All
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearAll}
          className="flex-1"
        >
          Clear All
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e: { target: { value: SetStateAction<string> } }) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* Course List */}
      {availableCourses.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            No courses available for {department} - {level} Level yet.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Contact support to add courses for your department.
          </p>
        </Card>
      ) : (
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {filteredCourses.map((course) => (
            <Card
              key={course.code}
              onClick={() => toggleCourse(course.code)}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                selectedCourses.includes(course.code)
                  ? 'border-2 border-amber-500 bg-amber-50 dark:bg-amber-950/20'
                  : 'border hover:border-amber-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selectedCourses.includes(course.code)}
                  onCheckedChange={() => toggleCourse(course.code)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {course.code}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {course.name}
                      </p>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {course.units} units
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {filteredCourses.length === 0 && availableCourses.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No courses match your search. Try different keywords.</p>
        </div>
      )}
    </div>
  )
}