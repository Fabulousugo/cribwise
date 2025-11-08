export type Guide = {
  slug: string;
  title: string;
  summary?: string;
  tags?: string[];
  body: string; // can be plain text/HTML/MD for now; MDX later
  readTime?: string;
  difficulty?: string;
  lastUpdated?: string;
};

// ---------------- MOCK DATA (replace later) ----------------
const GUIDES: Guide[] = [
  // Guide 1: Admissions Basics (Your existing comprehensive guide - keeping it!)
  {
    slug: "admissions-basics-nigeria",
    title: "Nigerian University Admissions: Complete Guide",
    summary: "Everything you need to know about getting admitted to a Nigerian university - JAMB UTME, Post-UTME, requirements, costs, and timelines.",
    tags: ["JAMB", "UTME", "Post-UTME", "Admissions", "Requirements", "Universities"],
    readTime: "45 min read",
    difficulty: "Comprehensive",
    lastUpdated: "January 2025",
    body: `
# Nigerian University Admissions: Complete Guide

## Quick Overview

Nigeria has over **170 universities** offering diverse programs. Understanding the admission process is crucial for success. This comprehensive guide covers everything from JAMB registration to accepting your admission offer.

---

## 1. Types of Universities in Nigeria

### Federal Universities (43+)
**Examples:** University of Lagos (UNILAG), University of Ibadan (UI), Ahmadu Bello University (ABU), University of Nigeria Nsukka (UNN)

**Characteristics:**
- Lowest tuition fees (₦30,000 - ₦80,000/year)
- Most competitive admission
- Federal government funded
- Better reputation generally

### State Universities (50+)
**Examples:** Lagos State University (LASU), Ekiti State University (EKSU), Delta State University (DELSU), Rivers State University (RSU)

**Characteristics:**
- Moderate tuition fees (₦50,000 - ₦200,000/year)
- State residents may get priority admission
- State government funded
- Growing in quality

### Private Universities (79+)
**Examples:** Covenant University, Babcock University, American University of Nigeria, Pan-Atlantic University

**Characteristics:**
- Highest tuition fees (₦500,000 - ₦3,000,000/year)
- Less competitive admission
- Better facilities often
- Smaller class sizes

---

## 2. Basic Admission Requirements

To gain admission to a Nigerian university, you **MUST** meet these requirements:

### O'Level Results (WAEC/NECO)
- Minimum of **5 credits** including English Language and Mathematics
- Maximum of **2 sittings** accepted
- Must include relevant subjects for your course

### JAMB UTME Score
- Minimum score: **180** for most universities
- Competitive courses (Medicine, Law, Engineering): **200+**
- Catchment areas and educationally disadvantaged states: Lower cut-offs
- Private universities: May accept 120-160

### Age Requirement
- Must be **at least 16 years old** by October 31st of admission year

### Subject Combination
- Must take the **correct JAMB subjects** for your chosen course
- Example: Medicine requires Biology, Chemistry, Physics
- Example: Law requires English, Government/History, CRS/IRS, Literature

---

## 3. JAMB UTME Registration & Examination Process

### Step 1: Create JAMB Profile
- Visit **jamb.gov.ng**
- Create profile using your email and phone number
- Time: 10-15 minutes
- Cost: Free

### Step 2: Purchase JAMB e-PIN
- Buy UTME registration e-PIN from accredited banks or online
- Time: 1 day
- Cost: **₦5,500** (2024/2025)

### Step 3: Complete Registration
- Fill registration form with accurate information
- Choose your **first choice institution** and course
- Select 3 other courses (2nd, 3rd, 4th choice)
- Select exam center and preferred exam date
- Time: 30-45 minutes

### Step 4: Biometric Capture
- Visit an accredited CBT center
- Capture fingerprints and photograph
- Print registration slip
- Time: 1-2 hours

### Step 5: Take UTME Exam
- Computer-based test (CBT)
- **4 subjects**, 45 minutes each
- **180 questions total** (45 per subject)
- Use of English is compulsory for all candidates
- Time: 3 hours total

### Step 6: Check Results
- Results released 2-3 weeks after exam
- Check on JAMB portal using registration number
- Print result slip immediately
- Cost: Free

**Important JAMB Resources:**
- Official Website: https://www.jamb.gov.ng
- JAMB CAPS: https://www.jamb.gov.ng/efacility
- Result Checker: Available on JAMB portal

---

## 4. Post-UTME Screening Process

### What is Post-UTME?
Post-UTME (Post-JAMB) is an additional screening exercise conducted by individual universities to further assess candidates who chose them as first choice.

### When Does It Happen?
- Usually 2-3 months after JAMB UTME
- Between June and September typically

### Cost
- Registration fee: **₦2,000 - ₦3,000**

### Format
**Computer-Based Test (CBT):** Most common. Multiple-choice questions on your JAMB subjects.

**Document Screening:** Some universities only verify your credentials without a written test.

**Oral Interview:** Rare, but some institutions conduct interviews.

### Registration Process
1. Check your chosen university's website for announcement
2. Register on the university's portal
3. Pay screening fee online
4. Print acknowledgment slip
5. Upload required documents (O'Level, JAMB result, passport photos)

### Preparation Tips
✓ Register immediately when portal opens (spaces are limited)
✓ Download and study past questions from the university
✓ Revise your JAMB subjects thoroughly
✓ Arrive at venue at least 1 hour early
✓ Bring all required documents (JAMB slip, O'Level results, passport photos)
✓ Dress formally

---

## 5. Direct Entry Admission

### What is Direct Entry?
An alternative admission route for candidates with higher qualifications (A-Level, ND, NCE, etc.) to enter **200-level** or above, bypassing JAMB UTME.

### Who Qualifies?
✓ **A-Level/IJMB** certificate holders (2 principal passes)
✓ **National Diploma (ND)** graduates with lower credit or above
✓ **NCE** (Nigeria Certificate in Education) holders
✓ **HND** holders (for related degree programs)
✓ **Bachelor's degree** holders seeking another degree

### Application Process
1. Create JAMB Direct Entry profile
2. Purchase DE e-PIN (₦4,500)
3. Generate JAMB DE recommendation letter
4. Apply directly to university
5. Attend DE screening if required

### Advantages
- Start from 200-level (skips one year)
- Less competitive than UTME
- No need to write JAMB UTME
- Better for mature students

---

## 6. Admission Timeline & Important Dates

### 2024/2025 Academic Session Calendar

**January - February**
- JAMB UTME Registration opens

**April - May**
- JAMB UTME Examination period

**May - June**
- JAMB results released
- Change of course/institution window

**June - September**
- Post-UTME registration opens (varies by school)
- Post-UTME screening exercises

**August - October**
- First batch admission lists released
- Merit lists published on JAMB CAPS

**Within 72 Hours of Admission**
- ⚠️ **CRITICAL:** Accept admission on JAMB CAPS
- Failure to accept within 72 hours = Lost admission

**September - November**
- Academic sessions begin (varies by university)
- Payment of acceptance fees
- Physical screening and document verification

---

## 7. Cost of University Education

### Federal Universities
**Tuition:** ₦30,000 - ₦80,000 per year  
**Hostel:** ₦15,000 - ₦30,000 per year  
**Total Annual Cost:** ₦100,000 - ₦200,000

*Note: Some courses like Medicine cost more*

### State Universities
**Tuition:** ₦50,000 - ₦200,000 per year  
**Hostel:** ₦20,000 - ₦50,000 per year  
**Total Annual Cost:** ₦150,000 - ₦400,000

*Varies by state*

### Private Universities
**Tuition:** ₦500,000 - ₦3,000,000 per year  
**Hostel:** ₦200,000 - ₦500,000 per year  
**Total Annual Cost:** ₦1,000,000 - ₦5,000,000

*Most expensive but better facilities*

### Additional Costs

**One-Time Costs:**
- Acceptance fee: ₦10,000 - ₦50,000
- Departmental fees: ₦10,000 - ₦30,000
- Faculty fees: ₦5,000 - ₦15,000
- Student ID card: ₦2,000 - ₦5,000
- Medical screening: ₦5,000 - ₦10,000

**Recurring Costs Per Year:**
- Books and materials: ₦50,000 - ₦150,000
- Feeding: ₦200,000 - ₦500,000
- Transportation: ₦50,000 - ₦150,000
- Internet/data: ₦20,000 - ₦50,000
- Personal expenses: ₦100,000 - ₦300,000

---

## 8. Understanding Cut-Off Marks

### JAMB General Cut-Off
The minimum score JAMB recommends for universities:
- **Universities:** 140
- **Polytechnics:** 100
- **Colleges of Education:** 100

**Note:** This is NOT what you need for admission. Each institution sets higher cut-offs.

### Institutional Cut-Off
Each university sets its own minimum JAMB score:
- **Top federal universities:** 200-220
- **State universities:** 180-200
- **Private universities:** 120-180

### Departmental/Faculty Cut-Off
Individual courses have specific requirements:

**Very Competitive (250-280+):**
- Medicine and Surgery
- Dentistry
- Pharmacy
- Law

**Competitive (220-250):**
- Engineering courses
- Computer Science
- Architecture
- Mass Communication

**Moderate (200-220):**
- Sciences (Biology, Chemistry, Physics)
- Social Sciences (Economics, Sociology)
- Management Sciences

**Less Competitive (180-200):**
- Arts courses
- Education courses
- Some humanities

### Catchment Areas
States where the university is located get lower cut-offs (usually 5-10 points below merit)

### ELDS (Educationally Less Developed States)
Special consideration states get even lower cut-offs (10-15 points below merit)

---

## 9. JAMB CAPS (Central Admissions Processing System)

### What is CAPS?
The online platform where ALL admissions must be accepted. No matter where you see your name, you MUST accept on CAPS.

### How to Access CAPS
1. Visit jamb.gov.ng/efacility
2. Log in with your JAMB email/phone and password
3. Check "Admissions Status"

### Important CAPS Rules

**72-Hour Rule:**
- You have only 72 hours to accept admission
- Late acceptance = Lost admission
- No exceptions!

**One Admission Per Year:**
- You can only accept one admission
- Accepting cancels all other offers

**Mandatory Acceptance:**
- Even if school admits you, you must accept on CAPS
- No CAPS acceptance = No admission officially

### CAPS Status Types

**Recommended:**
- University has offered you admission
- Check CAPS and accept within 72 hours

**Not Recommended:**
- No admission offer yet
- Keep checking regularly

**Admission in Progress:**
- University is processing your admission
- Wait for status to change

---

## 10. What to Do After Admission

### Step 1: Accept on JAMB CAPS
1. Log into JAMB CAPS
2. Click "Accept Admission"
3. Print acceptance letter
4. **Do this within 72 hours!**

### Step 2: Pay Acceptance Fee
- Amount: ₦10,000 - ₦50,000
- Payment is online via university portal
- Usually via Remita or direct bank deposit
- Deadline: Usually 2-4 weeks after acceptance

### Step 3: Physical Screening
Visit the university for document verification:
- Bring all original documents
- Fill screening forms
- Medical examination
- Time: 1-2 days

### Step 4: Course Registration
- Register your courses online
- Print course registration form
- Get departmental approval
- Must be done before lectures start

### Step 5: Pay School Fees
- Check fee schedule on portal
- Pay online or at designated banks
- Keep receipt safe
- Deadline: Before lectures begin

---

## 11. Required Documents Checklist

### For JAMB Registration
✓ Birth certificate or age declaration  
✓ Valid email address  
✓ Active phone number  
✓ Recent passport photographs  
✓ O'Level results (WAEC/NECO)

### For Post-UTME
✓ JAMB result slip  
✓ O'Level certificates/statements  
✓ Birth certificate/age declaration  
✓ Local Government Identification Letter  
✓ Passport photographs (white background)  
✓ Post-UTME registration slip

### For Admission Acceptance
✓ JAMB admission letter (from CAPS)  
✓ Original O'Level certificates  
✓ JAMB UTME result  
✓ Post-UTME result  
✓ Birth certificate (original)  
✓ State of origin certificate  
✓ Medical fitness certificate  
✓ Passport photographs (12+ copies)  
✓ Photocopies of parents' ID cards

---

## 12. Common Mistakes to Avoid

### During JAMB Registration
❌ Wrong date of birth (must match all documents)  
❌ Wrong subject combination  
❌ Choosing wrong institution/course  
❌ Not completing biometric capture  
❌ Missing registration deadline

### During JAMB Exam
❌ Arriving late to exam center  
❌ Not bringing registration slip  
❌ Bringing prohibited items (phones, calculators)  
❌ Attempting malpractice  
❌ Not managing time properly

### Post-UTME Phase
❌ Missing registration deadline  
❌ Not studying past questions  
❌ Arriving late to screening  
❌ Incomplete documents  
❌ Wrong screening center

### Admission Phase
❌ Not accepting admission on JAMB CAPS  
❌ Missing acceptance fee payment deadline  
❌ Not completing physical screening  
❌ Late course registration  
❌ Ignoring important notices

---

## 13. Tips for Success

### Before JAMB
✓ Start preparing early (6-12 months before)  
✓ Use JAMB past questions and syllabus  
✓ Get your O'Level results sorted  
✓ Choose courses wisely based on your O'Level subjects  
✓ Research universities and their requirements

### During JAMB Preparation
✓ Join study groups  
✓ Practice with JAMB CBT apps  
✓ Master Use of English  
✓ Focus on your weakest subjects  
✓ Take timed practice tests

### During Application
✓ Apply early for everything  
✓ Keep all receipts and confirmation emails  
✓ Set reminders for deadlines  
✓ Check your email and phone regularly  
✓ Follow university social media for updates

### After Admission
✓ Accept on JAMB CAPS immediately  
✓ Pay acceptance fee before deadline  
✓ Complete physical screening early  
✓ Register courses on time  
✓ Join student WhatsApp groups for information

---

## 14. Where to Get Help

### Official Resources
- **JAMB Official Website:** https://www.jamb.gov.ng
- **JAMB CAPS:** https://www.jamb.gov.ng/efacility
- **JAMB Contact Center:** 07080625577, 08178145145

### University Resources
- University admission portal
- University social media pages
- University helplines (check website)
- Student affairs office

### CribWise Resources
- Interactive admission checklists
- Deadline tracking
- Document preparation guides
- Housing search after admission

---

## 15. Frequently Asked Questions

**Q: Can I change my course after admission?**  
A: Very difficult. Most universities don't allow it. Better to choose correctly from the start.

**Q: How many universities can I apply to?**  
A: Only 4 via JAMB (1st, 2nd, 3rd, 4th choice). You can also apply directly to some universities.

**Q: What if I don't meet the cut-off mark?**  
A: Consider: (1) Private universities with lower cut-offs, (2) Rewriting JAMB next year, (3) Direct Entry route with A-Level/IJMB

**Q: Can I transfer to another university?**  
A: Yes, but usually after completing 100-level. Requirements vary by university.

**Q: Do I need JAMB for private universities?**  
A: Most require it, but some accept you with just O'Level results. Check specific university policy.

**Q: How do I check if a university is accredited?**  
A: Visit NUC website (nuc.edu.ng) for list of accredited universities and programs.

**Q: What's the difference between merit, catchment, and ELDS?**  
A: 
- **Merit:** Highest scores get admission
- **Catchment:** States near the university get priority
- **ELDS:** Educationally Less Developed States get special consideration

---

## Next Steps

Ready to start your admission journey? Here's what to do:

1. **Start Early** - Don't wait until the last minute
2. **Use Our Checklists** - Track every step from JAMB to admission
3. **Stay Organized** - Keep all documents and receipts safe
4. **Set Reminders** - Never miss a deadline
5. **Join Communities** - Connect with other students for support

### Use CribWise Tools
- ✓ **Interactive Checklists:** Track your progress step-by-step
- ✓ **Deadline Reminders:** Get notified before important dates
- ✓ **Document Manager:** Organize all your certificates
- ✓ **Housing Search:** Find accommodation after admission

---

**Last Updated:** January 2025  
**Note:** Information is subject to change by JAMB and individual universities. Always verify on official websites.

---

*Need help? Contact our student support team or join our community for guidance from current students.*
`,
  },

  // Guide 2: Track Deadlines (ENHANCED VERSION)
  {
    slug: "how-to-track-deadlines",
    title: "How to Track Admissions Deadlines",
    summary: "Never miss a window: portals to check, timelines, and reminder setup with proven strategies from successful students.",
    tags: ["Deadlines", "Portals", "Reminders", "Organization", "Calendar"],
    readTime: "12 min read",
    difficulty: "Beginner",
    lastUpdated: "January 2025",
    body: `
# How to Track Admissions Deadlines

Missing a deadline can cost you an entire year. Here's how to stay on top of every important date in your admission journey.

## Why Deadline Tracking Matters

In Nigerian university admissions, timing is everything:

- ⏰ JAMB registration closes after a few weeks
- ⏰ Post-UTME spots fill within days
- ⏰ JAMB CAPS acceptance expires in 72 hours
- ⏰ Physical clearance has strict windows

**One missed deadline = One year delay**

---

## The Master Timeline

### January - March: Preparation Phase

**JAMB Registration (Usually Late January - March)**
- Portal opens: Monitor jamb.gov.ng
- Early vs. Late: Register in first 2 weeks if possible
- Deadline: Usually mid-March

**Key Dates to Watch:**
- [ ] JAMB profile creation opens
- [ ] E-PIN sales begin
- [ ] CBT center registration deadline
- [ ] Mock UTME date (optional practice exam)
- [ ] Final registration deadline

### April - May: Examination Period

**UTME Exams**
- Exam window: Usually throughout April
- Your specific date: Check JAMB notification
- Result release: 2-3 weeks after your exam

**Key Dates:**
- [ ] Your UTME exam date and time
- [ ] Result release date
- [ ] Result re-checking deadline (if needed)

### May - August: Post-UTME Season

**University Screening**
- Announcements: May/June
- Registration: Usually 2-3 week window
- Exam dates: June/July/August
- Results: 2-4 weeks after exam

**For Each University You Applied To:**
- [ ] Post-UTME announcement date
- [ ] Registration opening date
- [ ] Registration deadline
- [ ] Exam date and venue
- [ ] Result release date

### August - December: Admission Period

**Merit Lists and Acceptance**
- First list: Usually August/September
- Subsequent lists: Every few weeks
- JAMB CAPS: Check daily during this period
- Acceptance: 72 hours from offer

**Critical Deadlines:**
- [ ] First merit list release date
- [ ] JAMB CAPS acceptance deadline (72 hours)
- [ ] Physical clearance start date
- [ ] Physical clearance deadline
- [ ] Acceptance fee payment deadline
- [ ] School fees payment deadline

---

## Essential Portals to Monitor

### 1. JAMB Portal (jamb.gov.ng)

**Check Daily For:**
- Registration updates
- Exam schedules
- Result releases
- CAPS admission status

**Bookmark These Pages:**
- Main: jamb.gov.ng
- E-Facility: jamb.gov.ng/efacility
- News: jamb.gov.ng/news

### 2. University Websites

**For Each School:**
- Homepage (announcements)
- Admissions section
- News/Updates
- Post-UTME portal
- Student portal

**Check Frequency:**
- Daily during Post-UTME season
- Daily during admission period
- Weekly otherwise

### 3. University Social Media

**Follow Official Accounts:**
- Twitter/X: @UniName_Official
- Facebook: University Official Page
- Instagram: @uninameofficial

**Why Social Media Matters:**
- Faster updates than websites
- Real-time announcements
- Direct communication

---

## Creating Your Tracking System

### Method 1: Spreadsheet Tracker

Create a simple Excel/Google Sheets:

| University | Action | Deadline | Status | Links |
|------------|--------|----------|--------|-------|
| UI | Post-UTME Reg | July 15 | Pending | [Link] |
| UNILAG | Exam | July 28 | Done ✓ | [Link] |
| OAU | Merit List | Aug 10 | Waiting | [Link] |

### Method 2: Calendar Reminders

**Google Calendar Setup:**
1. Create "University Admissions" calendar
2. Add all known deadlines
3. Set multiple reminders:
   - 1 week before
   - 3 days before
   - 1 day before
   - 2 hours before

**Color Code:**
- 🔴 Critical (JAMB, CAPS acceptance)
- 🟡 Important (Post-UTME registration)
- 🟢 Nice to check (Merit list releases)

### Method 3: WhatsApp/Telegram Groups

**Join University-Specific Groups:**
- Search: "[University Name] 2025 Admission"
- Alumni groups share updates quickly
- Fellow applicants alert each other

---

## Weekly Checking Routine

### Monday Morning (30 Minutes)
1. JAMB portal - any updates?
2. All university websites
3. Email inbox
4. WhatsApp groups

### Wednesday Evening (20 Minutes)
1. JAMB CAPS - admission status
2. University social media
3. Reply to pending tasks

### Friday Afternoon (40 Minutes)
1. Deep dive: All portals
2. Update tracking spreadsheet
3. Set next week's reminders

### During Critical Periods (Daily)
- Week before UTME
- Post-UTME registration windows
- Admission list release periods
- JAMB CAPS acceptance windows

---

## Deadline Emergency Plan

### If You Miss a Deadline

**Post-UTME Deadline:**
1. Call university admissions immediately
2. Send email explaining situation
3. Visit in person if possible
4. May not be possible to extend

**JAMB CAPS Acceptance Expired:**
- Contact JAMB immediately
- Request extension (rarely granted)
- May need to reapply next year

**Prevention is Better:**
- ✅ Submit 2-3 days BEFORE deadline
- ✅ Don't wait for "deadline day"
- ✅ Technical issues happen

---

## Tools & Resources

### Free Tracking Tools

**Google Keep**
- Quick notes and checklists
- Syncs across devices

**CribWise Checklist** (This Platform!)
- Pre-built admission checklists
- Automatic deadline tracking
- Progress monitoring

---

## Pro Tips from Admitted Students

> "I set 5 alarms for my JAMB CAPS acceptance deadline. Annoying? Yes. But I didn't miss it!" - Chioma, UNILAG 2024

> "My friend and I checked for each other. If one missed something, the other alerted them." - Tunde, UI 2024

> "I put a printed calendar on my wall. Seeing it daily kept me accountable." - Fatima, UNIBEN 2024

---

## Deadline Checklist

### Before JAMB:
- [ ] Mark JAMB registration period
- [ ] Set 3 reminders for deadline
- [ ] Follow JAMB social media
- [ ] Join admission WhatsApp groups

### During UTME Period:
- [ ] Add exam date with reminder
- [ ] Set result checking reminder
- [ ] Note result re-checking deadline

### Post-UTME Phase:
- [ ] Create tracking sheet
- [ ] Set daily reminders for registration
- [ ] Add each exam date
- [ ] Follow all universities online

### Admission Period:
- [ ] Check JAMB CAPS twice daily
- [ ] Set 72-hour countdown when offer arrives
- [ ] Add physical clearance dates
- [ ] Track all payment deadlines

---

## Next Steps

1. [Use Our Checklists](/admissions/checklist) - Automated tracking
2. [Prepare Your Documents](/admissions/guides/prepare-documents) - Get ready early
3. [Admissions Basics](/admissions/guides/admissions-basics-nigeria) - Full process guide

**Remember:** Start tracking NOW, not when deadlines approach!

---

*Last updated: January 2025*
`,
  },

  // Guide 3: Prepare Documents (ENHANCED VERSION)
  {
    slug: "prepare-documents",
    title: "Documents You Need for Applications",
    summary: "Complete document checklist with where to get each one, processing times, costs, and organization tips.",
    tags: ["Documents", "Checklist", "Requirements", "Organization"],
    readTime: "18 min read",
    difficulty: "Intermediate",
    lastUpdated: "January 2025",
    body: `
# Documents You Need for Applications

Getting your documents ready early is crucial. Here's everything you'll need, where to get it, and how long each takes.

## Why Document Preparation Matters

Most admission processes fail because of **missing or incorrect documents**, not low scores.

**Common Problems:**
- ❌ Lost O'Level certificates
- ❌ Expired medical certificates
- ❌ Wrong passport photo specs
- ❌ Incomplete JAMB documents

**Solution:** Get everything 4-6 weeks before you need it.

---

## Essential Documents Checklist

### ✅ Primary Documents (Must-Have)

1. **Original Birth Certificate**
2. **Local Government ID Letter**
3. **JAMB UTME Result Slip**
4. **O'Level Results (WAEC/NECO)**
5. **Passport Photographs**
6. **Medical Fitness Certificate**

### ✅ Supporting Documents

7. **State of Origin Certificate**
8. **Parent/Guardian ID Cards**
9. **Proof of Address**
10. **JAMB Admission Letter** (after acceptance)

---

## Document-by-Document Guide

### 1. Birth Certificate

**What It Is:**
Official proof of birth from National Population Commission (NPC)

**Where to Get:**
- **If you have it:** Get 3 certified photocopies
- **If lost:** Apply at nearest NPC office in your LGA

**Cost:** ₦500 - ₦2,000

**Processing Time:**
- Photocopies: Same day
- New certificate: 4-8 weeks

**Tips:**
- ✅ Start EARLY if you need replacement
- ✅ Laminate the original
- ✅ Store digital backup in cloud

---

### 2. Local Government ID Letter

**What It Is:**
Letter from your LGA confirming you're an indigene

**Where to Get:**
Your Local Government Area Secretariat

**Requirements:**
- Birth certificate
- Valid ID card
- Passport photos (2 copies)
- Parents' IDs
- Fee: ₦500 - ₦2,000

**Processing Time:** 1-3 days

**Tips:**
- ✅ Go early morning (7-8 AM)
- ✅ Bring photocopies
- ✅ Have cash ready

---

### 3. JAMB UTME Result Slip

**Where to Get:**
JAMB e-Facility: jamb.gov.ng/efacility

**How to Print:**
1. Go to jamb.gov.ng/efacility
2. Click "Check 2024 UTME Result"
3. Enter email/phone and password
4. Print at least 3 copies

**Cost:** ₦50 per copy at cyber cafe

**Processing Time:** Instant

**Tips:**
- ✅ Print in color
- ✅ Keep PDF backup
- ✅ Never share login details

---

### 4. O'Level Results (WAEC/NECO)

**What You Need:**
- Original certificate
- Statement of results
- Scratch card

**For WAEC:**
- Order at waecdirect.org
- Cost: ₦3,500 - ₦5,000
- Delivery: 2-3 weeks

**For NECO:**
- Visit mynecoexams.com
- Cost: Similar to WAEC
- Delivery: 2-3 weeks

**Tips:**
- ✅ Verify results on JAMB portal
- ✅ Keep in waterproof folder
- ✅ Get duplicate from school if lost

---

### 5. Passport Photographs

**Specifications:**
- Background: White or Red
- Size: 35mm x 45mm
- Quantity: At least 12 copies
- Dress: Formal attire
- Expression: Neutral

**Where to Get:**
Professional photo studio

**Cost:** ₦500 - ₦2,000 for 12 copies

**Processing Time:** Same day

**Tips:**
- ✅ Professional studio only
- ✅ Get 8 white + 4 red backgrounds
- ✅ Wear formal shirt/blouse
- ✅ Store negatives

---

### 6. Medical Fitness Certificate

**What It Is:**
Health clearance from registered doctor

**Where to Get:**
- Government hospitals
- Teaching hospitals
- Registered private hospitals

**Tests Required:**
- Physical examination
- Blood test
- Urinalysis
- HIV test (sometimes)
- Hepatitis B (recommended)

**Cost:** ₦3,000 - ₦10,000

**Processing Time:** 1-2 days

**Validity:** 6 months

**Tips:**
- ✅ Go to recognized hospital
- ✅ Fast 8 hours before blood test
- ✅ Get 2 copies
- ✅ Don't do >3 months before clearance

---

## Document Organization

### Physical Organization

**Supplies Needed:**
- Clear folder/binder
- Document sleeves
- Envelope for photos
- Bag for originals

**Organize Like This:**
1. **Section 1:** Originals
2. **Section 2:** JAMB documents
3. **Section 3:** Medical certificates
4. **Section 4:** Photocopies
5. **Section 5:** Passport photos
6. **Section 6:** Receipts

### Digital Backup

**Scan Everything:**
1. Use scanner app (Adobe Scan, CamScanner)
2. Save as PDFs
3. Name clearly
4. Upload to Google Drive
5. Share access with parent

**Folder Structure:**
\`\`\`
University Admission 2025/
  Personal Documents/
  Academic/
  Medical/
  Photos/
\`\`\`

---

## Document Submission Tips

### Before Submission:

**Check:**
- [ ] All documents legible
- [ ] Names match across documents
- [ ] Dates correct
- [ ] Photocopies clear
- [ ] Signatures visible
- [ ] Have extra copies

### During Submission:

**Do:**
- ✅ Submit photocopies, keep originals
- ✅ Organize in order requested
- ✅ Use paper clips, not staples
- ✅ Arrive early
- ✅ Get receipt

**Don't:**
- ❌ Submit originals (unless required)
- ❌ Fold documents
- ❌ Use damaged copies

---

## Special Circumstances

### If Your Name is Different

**Solution:**
1. Get affidavit from court
2. Swear oath explaining difference
3. Publish in newspaper (some cases)
4. Get change of name certificate

**Cost:** ₦5,000 - ₦15,000
**Time:** 1-2 weeks

### If You Lost Important Documents

**Priority Actions:**
1. Report to police
2. Apply for replacement immediately
3. Get affidavit of loss
4. Contact issuing body
5. Publish in newspaper

**Replacement Timeline:**
- Birth certificate: 4-8 weeks
- O'Level: 3-6 months
- LGA letter: 1-3 days

---

## Cost Summary

| Document | Cost Range |
|----------|-----------|
| Birth Certificate (copy) | ₦500 - ₦2,000 |
| Birth Certificate (new) | ₦5,000 - ₦15,000 |
| LGA ID Letter | ₦500 - ₦2,000 |
| WAEC Statement | ₦3,500 - ₦5,000 |
| Passport Photos | ₦500 - ₦2,000 |
| Medical Certificate | ₦3,000 - ₦10,000 |
| Photocopies | ₦500 - ₦1,000 |
| **Total Estimate** | **₦15,000 - ₦50,000** |

Start saving early!

---

## Timeline for Gathering

### 6-8 Weeks Before:
- Order O'Level statement
- Apply for birth certificate (if needed)
- Get affidavit (if needed)

### 3-4 Weeks Before:
- Get LGA ID letter
- Take passport photos
- Compile parent documents

### 1-2 Weeks Before:
- Get medical certificate
- Make photocopies
- Organize documents
- Scan and backup

### 2-3 Days Before:
- Final check
- Print extra copies
- Prepare submission folder

---

## Common Mistakes to Avoid

### ❌ Starting Too Late
**Solution:** Start 2 months before

### ❌ Poor Quality Photocopies
**Solution:** Use good machines

### ❌ Name Mismatches
**Solution:** Get affidavit

### ❌ Expired Documents
**Solution:** Time your medical correctly

### ❌ No Backup Copies
**Solution:** Always keep extras

---

## Quick Reference

**Government Offices:**
- Birth Certificate → NPC office
- LGA ID Letter → LGA Secretariat

**Online Portals:**
- JAMB Result → jamb.gov.ng/efacility
- WAEC → waecdirect.org
- NECO → mynecoexams.com

**Professional Services:**
- Photos → Photo studio
- Medical → Hospital/clinic
- Copies → Cyber cafe

---

## Need Help?

- **JAMB:** 08031230131
- **WAEC:** 08181515410
- **NECO:** 09077720644

**Use Our Tools:**
- [Document Checklist](/admissions/checklist) - Track progress
- [Deadline Tracker](/admissions/guides/how-to-track-deadlines) - Never miss dates

---

*Last updated: January 2025*
`,
  },

  // Guide 4: Link School Email (ENHANCED VERSION)
  {
    slug: "link-your-school-email",
    title: "Link Your School Email (CribWise Policy)",
    summary: "Why we require school email verification, how to link it, accepted domains, and benefits of verification.",
    tags: ["School Email", "Verification", "Policy", "CribWise"],
    readTime: "10 min read",
    difficulty: "Easy",
    lastUpdated: "January 2025",
    body: `
# Link Your School Email (CribWise Policy)

CribWise requires university students to verify their school email to access certain features. Here's everything you need to know.

## Why We Require School Email Verification

### Safety & Trust
- ✅ Confirms you're a real student
- ✅ Reduces fraud and fake accounts
- ✅ Creates trusted student community
- ✅ Protects property listings

### Access to Benefits
- ✅ Student-only housing listings
- ✅ Verified student marketplace
- ✅ Campus-specific groups
- ✅ Student discounts
- ✅ Priority support

---

## When to Link Your Email

### Timeline

**Before Admission:**
- ❌ Not available yet
- ⏳ Create account with personal email
- ⏳ Browse general listings

**After Admission Letter:**
- ⏳ Waiting for school email
- ✅ Can start searching
- ⚠️ Limited access

**After Registration:**
- ✅ School email assigned
- ✅ Link immediately
- ✅ Full access unlocked

**Best Time:** Within first week of getting school email

---

## How to Get Your School Email

### Most Nigerian Universities

**Email Format:**
- firstname.lastname@[school].edu.ng
- matricnumber@[school].edu.ng
- username@[school].edu.ng

**Where to Get It:**

**1. During Physical Clearance**
- ICT unit creates email
- Receive login credentials
- Via SMS or printed slip

**2. University Portal**
- Log into student portal
- Look for "Email Services"
- Follow activation instructions

**3. ICT/Computer Center**
- Visit university ICT center
- Bring student ID card
- Request email activation
- May cost ₦500 - ₦1,000

---

## Accepted Email Domains

### ✅ Verified Universities

CribWise accepts emails from all NUC-recognized institutions:

**Federal Universities:**
- unilag.edu.ng
- ui.edu.ng
- unn.edu.ng
- oauife.edu.ng
- abu.edu.ng
- uniben.edu.ng
- And 40+ more

**State Universities:**
- lasu.edu.ng
- eksu.edu.ng
- lautech.edu.ng
- aaua.edu.ng
- And 50+ more

**Private Universities:**
- covenantuniversity.edu.ng
- babcock.edu.ng
- biu.edu.ng
- And 100+ more

**Not Sure?**
- Try linking - we'll let you know
- Contact support with school name

---

## How to Link Your Email

### Step-by-Step

**1. Log Into CribWise**
- Go to cribwise.com
- Sign in to account

**2. Navigate to Settings**
- Click profile icon
- Select "Account Settings"
- Click "Email Verification"

**3. Add School Email**
- Enter university email
- Double-check spelling
- Click "Send Verification Code"

**4. Check School Email**
- Open school email inbox
- Look for CribWise email
- Subject: "Verify Your Student Email"
- Check spam if not in inbox

**5. Enter Code**
- Copy 6-digit code
- Return to CribWise
- Paste code
- Click "Verify"

**6. Confirmation**
- ✅ Green checkmark appears
- ✅ "Verified Student" badge added
- ✅ Full access unlocked

**Time Required:** 5-10 minutes

---

## What If You Don't Link?

### Limited Access

**You CAN:**
- ✅ Browse general listings
- ✅ Read reviews
- ✅ Save favorites
- ✅ Use basic search

**You CANNOT:**
- ❌ Access student-only listings
- ❌ Message property owners directly
- ❌ Post in marketplace
- ❌ Join campus communities
- ❌ Get student discounts
- ❌ Book student-exclusive properties

**Your Profile Shows:**
- 🚫 "Unverified" status
- 🚫 Reduced trust score
- 🚫 Limited visibility

---

## Troubleshooting

### "I haven't received the email"

**Check:**
1. Spam/Junk folder
2. Email spelling (typos?)
3. Email quota (not full?)
4. Wait 5-10 minutes, resend

**Still not working:**
- Try different browser
- Clear browser cache
- Contact support

### "My school email isn't working"

**Email Not Active?**
- Contact university ICT center
- Bring student ID
- Ask for activation
- May need to pay fees first

### "Domain not recognized"

**Solution:**
1. Confirm email ends in .edu.ng
2. If yes, contact support
3. Provide: School name, email, student ID photo
4. We'll verify and add (24-48 hours)

---

## Privacy & Security

### What We Do With Your Email

**We ONLY use it to:**
- ✅ Verify you're a student
- ✅ Add "Verified Student" badge
- ✅ Send platform updates (optional)
- ✅ Contact for account matters

**We DO NOT:**
- ❌ Share with third parties
- ❌ Sell your data
- ❌ Send spam
- ❌ Access email content

### You Control:

- ✅ Unlink anytime
- ✅ Control notifications
- ✅ Choose profile visibility
- ✅ Delete account and data

**Privacy policy:** cribwise.com/privacy

---

## After Verification

### What Changes?

**Your Profile:**
- 🎓 "Verified Student" badge
- 🟢 Green checkmark
- ⭐ Higher trust score
- 📍 Campus affiliation shown

**Your Access:**
- 🏠 Student-only listings
- 💬 Direct messaging
- 🛍️ Campus marketplace
- 👥 Campus groups
- 🎯 Better search results
- 💰 Exclusive deals

**Benefits:**
- Priority in applications
- Landlords know you're verified
- Connect with schoolmates
- Better support

---

## For Prospective Students

**Don't Have Email Yet?**

**You Can:**
- Create account with personal email
- Browse housing near school
- Save favorite listings
- Mark as "Incoming Student"

**Once Admitted:**
- Link school email immediately
- Update profile status
- Full access granted

**Timeline:**
- Admission → Save favorites
- Registration → Get school email
- Activation → Link to CribWise
- Full access → Find housing!

---

## Landlord Perspective

### Why Landlords Prefer Verified Students

**Trust:**
- Confirmed student status
- Less likely scammers
- Easy to verify enrollment

**Communication:**
- Can contact through school
- University can mediate
- More accountability

**Result:** Verified students get faster responses!

---

## FAQs

**Q: Is verification mandatory?**
A: No, but highly recommended for full access.

**Q: Can I use personal email?**
A: Yes, but no "Verified Student" benefits.

**Q: What if my school doesn't issue emails?**
A: Contact us - we can verify using student ID.

**Q: How long does verification last?**
A: Duration of studies + 1 year.

**Q: Can I change linked email?**
A: Yes, update in settings anytime.

**Q: Is my email visible?**
A: No, only CribWise sees it. Others see badge only.

---

## Need Help?

**Email Issues:**
- Contact school ICT center

**CribWise Verification:**
- Email: support@cribwise.com
- In-app chat: 9 AM - 9 PM

---

## Quick Action Plan

### If You're Already a Student:

- [ ] Log into school email
- [ ] Go to CribWise settings
- [ ] Add and verify email
- [ ] Update profile
- [ ] Enjoy verified benefits!

### If You're Incoming:

- [ ] Create CribWise account
- [ ] Mark as "Incoming Student"
- [ ] Save favorite housing
- [ ] Wait for school email
- [ ] Link when received

---

**Related:**
- [Find Student Housing](/properties)
- [Campus Communities](#)

---

*Last updated: January 2025*
`,
  },
];

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  return GUIDES.find((g) => g.slug === slug) ?? null;
}

export async function listGuides(): Promise<Guide[]> {
  return GUIDES;
}

export async function searchGuides(q: string): Promise<Guide[]> {
  const n = q.trim().toLowerCase();
  if (!n) return [];
  return GUIDES.filter((g) =>
    g.title.toLowerCase().includes(n) ||
    (g.summary?.toLowerCase().includes(n) ?? false) ||
    (g.tags?.some((t) => t.toLowerCase().includes(n)) ?? false)
  );
}