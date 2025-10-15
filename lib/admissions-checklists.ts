// lib/admissions-checklists.ts

export interface ChecklistStep {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedTime: string;
  priority: "high" | "medium" | "low";
  deadline?: string;
  resources?: Array<{ title: string; url: string }>;
  tips?: string[];
}

export interface Checklist {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  steps: ChecklistStep[];
  targetAudience: string;
}

// ==========================================
// 1. DOCUMENT PREPARATION CHECKLIST
// ==========================================
export const documentChecklist: Checklist = {
  id: "documents",
  name: "Document Preparation",
  description: "Gather all required documents before application deadlines",
  icon: "📄",
  color: "blue",
  targetAudience: "All applicants",
  steps: [
    {
      id: "doc-1",
      title: "Obtain Birth Certificate or Age Declaration",
      description: "Get certified true copy from National Population Commission or local government",
      category: "Personal Documents",
      estimatedTime: "1-3 weeks",
      priority: "high",
      tips: [
        "Start early - this can take weeks if you need to apply",
        "Get 3 certified copies (schools often need originals)",
        "Age declaration is alternative if no birth certificate available"
      ]
    },
    {
      id: "doc-2",
      title: "Collect O'Level Results (WAEC/NECO)",
      description: "Get original certificates and scratch cards for verification",
      category: "Academic Documents",
      estimatedTime: "1-2 weeks",
      priority: "high",
      tips: [
        "Keep scratch cards safe - you'll need them for verification",
        "Check that you have 5 credits including English & Math",
        "If awaiting results, plan for when they'll be ready"
      ],
      resources: [
        { title: "WAEC Result Checker", url: "https://www.waecdirect.org" },
        { title: "NECO Result Checker", url: "https://www.mynecoexams.com" }
      ]
    },
    {
      id: "doc-3",
      title: "Register for JAMB UTME",
      description: "Create profile, pay fees, and register for current year JAMB",
      category: "Entrance Exams",
      estimatedTime: "2-3 hours",
      priority: "high",
      deadline: "Check JAMB website for annual deadline",
      resources: [
        { title: "JAMB Official Portal", url: "https://www.jamb.gov.ng" }
      ]
    },
    {
      id: "doc-4",
      title: "Prepare Passport Photographs",
      description: "Get recent passport photos (usually 6-12 copies needed)",
      category: "Personal Documents",
      estimatedTime: "1 day",
      priority: "medium",
      tips: [
        "White background, formal attire",
        "No glasses or head covering (unless religious)",
        "Get extras - schools always need more than expected"
      ]
    },
    {
      id: "doc-5",
      title: "Get Local Government Identification Letter",
      description: "Obtain identification/indigene letter from local government",
      category: "Personal Documents",
      estimatedTime: "1-2 weeks",
      priority: "medium",
      tips: [
        "Required by many state universities",
        "Visit local government secretariat",
        "Bring birth certificate and parent's ID"
      ]
    },
    {
      id: "doc-6",
      title: "Prepare Guarantor Forms",
      description: "Identify and contact potential guarantors (usually 2 required)",
      category: "Supporting Documents",
      estimatedTime: "1 week",
      priority: "medium",
      tips: [
        "Guarantors should be degree holders",
        "Not related by blood",
        "Government workers or established professionals preferred"
      ]
    },
    {
      id: "doc-7",
      title: "Medical Fitness Certificate",
      description: "Get medical examination from approved hospital",
      category: "Health Documents",
      estimatedTime: "3-5 days",
      priority: "low",
      tips: [
        "Usually required after admission",
        "Check if school has specific hospital requirements",
        "Keep original and make copies"
      ]
    }
  ]
};

