// ================== IMPORTS ==================
import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/api";   
import { useAuth } from "../../context/AuthContext";
import "../../index.css";

// ================== LOGIN ==================
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginApi(email, password);

      if (data.token) {
        const userData = {
          id: data.id,           
          email: data.email,
          rol: data.rol || "ROLE_USER",
          token: data.token,
          nombre: data.nombre || ''
        };
        login(userData);
        toast.success("✅ Inicio de sesión exitoso!");
        navigate("/panel");
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