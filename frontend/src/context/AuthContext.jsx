import { createContext, useState, useEffect } from "react";
import { loginUser } from "../services/api.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("grt_nexus_token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem("grt_nexus_user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("grt_nexus_token", token);
    } else {
      localStorage.removeItem("grt_nexus_token");
      localStorage.removeItem("grt_nexus_user");
    }
  }, [token]);

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("grt_nexus_user", JSON.stringify(data.user));
      return data;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
