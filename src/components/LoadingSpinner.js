// ================== IMPORTS ==================
import React from "react";
import "../index.css";

// ================== SPINNER ==================
export default function LoadingSpinner({ text = "Cargando..." }) {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
}