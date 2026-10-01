import { Link } from "react-router-dom";
import { EMPLOYERS, SUBMISSIONS, companyOf } from "../../Components/Admin/AdminData";
import { Badge, Panel, StatCard } from "../../Components/Admin/AdminUI";

/* Sample platform numbers. Replace with real counts from your backend. */
const PLATFORM = { students: 412, activeInternships: 27, applicationsThisWeek: 96 };

export default function AdminDashboard() {
  const pendingApprovals = SUBMISSIONS.filter((s) => s.status === "Pending");
  const pendingEmployers = EMPLOYERS.filter((e) => e.status === "Pending");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Admin dashboard</h1>
      <p className="mt-1 text-sm text-gray-600">
        {pendingApprovals.length} internships and {pendingEmployers.length} employers are waiting for your decision.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Internships to approve" value={pendingApprovals.length} />
        <StatCard label="Employers to verify" value={pendingEmployers.length} />
        <StatCard label="Active internships" value={PLATFORM.activeInternships} />
        <StatCard label="Registered students" value={PLATFORM.students} hint={`${PLATFORM.applicationsThisWeek} applications this week`} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel
          title="Waiting for approval"
          action={<Link to="/admin/internships" className="text-sm text-blue-700 hover:underline">Open approvals</Link>}
        >
          {pendingApprovals.length === 0 ? (
            <p className="text-sm text-gray-600">Nothing to approve right now.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {pendingApprovals.map((s) => (
                <li key={s.id} className="py-3">
                  <p className="text-sm font-medium text-gray-900">{s.title}</p>
                  <p className="text-xs text-gray-600">{companyOf(s.employerId)?.company}, submitted {s.submitted}</p>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel
          title="Employers to verify"
          action={<Link to="/admin/employers" className="text-sm text-blue-700 hover:underline">Open employers</Link>}
        >
          {pendingEmployers.length === 0 ? (
            <p className="text-sm text-gray-600">No employers are waiting for verification.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {pendingEmployers.map((e) => (
                <li key={e.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{e.company}</p>
                    <p className="text-xs text-gray-600">{e.contact}, registered {e.joined}</p>
                  </div>
                  <Badge status={e.status} />
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}