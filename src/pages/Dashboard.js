// ================== IMPORTS ==================
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPaintBrush } from "react-icons/fa"; // 🎨 Icono pincel
import { getCarreras } from "../services/api"; // 🔗 usamos tu api.js
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

  // ================== CARGAR CARRERAS DEL BACKEND ==================
  useEffect(() => {
    if (user?.token) {
      getCarreras(user.token)
        .then((data) => {
          if (Array.isArray(data)) {
            setCarreras(data);
          }
        })
        .catch((err) => console.error("⚠️ Error cargando carreras:", err));
    }
  }, [user]);

  // ================== CAMBIAR COLOR LOCAL ==================
  const handleColorChange = (id, color) => {
    setCarreras(carreras.map(c => 
      c.id === id ? { ...c, color } : c
    ));
    setShowPalette(null);
  };

  return (
    <div className="dashboard">
      <h2>Mis Carreras</h2>
      <div className="careers-container">
        {carreras.map((c) => {
          const porcentaje = (c.aprobadas / c.totalMaterias) * 100;

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
                    background: c.color || "#6366f1",
                  }}
                ></div>
              </div>

              <p>
                {c.aprobadas}/{c.totalMaterias} materias aprobadas
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
                        border: c.color === hex ? "3px solid white" : "none",
                      }}
                      title={nombre}
                      onClick={() => handleColorChange(c.id, hex)}
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
