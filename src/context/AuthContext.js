// ================== IMPORTS ==================
import React, { createContext, useContext, useState, useEffect } from "react";

// ================== CREAR CONTEXTO ==================
const AuthContext = createContext();

// ================== PROVIDER ==================
export function AuthProvider({ children }) {
  // Estado global del usuario (inicial desde localStorage si existe)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 🔹 Guardar cambios en localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // 🔹 Login genérico (se usará con backend más adelante)
  const login = (userData) => {
    setUser(userData);
  };

  // 🔹 Mock login rápido (USER)
  const loginUser = () => {
    login({
      nombre: "Juan Pérez",
      email: "juan@example.com",
      rol: "ROLE_USER",
    });
  };

  // 🔹 Mock login rápido (ADMIN)
  const loginAdmin = () => {
    login({
      nombre: "Ana Admin",
      email: "admin@example.com",
      rol: "ROLE_ADMIN",
    });
  };

  // 🔹 Logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, loginUser, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ================== HOOK ==================
export function useAuth() {
  return useContext(AuthContext);
}

