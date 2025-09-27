// ================== IMPORTS ==================
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { updateUsuario } from "../services/Api"; 
import "../index.css";

// ================== PERFIL ==================
export default function Perfil() {
  const { user, logout, updateUser } = useAuth();

  // Inputs para edición
  const [editNombre, setEditNombre] = useState(user?.nombre || "");
  const [editCorreo, setEditCorreo] = useState(user?.email || "");

  // Función async para guardar
  const handleSave = async (e) => {
  e.preventDefault();

  try {
    const response = await updateUsuario(user.id, {
      nombre: editNombre,
      email: editCorreo
    });

    // VERIFICAR si cambió el email
    if (response.emailCambiado) {
      // Si cambió el email, hacer LOGOUT forzado
      toast.success("✅ Email actualizado. Por favor vuelve a iniciar sesión");
      setTimeout(() => {
        logout(); // Cerrar sesión
      }, 2000);
    } else {
      // Si solo cambió el nombre, actualizar normal
      updateUser({
        nombre: editNombre,
        email: editCorreo
      });
      toast.success("✅ Perfil actualizado correctamente");
    }

  } catch (err) {
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