import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { POSTINGS } from "../../Components/Employer/Employerdata";
import { Panel, inputClass } from "../../Components/Employer/EmployerUI";

const BLANK = {
  title: "", location: "", mode: "On-site", duration: "", stipend: "",
  deadline: "", description: "", skills: [],
};

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-800">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-700">{error}</span>}
    </label>
  );
}

/* ---------- Logic component ---------- */
function PostingForm({ initial, isEdit }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [skill, setSkill] = useState("");
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const addSkill = () => {
    const s = skill.trim();
    if (s && !form.skills.some((x) => x.toLowerCase() === s.toLowerCase())) {
      setForm({ ...form, skills: [...form.skills, s] });
    }
    setSkill("");
  };

  const removeSkill = (s) => setForm({ ...form, skills: form.skills.filter((x) => x !== s) });

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Enter a title.";
    if (!form.location.trim()) e.location = "Enter a location.";
    if (!form.deadline) e.deadline = "Choose an application deadline.";
    if (form.description.trim().length < 20) e.description = "Write at least 20 characters.";
    if (form.skills.length === 0) e.skills = "Add at least one required skill. Match scores depend on it.";
    return e;
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;
    // TODO: send `form` to your backend (create or update).
    navigate("/employer/internships");
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <Panel title="Basic details">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Title" error={errors.title}>
              <input className={inputClass} value={form.title} onChange={set("title")} />
            </Field>
          </div>
          <Field label="Location" error={errors.location}>
            <input className={inputClass} value={form.location} onChange={set("location")} />
          </Field>
          <Field label="Work mode">
            <select className={inputClass} value={form.mode} onChange={set("mode")}>
              <option>On-site</option>
              <option>Hybrid</option>
              <option>Remote</option>
            </select>
          </Field>
          <Field label="Duration">
            <input className={inputClass} value={form.duration} onChange={set("duration")} placeholder="For example, 3 months" />
          </Field>
          <Field label="Stipend">
            <input className={inputClass} value={form.stipend} onChange={set("stipend")} placeholder="For example, NPR 15,000 / month" />
          </Field>
          <Field label="Application deadline" error={errors.deadline}>
            <input type="date" className={inputClass} value={form.deadline} onChange={set("deadline")} />
          </Field>
        </div>
      </Panel>

      <Panel title="Description">
        <Field label="What will the intern do?" error={errors.description}>
          <textarea rows={5} className={inputClass} value={form.description} onChange={set("description")} />
        </Field>
      </Panel>

      <Panel title="Required skills">
        <div className="flex gap-2">
          <input
            className={inputClass}
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { e.preventDefault(); addSkill(); }
            }}
            placeholder="Type a skill and press Enter"
            aria-label="Add a required skill"
          />
          <button type="button" onClick={addSkill}
            className="rounded-md border border-gray-300 px-4 text-sm hover:border-gray-500">
            Add skill
          </button>
        </div>
        {errors.skills && <p className="mt-1 text-xs text-red-700">{errors.skills}</p>}
        <div className="mt-3 flex flex-wrap gap-2">
          {form.skills.map((s) => (
            <span key={s} className="inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-sm text-gray-800">
              {s}
              <button type="button" onClick={() => removeSkill(s)} aria-label={`Remove ${s}`}
                className="text-gray-500 hover:text-red-700">×</button>
            </span>
          ))}
        </div>
      </Panel>

      <div className="flex gap-3">
        <button type="submit"
          className="rounded-md bg-blue-700 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800">
          {isEdit ? "Save changes" : "Publish internship"}
        </button>
        <Link to="/employer/internships"
          className="rounded-md border border-gray-300 px-5 py-2 text-sm hover:border-gray-500">
          Cancel
        </Link>
      </div>
    </form>
  );
}

/* ---------- Page (used for /new and /:id/edit) ---------- */
export default function EmployerInternshipForm() {
  const { id } = useParams();
  const existing = id ? POSTINGS.find((p) => p.id === Number(id)) : null;

  if (id && !existing) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-gray-700">This posting doesn't exist.</p>
        <Link to="/employer/internships" className="text-sm text-blue-700 hover:underline">Back to My postings</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        {existing ? "Edit internship" : "Post new internship"}
      </h1>
      <PostingForm initial={existing || BLANK} isEdit={Boolean(existing)} />
    </div>
  );
}