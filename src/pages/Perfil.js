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
  const [loading, setLoading] = useState(false);

  // Función async para guardar - VERSIÓN SIMPLE QUE FUNCIONA
  const handleSave = async (e) => {
    e.preventDefault();
    
    if (loading) return;
    setLoading(true);

    // Validaciones básicas
    if (editNombre.trim().length < 3) {
      toast.error("⚠️ El nombre debe tener al menos 3 caracteres");
      setLoading(false);
      return;
    }
    if (!editCorreo.includes("@")) {
      toast.error("⚠️ Correo inválido");
      setLoading(false);
      return;
    }

    try {
      // Llamar al backend para actualizar
      await updateUsuario(user.id, {
        nombre: editNombre,
        email: editCorreo
      });

      // ✅ ACTUALIZACIÓN INMEDIATA - Sin verificación compleja
      updateUser({
        nombre: editNombre,
        email: editCorreo
      });
      
      toast.success("✅ Perfil actualizado correctamente");

    } catch (err) {
      console.error("❌ Error actualizando perfil:", err);
      toast.error("❌ Error al actualizar el perfil");
    } finally {
      setLoading(false);
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
            disabled={loading}
          />
        </div>

        {/* Correo */}
        <div className="input-group">
          <input
            type="email"
            value={editCorreo}
            onChange={(e) => setEditCorreo(e.target.value)}
            placeholder="Correo electrónico"
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className="btn"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      <button
        onClick={logout}
        className="btn"
        style={{ background: "#ef4444" }}
        disabled={loading}
      >
        Cerrar sesión
      </button>
    </div>
  );
}