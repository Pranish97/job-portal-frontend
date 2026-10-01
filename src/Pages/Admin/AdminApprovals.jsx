import { useState } from "react";
import { SUBMISSIONS, companyOf } from "../../Components/Admin/AdminData";
import { Badge, Tabs, inputClass } from "../../Components/Admin/AdminUI";

const STATUS_TABS = ["Pending", "Approved", "Rejected", "All"];

/* ---------- Logic component ---------- */
function ApprovalList({ initial }) {
  const [items, setItems] = useState(initial);
  const [tab, setTab] = useState("Pending");
  const [rejectingId, setRejectingId] = useState(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const count = (s) => (s === "All" ? items.length : items.filter((i) => i.status === s).length);
  const tabs = STATUS_TABS.map((s) => ({ value: s, label: s, count: count(s) }));
  const shown = items.filter((i) => tab === "All" || i.status === tab);

  const update = (id, patch) => setItems((list) => list.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const approve = (id) => update(id, { status: "Approved", reason: "" });

  const startReject = (id) => { setRejectingId(id); setReason(""); setError(""); };

  const confirmReject = (id) => {
    if (reason.trim().length < 10) {
      setError("Write a reason of at least 10 characters. The employer will see it.");
      return;
    }
    update(id, { status: "Rejected", reason: reason.trim() });
    setRejectingId(null);
  };

  return (
    <>
      <Tabs tabs={tabs} value={tab} onChange={setTab} />

      {shown.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-gray-300 p-10 text-center text-gray-700">
          {tab === "Pending" ? "No internships are waiting for approval." : "No internships here."}
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {shown.map((i) => {
            const company = companyOf(i.employerId);
            return (
              <li key={i.id} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-semibold text-gray-900">{i.title}</h2>
                      <Badge status={i.status} />
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {company?.company}, submitted {i.submitted}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">{i.location}, {i.duration}, {i.stipend}</p>
                    <p className="mt-2 text-sm text-gray-800">{i.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {i.skills.map((s) => (
                        <span key={s} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{s}</span>
                      ))}
                    </div>
                    {company?.status !== "Verified" && i.status === "Pending" && (
                      <p className="mt-2 text-xs text-amber-800">
                        This employer is {company?.status.toLowerCase()}. Check them on the Employers page before approving.
                      </p>
                    )}
                    {i.status === "Rejected" && i.reason && (
                      <p className="mt-2 text-sm text-red-800">Reason: {i.reason}</p>
                    )}
                  </div>

                  {i.status === "Pending" && rejectingId !== i.id && (
                    <div className="flex gap-2">
                      <button onClick={() => approve(i.id)}
                        className="rounded-md bg-blue-700 px-3 py-1.5 text-sm text-white hover:bg-blue-800">Approve</button>
                      <button onClick={() => startReject(i.id)}
                        className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50">Reject</button>
                    </div>
                  )}
                  {i.status !== "Pending" && (
                    <button onClick={() => update(i.id, { status: "Pending", reason: "" })}
                      className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:border-gray-500">
                      Move back to pending
                    </button>
                  )}
                </div>

                {rejectingId === i.id && (
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-800">
                      Reason for rejecting
                      <textarea rows={3} className={`${inputClass} mt-1`} value={reason}
                        onChange={(e) => setReason(e.target.value)} />
                    </label>
                    {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => confirmReject(i.id)}
                        className="rounded-md bg-red-700 px-3 py-1.5 text-sm text-white hover:bg-red-800">Reject internship</button>
                      <button onClick={() => setRejectingId(null)}
                        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:border-gray-500">Cancel</button>
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
export default function AdminApprovals() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Approvals</h1>
      <p className="mb-6 mt-1 text-sm text-gray-600">Check each new internship before students can see it.</p>
      <ApprovalList initial={SUBMISSIONS} />
    </div>
  );
}