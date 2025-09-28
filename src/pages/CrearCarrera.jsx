import React, { useState } from "react";
import SelectorColor from "../components/SelectorColor";
import { createCarrera } from "../services/Api";
import { toast } from "react-toastify";

export default function CrearCarrera({ onCarreraCreada }) {
  const [nombre, setNombre] = useState("");
  const [colorBarra, setColorBarra] = useState("violeta");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre) {
      return toast.error("⚠️ El nombre de la carrera es obligatorio");
    }

    try {
      const nuevaCarrera = await createCarrera({
        nombre,
        colorBarra,
        totalMaterias: 0,
      });

      toast.success("✅ Carrera creada con éxito");
      setNombre("");
      setColorBarra("violeta");

      // refrescar lista en el Dashboard
      if (onCarreraCreada) onCarreraCreada(nuevaCarrera);
    } catch (err) {
      console.error("❌ Error al crear carrera:", err);
      toast.error("❌ No se pudo crear la carrera");
    }
  };

   return (
    <form onSubmit={handleSubmit} className="crear-carrera-form">
      <h2>Crear Carrera</h2>
      
      <input
        type="text"
        placeholder="Nombre de la carrera"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="crear-carrera-input"  
      />

      <label className="crear-carrera-label">Elige un color para la barra:</label>  
      
      <SelectorColor selectedColor={colorBarra} onChange={setColorBarra} />

      <button type="submit" className="crear-carrera-btn">  
        Guardar Carrera
      </button>
    </form>
  );
}
