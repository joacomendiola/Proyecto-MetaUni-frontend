// ================== IMPORTS ==================
import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { login as loginApi } from "../services/Api";   
import { useAuth } from "../context/AuthContext";
import "../index.css";

// ================== LOGIN ==================
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
  e.preventDefault();
  console.log("👉 Enviando datos LOGIN:", { email, password });

  try {
    const data = await loginApi(email, password);
    console.log("✅ Respuesta COMPLETA del backend:", data); 

    if (data.token) {
      // GUARDAR INMEDIATAMENTE en localStorage
      const userData = {
        id: data.id,           
        email: data.email,
        rol: data.rol || "ROLE_USER",
        token: data.token,
        nombre: data.nombre || ''
      };
      
      console.log("🔍 UserData a guardar:", userData); // Verificar que tenga ID
      localStorage.setItem("user", JSON.stringify(userData));
      login(userData);
      toast.success("✅ Inicio de sesión exitoso!");
    } else {
      throw new Error("Credenciales inválidas");
    }
  } catch (err) {
    console.error("❌ Error en LOGIN:", err);
    toast.error("❌ " + err.message);
  }
};

  return (
    <div className="card">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <FaUserAlt className="input-icon" />
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
        <button type="submit" className="btn">Entrar</button>
      </form>
    </div>
  );
}