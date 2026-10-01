// Sample data shared by the admin pages. Replace with API calls later.
export const EMPLOYERS = [
  { id: 1, company: "Himalayan Tech Pvt. Ltd.", contact: "Suman Adhikari", email: "suman@himtech.example", location: "Kathmandu", joined: "2026-09-30", status: "Pending", postings: 1 },
  { id: 2, company: "Everest Analytics", contact: "Mina Lama", email: "mina@everest.example", location: "Lalitpur", joined: "2026-09-18", status: "Verified", postings: 3 },
  { id: 3, company: "Pokhara Design Studio", contact: "Dipesh Pun", email: "dipesh@pds.example", location: "Pokhara", joined: "2026-09-10", status: "Verified", postings: 2 },
  { id: 4, company: "Quick Hire Services", contact: "Rajan KC", email: "rajan@quickhire.example", location: "Kathmandu", joined: "2026-08-25", status: "Suspended", postings: 1 },
  { id: 5, company: "Bhaktapur Soft", contact: "Laxmi Maharjan", email: "laxmi@bsoft.example", location: "Bhaktapur", joined: "2026-09-29", status: "Pending", postings: 0 },
];

export const SUBMISSIONS = [
  { id: 1, title: "Frontend Developer Intern", employerId: 1, submitted: "2026-09-30", status: "Pending", location: "Kathmandu (Hybrid)",
    duration: "3 months", stipend: "NPR 15,000 / month", skills: ["React", "JavaScript", "CSS"],
    description: "Build and improve pages of our student-facing web app with the product team.", reason: "" },
  { id: 2, title: "Data Analyst Intern", employerId: 2, submitted: "2026-09-29", status: "Pending", location: "Lalitpur (On-site)",
    duration: "6 months", stipend: "NPR 18,000 / month", skills: ["Python", "SQL", "Statistics"],
    description: "Clean and analyse usage data and present weekly findings to the team.", reason: "" },
  { id: 3, title: "Graphic Design Intern", employerId: 3, submitted: "2026-09-27", status: "Pending", location: "Pokhara (Remote)",
    duration: "3 months", stipend: "Unpaid", skills: ["Photoshop", "Illustrator"],
    description: "Create social media graphics and brand material for client campaigns.", reason: "" },
  { id: 4, title: "Sales Intern", employerId: 4, submitted: "2026-09-22", status: "Rejected", location: "Kathmandu (On-site)",
    duration: "2 months", stipend: "Commission only", skills: ["Communication"],
    description: "Sell packages to students.", reason: "Commission-only roles are not allowed on the platform." },
  { id: 5, title: "UI/UX Design Intern", employerId: 2, submitted: "2026-09-15", status: "Approved", location: "Remote",
    duration: "3 months", stipend: "NPR 12,000 / month", skills: ["Figma", "Prototyping"],
    description: "Support the design lead with wireframes, prototypes and user interviews.", reason: "" },
];

export const companyOf = (employerId) => EMPLOYERS.find((e) => e.id === employerId);