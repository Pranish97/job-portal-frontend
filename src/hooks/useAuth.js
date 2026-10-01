import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../store/user-slice/auth-slice/userAuthSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const raw = useSelector((state) => state.userAuth.user);

  const user = raw
    ? { ...raw, name: raw.full_name, role: raw.role_name?.toLowerCase() }
    : null;

  return { user, logout: () => dispatch(userLogout()) };
}