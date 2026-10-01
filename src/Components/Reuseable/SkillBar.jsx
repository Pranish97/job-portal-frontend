// percent below 50 is shown in red as a skill gap.
export default function SkillBar({ skill, percent }) {
  return (
    <div className="my-2 grid grid-cols-[90px_1fr] items-center gap-3">
      <span>{skill}</span>
      <div className="h-2 rounded-full bg-slate-700">
        <div style={{ width: `${percent}%` }} className={`h-full rounded-full ${percent < 50 ? "bg-red-400" : "bg-marigold"}`} />
      </div>
    </div>
  );
}