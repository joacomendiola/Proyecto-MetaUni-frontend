
const API_URL = "https://proyecto-metauni.onrender.com/api";

// ================== AUTH ==================
export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",  
  });

  if (!res.ok) {
    throw new Error("Error en login");
  }
  return res.json(); // { token, ... }
}

export async function register(user) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    credentials: "include",   
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
    credentials: "include",   
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
    credentials: "include",   
  });

  if (!res.ok) {
    throw new Error("Error al obtener carrera");
  }
  return res.json();
}

export async function createCarrera(carrera, token) {
  const res = await fetch(`${API_URL}/carreras`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carrera),
    credentials: "include",   
  });
  if (!res.ok) throw new Error("Error al crear carrera");
  return res.json();
}

export async function updateCarrera(id, carrera, token) {
  const res = await fetch(`${API_URL}/carreras/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carrera),
    credentials: "include",   
  });
  if (!res.ok) throw new Error("Error al actualizar carrera");
  return res.json();
}

export async function deleteCarrera(id, token) {
  const res = await fetch(`${API_URL}/carreras/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",   
  });
  if (!res.ok) throw new Error("Error al eliminar carrera");
  return true;
}

// ================== MATERIAS ==================
export async function getMaterias(token) {
  const res = await fetch(`${API_URL}/materias`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",   
  });
  if (!res.ok) throw new Error("Error al obtener materias");
  return res.json();
}

export async function createMateria(materia, token) {
  const res = await fetch(`${API_URL}/materias`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(materia),
    credentials: "include",   
  });
  if (!res.ok) throw new Error("Error al crear materia");
  return res.json();
}

export async function updateMateria(id, materia, token) {
  const res = await fetch(`${API_URL}/materias/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(materia),
    credentials: "include",   
  });
  if (!res.ok) throw new Error("Error al actualizar materia");
  return res.json();
}

export async function deleteMateria(id, token) {
  const res = await fetch(`${API_URL}/materias/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",   
  });
  if (!res.ok) throw new Error("Error al eliminar materia");
  return true;
}

// ================== USUARIOS ==================
export async function getUsuarios(token) {
  const res = await fetch(`${API_URL}/usuarios`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",   
  });
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
}

export async function getUsuario(id, token) {
  const res = await fetch(`${API_URL}/usuarios/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",   
  });
  if (!res.ok) throw new Error("Error al obtener usuario");
  return res.json();
}

export async function updateUsuario(id, usuario, token) {
  const res = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
    credentials: "include",   
  });
  if (!res.ok) throw new Error("Error al actualizar usuario");
  return res.json();
}

export async function deleteUsuario(id, token) {
  const res = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",  
  });
  if (!res.ok) throw new Error("Error al eliminar usuario");
  return true;
}