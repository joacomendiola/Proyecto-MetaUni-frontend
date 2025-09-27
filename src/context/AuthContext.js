// ================== IMPORTS ==================
import React, { createContext, useContext, useState, useEffect } from "react";

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
  const login = (data) => {
    console.log("🔍 Guardando usuario en contexto:", data);
    const userData = {
      email: data.email,
      rol: data.rol,
      token: data.token,
      nombre: data.nombre || ''
    };
    setUser(userData);
  };

  // 🔹 Logout
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
