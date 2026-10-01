import { useState } from "react";
import Button from "../../Reuseable/Button";

const empty = { primary: "", secondary: "" };

// Add/remove list for education, certifications, etc.
export default function EditableList({ initial = [], primaryLabel, secondaryLabel, addLabel, emptyText }) {
  const [items, setItems] = useState(initial);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState(empty);

  const add = (e) => {
    e.preventDefault();
    if (!draft.primary.trim()) return;
    setItems([...items, draft]);
    setDraft(empty);
    setAdding(false);
  };
  const remove = (index) => setItems(items.filter((_, i) => i !== index));
  const field = "w-full rounded-lg border border-line px-3 py-2";

  return (
    <div>
      {items.length === 0 && <p className="text-muted">{emptyText}</p>}
      <ul className="divide-y divide-line">
        {items.map((item, i) => (
          <li key={`${item.primary}-${i}`} className="flex items-start justify-between gap-3 py-3">
            <div>
              <p className="font-semibold">{item.primary}</p>
              <p className="text-sm text-muted">{item.secondary}</p>
            </div>
            <button onClick={() => remove(i)} aria-label={`Remove ${item.primary}`} className="cursor-pointer text-sm font-semibold text-red-700 hover:underline">
              Remove
            </button>
          </li>
        ))}
      </ul>

      {adding ? (
        <form onSubmit={add} className="mt-3 space-y-2">
          <input className={field} placeholder={primaryLabel} aria-label={primaryLabel} value={draft.primary} onChange={(e) => setDraft({ ...draft, primary: e.target.value })} autoFocus />
          <input className={field} placeholder={secondaryLabel} aria-label={secondaryLabel} value={draft.secondary} onChange={(e) => setDraft({ ...draft, secondary: e.target.value })} />
          <div className="flex gap-2">
            <Button type="submit">Add</Button>
            <Button variant="ghost" onClick={() => { setAdding(false); setDraft(empty); }}>Cancel</Button>
          </div>
        </form>
      ) : (
        <Button variant="outline" className="mt-3" onClick={() => setAdding(true)}>{addLabel}</Button>
      )}
    </div>
  );
}