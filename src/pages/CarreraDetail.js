// ================== IMPORTS ==================
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  getMateriasByCarrera,
  createMateriaInCarrera,
  updateMateria, //  usamos updateMateria
} from "../services/Api";
import { useAuth } from "../context/AuthContext";
import "../index.css";

// ================== DETALLE DE CARRERA ==================
export default function CarreraDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevaMateria, setNuevaMateria] = useState("");

  useEffect(() => {
    if (user?.token) {
      getMateriasByCarrera(id, user.token)
        .then(setMaterias)
        .catch((err) => console.error("⚠️ Error al obtener materias:", err))
        .finally(() => setLoading(false));
    }
  }, [id, user]);

  // ================== AGREGAR MATERIA ==================
  async function handleAgregarMateria() {
    if (!nuevaMateria) return;
    const materia = await createMateriaInCarrera(
      id,
      { nombre: nuevaMateria, notaFinal: 0 },
      user.token
    );
    setMaterias([...materias, materia]);
    setNuevaMateria("");
  }

  // ================== ACTUALIZAR NOTA DE UNA MATERIA ==================
  async function handleActualizarNota(materia, nuevaNota) {
    try {
      const actualizada = await updateMateria(
        materia.id,
        { ...materia, notaFinal: parseFloat(nuevaNota) },
        user.token
      );
      setMaterias(materias.map((m) => (m.id === materia.id ? actualizada : m)));
    } catch (err) {
      console.error("⚠️ Error actualizando nota:", err);
    }
  }

  if (loading) {
    return <LoadingSpinner text="Cargando tus materias..." />;
  }

  // ================== PROMEDIO GENERAL ==================
  const promedio =
    materias.length > 0
      ? materias.reduce((acc, m) => acc + (m.notaFinal || 0), 0) / materias.length
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
            <h3>{m.nombre}</h3>
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
    </div>
  );
}