// Admission Checklists Data
// Contains all checklist definitions used across the admissions flow

export interface Resource {
  title: string
  url: string
}

export interface ChecklistStep {
  id: string
  title: string
  description: string
  category: string
  priority: "high" | "medium" | "low"
  estimatedTime: string
  deadline?: string
  tips?: string[]
  resources?: Resource[]
}

export interface Checklist {
  id: string
  name: string
  description: string
  icon: string
  color: string
  steps: ChecklistStep[]
  totalSteps: number
  estimatedTime: string
  recommended: boolean
  tags: string[]
}

// ==========================================
// DOCUMENT PREPARATION CHECKLIST
// ==========================================
export const documentChecklist: Checklist = {
  id: "documents",
  name: "Document Preparation",
  description: "Gather all required documents before application deadlines",
  icon: "📄",
  color: "from-blue-500 to-cyan-500",
  totalSteps: 7,
  estimatedTime: "2-4 weeks",
  recommended: true,
  tags: ["Essential", "All Students"],
  steps: [
    {
      id: "doc-birth-certificate",
      title: "Original Birth Certificate",
      description: "Get your original birth certificate or certified copy from National Population Commission",
      category: "Government Documents",
      priority: "high",
      estimatedTime: "1-2 weeks",
      tips: [
        "Must be government-issued and certified",
        "Get at least 2 photocopies",
        "If lost, apply for a replacement immediately (can take 4-8 weeks)"
      ]
    },
    {
      id: "doc-local-govt",
      title: "Local Government Identification Letter",
      description: "Obtain proof of origin from your Local Government Area office",
      category: "Government Documents",
      priority: "high",
      estimatedTime: "1-3 days",
      tips: [
        "Visit your LGA secretariat",
        "Bring your birth certificate and valid ID",
        "Usually costs ₦500 - ₦2,000",
        "Processing takes 1-3 days"
      ]
    },
    {
      id: "doc-jamb-result",
      title: "JAMB Result Slip",
      description: "Print your original UTME result slip from JAMB portal",
      category: "Academic Documents",
      priority: "high",
      estimatedTime: "30 minutes",
      tips: [
        "Log in to jamb.gov.ng with your email/phone",
        "Click 'Check 2024 UTME Result'",
        "Print in color if possible",
        "Keep both digital and physical copies"
      ],
      resources: [
        { title: "JAMB Portal", url: "https://www.jamb.gov.ng" }
      ]
    },
    {
      id: "doc-olevel-results",
      title: "O'Level Results (WAEC/NECO)",
      description: "Get original certificates and statement of results",
      category: "Academic Documents",
      priority: "high",
      estimatedTime: "2-3 weeks",
      tips: [
        "WAEC: Order online at waecdirect.org",
        "NECO: Visit www.mynecoexams.com",
        "Allow 2-3 weeks for delivery",
        "Verify results are correctly uploaded to JAMB portal",
        "You may need both scratch card and statement of result"
      ],
      resources: [
        { title: "WAEC Direct", url: "https://www.waecdirect.org" },
        { title: "NECO Results", url: "https://www.mynecoexams.com" }
      ]
    },
    {
      id: "doc-passport-photos",
      title: "Passport Photographs",
      description: "Get recent passport photos (white or red background)",
      category: "Personal Documents",
      priority: "medium",
      estimatedTime: "1 day",
      tips: [
        "Take at least 12 copies",
        "White background for most schools",
        "Red background for some specific forms",
        "Must be recent (taken within last 3 months)",
        "Wear formal attire",
        "No smiling, glasses, or hats"
      ]
    },
    {
      id: "doc-medical-certificate",
      title: "Medical Fitness Certificate",
      description: "Get a health certificate from a recognized hospital",
      category: "Medical Documents",
      priority: "medium",
      estimatedTime: "1-2 days",
      tips: [
        "Visit any government or teaching hospital",
        "Must be signed by a medical doctor",
        "Tests may include: HIV, Hepatitis B, drug screening",
        "Cost ranges from ₦10,000 - ₦20,000",
        "Valid for 6 months"
      ]
    },
    {
      id: "doc-additional",
      title: "Other Supporting Documents",
      description: "Prepare additional documents that may be required",
      category: "Supporting Documents",
      priority: "low",
      estimatedTime: "1 week",
      tips: [
        "Photocopies of parents' ID cards",
        "Proof of address (utility bill, tenancy agreement)",
        "Change of name certificate (if applicable)",
        "Marriage certificate (for married applicants)",
        "Previous university transcripts (for transfer students)"
      ]
    }
  ]
}

