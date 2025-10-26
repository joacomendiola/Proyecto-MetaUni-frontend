const API_URL = "https://proyecto-metauni-backend.onrender.com";

export async function request(endpoint, options = {}) {
  let token;
  let userData;

  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      userData = JSON.parse(userStr);
      token = userData?.token;
    }
  } catch (error) {
    console.error("Error leyendo user de localStorage:", error);
  }

  console.log("🔍 Api.js - Debug:");
  console.log("- localStorage user:", userData);
  console.log("- token encontrado:", token);
  console.log("- endpoint:", endpoint);

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  console.log("🔍 Headers Authorization:", headers.Authorization ? "PRESENTE" : "FALTANTE");

  try {
    const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

    console.log("🔍 Response status:", res.status, res.statusText);

    if (res.status === 401) throw new Error("No autorizado");
    if (res.status === 403) throw new Error("Acceso prohibido");
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

    if (res.status === 204) return true;
    return res.json();

  } catch (error) {
    console.error("❌ Error en request:", error);
    throw error;
  }
}