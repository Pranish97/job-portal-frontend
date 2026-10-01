import { Link } from "react-router-dom";

const base = "inline-block rounded-lg border-2 px-4 py-2 font-semibold transition-colors cursor-pointer";
const variants = {
  primary: "border-brand bg-brand text-white hover:bg-brand-dark hover:border-brand-dark",
  outline: "border-brand text-brand hover:bg-blue-50",
  ghost: "border-transparent text-ink hover:bg-slate-200",
};

// variant: "primary" | "outline" | "ghost". Pass `to` to render a link.
export default function Button({ children, to, variant = "primary", className = "", type = "button", ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  return <button type={type} className={cls} {...rest}>{children}</button>;
}