// ==========================================
// POST-JAMB SCREENING CHECKLIST
// ==========================================
export const postJambChecklist: Checklist = {
  id: "post-jamb",
  name: "Post-JAMB Screening",
  description: "Navigate post-UTME and screening processes",
  icon: "📝",
  color: "from-purple-500 to-pink-500",
  totalSteps: 8,
  estimatedTime: "4-6 weeks",
  recommended: true,
  tags: ["JAMB Candidates", "Essential"],
  steps: [
    {
      id: "jamb-portal-check",
      title: "Check JAMB Admission Status",
      description: "Monitor your JAMB CAPS for admission status and screening invitations",
      category: "JAMB Requirements",
      priority: "high",
      estimatedTime: "Daily checks",
      deadline: "Throughout admission season",
      tips: [
        "Check your JAMB profile daily during admission season",
        "Accept/Reject offers within 72 hours",
        "Ensure your phone number and email are updated"
      ],
      resources: [
        { title: "JAMB CAPS", url: "https://www.jamb.gov.ng/efacility" }
      ]
    },
    {
      id: "screening-registration",
      title: "Register for Post-UTME Screening",
      description: "Complete registration on your chosen institution's portal",
      category: "Application",
      priority: "high",
      estimatedTime: "2-3 days",
      tips: [
        "Register immediately when portal opens",
        "Keep your registration number safe",
        "Print acknowledgment slip",
        "Payment is usually ₦5,000 - ₦15,000"
      ]
    },
    {
      id: "screening-documents",
      title: "Upload Required Documents",
      description: "Submit all necessary documents on the screening portal",
      category: "Documentation",
      priority: "high",
      estimatedTime: "2-3 hours",
      tips: [
        "Scan documents in clear, high quality",
        "Use JPEG or PDF format as specified",
        "File sizes should be under 2MB each",
        "Keep backup copies of all uploads"
      ]
    },
    {
      id: "screening-exam-prep",
      title: "Prepare for Screening Examination",
      description: "Study past questions and syllabus for your chosen course",
      category: "Examination",
      priority: "high",
      estimatedTime: "2-4 weeks",
      tips: [
        "Download past questions from school website",
        "Focus on subjects relevant to your course",
        "Join WhatsApp study groups",
        "Practice time management",
        "Review JAMB syllabus for your subjects"
      ]
    },
    {
      id: "screening-exam-day",
      title: "Attend Screening Examination",
      description: "Show up prepared on your examination date",
      category: "Examination",
      priority: "high",
      estimatedTime: "1 day",
      tips: [
        "Arrive at least 1 hour early",
        "Bring acknowledgment slip, ID card, writing materials",
        "No phones or electronic devices allowed",
        "Dress formally",
        "Read instructions carefully before starting"
      ]
    },
    {
      id: "screening-results",
      title: "Check Screening Results",
      description: "Monitor portal for your post-UTME results",
      category: "Results",
      priority: "high",
      estimatedTime: "2-4 weeks wait",
      tips: [
        "Results are usually released 2-4 weeks after exam",
        "Check school portal regularly",
        "Print your result slip immediately",
        "Contact school if there are discrepancies"
      ]
    },
    {
      id: "merit-list",
      title: "Monitor Merit/Admission List",
      description: "Check for your name on the provisional admission list",
      category: "Admission",
      priority: "high",
      estimatedTime: "Ongoing",
      deadline: "Throughout admission period",
      tips: [
        "Merit lists are released in batches",
        "Check school website and notice boards",
        "Join school's Telegram/WhatsApp channels",
        "Don't fall for fake admission lists"
      ]
    },
    {
      id: "accept-admission",
      title: "Accept Admission on JAMB CAPS",
      description: "Accept your admission offer on JAMB portal",
      category: "Admission",
      priority: "high",
      estimatedTime: "1 hour",
      tips: [
        "Accept within 72 hours of offer",
        "Print acceptance letter from JAMB",
        "Screenshot your acceptance confirmation",
        "This is mandatory for all admissions"
      ]
    }
  ]
}

