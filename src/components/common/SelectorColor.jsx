// ================== SelectorColor.jsx ==================
import React from "react";

export default function SelectorColor({ selectedColor, onChange }) {
  // 🎨 Colores disponibles en la paleta
  const colores = ["#6366f1", "#22c55e", "#ef4444", "#facc15", "#0ea5e9"];

  return (
    <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
      {colores.map((color) => (
        <div
          key={color}
          onClick={() => onChange(color)}
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            backgroundColor: color,
            cursor: "pointer",
            border: selectedColor === color ? "3px solid black" : "2px solid white"
          }}
        ></div>
      ))}
    </div>
  );
}