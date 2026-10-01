// Small pieces shared by the employer pages.
const BADGE = {
  Submitted: "bg-gray-100 text-gray-700",
  "Under review": "bg-blue-100 text-blue-800",
  Shortlisted: "bg-amber-100 text-amber-800",
  Interview: "bg-green-100 text-green-800",
  Offer: "bg-emerald-200 text-emerald-900",
  Rejected: "bg-red-100 text-red-800",
  Open: "bg-green-100 text-green-800",
  Closed: "bg-gray-100 text-gray-600",
};

export function StatusBadge({ status }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${BADGE[status]}`}>{status}</span>
  );
}

export function MatchScore({ value }) {
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

export function Panel({ title, action, children }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white">
      {title && (
        <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          {action}
        </header>
      )}
      <div className="p-4">{children}</div>
    </section>
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