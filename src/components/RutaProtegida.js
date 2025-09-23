// ================== IMPORTS ==================
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ usamos el contexto

// ================== RUTA PROTEGIDA ==================
export default function RutaProtegida({ children, rolRequerido }) {
  const { user } = useAuth(); // ✅ ahora viene del contexto

  // Si no hay usuario → redirigir al login
  if (!user) {
    return <Navigate to="/iniciar-sesion" />;
  }

  // Si se requiere rol específico y el usuario no lo tiene
  if (rolRequerido && user.rol !== rolRequerido) {
    return <Navigate to="/panel" />;
  }

  // Si pasa las validaciones → renderizar la ruta
  return children;
}