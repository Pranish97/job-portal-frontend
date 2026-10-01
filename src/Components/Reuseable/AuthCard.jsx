export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="mx-auto w-[92%] max-w-md py-12">
      <div className="rounded-2xl border border-line bg-white p-7">
        <h1 className="font-display text-2xl font-bold">{title}</h1>
        {subtitle && <p className="mb-5 mt-1 text-muted">{subtitle}</p>}
        {children}
      </div>
      {footer && <p className="mt-4 text-center text-muted">{footer}</p>}
    </div>
  );
}