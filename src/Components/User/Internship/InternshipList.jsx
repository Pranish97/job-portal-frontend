import { Children } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../../Reuseable/Button";

/*
  Wrap <InternshipCard /> elements in this component. It reads each card's props
  (title, company, skills, category, type, location) to build the filters and to
  hide cards that don't match. Filters live in the URL (?q=react&type=Remote), so
  Home's search box and category chips work with it.
  When the backend is ready, fetch here and map the data into cards instead.
*/
const selectCls = "rounded-lg border border-line bg-white px-3 py-2.5";

export default function InternshipList({ children }) {
  const [params, setParams] = useSearchParams();
  const cards = Children.toArray(children);

  const get = (key) => params.get(key) ?? "";
  const set = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };
  const options = (key) => [...new Set(cards.map((c) => c.props[key]).filter(Boolean))].sort();

  const q = get("q").trim().toLowerCase();
  const visible = cards.filter(({ props: p }) => {
    const text = `${p.title} ${p.company} ${(p.skills ?? []).join(" ")}`.toLowerCase();
    return (
      (!q || text.includes(q)) &&
      (!get("category") || p.category === get("category")) &&
      (!get("type") || p.type === get("type")) &&
      (!get("location") || p.location === get("location"))
    );
  });
  const hasFilters = [...params.keys()].length > 0;

  const filters = [
    ["category", "All categories", options("category")],
    ["type", "All types", options("type")],
    ["location", "All locations", options("location")],
  ];

  return (
    <>
      <div className="mb-6 grid gap-3 md:grid-cols-[2fr_1fr_1fr_1fr]" role="search">
        <input
          value={get("q")}
          onChange={(e) => set("q", e.target.value)}
          placeholder="Search by role, skill or company"
          aria-label="Search internships"
          className="rounded-lg border border-line bg-white px-4 py-2.5"
        />
        {filters.map(([key, label, opts]) => (
          <select key={key} value={get(key)} onChange={(e) => set(key, e.target.value)} aria-label={label} className={selectCls}>
            <option value="">{label}</option>
            {opts.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
      </div>

      <p className="mb-4 text-muted" aria-live="polite">
        {visible.length} {visible.length === 1 ? "internship" : "internships"} found
      </p>

      {visible.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible}</div>
      ) : (
        <div className="rounded-lg border border-line bg-white p-10 text-center">
          <p className="mb-3">No internships match these filters.</p>
          {hasFilters && <Button variant="outline" onClick={() => setParams({}, { replace: true })}>Clear filters</Button>}
        </div>
      )}
    </>
  );
}