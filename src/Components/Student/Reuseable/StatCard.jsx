export default function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-lg border border-line bg-white p-5">
      <p className="text-muted">{label}</p>
      <p className="font-display text-3xl font-bold">{value}</p>
      {hint && <p className="text-sm text-muted">{hint}</p>}
    </div>
  );
}