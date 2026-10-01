export default function ProgressBar({ label, percent }) {
  return (
    <div className="mb-3">
      <div className="mb-1 flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-semibold">{percent}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100" role="progressbar" aria-label={label} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div style={{ width: `${percent}%` }} className="h-full rounded-full bg-brand" />
      </div>
    </div>
  );
}