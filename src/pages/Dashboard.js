// ================== IMPORTS ==================
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPaintBrush } from "react-icons/fa"; // 🎨 Icono pincel
import "../index.css";

// ================== COMPONENTE PRINCIPAL ==================
export default function Dashboard() {
  // 🎨 Paleta de colores extendida
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
    magenta: "#d946ef"
  };

  // ================== ESTADO DE CARRERAS ==================
  const [carreras, setCarreras] = useState([
    { id: 1, nombre: "Ingeniería de Software", totalMaterias: 30, aprobadas: 15, color: "#6366f1" },
    { id: 2, nombre: "Base de Datos", totalMaterias: 10, aprobadas: 7, color: "#6366f1" }
  ]);

  const [showPalette, setShowPalette] = useState(null); // id de la carrera activa

  // ================== LOCALSTORAGE: CARGAR ==================
  useEffect(() => {
    const savedColors = JSON.parse(localStorage.getItem("carreraColors"));
    if (savedColors) {
      setCarreras((prev) =>
        prev.map((c) => ({ ...c, color: savedColors[c.id] || c.color }))
      );
    }
  }, []);

  // ================== LOCALSTORAGE: GUARDAR ==================
  useEffect(() => {
    const colorsToSave = carreras.reduce((acc, c) => {
      acc[c.id] = c.color;
      return acc;
    }, {});
    localStorage.setItem("carreraColors", JSON.stringify(colorsToSave));
  }, [carreras]);

  // ================== CAMBIAR COLOR ==================
  const handleColorChange = (id, color) => {
    setCarreras(carreras.map(c =>
      c.id === id ? { ...c, color } : c
    ));
    setShowPalette(null); // cerrar paleta después de elegir
  };

  // ================== RENDER ==================
  return (
    <div className="dashboard">
      <h2>Mis Carreras</h2>
      <div className="careers-container">
        {carreras.map((c) => {
          const porcentaje = (c.aprobadas / c.totalMaterias) * 100;

          return (
            <div key={c.id} className="career-card">
              {/* ====== Header con título y pincel 🎨 ====== */}
              <div className="card-header">
                <h3>{c.nombre}</h3>
                <FaPaintBrush
                  className="paint-icon"
                  onClick={() => setShowPalette(showPalette === c.id ? null : c.id)}
                />
              </div>

              {/* ====== Barra de progreso con color personalizado ====== */}
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${porcentaje}%`,
                    background: c.color
                  }}
                ></div>
              </div>

              {/* ====== Texto de materias y porcentaje ====== */}
              <p>
                {c.aprobadas}/{c.totalMaterias} materias aprobadas
              </p>
              <p>{porcentaje.toFixed(0)}% completado</p>

              {/* ====== Botón para ver materias ====== */}
              <div className="card-actions">
                <Link to={`/carrera/${c.id}`} className="btn">
                  Ver materias
                </Link>
              </div>

              {/* ====== Paleta de colores que aparece al presionar el pincel ====== */}
              {showPalette === c.id && (
                <div className="palette-popup">
                  {Object.entries(colorMap).map(([nombre, hex]) => (
                    <button
                      key={nombre}
                      className="color-circle"
                      style={{
                        background: hex,
                        border: c.color === hex ? "3px solid white" : "none"
                      }}
                      title={nombre} // tooltip con nombre del color
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
