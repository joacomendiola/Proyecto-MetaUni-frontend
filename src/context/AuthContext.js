// ================== IMPORTS ==================
import React, { createContext, useContext, useState, useEffect } from "react";

// ================== CREAR CONTEXTO ==================
const AuthContext = createContext();

// ================== PROVIDER ==================
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // 🔹 Login: guarda info + token
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ================== HOOK ==================
export function useAuth() {
  return useContext(AuthContext);
}

