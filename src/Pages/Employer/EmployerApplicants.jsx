import { useState } from "react";
import { useLocation } from "react-router-dom";
import { APPLICANTS, POSTINGS, STATUSES } from "../../Components/Employer/Employerdata";
import { MatchScore, StatusBadge, Tabs, inputClass } from "../../Components/Employer/EmployerUI";

const titleOf = (id) => POSTINGS.find((p) => p.id === id)?.title ?? "Unknown posting";

/* ---------- Logic component ---------- */
function ApplicantList({ initial, initialPosting }) {
  const [applicants, setApplicants] = useState(initial);
  const [tab, setTab] = useState("All");
  const [posting, setPosting] = useState(initialPosting);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("match");
  const [openId, setOpenId] = useState(null);

  const inPosting = applicants.filter((a) => posting === "all" || a.postingId === Number(posting));
  const count = (s) => (s === "All" ? inPosting.length : inPosting.filter((a) => a.status === s).length);
  const tabs = ["All", ...STATUSES].map((s) => ({ value: s, label: s, count: count(s) }));

  const shown = inPosting
    .filter((a) => tab === "All" || a.status === tab)
    .filter((a) => a.name.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => (sort === "match" ? b.match - a.match : b.applied.localeCompare(a.applied)));

  const setStatus = (id, status) =>
    setApplicants((list) => list.map((a) => (a.id === id ? { ...a, status } : a)));

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-3">
        <select className={inputClass} value={posting} onChange={(e) => setPosting(e.target.value)} aria-label="Filter by posting">
          <option value="all">All postings</option>
          {POSTINGS.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
        <input type="search" className={inputClass} value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name" aria-label="Search applicants by name" />
        <select className={inputClass} value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort applicants">
          <option value="match">Sort by best match</option>
          <option value="newest">Sort by newest</option>
        </select>
      </div>

      <div className="mt-4"><Tabs tabs={tabs} value={tab} onChange={setTab} /></div>

      {shown.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-gray-300 p-10 text-center text-gray-700">
          No applicants match your filters.
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {shown.map((a) => {
            const open = openId === a.id;
            return (
              <li key={a.id} className="rounded-lg border border-gray-200 bg-white">
                <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-medium text-gray-900">{a.name}</p>
                    <p className="text-xs text-gray-600">{titleOf(a.postingId)}, applied {a.applied}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <MatchScore value={a.match} />
                    <StatusBadge status={a.status} />
                    <button onClick={() => setOpenId(open ? null : a.id)} aria-expanded={open}
                      className="text-sm text-blue-700 hover:underline">
                      {open ? "Hide details" : "View details"}
                    </button>
                  </div>
                </div>

                {open && (
                  <div className="space-y-4 border-t border-gray-200 p-4 text-sm">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <p><span className="text-gray-600">Email: </span>{a.email}</p>
                      <p><span className="text-gray-600">Education: </span>{a.education}</p>
                    </div>

                    <div>
                      <p className="mb-1 font-medium text-gray-800">Skills they have</p>
                      <div className="flex flex-wrap gap-1.5">
                        {a.has.map((s) => <span key={s} className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-800">{s}</span>)}
                      </div>
                    </div>
                    <div>
                      <p className="mb-1 font-medium text-gray-800">Skills they lack</p>
                      <div className="flex flex-wrap gap-1.5">
                        {a.missing.length === 0 && <span className="text-xs text-gray-600">None. All required skills covered.</span>}
                        {a.missing.map((s) => <span key={s} className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-800">{s}</span>)}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <label className="flex items-center gap-2">
                        <span className="text-gray-700">Status</span>
                        <select className={`${inputClass} w-auto`} value={a.status} onChange={(e) => setStatus(a.id, e.target.value)}>
                          {STATUSES.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </label>
                      {a.status !== "Shortlisted" && a.status !== "Rejected" && (
                        <button onClick={() => setStatus(a.id, "Shortlisted")}
                          className="rounded-md bg-blue-700 px-3 py-1.5 text-white hover:bg-blue-800">Shortlist</button>
                      )}
                      {a.status !== "Rejected" && (
                        <button onClick={() => setStatus(a.id, "Rejected")}
                          className="rounded-md border border-red-300 px-3 py-1.5 text-red-700 hover:bg-red-50">Reject</button>
                      )}
                      {/* TODO: point to the applicant's uploaded resume URL */}
                      <a href="#" className="text-blue-700 hover:underline">Download resume</a>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

/* ---------- Page ---------- */
export default function EmployerApplicants() {
  // "View applicants" on My postings passes the posting through router state.
  const { state } = useLocation();
  const initialPosting = state?.postingId ? String(state.postingId) : "all";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Applicants</h1>
      <p className="mb-6 mt-1 text-sm text-gray-600">Review applications, check skill matches and update their status.</p>
      <ApplicantList initial={APPLICANTS} initialPosting={initialPosting} />
    </div>
  );
}