// ==========================================
// POST-ADMISSION SETUP CHECKLIST
// ==========================================
export const postAdmissionChecklist: Checklist = {
  id: "post-admission",
  name: "Post-Admission Setup",
  description: "Complete all requirements after receiving admission",
  icon: "🎉",
  color: "from-green-500 to-emerald-500",
  totalSteps: 9,
  estimatedTime: "2-3 weeks",
  recommended: false,
  tags: ["Admitted Students"],
  steps: [
    {
      id: "accept-offer",
      title: "Accept Admission Offer",
      description: "Formally accept your admission on JAMB and school portal",
      category: "Official Acceptance",
      priority: "high",
      estimatedTime: "1 day",
      deadline: "Within 72 hours of offer",
      tips: [
        "Accept on JAMB CAPS first",
        "Then accept on school portal",
        "Print all acceptance letters",
        "Keep digital and physical copies"
      ]
    },
    {
      id: "pay-acceptance-fee",
      title: "Pay Acceptance Fee",
      description: "Pay the non-refundable acceptance fee to secure your admission",
      category: "Financial",
      priority: "high",
      estimatedTime: "1 day",
      tips: [
        "Fee ranges from ₦10,000 - ₦50,000",
        "Payment is usually online via Remita",
        "Keep payment receipt safe",
        "Payment deadline is strict"
      ]
    },
    {
      id: "screening-clearance",
      title: "Physical Screening and Document Verification",
      description: "Attend physical screening to verify your documents",
      category: "Verification",
      priority: "high",
      estimatedTime: "1 day",
      tips: [
        "Bring all original documents",
        "Arrive early to avoid queues",
        "Dress formally",
        "Bring multiple photocopies of documents"
      ]
    },
    {
      id: "school-fees",
      title: "Pay School Fees",
      description: "Pay your first semester/year tuition fees",
      category: "Financial",
      priority: "high",
      estimatedTime: "1-2 days",
      tips: [
        "Check school fees breakdown on portal",
        "Payment is usually online",
        "Print payment receipt immediately",
        "Fees vary by course and school type"
      ]
    },
    {
      id: "medical-screening",
      title: "Complete Medical Screening",
      description: "Undergo medical examination at school clinic or approved hospital",
      category: "Medical",
      priority: "high",
      estimatedTime: "1 day",
      tips: [
        "Book appointment early",
        "Bring medical fitness certificate",
        "Tests include: HIV, Hepatitis B, blood group",
        "Cost: ₦3,000 - ₦8,000"
      ]
    },
    {
      id: "student-id",
      title: "Get Student ID Card",
      description: "Obtain your official student identification card",
      category: "Documentation",
      priority: "medium",
      estimatedTime: "1 week",
      tips: [
        "Submit passport photographs",
        "Pay ID card fee if required",
        "Card needed for library, exams, campus access",
        "Report immediately if lost"
      ]
    },
    {
      id: "course-registration",
      title: "Register Your Courses",
      description: "Select and register for your first semester courses online",
      category: "Academic",
      priority: "high",
      estimatedTime: "2-3 days",
      deadline: "Before lectures begin",
      tips: [
        "Consult your departmental handbook",
        "Follow your course curriculum",
        "Register the required credit units",
        "Print course registration form",
        "Get HOD's signature if required"
      ]
    },
    {
      id: "accommodation",
      title: "Secure Accommodation",
      description: "Apply for hostel or find off-campus housing",
      category: "Housing",
      priority: "high",
      estimatedTime: "1-2 weeks",
      tips: [
        "Apply for hostel early (spaces are limited)",
        "If off-campus, use verified platforms like CribWise",
        "Visit properties before paying",
        "Budget ₦150,000 - ₦500,000 per year",
        "Check proximity to campus"
      ],
      resources: [
        { title: "Find Housing", url: "/properties" }
      ]
    },
    {
      id: "orientation",
      title: "Attend Orientation Program",
      description: "Participate in orientation/matriculation ceremonies",
      category: "Campus Life",
      priority: "medium",
      estimatedTime: "2-3 days",
      tips: [
        "Don't miss orientation - important information shared",
        "Meet other freshers and make friends",
        "Learn about campus facilities and rules",
        "Join clubs and societies",
        "Get your gown for matriculation"
      ]
    }
  ]
}

