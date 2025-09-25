// ================== IMPORTS ==================
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  getMateriasByCarrera,
  createMateriaInCarrera,
  updateMateria,
  deleteMateria,
} from "../services/Api";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // 🔹 animación
import "../index.css";

// ================== DETALLE DE CARRERA ==================
export default function CarreraDetail() {
  const { id } = useParams();

  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevaMateria, setNuevaMateria] = useState("");
  const [materiaAEliminar, setMateriaAEliminar] = useState(null);

  useEffect(() => {
    getMateriasByCarrera(id)
      .then(setMaterias)
      .catch((err) => console.error("⚠️ Error al obtener materias:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // ================== AGREGAR MATERIA ==================
  async function handleAgregarMateria() {
    if (!nuevaMateria) return;
    try {
      const materia = await createMateriaInCarrera(id, {
        nombre: nuevaMateria,
        notaFinal: 0,
      });
      setMaterias([...materias, materia]);
      setNuevaMateria("");
      toast.success("✅ Materia creada con éxito");
    } catch (err) {
      console.error("❌ Error al crear materia:", err);
      toast.error("Error al crear materia");
    }
  }

  // ================== ACTUALIZAR NOTA ==================
  async function handleActualizarNota(materia, nuevaNota) {
    try {
      const actualizada = await updateMateria(materia.id, {
        ...materia,
        notaFinal: parseFloat(nuevaNota),
      });
      setMaterias(materias.map((m) => (m.id === materia.id ? actualizada : m)));
    } catch (err) {
      console.error("⚠️ Error actualizando nota:", err);
      toast.error("Error al actualizar nota");
    }
  }

  // ================== ELIMINAR MATERIA ==================
  async function handleEliminarConfirmado() {
    if (!materiaAEliminar) return;
    try {
      await deleteMateria(materiaAEliminar.id);
      setMaterias((prev) =>
        prev.filter((m) => m.id !== materiaAEliminar.id)
      );
      toast.success(`🗑️ Materia "${materiaAEliminar.nombre}" eliminada`);
      setMateriaAEliminar(null);
    } catch (err) {
      console.error("❌ Error eliminando materia:", err);
      toast.error("Error al eliminar materia");
    }
  }

  if (loading) {
    return <LoadingSpinner text="Cargando tus materias..." />;
  }

  // ================== PROMEDIO GENERAL ==================
  const promedio =
    materias.length > 0
      ? materias.reduce((acc, m) => acc + (m.notaFinal || 0), 0) /
        materias.length
      : 0;

  const getNotaColor = (nota) => {
    if (nota >= 9) return "#22c55e"; // verde
    if (nota >= 7) return "#facc15"; // amarillo
    return "#ef4444"; // rojo
  };

  return (
    <div className="career-detail">
      <h2 className="career-title">Materias</h2>

      {/*  FORMULARIO NUEVA MATERIA */}
      <div className="add-materia">
        <input
          type="text"
          value={nuevaMateria}
          onChange={(e) => setNuevaMateria(e.target.value)}
          placeholder="Nombre de materia"
        />
        <button onClick={handleAgregarMateria}>Agregar</button>
      </div>

      {/*  LISTADO DE MATERIAS */}
      <div className="materias-container">
        {materias.map((m) => (
          <div key={m.id} className="materia-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>{m.nombre}</h3>
              <FaTrash
                style={{ cursor: "pointer", color: "#ef4444" }}
                onClick={() => setMateriaAEliminar(m)}
              />
            </div>

            <p>
              Nota final:{" "}
              <span style={{ color: getNotaColor(m.notaFinal || 0) }}>
                {m.notaFinal ?? "N/A"}
              </span>
            </p>

            {/*  INPUT PARA EDITAR NOTA */}
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              defaultValue={m.notaFinal || 0}
              onBlur={(e) => handleActualizarNota(m, e.target.value)}
            />
            <small>Editar nota y salir del input para guardar</small>
          </div>
        ))}
      </div>

      <p className="promedio">
        Promedio general: {materias.length > 0 ? promedio.toFixed(2) : "N/A"}
      </p>

      {/* ================== MODAL ELEGANTE DE ELIMINAR MATERIA ================== */}
      <AnimatePresence>
        {materiaAEliminar && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "12px",
                width: "400px",
                textAlign: "center",
              }}
            >
              <h3>¿Eliminar materia?</h3>
              <p>
                Estás por eliminar <b>{materiaAEliminar.nombre}</b>.  
                Esta acción no se puede deshacer.
              </p>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  gap: "15px",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => setMateriaAEliminar(null)}
                  style={{
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#6b7280",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEliminarConfirmado}
                  style={{
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#ef4444",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
