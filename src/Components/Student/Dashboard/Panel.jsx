// White card with a title and an optional action link/button.
export default function Panel({ title, action, children, className = "" }) {
  return (
    <section className={`rounded-lg border border-line bg-white p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}