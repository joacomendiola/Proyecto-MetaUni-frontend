// ================== IMPORTS ==================
import React from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "../index.css";

// ================== NAVBAR ==================
export default function Navbar({ darkMode, setDarkMode }) {
  const { user, loginUser, loginAdmin, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1 className="logo">MetaUni</h1>
      <div className="nav-links">
        {!user ? (
          <>
            <Link to="/iniciar-sesion">Iniciar Sesión</Link>
            <Link to="/registrarse">Registrarse</Link>

            {/* 🔹 Botones de prueba de roles */}
            <button className="btn" style={{ width: "auto" }} onClick={loginUser}>
              Login USER
            </button>
            <button className="btn" style={{ width: "auto" }} onClick={loginAdmin}>
              Login ADMIN
            </button>
          </>
        ) : (
          <>
            <Link to="/panel">Panel</Link>
            {user.rol === "ROLE_ADMIN" && (
              <Link to="/admin">Administrar usuarios</Link>
            )}

            {/* Perfil */}
            <Link to="/perfil" className="user-profile">
              <FaUserCircle size={20} />
              <span>{user.nombre}</span>
            </Link>

            <button onClick={logout} className="logout-btn">
              Cerrar sesión
            </button>
          </>
        )}

        {/* Toggle tema */}
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}
