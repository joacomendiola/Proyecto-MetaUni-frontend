// ================== IMPORTS ==================
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { getCarrera } from "../services/Api"; 
import { useAuth } from "../context/AuthContext";
import "../index.css";

// ================== DETALLE DE CARRERA ==================
export default function CarreraDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.token) {
      getCarrera(id, user.token)
        .then((data) => {
          if (Array.isArray(data)) {
            setMaterias(data);
          }
        })
        .catch((err) => console.error("⚠️ Error al obtener materias:", err))
        .finally(() => setLoading(false));
    }
  }, [id, user]);

  if (loading) {
    return <LoadingSpinner text="Cargando tus materias..." />;
  }

  const promedio =
    materias.length > 0
      ? materias.reduce((acc, m) => acc + m.notaFinal, 0) / materias.length
      : 0;

  const getNotaColor = (nota) => {
    if (nota >= 9) return "#22c55e";
    if (nota >= 7) return "#facc15";
    return "#ef4444";
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

      <p className="promedio">
        Promedio general: {materias.length > 0 ? promedio.toFixed(2) : "N/A"}
      </p>
    </div>
  );
}