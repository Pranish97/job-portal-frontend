import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Static for now. To preview other views, change null to:
  // { name: "Pratistha", role: "student" } | { name: "Acme", role: "employer" } | { name: "Admin", role: "admin" }
  const [user, setUser] = useState(null);
  const logout = () => setUser(null);
  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);