import { useState } from "react";

const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export default function FileUpload({ label, initialName = "", maxMB = 5 }) {
  const [fileName, setFileName] = useState(initialName);
  const [error, setError] = useState("");

  const pick = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!allowed.includes(file.type)) return setError("Upload a PDF or Word document.");
    if (file.size > maxMB * 1024 * 1024) return setError(`File must be under ${maxMB} MB.`);
    setError("");
    setFileName(file.name);
  };

  return (
    <div>
      {fileName ? (
        <div className="mb-3 flex items-center justify-between gap-3 rounded-lg bg-slate-50 p-3">
          <p className="break-all font-semibold">{fileName}</p>
          <button onClick={() => setFileName("")} className="cursor-pointer text-sm font-semibold text-red-700 hover:underline">Remove</button>
        </div>
      ) : (
        <p className="mb-3 text-muted">No file uploaded.</p>
      )}
      <label htmlFor="file-upload" className="mb-1 block text-sm font-semibold">{fileName ? `Replace ${label}` : `Upload ${label}`}</label>
      <input
        id="file-upload" type="file" accept=".pdf,.doc,.docx" onChange={pick}
        className="w-full text-sm file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-brand file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-brand-dark"
      />
      <p className="mt-1 text-sm text-muted">PDF or Word, up to {maxMB} MB.</p>
      {error && <p role="alert" className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  );
}