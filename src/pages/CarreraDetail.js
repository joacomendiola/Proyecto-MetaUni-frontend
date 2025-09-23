// ================== IMPORTS ==================
import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import "../index.css";

// ================== DETALLE DE CARRERA ==================
export default function CarreraDetail() {
  // Estado de materias y carga
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);

  // Datos mock (fallback)
  const mockMaterias = [
    { id: 1, nombre: "Matemática I", notaFinal: 8 },
    { id: 2, nombre: "Programación I", notaFinal: 7 },
    { id: 3, nombre: "Bases de Datos", notaFinal: 9 }
  ];

  useEffect(() => {
    fetch("http://localhost:8080/materias")
      .then((res) => {
        if (!res.ok) throw new Error("Error en la API");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMaterias(data);
        } else {
          setMaterias(mockMaterias); // si la API devuelve vacío
        }
      })
      .catch((err) => {
        console.error("⚠️ Error al obtener materias:", err.message);
        setMaterias(mockMaterias); // fallback si falla
      })
      .finally(() => setLoading(false));
  }, []);

  // Spinner mientras carga
  if (loading) {
    return <LoadingSpinner text="Cargando tus materias..." />;
  }

  // Cálculo del promedio
  const promedio =
    materias.reduce((acc, m) => acc + m.notaFinal, 0) / materias.length;

  // Colores según nota
  const getNotaColor = (nota) => {
    if (nota >= 9) return "#22c55e"; // verde
    if (nota >= 7) return "#facc15"; // amarillo
    return "#ef4444"; // rojo
  };

  return (
    <div className="career-detail">
      <h2 className="career-title">Materias aprobadas</h2>

      <div className="materias-container">
        {materias.map((m) => (
          <div key={m.id} className="materia-card">
            <h3>{m.nombre}</h3>
            <p>
              Nota final:{" "}
              <span style={{ color: getNotaColor(m.notaFinal) }}>
                {m.notaFinal}
              </span>
            </p>
          </div>
        ))}
      </div>

      <p className="promedio">Promedio general: {promedio.toFixed(2)}</p>
    </div>
  );
}