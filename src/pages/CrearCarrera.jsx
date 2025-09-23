import React, { useState } from "react";
import SelectorColor from "../components/SelectorColor";

export default function CrearCarrera() {
  const [nombre, setNombre] = useState("");
  const [colorBarra, setColorBarra] = useState("violeta"); // valor por defecto

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaCarrera = { nombre, colorBarra };

    console.log("Carrera a guardar:", nuevaCarrera);

    // 👇 aquí deberías mandar al backend
    // fetch("http://localhost:8080/api/carreras", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(nuevaCarrera)
    // });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        maxWidth: "400px",
        margin: "40px auto"
      }}
    >
      <h2>Crear Carrera</h2>
      <input
        type="text"
        placeholder="Nombre de la carrera"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "8px",
          border: "1px solid #ddd"
        }}
      />

      <label>Elige un color para la barra:</label>
      <SelectorColor selectedColor={colorBarra} onChange={setColorBarra} />

      <button
        type="submit"
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "12px",
          background: "linear-gradient(to right, #6366f1, #4f46e5)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600"
        }}
      >
        Guardar Carrera
      </button>
    </form>
  );
}