// ================== IMPORTS ==================
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPaintBrush } from "react-icons/fa";
import { getCarreras, updateCarrera, createCarrera } from "../services/Api";
import { useAuth } from "../context/AuthContext";
import "../index.css";

// ================== COMPONENTE PRINCIPAL ==================
export default function Dashboard() {
  const { user } = useAuth();

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

  const [carreras, setCarreras] = useState([]);
  const [showPalette, setShowPalette] = useState(null);

  // estado para nueva carrera
  const [nuevaCarrera, setNuevaCarrera] = useState("");
  const [colorCarrera, setColorCarrera] = useState("#6366f1");

  // ================== CARGAR CARRERAS ==================
  useEffect(() => {
    if (user?.token) {
      getCarreras(user.token)
        .then(setCarreras)
        .catch((err) => console.error("⚠️ Error cargando carreras:", err));
    }
  }, [user]);

  // ================== CAMBIAR COLOR ==================
  const handleColorChange = async (carrera, color) => {
    try {
      const updated = await updateCarrera(
        carrera.id,
        { ...carrera, colorBarra: color },
        user.token
      );
      setCarreras(carreras.map((c) => (c.id === carrera.id ? updated : c)));
      setShowPalette(null);
    } catch (err) {
      console.error("⚠️ Error actualizando color:", err);
    }
  };

  // ================== CREAR CARRERA ==================
  const handleCrearCarrera = async () => {
    if (!nuevaCarrera) return;
    try {
      await createCarrera(
        { nombre: nuevaCarrera, totalMaterias: 0, colorBarra: colorCarrera },
        user.token
      );
      //  recargamos lista desde el backend
      const updated = await getCarreras(user.token);
      setCarreras(updated);

      setNuevaCarrera("");
      setColorCarrera("#6366f1");
    } catch (err) {
      console.error("⚠️ Error creando carrera:", err);
    }
  };

  return (
    <div className="dashboard">
      <h2>Mis Carreras</h2>

      {/* FORMULARIO NUEVA CARRERA */}
      <div className="add-career">
        <input
          type="text"
          value={nuevaCarrera}
          onChange={(e) => setNuevaCarrera(e.target.value)}
          placeholder="Nombre de la carrera"
        />
        <select
          value={colorCarrera}
          onChange={(e) => setColorCarrera(e.target.value)}
        >
          {Object.entries(colorMap).map(([nombre, hex]) => (
            <option key={nombre} value={hex}>
              {nombre}
            </option>
          ))}
        </select>
        <button onClick={handleCrearCarrera}>Agregar Carrera</button>
      </div>

      {/* LISTADO DE CARRERAS */}
      <div className="careers-container">
        {carreras.map((c) => {
          const aprobadas = Array.isArray(c.materias)
            ? c.materias.filter((m) => m.notaFinal >= 6).length
            : 0;
          const porcentaje =
            c.totalMaterias > 0 ? (aprobadas / c.totalMaterias) * 100 : 0;

          return (
            <div key={c.id} className="career-card">
              <div className="card-header">
                <h3>{c.nombre}</h3>
                <FaPaintBrush
                  className="paint-icon"
                  onClick={() =>
                    setShowPalette(showPalette === c.id ? null : c.id)
                  }
                />
              </div>

              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${porcentaje}%`,
                    background: c.colorBarra || "#6366f1",
                  }}
                ></div>
              </div>

              <p>
                {aprobadas}/{c.totalMaterias} materias aprobadas
              </p>
              <p>{porcentaje.toFixed(0)}% completado</p>

              <div className="card-actions">
                <Link to={`/carrera/${c.id}`} className="btn">
                  Ver materias
                </Link>
              </div>

              {showPalette === c.id && (
                <div className="palette-popup">
                  {Object.entries(colorMap).map(([nombre, hex]) => (
                    <button
                      key={nombre}
                      className="color-circle"
                      style={{
                        background: hex,
                        border:
                          c.colorBarra === hex ? "3px solid white" : "none",
                      }}
                      title={nombre}
                      onClick={() => handleColorChange(c, hex)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