// ==========================================
// SCHOLARSHIP APPLICATIONS CHECKLIST
// ==========================================
export const scholarshipChecklist: Checklist = {
  id: "scholarship",
  name: "Scholarship Applications",
  description: "Apply for financial aid and scholarship opportunities",
  icon: "💰",
  color: "from-yellow-500 to-orange-500",
  totalSteps: 7,
  estimatedTime: "4-8 weeks",
  recommended: false,
  tags: ["Financial Aid", "Optional"],
  steps: [
    {
      id: "scholar-research",
      title: "Research Available Scholarships",
      description: "Identify scholarships you're eligible for based on academic performance, state, and course",
      category: "Research",
      priority: "high",
      estimatedTime: "1-2 weeks",
      tips: [
        "Check your university's scholarship portal regularly",
        "Look for federal government scholarships (NBTE, PTDF, etc.)",
        "Search for state government bursaries and scholarships",
        "Consider private sector scholarships (Shell, MTN, etc.)",
        "Join scholarship alert groups on WhatsApp and Telegram"
      ],
      resources: [
        { title: "Nigeria Scholarship Portal", url: "https://www.scholars4dev.com" },
        { title: "Scholarship Region", url: "https://www.scholarshipregion.com" }
      ]
    },
    {
      id: "scholar-academic-docs",
      title: "Gather Academic Documents",
      description: "Compile all academic credentials and transcripts",
      category: "Documentation",
      priority: "high",
      estimatedTime: "1 week",
      tips: [
        "Request official transcripts from your school",
        "Get certified true copies of certificates",
        "Prepare a summary of your academic achievements",
        "Calculate your current CGPA/GPA accurately",
        "Get recommendation letters from at least 2 lecturers"
      ]
    },
    {
      id: "scholar-personal-statement",
      title: "Write Compelling Personal Statement",
      description: "Craft a strong essay explaining why you deserve the scholarship",
      category: "Application Materials",
      priority: "high",
      estimatedTime: "2-3 weeks",
      tips: [
        "Start with a powerful opening that grabs attention",
        "Explain your academic goals and career aspirations",
        "Highlight your achievements and leadership roles",
        "Demonstrate financial need (if applicable)",
        "Show how the scholarship aligns with your future plans",
        "Keep it concise: 500-1000 words typically",
        "Proofread multiple times for grammar and spelling"
      ]
    },
    {
      id: "scholar-recommendations",
      title: "Secure Strong Recommendation Letters",
      description: "Get compelling recommendations from professors, mentors, or employers",
      category: "Application Materials",
      priority: "high",
      estimatedTime: "2-3 weeks",
      tips: [
        "Ask lecturers who know you well and taught you recently",
        "Provide them with your CV and scholarship details",
        "Give them at least 2-3 weeks notice",
        "Follow up politely a week before the deadline",
        "Request letters on official letterhead",
        "Thank them after they submit"
      ]
    },
    {
      id: "scholar-financial-docs",
      title: "Prepare Financial Documentation",
      description: "Gather documents proving financial need (if required)",
      category: "Documentation",
      priority: "medium",
      estimatedTime: "1 week",
      tips: [
        "Parent/guardian income statements or tax returns",
        "Bank statements (last 6 months)",
        "Proof of other family expenses",
        "Evidence of other scholarships/financial aid received",
        "Affidavit of financial support (if applicable)"
      ]
    },
    {
      id: "scholar-extracurriculars",
      title: "Document Extracurricular Activities",
      description: "Compile evidence of leadership, community service, and achievements",
      category: "Documentation",
      priority: "medium",
      estimatedTime: "1 week",
      tips: [
        "List all clubs, societies, and organizations you belong to",
        "Document volunteer work and community service",
        "Include awards, competitions, and recognitions",
        "Get certificates for workshops and training attended",
        "Quantify your impact (e.g., 'Led team of 20 students')",
        "Prepare a portfolio for creative/technical achievements"
      ]
    },
    {
      id: "scholar-submit",
      title: "Complete and Submit Applications",
      description: "Fill out applications carefully and submit before deadlines",
      category: "Submission",
      priority: "high",
      estimatedTime: "2-4 weeks",
      deadline: "Varies by scholarship",
      tips: [
        "Read all instructions carefully before starting",
        "Create a spreadsheet tracking all deadlines",
        "Fill out applications in a Word doc first, then copy",
        "Double-check all information for accuracy",
        "Submit at least 2-3 days before the deadline",
        "Save confirmation emails and reference numbers",
        "Apply to multiple scholarships (don't put all eggs in one basket)"
      ]
    }
  ]
}

