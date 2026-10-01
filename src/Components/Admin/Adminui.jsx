// Small pieces shared by the admin pages.
const BADGE = {
  Pending: "bg-amber-100 text-amber-800",
  Verified: "bg-green-100 text-green-800",
  Approved: "bg-green-100 text-green-800",
  Suspended: "bg-red-100 text-red-800",
  Rejected: "bg-red-100 text-red-800",
};

export function Badge({ status }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${BADGE[status]}`}>{status}</span>
  );
}

export function Panel({ title, action, children }) {
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

export function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-3xl font-semibold text-gray-900">{value}</p>
      <p className="mt-1 text-sm text-gray-600">{label}</p>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.value}
          role="tab"
          aria-selected={value === t.value}
          onClick={() => onChange(t.value)}
          className={`rounded-full border px-3 py-1 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
            value === t.value
              ? "border-blue-700 bg-blue-700 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:border-gray-500"
          }`}
        >
          {t.label} ({t.count})
        </button>
      ))}
    </div>
  );
}

export const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600";