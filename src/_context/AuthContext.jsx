import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on first app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const loginAsGuest = () => {
    const guestUser = {
      user_id: "0",
      username: "Guest",
      role: "guest"
    };
    localStorage.setItem("user", JSON.stringify(guestUser));
    setUser(guestUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loginAsGuest, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook (important for clean usage)
export function useAuth() {
  return useContext(AuthContext);
}
