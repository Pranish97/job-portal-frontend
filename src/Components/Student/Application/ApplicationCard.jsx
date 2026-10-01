import { Link } from "react-router-dom";
import MatchBadge from "../../Reuseable/MatchBadge";
import StatusBadge from "../Reuseable/StatusBadge";
import Button from "../../Reuseable/Button";
import StageTracker from "./StageTracker";

// onWithdraw is injected by <ApplicationList>.
export default function ApplicationCard({ id, title, company, location, appliedOn, status, matchScore, onWithdraw }) {
  const canWithdraw = status === "Submitted" || status === "Under review";
  return (
    <article className="rounded-lg border border-line bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display font-semibold hover:text-brand"><Link to={`/internships/${id}`}>{title}</Link></h3>
          <p className="text-muted">{company}, {location}</p>
          <p className="text-sm text-muted">Applied on {appliedOn}</p>
        </div>
        <div className="flex items-center gap-2">
          <MatchBadge score={matchScore} />
          <StatusBadge status={status} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <StageTracker status={status} />
        <div className="flex gap-2">
          <Button to={`/internships/${id}`} variant="outline">View internship</Button>
          {canWithdraw && <Button variant="ghost" onClick={onWithdraw}>Withdraw</Button>}
        </div>
      </div>
    </article>
  );
}