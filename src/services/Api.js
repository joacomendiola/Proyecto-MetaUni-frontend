const API_URL = "https://proyecto-metauni-backend.onrender.com/api";

// ================== HELPER ==================
async function request(endpoint, options = {}) {
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
  try {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    
    const res = await fetch(`${API_URL}/carreras/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token || ""}`,
        "Content-Type": "application/json"
      }
    });

    console.log("🔍 Delete carrera response status:", res.status, res.statusText);

    if (res.status === 401) throw new Error("No autorizado");
    if (res.status === 403) throw new Error("Acceso prohibido");
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

    if (res.status === 204) {
      return { success: true, message: "Carrera eliminada correctamente" };
    }
    
    if (res.status === 200) {
      const contentLength = res.headers.get('content-length');
      const contentType = res.headers.get('content-type');
      
      if (contentLength === '0' || !contentLength || !contentType?.includes('application/json')) {
        return { success: true, message: "Carrera eliminada correctamente" };
      }
    }

    return res.json();
    
  } catch (error) {
    console.error("❌ Error eliminando carrera:", error);
    throw error;
  }
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