// ==========================================
// INTERNATIONAL STUDENTS CHECKLIST
// ==========================================
export const internationalChecklist: Checklist = {
  id: "international",
  name: "International Students",
  description: "Additional requirements for foreign applicants",
  icon: "🌍",
  color: "from-teal-500 to-cyan-500",
  totalSteps: 10,
  estimatedTime: "8-12 weeks",
  recommended: false,
  tags: ["International", "Visa Required"],
  steps: [
    {
      id: "intl-admission-letter",
      title: "Obtain Admission Letter",
      description: "Get your official letter of admission from a recognized Nigerian university",
      category: "Documentation",
      priority: "high",
      estimatedTime: "1-2 weeks",
      tips: [
        "Must be from NUC-accredited institution",
        "Letter should state your course of study and duration",
        "Request multiple certified copies",
        "Keep both digital and physical copies",
        "Admission letter is required for visa application"
      ]
    },
    {
      id: "intl-passport",
      title: "Valid International Passport",
      description: "Ensure your passport is valid for at least 6 months beyond intended stay",
      category: "Travel Documents",
      priority: "high",
      estimatedTime: "4-8 weeks",
      tips: [
        "Passport must have at least 2 blank pages",
        "If expired, renew immediately (can take 4-8 weeks)",
        "Make photocopies of passport bio-data page",
        "Take digital photos of all passport pages",
        "Consider getting extra passport photos (red background)"
      ]
    },
    {
      id: "intl-visa",
      title: "Apply for Nigerian Student Visa (STR)",
      description: "Obtain Study Temporary Residence (STR) visa from Nigerian Immigration",
      category: "Visa",
      priority: "high",
      estimatedTime: "4-6 weeks",
      tips: [
        "Apply at Nigerian Embassy/Consulate in your country",
        "Required documents: passport, admission letter, proof of funds",
        "Processing time: 4-6 weeks typically",
        "STR visa is usually valid for 12 months initially",
        "Must be renewed annually while studying",
        "Apply at least 8 weeks before departure"
      ],
      resources: [
        { title: "Nigeria Immigration Service", url: "https://immigration.gov.ng" },
        { title: "Visa Application Portal", url: "https://portal.immigration.gov.ng" }
      ]
    },
    {
      id: "intl-yellow-fever",
      title: "Yellow Fever Vaccination Certificate",
      description: "Get vaccinated and obtain WHO-approved yellow fever certificate",
      category: "Medical",
      priority: "high",
      estimatedTime: "2 weeks",
      tips: [
        "Mandatory for entry into Nigeria",
        "Must be done at least 10 days before travel",
        "Certificate is valid for life",
        "Keep original with passport always",
        "Available at authorized vaccination centers",
        "Cost varies by country ($50 - $150 USD typically)"
      ]
    },
    {
      id: "intl-proof-funds",
      title: "Financial Documentation",
      description: "Provide evidence of sufficient funds for tuition and living expenses",
      category: "Financial",
      priority: "high",
      estimatedTime: "2 weeks",
      tips: [
        "Bank statements (last 6 months)",
        "Sponsor's affidavit of support",
        "Scholarship award letters (if applicable)",
        "Proof of payment for first semester tuition",
        "Budget at least ₦1.5M - ₦2.5M per year for living expenses",
        "Some universities require proof of funds in escrow account"
      ]
    },
    {
      id: "intl-medical",
      title: "Medical Examinations & Health Insurance",
      description: "Complete required medical tests and obtain health insurance",
      category: "Medical",
      priority: "high",
      estimatedTime: "1-2 weeks",
      tips: [
        "HIV test (required for STR application)",
        "Tuberculosis screening may be required",
        "Hepatitis B test recommended",
        "Get comprehensive health insurance valid in Nigeria",
        "Carry prescription medications with doctor's letter",
        "Cost: $200 - $500 USD typically"
      ]
    },
    {
      id: "intl-credentials",
      title: "Educational Credential Evaluation",
      description: "Get your previous qualifications evaluated and certified",
      category: "Academic",
      priority: "medium",
      estimatedTime: "4-6 weeks",
      tips: [
        "WAEC or NECO equivalency certificate required",
        "Some universities require JAMB UTME exemption",
        "Transcripts must be notarized and translated (if not in English)",
        "Contact university's international office for specific requirements",
        "Allow 4-6 weeks for credential evaluation",
        "May need to take supplementary exams"
      ]
    },
    {
      id: "intl-accommodation",
      title: "Secure Accommodation",
      description: "Arrange housing before arrival in Nigeria",
      category: "Housing",
      priority: "medium",
      estimatedTime: "2-3 weeks",
      tips: [
        "Apply for on-campus housing early (limited spaces)",
        "Research off-campus options near university",
        "Use verified platforms like CribWise",
        "Avoid paying full rent before viewing property",
        "Budget: ₦150K - ₦500K per year depending on location",
        "Join university's international student WhatsApp groups"
      ],
      resources: [
        { title: "Find Housing", url: "/properties" }
      ]
    },
    {
      id: "intl-travel",
      title: "Book Flights & Travel Documents",
      description: "Arrange transportation and necessary travel documents",
      category: "Travel",
      priority: "medium",
      estimatedTime: "1 week",
      tips: [
        "Book flights at least 4 weeks in advance for better rates",
        "Major airports: Lagos (LOS), Abuja (ABJ), Port Harcourt (PHC)",
        "Arrive at least 2 weeks before academic session starts",
        "Pack essential documents in carry-on luggage",
        "Inform your bank about international travel",
        "Download offline maps and translation apps"
      ]
    },
    {
      id: "intl-orientation",
      title: "Attend International Student Orientation",
      description: "Participate in university orientation programs",
      category: "Campus Integration",
      priority: "low",
      estimatedTime: "1 week",
      tips: [
        "Contact international student office upon arrival",
        "Learn about local laws and cultural norms",
        "Open a Nigerian bank account (bring passport and admission letter)",
        "Get a local SIM card (MTN, Airtel, Glo)",
        "Register with your country's embassy/consulate in Nigeria",
        "Join student associations and support groups"
      ]
    }
  ]
}

// ==========================================
// ALL CHECKLISTS EXPORT
// ==========================================
export const allChecklists: Checklist[] = [
  documentChecklist,
  postJambChecklist,
  postAdmissionChecklist,
  scholarshipChecklist,
  internationalChecklist
]

// Helper function to get checklist by ID
export function getChecklistById(id: string): Checklist | undefined {
  return allChecklists.find(c => c.id === id)
}

// Helper function to get checklist steps by checklist ID
export function getChecklistSteps(id: string): ChecklistStep[] {
  const checklist = getChecklistById(id)
  return checklist ? checklist.steps : []
}