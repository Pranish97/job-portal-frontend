import StatusBadge from "./StatusBadge";

export default function ApplicationRow({ title, company, appliedOn, status }) {
  return (
    <li className="flex items-center justify-between gap-3 py-3">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted">{company}, applied {appliedOn}</p>
      </div>
      <StatusBadge status={status} />
    </li>
  );
}