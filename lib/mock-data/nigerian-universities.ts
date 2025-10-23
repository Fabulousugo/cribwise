// ==========================================
// FILE: lib/mock-data/nigerian-universities.ts
// Mock Data for Nigerian Universities & Courses
// ==========================================

export const NIGERIAN_UNIVERSITIES = [
  // Federal Universities
  "University of Lagos (UNILAG)",
  "University of Ibadan (UI)",
  "Obafemi Awolowo University (OAU)",
  "University of Nigeria, Nsukka (UNN)",
  "Ahmadu Bello University (ABU)",
  "University of Benin (UNIBEN)",
  "University of Ilorin (UNILORIN)",
  "University of Jos (UNIJOS)",
  "University of Calabar (UNICAL)",
  "Bayero University Kano (BUK)",
  "University of Port Harcourt (UNIPORT)",
  "University of Maiduguri (UNIMAID)",
  "Federal University of Technology, Akure (FUTA)",
  "Federal University of Technology, Minna (FUTMINNA)",
  "Federal University of Technology, Owerri (FUTO)",
  
  // State Universities
  "Lagos State University (LASU)",
  "Ekiti State University (EKSU)",
  "Adekunle Ajasin University (AAU)",
  "Osun State University (UNIOSUN)",
  "Ladoke Akintola University of Technology (LAUTECH)",
  "Delta State University (DELSU)",
  "Enugu State University of Science and Technology (ESUT)",
  "Rivers State University (RSU)",
  "Ambrose Alli University (AAU)",
  
  // Private Universities
  "Covenant University",
  "Babcock University",
  "Landmark University",
  "Bowen University",
  "Redeemer's University",
  "Pan-Atlantic University",
  "Bells University of Technology",
  "Lead City University",
  "Achievers University",
  "American University of Nigeria (AUN)"
].sort()

export const FACULTIES_AND_DEPARTMENTS = {
  "Engineering": {
    departments: [
      "Computer Engineering",
      "Electrical/Electronics Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
      "Chemical Engineering",
      "Petroleum Engineering",
      "Mechatronics Engineering",
      "Agricultural Engineering",
      "Marine Engineering",
      "Systems Engineering"
    ]
  },
  "Sciences": {
    departments: [
      "Computer Science",
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "Biochemistry",
      "Microbiology",
      "Zoology",
      "Botany",
      "Statistics",
      "Geology"
    ]
  },
  "Social Sciences": {
    departments: [
      "Economics",
      "Political Science",
      "Sociology",
      "Psychology",
      "Mass Communication",
      "International Relations",
      "Geography",
      "Social Work",
      "Demography"
    ]
  },
  "Management Sciences": {
    departments: [
      "Accounting",
      "Business Administration",
      "Banking & Finance",
      "Marketing",
      "Insurance",
      "Industrial Relations",
      "Actuarial Science"
    ]
  },
  "Arts": {
    departments: [
      "English",
      "History",
      "Philosophy",
      "Theatre Arts",
      "Linguistics",
      "French",
      "Arabic",
      "Music",
      "Fine Arts"
    ]
  },
  "Law": {
    departments: ["Law"]
  },
  "Medicine": {
    departments: [
      "Medicine & Surgery",
      "Nursing",
      "Pharmacy",
      "Dentistry",
      "Physiotherapy",
      "Medical Laboratory Science",
      "Radiography",
      "Optometry"
    ]
  },
  "Environmental Sciences": {
    departments: [
      "Architecture",
      "Estate Management",
      "Urban & Regional Planning",
      "Quantity Surveying",
      "Building Technology",
      "Surveying & Geo-Informatics"
    ]
  },
  "Education": {
    departments: [
      "Educational Management",
      "Guidance & Counselling",
      "Adult Education",
      "Science Education",
      "Arts & Social Science Education",
      "Vocational Education"
    ]
  },
  "Agriculture": {
    departments: [
      "Agricultural Economics",
      "Animal Science",
      "Crop Science",
      "Soil Science",
      "Agricultural Extension",
      "Fisheries & Aquaculture",
      "Food Science & Technology"
    ]
  }
}

// Course data structure
export interface Course {
  code: string
  name: string
  units: number
  semester?: 1 | 2
}

