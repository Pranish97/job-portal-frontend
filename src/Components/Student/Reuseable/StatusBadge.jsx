const colors = {
  Submitted: "bg-slate-100 text-slate-700",
  "Under review": "bg-blue-100 text-blue-800",
  Shortlisted: "bg-amber-100 text-amber-800",
  Interview: "bg-purple-100 text-purple-800",
  Offer: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-sm font-semibold ${colors[status] ?? colors.Submitted}`}>
      {status}
    </span>
  );
}