// ==========================================
// 2. POST-JAMB / SCREENING CHECKLIST
// ==========================================
export const postJambChecklist: Checklist = {
  id: "post-jamb",
  name: "Post-JAMB Screening",
  description: "Navigate post-UTME and screening processes for your chosen schools",
  icon: "📝",
  color: "purple",
  targetAudience: "JAMB candidates",
  steps: [
    {
      id: "pj-1",
      title: "Check Your JAMB Score",
      description: "Confirm you met the cutoff for your chosen institution",
      category: "Results",
      estimatedTime: "30 minutes",
      priority: "high",
      resources: [
        { title: "Check JAMB Results", url: "https://www.jamb.gov.ng" }
      ]
    },
    {
      id: "pj-2",
      title: "Monitor School's Post-UTME Announcements",
      description: "Check university website daily for screening updates",
      category: "Information Gathering",
      estimatedTime: "15 min/day",
      priority: "high",
      tips: [
        "Set Google alerts for '[School Name] Post-UTME'",
        "Join school-specific WhatsApp/Telegram groups",
        "Follow official school social media accounts"
      ]
    },
    {
      id: "pj-3",
      title: "Purchase Post-UTME/Screening Form",
      description: "Buy application form from school portal (usually ₦2,000-₦5,000)",
      category: "Registration",
      estimatedTime: "1-2 hours",
      priority: "high",
      tips: [
        "Use school's official website only",
        "Beware of scammers",
        "Keep payment receipt/reference number"
      ]
    },
    {
      id: "pj-4",
      title: "Print JAMB Admission Letter",
      description: "Generate and print JAMB regularization slip",
      category: "Documents",
      estimatedTime: "1 hour",
      priority: "high",
      tips: [
        "Required for most screening exercises",
        "Print multiple copies",
        "Ensure JAMB profile is complete"
      ]
    },
    {
      id: "pj-5",
      title: "Study for Screening Test",
      description: "Prepare for post-UTME exam based on your subjects",
      category: "Preparation",
      estimatedTime: "2-4 weeks",
      priority: "high",
      tips: [
        "Get past questions from school or online",
        "Focus on your JAMB subjects",
        "Some schools test current affairs"
      ],
      resources: [
        { title: "Past Questions Portal", url: "https://www.myschoolgist.com" }
      ]
    },
    {
      id: "pj-6",
      title: "Print Screening Slip",
      description: "Generate exam slip from school portal",
      category: "Documents",
      estimatedTime: "30 minutes",
      priority: "high",
      tips: [
        "Print 2-3 days before exam",
        "Confirm venue, date, and time",
        "Screenshot or save PDF as backup"
      ]
    },
    {
      id: "pj-7",
      title: "Attend Screening Exercise",
      description: "Show up early with all required documents",
      category: "Examination",
      estimatedTime: "4-6 hours",
      priority: "high",
      tips: [
        "Arrive 1 hour early",
        "Bring pen, pencil, eraser",
        "No phones allowed in most venues",
        "Dress formally"
      ]
    },
    {
      id: "pj-8",
      title: "Check Post-UTME Results",
      description: "Monitor school portal for results release",
      category: "Results",
      estimatedTime: "Ongoing",
      priority: "high",
      tips: [
        "Results can take 2-8 weeks",
        "Check portal regularly",
        "Join admission status groups"
      ]
    }
  ]
};

