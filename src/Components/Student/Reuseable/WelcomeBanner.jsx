import { useAuth } from "../../../hooks/useAuth";
import Button from "../../Reuseable/Button";

export default function WelcomeBanner() {
  const { user } = useAuth();
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-ink p-7 text-white">
      <div>
        <h1 className="font-display text-2xl font-bold md:text-3xl">Welcome back, {user?.name}</h1>
        <p className="mt-1 text-slate-300">Your profile is 80% complete. Add a portfolio link to improve your matches.</p>
      </div>
      <Button to="/student/profile" className="border-marigold bg-marigold text-ink hover:bg-amber-500 hover:border-amber-500">
        Complete profile
      </Button>
    </div>
  );
}