import { useAuth } from "../../../hooks/useAuth";
import ProgressBar from "../Reuseable/ProgressBar";

export default function ProfileHeader({ completion }) {
  const { user } = useAuth();
  return (
    <div className="flex flex-wrap items-center gap-5 rounded-2xl bg-ink p-7 text-white">
      <div className="grid size-16 place-items-center rounded-full bg-marigold font-display text-2xl font-bold text-ink" aria-hidden="true">
        {user?.name?.[0]}
      </div>
      <div className="min-w-48 flex-1">
        <h1 className="font-display text-2xl font-bold">{user?.name}</h1>
        <p className="text-slate-300">{user?.email} | Student</p>
      </div>
      <div className="w-full rounded-lg bg-white p-4 text-ink sm:w-64">
        <ProgressBar label="Profile completion" percent={completion} />
      </div>
    </div>
  );
}