// ==========================================
// 3. POST-ADMISSION CHECKLIST
// ==========================================
export const postAdmissionChecklist: Checklist = {
  id: "post-admission",
  name: "Post-Admission Setup",
  description: "Complete all requirements after receiving admission",
  icon: "🎉",
  color: "green",
  targetAudience: "Newly admitted students",
  steps: [
    {
      id: "pa-1",
      title: "Accept Admission on JAMB CAPS",
      description: "Log into JAMB portal and accept your admission offer",
      category: "Registration",
      estimatedTime: "30 minutes",
      priority: "high",
      deadline: "Within 72 hours of offer",
      tips: [
        "DO NOT delay - offers can be withdrawn",
        "Print acceptance letter immediately",
        "Check for any additional JAMB requirements"
      ],
      resources: [
        { title: "JAMB CAPS Portal", url: "https://www.jamb.gov.ng/efacility" }
      ]
    },
    {
      id: "pa-2",
      title: "Pay Acceptance Fee",
      description: "Pay school acceptance fee (usually ₦10,000-₦50,000)",
      category: "Payment",
      estimatedTime: "1 hour",
      priority: "high",
      tips: [
        "Check school portal for exact amount",
        "Use official payment channels only",
        "Keep payment receipt forever"
      ]
    },
    {
      id: "pa-3",
      title: "Complete School Registration",
      description: "Fill online registration forms on school portal",
      category: "Registration",
      estimatedTime: "2-3 hours",
      priority: "high",
      tips: [
        "Have all documents scanned and ready",
        "Double-check all information before submitting",
        "Upload clear, legible document copies"
      ]
    },
    {
      id: "pa-4",
      title: "Pay School Fees",
      description: "Pay tuition and other fees before deadline",
      category: "Payment",
      estimatedTime: "1-2 hours",
      priority: "high",
      tips: [
        "Check for early payment discounts",
        "Explore scholarship opportunities",
        "Keep all payment receipts"
      ]
    },
    {
      id: "pa-5",
      title: "Get Student ID Card",
      description: "Submit photos and collect your student ID",
      category: "Documentation",
      estimatedTime: "1-2 weeks",
      priority: "medium",
      tips: [
        "Usually processed during orientation",
        "Bring extra passport photos",
        "ID needed for library, exams, hostels"
      ]
    },
    {
      id: "pa-6",
      title: "Apply for Hostel Accommodation",
      description: "Submit hostel application if staying on campus",
      category: "Accommodation",
      estimatedTime: "1-2 hours",
      priority: "medium",
      tips: [
        "Apply early - limited spaces",
        "Consider off-campus if hostel unavailable",
        "Check hostel fees and payment deadline"
      ]
    },
    {
      id: "pa-7",
      title: "Register for Courses",
      description: "Select and register for first semester courses",
      category: "Academic",
      estimatedTime: "2-3 hours",
      priority: "high",
      tips: [
        "Consult academic advisor",
        "Don't overload - start with recommended units",
        "Print course registration form"
      ]
    },
    {
      id: "pa-8",
      title: "Attend Matriculation Ceremony",
      description: "Participate in official matriculation/orientation",
      category: "Events",
      estimatedTime: "Full day",
      priority: "medium",
      tips: [
        "Dress formally (usually all white)",
        "Bring parents if allowed",
        "Take lots of photos - it's a milestone!"
      ]
    },
    {
      id: "pa-9",
      title: "Set Up School Email & Portal Access",
      description: "Activate student email and familiarize with school systems",
      category: "Technology",
      estimatedTime: "1 hour",
      priority: "medium",
      tips: [
        "Check email regularly for updates",
        "Save portal login details securely",
        "Join departmental groups"
      ]
    }
  ]
};

// ==========================================
// 4. SCHOLARSHIP APPLICATION CHECKLIST
// ==========================================
export const scholarshipChecklist: Checklist = {
  id: "scholarship",
  name: "Scholarship Applications",
  description: "Apply for financial aid and scholarship opportunities",
  icon: "💰",
  color: "yellow",
  targetAudience: "Students seeking financial aid",
  steps: [
    {
      id: "sch-1",
      title: "Research Available Scholarships",
      description: "Find scholarships you're eligible for",
      category: "Research",
      estimatedTime: "3-5 hours",
      priority: "high",
      tips: [
        "Check school-specific scholarships first",
        "Look for state government schemes",
        "Research private organization awards"
      ],
      resources: [
        { title: "Nigerian Scholarships", url: "https://www.scholars4dev.com" }
      ]
    },
    {
      id: "sch-2",
      title: "Prepare Academic Transcripts",
      description: "Request official transcripts from previous schools",
      category: "Documents",
      estimatedTime: "1-2 weeks",
      priority: "high",
      tips: [
        "Many scholarships require verified transcripts",
        "Get multiple certified copies",
        "Keep digital scans for online applications"
      ]
    },
    {
      id: "sch-3",
      title: "Write Personal Statement/Essay",
      description: "Craft compelling scholarship essay about your goals",
      category: "Writing",
      estimatedTime: "5-10 hours",
      priority: "high",
      tips: [
        "Tell your unique story",
        "Focus on achievements and aspirations",
        "Have someone proofread",
        "Tailor each essay to specific scholarship"
      ]
    },
    {
      id: "sch-4",
      title: "Request Recommendation Letters",
      description: "Ask teachers/mentors for recommendation letters",
      category: "Documents",
      estimatedTime: "2-3 weeks",
      priority: "high",
      tips: [
        "Ask at least 1 month before deadline",
        "Choose recommenders who know you well",
        "Provide them with your achievements list",
        "Follow up politely"
      ]
    },
    {
      id: "sch-5",
      title: "Complete Application Forms",
      description: "Fill out all required scholarship application forms",
      category: "Application",
      estimatedTime: "2-4 hours per scholarship",
      priority: "high",
      tips: [
        "Read instructions carefully",
        "Save drafts frequently",
        "Double-check all information",
        "Submit before deadline"
      ]
    },
    {
      id: "sch-6",
      title: "Prepare for Scholarship Interviews",
      description: "Practice interview questions if shortlisted",
      category: "Preparation",
      estimatedTime: "1 week",
      priority: "medium",
      tips: [
        "Research common scholarship questions",
        "Practice with friend or mentor",
        "Dress professionally",
        "Be authentic and confident"
      ]
    },
    {
      id: "sch-7",
      title: "Follow Up on Applications",
      description: "Track application status and respond to queries",
      category: "Follow-up",
      estimatedTime: "Ongoing",
      priority: "medium",
      tips: [
        "Keep spreadsheet of applications",
        "Note deadlines and contact info",
        "Check email regularly",
        "Thank selection committees"
      ]
    }
  ]
};

