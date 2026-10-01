// Sample data shared by the employer pages. Replace with API calls later.
export const STATUSES = ["Submitted", "Under review", "Shortlisted", "Interview", "Offer", "Rejected"];

export const POSTINGS = [
  {
    id: 1, title: "Frontend Developer Intern", location: "Kathmandu", mode: "Hybrid",
    duration: "3 months", stipend: "NPR 15,000 / month", deadline: "2026-10-20", status: "Open",
    skills: ["React", "JavaScript", "CSS", "Git"],
    description: "Build and improve pages of our student-facing web app with the product team.",
  },
  {
    id: 2, title: "Data Analyst Intern", location: "Lalitpur", mode: "On-site",
    duration: "6 months", stipend: "NPR 18,000 / month", deadline: "2026-10-27", status: "Open",
    skills: ["Python", "SQL", "Excel", "Statistics"],
    description: "Clean and analyse usage data and present weekly findings to the team.",
  },
  {
    id: 3, title: "UI/UX Design Intern", location: "Remote", mode: "Remote",
    duration: "3 months", stipend: "Unpaid", deadline: "2026-11-03", status: "Open",
    skills: ["Figma", "User research", "Prototyping"],
    description: "Support the design lead with wireframes, prototypes and user interviews.",
  },
  {
    id: 4, title: "Backend Developer Intern", location: "Kathmandu", mode: "On-site",
    duration: "4 months", stipend: "NPR 16,000 / month", deadline: "2026-09-28", status: "Closed",
    skills: ["Node.js", "PostgreSQL", "REST APIs"],
    description: "Help build and test API endpoints for our internship platform.",
  },
];

export const APPLICANTS = [
  { id: 1, name: "Anisha Shrestha", email: "anisha@example.com", postingId: 1, match: 92, status: "Under review", applied: "2026-09-30",
    education: "BSc CSIT, Tribhuvan University", has: ["React", "JavaScript", "CSS"], missing: ["Git"] },
  { id: 2, name: "Rohan Karki", email: "rohan@example.com", postingId: 2, match: 85, status: "Shortlisted", applied: "2026-09-29",
    education: "BE Computer, Pulchowk Campus", has: ["Python", "SQL", "Excel"], missing: ["Statistics"] },
  { id: 3, name: "Sita Gurung", email: "sita@example.com", postingId: 3, match: 78, status: "Submitted", applied: "2026-09-29",
    education: "BBA, Kathmandu University", has: ["Figma", "Prototyping"], missing: ["User research"] },
  { id: 4, name: "Bikash Thapa", email: "bikash@example.com", postingId: 1, match: 64, status: "Submitted", applied: "2026-09-27",
    education: "BCA, Patan College", has: ["JavaScript", "Git"], missing: ["React", "CSS"] },
  { id: 5, name: "Prerana Joshi", email: "prerana@example.com", postingId: 2, match: 88, status: "Interview", applied: "2026-09-26",
    education: "BSc Statistics, Amrit Campus", has: ["Python", "SQL", "Statistics"], missing: ["Excel"] },
  { id: 6, name: "Nabin Rai", email: "nabin@example.com", postingId: 4, match: 71, status: "Rejected", applied: "2026-09-20",
    education: "BE Software, Kathmandu University", has: ["Node.js", "REST APIs"], missing: ["PostgreSQL"] },
];

export const applicantCount = (postingId) => APPLICANTS.filter((a) => a.postingId === postingId).length;