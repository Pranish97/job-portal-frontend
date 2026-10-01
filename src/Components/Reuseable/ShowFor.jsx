import { useAuth } from "../../hooks/useAuth";

// <ShowFor roles={["guest"]}>...</ShowFor>  roles: "guest" | "student" | "employer" | "admin"
export default function ShowFor({ roles, children }) {
  const { user } = useAuth();
  return roles.includes(user?.role ?? "guest") ? children : null;
}