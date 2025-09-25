const API_URL = "https://proyecto-metauni-backend.onrender.com/api";

// ================== HELPER ==================
async function request(endpoint, options = {}) {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const token = savedUser?.token;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

  if (res.status === 401) throw new Error("No autorizado");
  if (res.status === 403) throw new Error("Acceso prohibido");
  if (!res.ok) throw new Error("Error en la petición");

  // Algunos DELETE devuelven vacío → evitar error en .json()
  if (res.status === 204) return true;
  return res.json();
}

// ================== AUTH ==================
export async function login(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(user) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

// ================== CARRERAS ==================
export async function getCarreras() {
  return request("/carreras");
}

export async function getCarrera(id) {
  return request(`/carreras/${id}`);
}

export async function createCarrera(carrera) {
  return request("/carreras", {
    method: "POST",
    body: JSON.stringify(carrera),
  });
}

export async function updateCarrera(id, carrera) {
  return request(`/carreras/${id}`, {
    method: "PUT",
    body: JSON.stringify(carrera),
  });
}

export async function deleteCarrera(id) {
  return request(`/carreras/${id}`, { method: "DELETE" });
}

// ================== MATERIAS ==================
export async function getMateriasByCarrera(carreraId) {
  return request(`/materias/carrera/${carreraId}`);
}

export async function createMateriaInCarrera(carreraId, materia) {
  return request(`/materias/${carreraId}`, {
    method: "POST",
    body: JSON.stringify(materia),
  });
}

export async function updateMateria(id, materia) {
  return request(`/materias/${id}`, {
    method: "PUT",
    body: JSON.stringify(materia),
  });
}

export async function deleteMateria(id) {
  return request(`/materias/${id}`, { method: "DELETE" });
}

// ================== USUARIOS ==================
export async function getUsuarios() {
  return request("/usuarios");
}

export async function getUsuario(id) {
  return request(`/usuarios/${id}`);
}

export async function updateUsuario(id, usuario) {
  return request(`/usuarios/${id}`, {
    method: "PUT",
    body: JSON.stringify(usuario),
  });
}

export async function deleteUsuario(id) {
  return request(`/usuarios/${id}`, { method: "DELETE" });
}

