import { Children, cloneElement, useState } from "react";

const tabs = ["All", "Submitted", "Under review", "Shortlisted", "Interview", "Offer", "Rejected"];

/*
  Wrap <ApplicationCard /> elements in this. Handles the status tabs and Withdraw.
  When the backend is ready, fetch here, call the withdraw endpoint, and map data into cards.
*/
export default function ApplicationList({ children }) {
  const [filter, setFilter] = useState("All");
  const [withdrawn, setWithdrawn] = useState([]);

  const all = Children.toArray(children).filter((c) => !withdrawn.includes(c.props.id));
  const count = (tab) => (tab === "All" ? all.length : all.filter((c) => c.props.status === tab).length);
  const visible = all.filter((c) => filter === "All" || c.props.status === filter);

  const withdraw = (id) => {
    if (window.confirm("Withdraw this application? This cannot be undone.")) setWithdrawn([...withdrawn, id]);
  };

  return (
    <>
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        {tabs.map((tab) => (
          <button
            key={tab}
            aria-pressed={filter === tab}
            onClick={() => setFilter(tab)}
            className={`cursor-pointer rounded-full border px-3.5 py-1 font-semibold ${
              filter === tab ? "border-brand bg-brand text-white" : "border-line bg-white hover:bg-slate-100"
            }`}
          >
            {tab} ({count(tab)})
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="space-y-4">
          {visible.map((card) => cloneElement(card, { onWithdraw: () => withdraw(card.props.id) }))}
        </div>
      ) : (
        <p className="rounded-lg border border-line bg-white p-10 text-center">
          {filter === "All" ? "You have not applied to any internships yet." : `No applications with status "${filter}".`}
        </p>
      )}
    </>
  );
}