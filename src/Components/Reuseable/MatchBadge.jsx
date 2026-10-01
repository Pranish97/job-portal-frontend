export default function MatchBadge({ score }) {
  const color = score >= 80 ? "bg-green-700" : score >= 60 ? "bg-amber-700" : "bg-gray-500";
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold text-white ${color}`} aria-label={`${score} percent match`}>
      {score}% match
    </span>
  );
}