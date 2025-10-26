// ================== IMPORTS ==================
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Contexto de auth
import { AuthProvider } from './context/AuthContext';

// Componentes principales
import Navbar from "./components/common/Navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import CarreraDetail from "./pages/carrera/CarreraDetail";
import RutaProtegida from "./components/features/rutas/RutaProtegida";
import AdminPage from "./pages/admin/AdminPage";
import Perfil from "./pages/perfil/Perfil";

// ================== COMPONENTE PRINCIPAL ==================
function AppContent() {
  // 🌓 Tema: inicial desde localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Aplica clase al body + guarda en localStorage
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path="/" element={<Navigate to="/iniciar-sesion" />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registrarse" element={<Register />} />

        {/* Panel visible a cualquier logueado */}
        <Route
          path="/panel"
          element={
            <RutaProtegida>
              <Dashboard />
            </RutaProtegida>
          }
        />

        {/* Carreras: solo logueados */}
        <Route
          path="/carrera/:id"
          element={
            <RutaProtegida>
              <CarreraDetail />
            </RutaProtegida>
          }
        />

        {/* Perfil: solo logueados */}
        <Route
          path="/perfil"
          element={
            <RutaProtegida>
              <Perfil />
            </RutaProtegida>
          }
        />

        {/* Solo admins */}
        <Route
          path="/admin"
          element={
            <RutaProtegida rolRequerido="ROLE_ADMIN">
              <AdminPage />
            </RutaProtegida>
          }
        />
      </Routes>

      {/* Contenedor global de notificaciones */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme={darkMode ? "dark" : "light"}
      />
    </>
  );
}

// ================== WRAPPER CON PROVIDER ==================
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

