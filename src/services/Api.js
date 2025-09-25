const API_URL = "https://proyecto-metauni-backend.onrender.com/api";

// ================== AUTH ==================
export async function login(email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (res.status === 401) {
      throw new Error("Credenciales inválidas");
    }

    if (!res.ok) {
      throw new Error("Error inesperado en login");
    }

    return await res.json(); // { token, rol, email }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
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

export async function testCors() {
  try {
    const res = await fetch(`${API_URL}/auth/test-cors`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Error CORS: ${res.status}`);
    }

    const text = await res.text();
    console.log("CORS test OK:", text);
    return text;
  } catch (error) {
    console.error("CORS test error:", error);
    throw error;
  }
}

// ================== CARRERAS ==================
export async function getCarreras(token) {
  const res = await fetch(`${API_URL}/carreras`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error al obtener carreras");
  return res.json();
}

export async function getCarrera(id, token) {
  const res = await fetch(`${API_URL}/carreras/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error al obtener carrera");
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
export async function getMateriasByCarrera(carreraId, token) {
  const res = await fetch(`${API_URL}/materias/carrera/${carreraId}`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error al obtener materias");
  return res.json();
}

export async function createMateriaInCarrera(carreraId, materia, token) {
  const res = await fetch(`${API_URL}/materias/${carreraId}`, {
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
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
}

export async function getUsuario(id, token) {
  const res = await fetch(`${API_URL}/usuarios/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
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