// Sample courses for Computer Science
export const COMPUTER_SCIENCE_COURSES: Record<string, Course[]> = {
  "100": [
    { code: "CSC 101", name: "Introduction to Computer Science", units: 3, semester: 1 },
    { code: "CSC 102", name: "Introduction to Problem Solving", units: 3, semester: 2 },
    { code: "MTH 101", name: "Elementary Mathematics I", units: 3, semester: 1 },
    { code: "MTH 102", name: "Elementary Mathematics II", units: 3, semester: 2 },
    { code: "PHY 101", name: "General Physics I", units: 3, semester: 1 },
    { code: "PHY 102", name: "General Physics II", units: 3, semester: 2 },
    { code: "PHY 107", name: "General Practical Physics I", units: 1, semester: 1 },
    { code: "PHY 108", name: "General Practical Physics II", units: 1, semester: 2 },
    { code: "CHM 101", name: "General Chemistry I", units: 3, semester: 1 },
    { code: "CHM 102", name: "General Chemistry II", units: 3, semester: 2 },
    { code: "GST 101", name: "Use of English", units: 2, semester: 1 },
    { code: "GST 102", name: "Nigerian Peoples and Culture", units: 2, semester: 2 },
    { code: "GST 103", name: "Philosophy and Logic", units: 2, semester: 1 }
  ],
  "200": [
    { code: "CSC 201", name: "Computer Programming I (C++)", units: 3, semester: 1 },
    { code: "CSC 202", name: "Computer Programming II (Java)", units: 3, semester: 2 },
    { code: "CSC 203", name: "Discrete Structures", units: 3, semester: 1 },
    { code: "CSC 204", name: "Data Structures and Algorithms", units: 3, semester: 2 },
    { code: "CSC 205", name: "Computer Architecture & Organization", units: 3, semester: 1 },
    { code: "MTH 201", name: "Mathematical Methods I", units: 3, semester: 1 },
    { code: "MTH 202", name: "Elementary Differential Equations", units: 3, semester: 2 },
    { code: "MTH 203", name: "Linear Algebra I", units: 3, semester: 1 },
    { code: "STA 201", name: "Statistics for Physical Sciences", units: 3, semester: 1 },
    { code: "STA 202", name: "Probability Theory", units: 3, semester: 2 },
    { code: "GST 201", name: "Entrepreneurship Studies I", units: 2, semester: 1 }
  ],
  "300": [
    { code: "CSC 301", name: "Algorithm Design and Analysis", units: 3, semester: 1 },
    { code: "CSC 302", name: "Database Management Systems", units: 3, semester: 2 },
    { code: "CSC 303", name: "Operating Systems", units: 3, semester: 1 },
    { code: "CSC 304", name: "Software Engineering", units: 3, semester: 2 },
    { code: "CSC 305", name: "System Analysis and Design", units: 3, semester: 1 },
    { code: "CSC 306", name: "Programming Language Concepts", units: 3, semester: 2 },
    { code: "CSC 307", name: "Computer Networks", units: 3, semester: 1 },
    { code: "CSC 308", name: "Web Programming", units: 3, semester: 2 },
    { code: "CSC 309", name: "Object Oriented Programming", units: 3, semester: 1 },
    { code: "CSC 399", name: "Industrial Training (SIWES)", units: 6, semester: 1 }
  ],
  "400": [
    { code: "CSC 401", name: "Artificial Intelligence", units: 3, semester: 1 },
    { code: "CSC 402", name: "Computer Graphics", units: 3, semester: 2 },
    { code: "CSC 403", name: "Theory of Computation", units: 3, semester: 1 },
    { code: "CSC 404", name: "Compiler Construction", units: 3, semester: 2 },
    { code: "CSC 405", name: "Information Security", units: 3, semester: 1 },
    { code: "CSC 406", name: "Mobile Application Development", units: 3, semester: 2 },
    { code: "CSC 407", name: "Data Mining & Machine Learning", units: 3, semester: 1 },
    { code: "CSC 408", name: "Cloud Computing", units: 3, semester: 2 },
    { code: "CSC 409", name: "Human Computer Interaction", units: 3, semester: 1 },
    { code: "CSC 499", name: "Final Year Project", units: 6, semester: 2 }
  ]
}

// Add more departments as needed...
export const ALL_COURSES: Record<string, Record<string, Course[]>> = {
  "Computer Science": COMPUTER_SCIENCE_COURSES,
  // Add other departments here
  "Electrical/Electronics Engineering": {
    "100": [
      { code: "EEE 101", name: "Introduction to Electrical Engineering", units: 2 },
      { code: "EEE 102", name: "Engineering Drawing", units: 2 },
      { code: "MEE 101", name: "Workshop Practice", units: 1 },
      { code: "MTH 101", name: "Elementary Mathematics I", units: 3 },
      { code: "MTH 102", name: "Elementary Mathematics II", units: 3 },
      { code: "PHY 101", name: "General Physics I", units: 3 },
      { code: "PHY 102", name: "General Physics II", units: 3 },
      { code: "CHM 101", name: "General Chemistry I", units: 3 },
      { code: "GST 101", name: "Use of English", units: 2 }
    ]
  },
  // Template for other departments - you can expand this
  "Economics": {
    "100": [
      { code: "ECO 101", name: "Principles of Economics I", units: 3 },
      { code: "ECO 102", name: "Principles of Economics II", units: 3 },
      { code: "ACC 101", name: "Introduction to Financial Accounting", units: 3 },
      { code: "BUS 101", name: "Introduction to Business", units: 2 },
      { code: "MTH 101", name: "Elementary Mathematics I", units: 3 },
      { code: "GST 101", name: "Use of English", units: 2 }
    ]
  }
}

// Helper function to get courses for a department and level
export function getCourses(department: string, level: string): Course[] {
  return ALL_COURSES[department]?.[level] || []
}

// Helper function to search courses
export function searchCourses(query: string, department: string, level: string): Course[] {
  const courses = getCourses(department, level)
  const lowerQuery = query.toLowerCase()
  
  return courses.filter(course => 
    course.code.toLowerCase().includes(lowerQuery) ||
    course.name.toLowerCase().includes(lowerQuery)
  )
}