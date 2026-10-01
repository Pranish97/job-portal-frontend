import { useState } from "react";
import { EMPLOYERS } from "../../Components/Admin/AdminData";
import { Badge, Tabs, inputClass } from "../../Components/Admin/AdminUI";

const STATUS_TABS = ["All", "Pending", "Verified", "Suspended", "Rejected"];

/* ---------- Logic component ---------- */
function EmployerList({ initial }) {
  const [employers, setEmployers] = useState(initial);
  const [tab, setTab] = useState("Pending");
  const [query, setQuery] = useState("");

  const count = (s) => (s === "All" ? employers.length : employers.filter((e) => e.status === s).length);
  const tabs = STATUS_TABS.map((s) => ({ value: s, label: s, count: count(s) }));

  const shown = employers
    .filter((e) => tab === "All" || e.status === tab)
    .filter((e) => `${e.company} ${e.contact}`.toLowerCase().includes(query.trim().toLowerCase()));

  const setStatus = (id, status) =>
    setEmployers((list) => list.map((e) => (e.id === id ? { ...e, status } : e)));

  const suspend = (e) => {
    if (window.confirm(`Suspend ${e.company}? Their internships will be hidden from students.`)) {
      setStatus(e.id, "Suspended");
    }
  };

  const btn = "rounded-md border px-3 py-1.5 text-sm";

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs tabs={tabs} value={tab} onChange={setTab} />
        <input type="search" className={`${inputClass} sm:w-64`} value={query}
          onChange={(e) => setQuery(e.target.value)} placeholder="Search company or contact"
          aria-label="Search employers" />
      </div>

      {shown.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-gray-300 p-10 text-center text-gray-700">
          No employers match your filters.
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {shown.map((e) => (
            <li key={e.id} className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold text-gray-900">{e.company}</h2>
                    <Badge status={e.status} />
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{e.contact}, {e.email}</p>
                  <p className="mt-1 text-sm text-gray-600">
                    {e.location}, registered {e.joined}, {e.postings} postings
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {e.status === "Pending" && (
                    <>
                      <button onClick={() => setStatus(e.id, "Verified")}
                        className={`${btn} border-blue-700 bg-blue-700 text-white hover:bg-blue-800`}>Verify</button>
                      <button onClick={() => setStatus(e.id, "Rejected")}
                        className={`${btn} border-red-300 text-red-700 hover:bg-red-50`}>Reject</button>
                    </>
                  )}
                  {e.status === "Verified" && (
                    <button onClick={() => suspend(e)}
                      className={`${btn} border-red-300 text-red-700 hover:bg-red-50`}>Suspend</button>
                  )}
                  {e.status === "Suspended" && (
                    <button onClick={() => setStatus(e.id, "Verified")}
                      className={`${btn} border-gray-300 hover:border-gray-500`}>Reactivate</button>
                  )}
                  {e.status === "Rejected" && (
                    <button onClick={() => setStatus(e.id, "Pending")}
                      className={`${btn} border-gray-300 hover:border-gray-500`}>Review again</button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/* ---------- Page ---------- */
export default function AdminEmployers() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Employers</h1>
      <p className="mb-6 mt-1 text-sm text-gray-600">Verify new companies and suspend those that break the rules.</p>
      <EmployerList initial={EMPLOYERS} />
    </div>
  );
}