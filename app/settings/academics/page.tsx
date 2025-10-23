// ==========================================
// FILE: app/settings/academics/page.tsx
// Manage Academic Information
// ==========================================
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  BookOpen, 
  Edit2, 
  Save, 
  Award,
  Trash2,
  Plus,
  GraduationCap,
  Building2,
  Zap
} from "lucide-react"
import { CourseSelectionStep } from "../../onboarding/CourseSelectionStep"
import { toast } from "sonner"

export default function ManageAcademicsPage() {
  const [editing, setEditing] = useState(false)
  const [showCourseSelector, setShowCourseSelector] = useState(false)
  
  // Mock current data - in production, fetch from Supabase
  const [academicInfo, setAcademicInfo] = useState({
    university: "University of Lagos (UNILAG)",
    level: "300",
    faculty: "Sciences",
    department: "Computer Science",
    courses: [
      "CSC 301",
      "CSC 302", 
      "CSC 303",
      "CSC 304",
      "CSC 305"
    ],
    cgpa: "3.85"
  })

  const [tempCourses, setTempCourses] = useState<string[]>(academicInfo.courses)

  const handleSave = async () => {
    // TODO: Save to Supabase
    setAcademicInfo(prev => ({ ...prev, courses: tempCourses }))
    setEditing(false)
    setShowCourseSelector(false)
    
    // Award XP for updating
    toast.success("Academic info updated! +50 XP earned 🎉")
  }

  const handleCancel = () => {
    setTempCourses(academicInfo.courses)
    setEditing(false)
    setShowCourseSelector(false)
  }

  const totalUnits = tempCourses.length * 3 // Mock calculation

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-primary" />
            Manage Academics
          </h1>
          <p className="text-muted-foreground text-lg">
            Update your academic information and course registration
          </p>
        </div>

        {/* Basic Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Academic Profile</CardTitle>
                <CardDescription>Your current academic information</CardDescription>
              </div>
              {!editing && (
                <Button 
                  variant="outline"
                  onClick={() => setEditing(true)}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* University */}
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded">
                <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">University</p>
                <p className="font-semibold text-foreground">{academicInfo.university}</p>
              </div>
            </div>

            {/* Level & Department */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Level</p>
                <p className="font-semibold text-foreground">{academicInfo.level} Level</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Department</p>
                <p className="font-semibold text-foreground">{academicInfo.department}</p>
              </div>
            </div>

            {/* CGPA */}
            {editing ? (
              <div>
                <Label htmlFor="cgpa">CGPA (Optional)</Label>
                <Input
                  id="cgpa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="5.00"
                  value={academicInfo.cgpa}
                  onChange={(e) => setAcademicInfo(prev => ({ ...prev, cgpa: e.target.value }))}
                  placeholder="e.g., 3.85"
                  className="mt-2"
                />
              </div>
            ) : (
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Current CGPA</p>
                <p className="font-semibold text-foreground text-2xl">
                  {academicInfo.cgpa || "Not set"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Courses Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Course Registration
                </CardTitle>
                <CardDescription>
                  {tempCourses.length} courses • {totalUnits} units
                </CardDescription>
              </div>
              {!showCourseSelector && (
                <Button
                  variant="outline"
                  onClick={() => setShowCourseSelector(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Edit Courses
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {showCourseSelector ? (
              <div className="space-y-6">
                <CourseSelectionStep
                  department={academicInfo.department}
                  level={academicInfo.level}
                  selectedCourses={tempCourses}
                  onChange={setTempCourses}
                />
                
                <div className="flex gap-3 justify-end pt-4 border-t">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-primary-foreground"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-3">
                {academicInfo.courses.map((course) => (
                  <div
                    key={course}
                    className="p-4 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{course}</p>
                        <p className="text-sm text-muted-foreground">3 units</p>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  </div>
                ))}

                {academicInfo.courses.length === 0 && (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-muted-foreground">No courses registered yet</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setShowCourseSelector(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Courses
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gamification Incentive */}
        <Card className="border-2 border-amber-500/50 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Keep Your Profile Updated!</h4>
                <p className="text-sm text-muted-foreground">
                  Earn +50 XP every time you update your academic info
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {academicInfo.courses.length}
              </div>
              <p className="text-sm text-muted-foreground">Courses This Semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {totalUnits}
              </div>
              <p className="text-sm text-muted-foreground">Total Units</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {academicInfo.cgpa}
              </div>
              <p className="text-sm text-muted-foreground">Current CGPA</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}