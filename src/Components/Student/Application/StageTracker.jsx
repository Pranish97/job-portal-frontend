const stages = ["Submitted", "Under review", "Shortlisted", "Interview", "Offer"];

// Shows how far an application has progressed.
export default function StageTracker({ status }) {
  if (status === "Rejected") {
    return <p className="text-sm text-red-700">Not selected for this internship.</p>;
  }
  const current = stages.indexOf(status);
  return (
    <ol className="flex flex-wrap items-center gap-1 text-xs" aria-label={`Application stage: ${status}`}>
      {stages.map((s, i) => (
        <li key={s} className="flex items-center gap-1">
          <span className={`rounded-full px-2 py-0.5 ${i <= current ? "bg-brand text-white" : "bg-slate-100 text-muted"}`}>{s}</span>
          {i < stages.length - 1 && <span className="h-px w-3 bg-line" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}