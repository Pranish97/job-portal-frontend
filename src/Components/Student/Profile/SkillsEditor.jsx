import { useState } from "react";
import Button from "../../Reuseable/Button";

export default function SkillsEditor({ initial = [] }) {
  const [skills, setSkills] = useState(initial);
  const [value, setValue] = useState("");

  const add = (e) => {
    e.preventDefault();
    const skill = value.trim();
    const exists = skills.some((s) => s.toLowerCase() === skill.toLowerCase());
    if (skill && !exists) setSkills([...skills, skill]);
    setValue("");
  };

  return (
    <div>
      <ul className="mb-4 flex flex-wrap gap-2">
        {skills.length === 0 && <li className="text-muted">No skills added yet.</li>}
        {skills.map((s) => (
          <li key={s} className="flex items-center gap-1.5 rounded-full bg-blue-50 py-1 pl-3 pr-1.5 text-brand">
            {s}
            <button onClick={() => setSkills(skills.filter((x) => x !== s))} aria-label={`Remove ${s}`} className="grid size-5 cursor-pointer place-items-center rounded-full hover:bg-blue-200">
              x
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={add} className="flex gap-2">
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Add a skill, e.g. Git" aria-label="Add a skill" className="min-w-0 flex-1 rounded-lg border border-line px-3 py-2" />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
}