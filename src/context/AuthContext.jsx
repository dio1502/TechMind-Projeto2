import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const navigate = useNavigate();

  const login = (email, password) => {
    const users = [
      { email: "admin@admin.com", password: "admin123", role: "admin" },
      { email: "user@user.com", password: "user123", role: "user" },
    ];

    const found = users.find(u => u.email === email && u.password === password);

    if (found) {
      setUser(found);
      localStorage.setItem("user", JSON.stringify(found));
      // Se for admin, vai para /admin; se user, vai para /user
      if (found.role === "admin") navigate("/homepage");
      else navigate("/user");
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/"); // volta para a página de login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
