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
    console.log("🔍 Guardando usuario en contexto:", JSON.stringify(data, null, 2));
    const userData = {
      id: data.id, //  Guardar el ID del usuario
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

  // 🔹 Actualizar usuario en contexto
const updateUser = (newData) => {
  setUser(prevUser => {
    const updatedUser = { ...prevUser, ...newData };
    
    //  GUARDAR EN LOCALSTORAGE TAMBIÉN
    localStorage.setItem("user", JSON.stringify(updatedUser));
    
    return updatedUser;
  });
};

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}> {/* ✅ AGREGAR updateUser */}
      {children}
    </AuthContext.Provider>
  );
}

// ================== HOOK ==================
export function useAuth() {
  return useContext(AuthContext);
}