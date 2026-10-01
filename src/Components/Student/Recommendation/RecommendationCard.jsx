import { useState } from "react";
import { Link } from "react-router-dom";
import MatchBadge from "../../Reuseable/MatchBadge";
import Button from "../../Reuseable/Button";

export default function RecommendationCard({ id, title, company, location, type, matchScore, matched = [], missing = [] }) {
  const [saved, setSaved] = useState(false);
  return (
    <article className="rounded-lg border border-line bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold hover:text-brand"><Link to={`/internships/${id}`}>{title}</Link></h3>
          <p className="text-muted">{company}, {location}, {type}</p>
        </div>
        <MatchBadge score={matchScore} />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold">Skills you have</p>
          <ul className="flex flex-wrap gap-1.5">
            {matched.map((s) => <li key={s} className="rounded-full bg-green-50 px-2.5 py-0.5 text-sm text-green-800">{s}</li>)}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">Skills to add</p>
          {missing.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {missing.map((s) => <li key={s} className="rounded-full bg-red-50 px-2.5 py-0.5 text-sm text-red-800">{s}</li>)}
            </ul>
          ) : (
            <p className="text-sm text-muted">None. You meet every listed skill.</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button to={`/internships/${id}`}>View and apply</Button>
        <Button variant="outline" aria-pressed={saved} onClick={() => setSaved(!saved)}>{saved ? "Saved" : "Save"}</Button>
      </div>
    </article>
  );
}