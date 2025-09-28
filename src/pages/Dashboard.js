// ================== IMPORTS ==================
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCarreras, updateCarrera, deleteCarrera } from "../services/Api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import CrearCarrera from "./CrearCarrera";
import { FaPaintBrush, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // 🔹 animaciones
import "../index.css";

// ================== DASHBOARD ==================
export default function Dashboard() {
  const { user } = useAuth();
  const [carreras, setCarreras] = useState([]);
  const [showPalette, setShowPalette] = useState(null);
  const [carreraAEliminar, setCarreraAEliminar] = useState(null);
  const navigate = useNavigate();

  // 🎨 Paleta de colores
  const colorMap = {
    violeta: "#6366f1",
    verde: "#22c55e",
    rojo: "#ef4444",
    amarillo: "#facc15",
    celeste: "#3b82f6",
    naranja: "#f97316",
    rosa: "#ec4899",
    turquesa: "#06b6d4",
    lima: "#84cc16",
    cyan: "#22d3ee",
    púrpura: "#a855f7",
    gris: "#6b7280",
    marrón: "#92400e",
    aqua: "#0ea5e9",
    magenta: "#d946ef",
  };

  // ================== CARGAR CARRERAS ==================
  useEffect(() => {
    if (user?.token) {
      getCarreras()
        .then((data) => setCarreras(data))
        .catch((err) => {
          console.error("❌ Error cargando carreras:", err);
          toast.error("Error al obtener carreras");
        });
    }
  }, [user]);

  // ================== CUANDO SE CREA UNA CARRERA ==================
  const handleCarreraCreada = (nuevaCarrera) => {
    setCarreras((prev) => [...prev, nuevaCarrera]);
  };

  // ================== CAMBIAR COLOR ==================
  const handleColorChange = async (carrera, color) => {
    try {
      const updated = await updateCarrera(carrera.id, {
        ...carrera,
        colorBarra: color,
      });
      setCarreras((prev) =>
        prev.map((c) => (c.id === carrera.id ? updated : c))
      );
      setShowPalette(null);
    } catch (err) {
      console.error("⚠️ Error actualizando color:", err);
      toast.error("Error al actualizar color");
    }
  };

  // ================== ELIMINAR CARRERA ==================
  const handleEliminarConfirmado = async () => {
  if (!carreraAEliminar) return;

  try {
    const result = await deleteCarrera(carreraAEliminar.id);
    
    
    if (result === true || result?.success) {
      setCarreras((prev) => prev.filter((c) => c.id !== carreraAEliminar.id));
      toast.success(`🗑️ Carrera "${carreraAEliminar.nombre}" eliminada`);
    } else {
      // Si el backend devuelve un mensaje
      toast.success(result?.message || "Carrera eliminada");
      setCarreras((prev) => prev.filter((c) => c.id !== carreraAEliminar.id));
    }
    
    setCarreraAEliminar(null);
  } catch (err) {
    console.error("❌ Error eliminando carrera:", err);
    toast.error("Error al eliminar carrera");
  }
};

  return (
    <div className="dashboard" style={{ padding: "20px" }}>
      <h2>Mis Carreras</h2>

      {/*  Formulario para agregar carrera */}
      <CrearCarrera onCarreraCreada={handleCarreraCreada} />

      {/*  Lista de carreras */}
      <div style={{ marginTop: "30px" }}>
        {carreras.length === 0 ? (
          <p>No tienes carreras aún.</p>
        ) : (
          carreras.map((c) => {
            const aprobadas = Array.isArray(c.materias)
              ? c.materias.filter((m) => m.notaFinal >= 6).length
              : 0;
            const porcentaje =
              c.totalMaterias > 0 ? (aprobadas / c.totalMaterias) * 100 : 0;

            return (
              <div
  key={c.id}
  className="career-card-modern"  
>
                <div
                  className="card-header"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3>{c.nombre}</h3>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <FaPaintBrush
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setShowPalette(showPalette === c.id ? null : c.id)
                      }
                    />
                    <FaTrash
                      style={{ cursor: "pointer", color: "#ef4444" }}
                      onClick={() => setCarreraAEliminar(c)}
                    />
                  </div>
                </div>

                <div className="progress-bar" style={{ margin: "10px 0" }}>
                  <div
                    className="progress"
                    style={{
                      width: `${porcentaje}%`,
                      height: "10px",
                      borderRadius: "5px",
                      background: c.colorBarra || "#6366f1",
                    }}
                  ></div>
                </div>

                <p>
                  {aprobadas}/{c.totalMaterias} materias aprobadas
                </p>
                <p>{porcentaje.toFixed(0)}% completado</p>

                <button
                  onClick={() => navigate(`/carrera/${c.id}`)}
                  style={{
                    marginTop: "10px",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "6px",
                    background: "#6366f1",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Ver Materias
                </button>

                {showPalette === c.id && (
                  <div
                    className="palette-popup"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      marginTop: "10px",
                    }}
                  >
                    {Object.entries(colorMap).map(([nombre, hex]) => (
                      <button
                        key={nombre}
                        className="color-circle"
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          margin: "3px",
                          background: hex,
                          border:
                            c.colorBarra === hex
                              ? "3px solid black"
                              : "1px solid #ccc",
                          cursor: "pointer",
                        }}
                        title={nombre}
                        onClick={() => handleColorChange(c, hex)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ================== MODAL ELEGANTE CON ANIMACIÓN ================== */}
      <AnimatePresence>
        {carreraAEliminar && (
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
              <h3>¿Eliminar carrera?</h3>
              <p>
                Estás por eliminar <b>{carreraAEliminar.nombre}</b>.  
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
                  onClick={() => setCarreraAEliminar(null)}
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

