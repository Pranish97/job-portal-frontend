import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    navigate(`/internships?q=${encodeURIComponent(query)}`);
  };
  return (
    <form onSubmit={submit} role="search" className="my-6 flex max-w-lg gap-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by role, skill or company"
        aria-label="Search internships"
        className="flex-1 rounded-lg border border-line px-4 py-2.5"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}