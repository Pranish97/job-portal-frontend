import { Link } from "react-router-dom";

/* ---------- Sample data (replace with API calls later) ---------- */
const STATS = [
  { label: "Active postings", value: 4, to: "/employer/internships" },
  { label: "Total applicants", value: 67, to: "/employer/applicants" },
  { label: "Awaiting review", value: 18, to: "/employer/applicants" },
  { label: "Interviews scheduled", value: 5, to: "/employer/applicants" },
];

const POSTINGS = [
  { id: 1, title: "Frontend Developer Intern", applicants: 24, closes: "Oct 20", status: "Open" },
  { id: 2, title: "Data Analyst Intern", applicants: 19, closes: "Oct 27", status: "Open" },
  { id: 3, title: "UI/UX Design Intern", applicants: 15, closes: "Nov 3", status: "Open" },
  { id: 4, title: "Backend Developer Intern", applicants: 9, closes: "Sep 28", status: "Closed" },
];

const APPLICANTS = [
  { id: 1, name: "Anisha Shrestha", role: "Frontend Developer Intern", match: 92, status: "Under review", applied: "Sep 30" },
  { id: 2, name: "Rohan Karki", role: "Data Analyst Intern", match: 85, status: "Shortlisted", applied: "Sep 29" },
  { id: 3, name: "Sita Gurung", role: "UI/UX Design Intern", match: 78, status: "Submitted", applied: "Sep 29" },
  { id: 4, name: "Bikash Thapa", role: "Frontend Developer Intern", match: 64, status: "Submitted", applied: "Sep 27" },
  { id: 5, name: "Prerana Joshi", role: "Data Analyst Intern", match: 88, status: "Interview", applied: "Sep 26" },
];

const STATUS_STYLE = {
  Submitted: "bg-gray-100 text-gray-700",
  "Under review": "bg-blue-100 text-blue-800",
  Shortlisted: "bg-amber-100 text-amber-800",
  Interview: "bg-green-100 text-green-800",
  Open: "bg-green-100 text-green-800",
  Closed: "bg-gray-100 text-gray-600",
};

/* ---------- Small reusable pieces ---------- */
function StatCard({ label, value, to }) {
  return (
    <Link
      to={to}
      className="block rounded-lg border border-gray-200 bg-white p-4 hover:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
    >
      <p className="text-3xl font-semibold text-gray-900">{value}</p>
      <p className="mt-1 text-sm text-gray-600">{label}</p>
    </Link>
  );
}

function Panel({ title, action, children }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white">
      <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        {action}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[status]}`}>
      {status}
    </span>
  );
}

function MatchScore({ value }) {
  const color = value >= 80 ? "bg-green-600" : value >= 65 ? "bg-amber-500" : "bg-gray-400";
  return (
    <div className="flex items-center gap-2" aria-label={`Match score ${value} percent`}>
      <div className="h-1.5 w-16 rounded bg-gray-200">
        <div className={`h-1.5 rounded ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-sm text-gray-700">{value}%</span>
    </div>
  );
}

/* ---------- Page ---------- */
export default function EmployerDashboard() {
  const needsReview = APPLICANTS.filter((a) => a.status === "Submitted").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Employer dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            {needsReview} new applications are waiting for your review.
          </p>
        </div>
        <Link
          to="/employer/internships/new"
          className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Post new internship
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Panel
            title="Recent applicants"
            action={
              <Link to="/employer/applicants" className="text-sm text-blue-700 hover:underline">
                View all applicants
              </Link>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-gray-600">
                  <tr>
                    <th className="pb-2 font-medium">Applicant</th>
                    <th className="pb-2 font-medium">Match</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {APPLICANTS.map((a) => (
                    <tr key={a.id}>
                      <td className="py-3 pr-4">
                        <p className="font-medium text-gray-900">{a.name}</p>
                        <p className="text-xs text-gray-600">
                          {a.role}, applied {a.applied}
                        </p>
                      </td>
                      <td className="py-3 pr-4">
                        <MatchScore value={a.match} />
                      </td>
                      <td className="py-3">
                        <StatusBadge status={a.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        <div className="lg:col-span-2">
          <Panel
            title="Your postings"
            action={
              <Link to="/employer/internships" className="text-sm text-blue-700 hover:underline">
                Manage postings
              </Link>
            }
          >
            <ul className="divide-y divide-gray-100">
              {POSTINGS.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{p.title}</p>
                    <p className="text-xs text-gray-600">
                      {p.applicants} applicants, {p.status === "Open" ? "closes" : "closed"} {p.closes}
                    </p>
                  </div>
                  <StatusBadge status={p.status} />
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}