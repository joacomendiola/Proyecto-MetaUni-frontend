// ================== IMPORTS ==================
import React, { useState } from "react";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register as registerApi } from "../../services/api"; 
import "../../index.css";

// ================== REGISTRO ==================
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Manejo del registro con validaciones
  const handleRegister = async (e) => {
    e.preventDefault();

    if (nombre.trim().length < 3) {
      return toast.error("⚠️ El nombre debe tener al menos 3 caracteres");
    }
    if (!email.includes("@")) {
      return toast.error("⚠️ Correo inválido");
    }
    if (password.length < 6) {
      return toast.error("⚠️ La contraseña debe tener al menos 6 caracteres");
    }

    try {
      const data = await registerApi({
        nombre,
        email,
        password,
      });

      if (data.id || data.email) {
        toast.success("✅ Registro exitoso! Ahora inicia sesión.");
        navigate("/iniciar-sesion");
      } else {
        throw new Error("Error al registrar usuario");
      }
    } catch (err) {
      console.error("❌ Error en REGISTER:", err);
      toast.error("❌ " + err.message);
    }
  };

  return (
    <div className="card">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <FaUserAlt className="input-icon" />
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
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
        <button type="submit" className="btn">Registrarse</button>
      </form>
    </div>
  );
}