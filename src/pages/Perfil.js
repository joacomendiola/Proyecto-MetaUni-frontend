// ================== IMPORTS ==================
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { updateUsuario } from "../services/Api"; 
import "../index.css";

// ================== PERFIL ==================
export default function Perfil() {
  const { user, logout } = useAuth();

  // Inputs para edición
  const [editNombre, setEditNombre] = useState(user?.nombre || "");
  const [editCorreo, setEditCorreo] = useState(user?.email || "");

  // Función async para guardar
  const handleSave = async (e) => {
  e.preventDefault();

  if (editNombre.trim().length < 3) {
    return toast.error("⚠️ El nombre debe tener al menos 3 caracteres");
  }
  if (!editCorreo.includes("@")) {
    return toast.error("⚠️ Correo inválido");
  }

  try {
    // Llamar al backend para actualizar
    await updateUsuario(user.id, {
      nombre: editNombre,
      email: editCorreo
    });

    // ✅ USAR updateUser DEL CONTEXTO EN LUGAR DE MANIPULAR LOCALSTORAGE DIRECTAMENTE
    updateUser({
      nombre: editNombre,
      email: editCorreo
    });
    
    toast.success("✅ Perfil actualizado correctamente");

  } catch (err) {
    console.error("❌ Error actualizando perfil:", err);
    toast.error("❌ Error al actualizar el perfil");
  }
};

  return (
    <div className="card">
      <h2>Mi Perfil</h2>

      <form onSubmit={handleSave}>
        {/* Nombre */}
        <div className="input-group">
          <input
            type="text"
            value={editNombre}
            onChange={(e) => setEditNombre(e.target.value)}
            placeholder="Nombre completo"
          />
        </div>

        {/* Correo */}
        <div className="input-group">
          <input
            type="email"
            value={editCorreo}
            onChange={(e) => setEditCorreo(e.target.value)}
            placeholder="Correo electrónico"
          />
        </div>

        <button type="submit" className="btn">
          Guardar cambios
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      <button
        onClick={logout}
        className="btn"
        style={{ background: "#ef4444" }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}