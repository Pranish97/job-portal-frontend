import { Link } from "react-router-dom";
import AuthCard from "../../Components/Reuseable/AuthCard";
import LoginForm from "../../Components/User/Reuseable/LoginForm";

export default function Login() {
  return (
    <AuthCard
      title="Log in"
      subtitle="Welcome back to MeroAvasar."
      footer={<>New here? <Link to="/register" className="font-semibold text-brand">Create an account</Link></>}
    >
      <LoginForm />
    </AuthCard>
  );
}