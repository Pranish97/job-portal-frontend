// Label + input + error message. Pass any input props (type, value, onChange, ...).
export default function FormField({ label, id, error, ...inputProps }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-semibold">{label}</label>
      <input
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-lg border px-4 py-2.5 ${error ? "border-red-600" : "border-line"}`}
        {...inputProps}
      />
      {error && <p role="alert" className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  );
}