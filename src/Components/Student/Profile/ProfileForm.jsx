import { useState } from "react";
import FormField from "../../Reuseable/FormField";
import Button from "../../Reuseable/Button";
import { useAuth } from "../../../hooks/useAuth";

export default function ProfileForm() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    full_name: user?.name ?? "",
    phone: "",
    location: "Kathmandu",
    headline: "BCA student looking for a frontend internship",
    bio: "",
    github: "",
    linkedin: "",
    portfolio: "",
  });
  const [saved, setSaved] = useState(false);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };
  const submit = (e) => {
    e.preventDefault();
    setSaved(true); // static for now; dispatch the update call here later
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="full_name" label="Full name" value={form.full_name} onChange={change} required />
        <FormField id="email" label="Email" type="email" value={user?.email ?? ""} readOnly />
        <FormField id="phone" label="Phone" type="tel" placeholder="98XXXXXXXX" value={form.phone} onChange={change} />
        <FormField id="location" label="Location" value={form.location} onChange={change} />
      </div>
      <FormField id="headline" label="Headline" value={form.headline} onChange={change} maxLength={100} />

      <div>
        <label htmlFor="bio" className="mb-1 block font-semibold">About you</label>
        <textarea
          id="bio" name="bio" rows={4} maxLength={300} value={form.bio} onChange={change}
          placeholder="Tell employers about your interests and goals."
          className="w-full rounded-lg border border-line px-4 py-2.5"
        />
        <p className="text-right text-sm text-muted">{form.bio.length}/300</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <FormField id="github" label="GitHub" type="url" placeholder="https://github.com/..." value={form.github} onChange={change} />
        <FormField id="linkedin" label="LinkedIn" type="url" placeholder="https://linkedin.com/in/..." value={form.linkedin} onChange={change} />
        <FormField id="portfolio" label="Portfolio" type="url" placeholder="https://..." value={form.portfolio} onChange={change} />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit">Save changes</Button>
        {saved && <p role="status" className="text-green-800">Changes saved.</p>}
      </div>
    </form>
  );
}