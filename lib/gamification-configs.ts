// ==========================================
// FILE: lib/gamification-configs.ts
// Customized gamification for each user type
// ==========================================

export const prospectiveStudentChallenges = [
  { task: 'Complete admission checklist', progress: 0, total: 1, xp: 100, icon: 'Target' as const },
  { task: 'Research 3 universities', progress: 0, total: 3, xp: 75, icon: 'Zap' as const },
  { task: 'Upload required documents', progress: 0, total: 5, xp: 150, icon: 'Star' as const },
]

export const admittedStudentChallenges = [
  { task: 'Accept admission on JAMB', progress: 0, total: 1, xp: 200, icon: 'Target' as const },
  { task: 'Find housing', progress: 0, total: 1, xp: 150, icon: 'Zap' as const },
  { task: 'Match with roommate', progress: 0, total: 1, xp: 100, icon: 'Star' as const },
]

export const currentStudentChallenges = [
  { task: 'View 3 properties', progress: 0, total: 3, xp: 50, icon: 'Target' as const },
  { task: 'Send 5 messages', progress: 0, total: 5, xp: 30, icon: 'Zap' as const },
  { task: 'Download 1 material', progress: 0, total: 1, xp: 20, icon: 'Star' as const },
]

export const alumniChallenges = [
  { task: 'Mentor 1 student', progress: 0, total: 1, xp: 200, icon: 'Target' as const },
  { task: 'Attend alumni event', progress: 0, total: 1, xp: 100, icon: 'Zap' as const },
  { task: 'Make a contribution', progress: 0, total: 1, xp: 250, icon: 'Star' as const },
]

export const prospectiveAchievements = [
  { 
    name: 'First Step', 
    description: 'Started admission journey',
    icon: 'Star' as const,
    unlocked: true,
    color: 'from-yellow-500 to-orange-500'
  },
  { 
    name: 'Document Master', 
    description: 'Uploaded all required documents',
    icon: 'Trophy' as const,
    unlocked: false,
    color: 'from-blue-500 to-purple-500'
  },
  { 
    name: 'School Scout', 
    description: 'Researched 10+ universities',
    icon: 'Award' as const,
    unlocked: false,
    color: 'from-green-500 to-emerald-500'
  },
]

export const admittedAchievements = [
  { 
    name: 'Admitted!', 
    description: 'Received university admission',
    icon: 'Star' as const,
    unlocked: true,
    color: 'from-yellow-500 to-orange-500'
  },
  { 
    name: 'Home Sweet Home', 
    description: 'Secured accommodation',
    icon: 'Trophy' as const,
    unlocked: false,
    color: 'from-blue-500 to-purple-500'
  },
  { 
    name: 'Perfect Match', 
    description: 'Found ideal roommate',
    icon: 'Award' as const,
    unlocked: false,
    color: 'from-green-500 to-emerald-500'
  },
]

export const alumniAchievements = [
  { 
    name: 'Graduate', 
    description: 'Completed your degree',
    icon: 'Star' as const,
    unlocked: true,
    color: 'from-yellow-500 to-orange-500'
  },
  { 
    name: 'Mentor', 
    description: 'Mentored 10+ students',
    icon: 'Trophy' as const,
    unlocked: false,
    color: 'from-blue-500 to-purple-500'
  },
  { 
    name: 'Philanthropist', 
    description: 'Donated ₦100k+',
    icon: 'Award' as const,
    unlocked: false,
    color: 'from-green-500 to-emerald-500'
  },
]