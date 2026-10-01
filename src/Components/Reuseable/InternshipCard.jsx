import { Link } from "react-router-dom";
import MatchBadge from "./MatchBadge";
import { useAuth } from "../../hooks/useAuth";

// Match score is shown automatically only to logged-in students.
export default function InternshipCard({ id, title, company, location, type, duration, skills = [], deadline, matchScore }) {
  const { user } = useAuth();
  return (
    <article className="rounded-lg border border-line bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="grid size-10 place-items-center rounded-lg bg-brand font-display font-bold text-white" aria-hidden="true">
          {company[0]}
        </div>
        {user?.role === "student" && matchScore != null && <MatchBadge score={matchScore} />}
      </div>
      <h3 className="font-display font-semibold hover:text-brand">
        <Link to={`/internships/${id}`}>{title}</Link>
      </h3>
      <p className="text-muted">{company}</p>
      <p className="text-sm">{location}, {type}, {duration}</p>
      <ul className="my-3 flex flex-wrap gap-1.5">
        {skills.map((s) => <li key={s} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-sm">{s}</li>)}
      </ul>
      <p className="text-sm text-muted">Apply by {deadline}</p>
    </article>
  );
}