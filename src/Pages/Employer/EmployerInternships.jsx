import { useState } from "react";
import { Link } from "react-router-dom";
import { POSTINGS, applicantCount } from "../../Components/Employer/Employerdata";
import { StatusBadge, Tabs, inputClass } from "../../Components/Employer/EmployerUI";

/* ---------- Logic component ---------- */
function PostingList({ initial }) {
  const [postings, setPostings] = useState(initial);
  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");

  const count = (s) => (s === "All" ? postings.length : postings.filter((p) => p.status === s).length);
  const tabs = ["All", "Open", "Closed"].map((s) => ({ value: s, label: s, count: count(s) }));

  const shown = postings.filter(
    (p) =>
      (tab === "All" || p.status === tab) &&
      p.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  const toggleStatus = (id) =>
    setPostings((list) =>
      list.map((p) => (p.id === id ? { ...p, status: p.status === "Open" ? "Closed" : "Open" } : p))
    );

  const remove = (p) => {
    if (window.confirm(`Delete "${p.title}"? Its applications will be removed too.`)) {
      setPostings((list) => list.filter((x) => x.id !== p.id));
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs tabs={tabs} value={tab} onChange={setTab} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title"
          aria-label="Search postings by title"
          className={`${inputClass} sm:w-64`}
        />
      </div>

      {shown.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-gray-300 p-10 text-center">
          <p className="text-gray-700">No postings match your filters.</p>
          <Link to="/employer/internships/new" className="mt-2 inline-block text-sm text-blue-700 hover:underline">
            Post a new internship
          </Link>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {shown.map((p) => (
            <li key={p.id} className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold text-gray-900">{p.title}</h2>
                    <StatusBadge status={p.status} />
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {p.location} ({p.mode}), {p.duration}, {p.stipend}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Deadline {p.deadline}, {applicantCount(p.id)} applicants
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.skills.map((s) => (
                      <span key={s} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-sm">
                  <Link to="/employer/applicants" state={{ postingId: p.id }}
                    className="rounded-md border border-gray-300 px-3 py-1.5 hover:border-gray-500">
                    View applicants
                  </Link>
                  <Link to={`/employer/internships/${p.id}/edit`}
                    className="rounded-md border border-gray-300 px-3 py-1.5 hover:border-gray-500">
                    Edit
                  </Link>
                  <button onClick={() => toggleStatus(p.id)}
                    className="rounded-md border border-gray-300 px-3 py-1.5 hover:border-gray-500">
                    {p.status === "Open" ? "Close" : "Reopen"}
                  </button>
                  <button onClick={() => remove(p)}
                    className="rounded-md border border-red-300 px-3 py-1.5 text-red-700 hover:bg-red-50">
                    Delete
                  </button>
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
export default function EmployerInternships() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My postings</h1>
          <p className="mt-1 text-sm text-gray-600">Create, edit and close your internship postings.</p>
        </div>
        <Link
          to="/employer/internships/new"
          className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
        >
          Post new internship
        </Link>
      </div>
      <PostingList initial={POSTINGS} />
    </div>
  );
}