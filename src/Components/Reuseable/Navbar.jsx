import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "./Button";

const links = {
  guest:    [["/", "Home"], ["/internships", "Internships"]],
  student:  [["/student/dashboard", "Dashboard"], ["/internships", "Internships"], ["/student/applications", "My applications"], ["/student/recommendations", "Recommended"]],
  employer: [["/employer/dashboard", "Dashboard"], ["/employer/internships", "My postings"], ["/employer/applicants", "Applicants"]],
  admin:    [["/admin/dashboard", "Dashboard"], ["/admin/employers", "Employers"], ["/admin/internships", "Approvals"]],
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const items = links[user?.role ?? "guest"];
  const linkCls = ({ isActive }) => `border-b-[3px] py-1 font-semibold ${isActive ? "border-marigold" : "border-transparent"}`;

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-white">
      <div className="mx-auto flex min-h-16 w-[92%] max-w-6xl items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold text-brand">MeroAvasar</Link>

        <button className="rounded-lg border border-line px-3 py-1.5 font-semibold md:hidden" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>

        <nav
          onClick={() => setOpen(false)}
          className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-16 flex-col items-start gap-4 border-b border-line bg-white px-[4%] py-4
                      md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:p-0`}
        >
          {items.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"} className={linkCls}>{label}</NavLink>)}
          <div className="flex items-center gap-2 md:ml-4">
            {user ? (
              <>
                {user.role === "student" && <NavLink to="/student/profile" className={linkCls}>{user.name}</NavLink>}
                <Button variant="outline" onClick={logout}>Log out</Button>
              </>
            ) : (
              <>
                <Button to="/login" variant="ghost">Log in</Button>
                <Button to="/register">Sign up</Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}