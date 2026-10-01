import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import FormField from "../../Reuseable/FormField";
import Button from "../../Reuseable/Button";
import { userLogin, resetLoginError } from "../../../store/user-slice/auth-slice/userAuthSlice"; 

const homeFor = { Student: "/student/dashboard", Employer: "/employer/dashboard" };

export default function LoginForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, user, isLoading, error } = useSelector((s) => s.userAuth);
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => () => dispatch(resetLoginError()), [dispatch]);

  if (isAuthenticated) return <Navigate to={homeFor[user?.role_name] ?? "/"} replace />;

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    dispatch(userLogin(form));
  };

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      {location.state?.registered && (
        <p role="status" className="rounded-lg bg-green-50 p-3 text-green-800">
          Account created. Log in to continue.
        </p>
      )}
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800">{error}</p>}

      <FormField id="email" label="Email" type="email" autoComplete="email" value={form.email} onChange={change} required />
      <FormField id="password" label="Password" type="password" autoComplete="current-password" value={form.password} onChange={change} required />

      <Button type="submit" className="w-full disabled:opacity-60" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
}