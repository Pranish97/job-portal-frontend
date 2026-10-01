import { Link } from "react-router-dom";
import AuthCard from "../../Components/Reuseable/AuthCard";
import RegisterForm from "../../Components/User/Reuseable/RegisterForm";

export default function Register() {
  return (
    <AuthCard
      title="Create your account"
      subtitle="Students find internships. Employers post them."
      footer={<>Already have an account? <Link to="/login" className="font-semibold text-brand">Log in</Link></>}
    >
      <RegisterForm />
    </AuthCard>
  );
}