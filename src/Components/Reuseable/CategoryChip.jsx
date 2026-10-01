import { Link } from "react-router-dom";

export default function CategoryChip({ name }) {
  return (
    <Link to={`/internships?category=${name}`} className="rounded-full bg-slate-100 px-3.5 py-1 hover:bg-blue-100">
      {name}
    </Link>
  );
}