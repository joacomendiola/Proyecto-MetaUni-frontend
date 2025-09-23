// ================== IMPORTS ==================
import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { login as loginApi } from "../services/Api"; // 🔗 usamos tu api.js
import { useAuth } from "../context/AuthContext";
import "../index.css";

// ================== LOGIN ==================
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  // Manejo del login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!correo.includes("@")) {
      return toast.error("⚠️ Correo inválido");
    }
    if (password.length < 6) {
      return toast.error("⚠️ La contraseña debe tener al menos 6 caracteres");
    }

    try {
      const data = await loginApi(correo, password);

      if (data.token) {
        // 🔹 Guardar en contexto
        login({
          email: correo,
          rol: data.rol || "ROLE_USER", // si el backend devuelve el rol
          token: data.token,
        });
        toast.success("✅ Inicio de sesión exitoso!");
      } else {
        throw new Error("Credenciales inválidas");
      }
    } catch (err) {
      toast.error("❌ " + err.message);
    }
  };

  return (
    <div className="card">
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleLogin}>
        {/* Correo */}
        <div className="input-group">
          <FaUserAlt className="input-icon" />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        {/* Contraseña */}
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        <button type="submit" className="btn">Entrar</button>
      </form>
    </div>
  );
}