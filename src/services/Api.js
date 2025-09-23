const API_URL = "https://proyecto-metauni.onrender.com/api"; // ⚠️ Cambia si tu backend deploya con otra ruta

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function register(user) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  return res.json();
}

export async function getCarreras(token) {
  const res = await fetch(`${API_URL}/carreras`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function getCarrera(id, token) {
  const res = await fetch(`${API_URL}/carreras/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}