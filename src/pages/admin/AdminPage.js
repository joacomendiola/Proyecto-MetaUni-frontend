import React from "react";

export default function AdminPage() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Panel de Administración</h2>
      <p>Aquí solo pueden entrar usuarios con rol <b>ROLE_ADMIN</b>.</p>
    </div>
  );
}