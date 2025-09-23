
const API_URL = "https://proyecto-metauni.onrender.com/api";

// ================== AUTH ==================
export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Error en login");
  }
  return res.json(); // { token: "..." }
}

export async function register(user) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error("Error en registro");
  }
  return res.json();
}

// ================== CARRERAS ==================
export async function getCarreras(token) {
  const res = await fetch(`${API_URL}/carreras`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener carreras");
  }
  return res.json();
}

export async function getCarrera(id, token) {
  const res = await fetch(`${API_URL}/carreras/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener carrera");
  }
  return res.json();
}