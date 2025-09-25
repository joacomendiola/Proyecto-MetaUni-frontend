// ================== IMPORTS ==================
import React, { useState } from "react";
import { updateMateria, deleteMateria } from "../services/Api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

// ================== COMPONENTE ==================
export default function EditarMateria({ materia, onMateriaActualizada, onMateriaEliminada }) {
  const { user } = useAuth();
  const [nota, setNota] = useState(materia.notaFinal || 0);

  // ================== ACTUALIZAR NOTA ==================
  const handleBlur = async () => {
    try {
      const actualizada = await updateMateria(
        materia.id,
        { ...materia, notaFinal: parseFloat(nota) || 0 },
        user.token
      );
      onMateriaActualizada(actualizada);
      toast.success("✅ Nota actualizada");
    } catch (err) {
      console.error("❌ Error actualizando nota:", err);
      toast.error("Error al actualizar nota");
    }
  };

  // ================== ELIMINAR MATERIA ==================
  const handleEliminar = async () => {
    if (!window.confirm(`¿Seguro que deseas eliminar "${materia.nombre}"?`)) return;
    try {
      await deleteMateria(materia.id, user.token);
      onMateriaEliminada(materia.id);
      toast.success("🗑️ Materia eliminada");
    } catch (err) {
      console.error("❌ Error eliminando materia:", err);
      toast.error("Error al eliminar materia");
    }
  };

  const getNotaColor = (nota) => {
    if (nota >= 9) return "#22c55e";
    if (nota >= 7) return "#facc15";
    return "#ef4444";
  };

  return (
    <div className="materia-card">
      <h3>{materia.nombre}</h3>
      <p>
        Nota final:{" "}
        <span style={{ color: getNotaColor(nota) }}>
          {nota ?? "N/A"}
        </span>
      </p>

      {/* INPUT PARA NOTA */}
      <input
        type="number"
        min="0"
        max="10"
        step="0.1"
        value={nota}
        onChange={(e) => setNota(e.target.value)}
        onBlur={handleBlur}
      />
      <small>Editar nota y salir del input para guardar</small>

      {/* BOTÓN ELIMINAR */}
      <button
        onClick={handleEliminar}
        style={{
          marginTop: "10px",
          padding: "6px 12px",
          background: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Eliminar
      </button>
    </div>
  );
}
