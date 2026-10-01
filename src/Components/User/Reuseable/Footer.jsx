import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-ink py-8 text-slate-300">
      <div className="mx-auto flex w-[92%] max-w-6xl flex-wrap justify-between gap-4">
        <p><strong>MeroAvasar</strong> connects students and employers across Nepal.</p>
        <div className="flex gap-5">
          <Link to="/internships">Internships</Link>
          <Link to="/about">About</Link>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </footer>
  );
}