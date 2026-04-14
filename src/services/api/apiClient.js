const API_URL = process.env.REACT_APP_API_URL || "https://proyecto-metauni-backend.onrender.com";

export async function request(endpoint, options = {}) {
  let token;

  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const userData = JSON.parse(userStr);
      token = userData?.token;
    }
  } catch (error) {
    console.error("Error leyendo user de localStorage:", error);
  }

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

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