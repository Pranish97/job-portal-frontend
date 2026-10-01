import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormField from "../../Reuseable/FormField";
import Button from "../../Reuseable/Button";
import { fetchRoles, userRegister, resetRegisterState } from "../../../store/user-slice/auth-slice/userAuthSlice"; 

const empty = { full_name: "", email: "", password: "", confirm: "", role_id: "" };

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roles, isRolesLoading, rolesError, isRegistering, registerError, registerSuccess } =
    useSelector((s) => s.userAuth);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchRoles());
    return () => dispatch(resetRegisterState());
  }, [dispatch]);

  useEffect(() => {
    if (registerSuccess) navigate("/login", { state: { registered: true } });
  }, [registerSuccess, navigate]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.full_name.trim()) e.full_name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.password.length < 8) e.password = "Use at least 8 characters.";
    if (form.confirm !== form.password) e.confirm = "Passwords do not match.";
    if (!form.role_id) e.role_id = "Choose a role.";
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;
    const { confirm, ...payload } = form; // confirm is checked here only
    dispatch(userRegister(payload));
  };

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      {registerError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800">{registerError}</p>}

      <FormField id="full_name" label="Full name" autoComplete="name" value={form.full_name} onChange={change} error={errors.full_name} />
      <FormField id="email" label="Email" type="email" autoComplete="email" value={form.email} onChange={change} error={errors.email} />

      <div>
        <label htmlFor="role_id" className="mb-1 block font-semibold">I am a</label>
        <select
          id="role_id"
          name="role_id"
          value={form.role_id}
          onChange={change}
          disabled={isRolesLoading}
          className={`w-full rounded-lg border bg-white px-4 py-2.5 ${errors.role_id ? "border-red-600" : "border-line"}`}
        >
          <option value="">{isRolesLoading ? "Loading roles..." : "Select role"}</option>
          {roles.map((r) => <option key={r.role_id} value={r.role_id}>{r.role_name}</option>)}
        </select>
        {(errors.role_id || rolesError) && (
          <p role="alert" className="mt-1 text-sm text-red-700">{errors.role_id || rolesError}</p>
        )}
      </div>

      <FormField id="password" label="Password" type="password" autoComplete="new-password" value={form.password} onChange={change} error={errors.password} />
      <FormField id="confirm" label="Confirm password" type="password" autoComplete="new-password" value={form.confirm} onChange={change} error={errors.confirm} />

      <Button type="submit" className="w-full disabled:opacity-60" disabled={isRegistering}>
        {isRegistering ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}