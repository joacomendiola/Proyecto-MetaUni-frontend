import { request } from "./apiClient";

export async function getUsuarios() {
  return request("/api/usuarios"); 
}

export async function getUsuario(id) {
  return request(`/api/usuarios/${id}`); 
}

export async function updateUsuario(id, usuario) {
  return request(`/api/usuarios/${id}`, { 
    method: "PUT",
    body: JSON.stringify(usuario),
  });
}

export async function deleteUsuario(id) {
  return request(`/api/usuarios/${id}`, { method: "DELETE" }); 
}