// ==========================================
// 5. INTERNATIONAL STUDENT CHECKLIST
// ==========================================
export const internationalChecklist: Checklist = {
  id: "international",
  name: "International Students",
  description: "Additional requirements for foreign applicants",
  icon: "🌍",
  color: "teal",
  targetAudience: "International applicants",
  steps: [
    {
      id: "int-1",
      title: "Verify International Student Eligibility",
      description: "Confirm school accepts international students in your programme",
      category: "Research",
      estimatedTime: "1-2 hours",
      priority: "high",
      tips: [
        "Not all programmes accept international students",
        "Check quota requirements",
        "Email admissions office to confirm"
      ]
    },
    {
      id: "int-2",
      title: "Get Document Evaluation",
      description: "Have foreign credentials evaluated and certified",
      category: "Documents",
      estimatedTime: "4-8 weeks",
      priority: "high",
      tips: [
        "Use recognized evaluation services",
        "May need to translate documents",
        "Keep originals, submit copies"
      ]
    },
    {
      id: "int-3",
      title: "Obtain Student Visa",
      description: "Apply for Nigerian student visa at embassy",
      category: "Immigration",
      estimatedTime: "6-12 weeks",
      priority: "high",
      tips: [
        "Start visa process after admission",
        "Gather: admission letter, passport, photos, fees",
        "Book embassy appointment early"
      ]
    },
    {
      id: "int-4",
      title: "Arrange International Payment",
      description: "Set up method to pay fees from abroad",
      category: "Financial",
      estimatedTime: "1 week",
      priority: "high",
      tips: [
        "Check if school accepts international wire transfer",
        "Consider currency exchange rates",
        "Factor in transfer fees"
      ]
    },
    {
      id: "int-5",
      title: "Secure Accommodation",
      description: "Arrange housing before arrival",
      category: "Accommodation",
      estimatedTime: "2-4 weeks",
      priority: "high",
      tips: [
        "Contact school housing office",
        "Join international student groups",
        "Consider proximity to campus"
      ]
    },
    {
      id: "int-6",
      title: "Get Health Insurance",
      description: "Obtain required health insurance coverage",
      category: "Health",
      estimatedTime: "1 week",
      priority: "medium",
      tips: [
        "Check if school offers insurance",
        "Verify coverage in Nigeria",
        "Keep insurance documents accessible"
      ]
    },
    {
      id: "int-7",
      title: "Book Flight & Arrange Pickup",
      description: "Schedule arrival and airport pickup",
      category: "Travel",
      estimatedTime: "1-2 weeks",
      priority: "medium",
      tips: [
        "Arrive 1-2 weeks before orientation",
        "Coordinate with school or student groups",
        "Have emergency contacts saved"
      ]
    }
  ]
};

// ==========================================
// EXPORT ALL CHECKLISTS
// ==========================================
export const allChecklists: Checklist[] = [
  documentChecklist,
  postJambChecklist,
  postAdmissionChecklist,
  scholarshipChecklist,
  internationalChecklist
];

export function getChecklistById(id: string): Checklist | undefined {
  return allChecklists.find(c => c.id === id);
}

export function getChecklistsByAudience(audience: string): Checklist[] {
  return allChecklists.filter(c => 
    c.targetAudience.toLowerCase().includes(audience.toLowerCase())
  );
}