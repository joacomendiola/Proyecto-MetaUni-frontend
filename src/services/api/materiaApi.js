import { request } from "./apiClient";

export async function getMateriasByCarrera(carreraId) {
  return request(`/api/materias/carrera/${carreraId}`); 
}

export async function createMateriaInCarrera(carreraId, materia) {
  return request(`/api/materias/${carreraId}`, {
    method: "POST",
    body: JSON.stringify(materia),
  });
}

export async function updateMateria(id, materia) {
  return request(`/api/materias/${id}`, { 
    method: "PUT",
    body: JSON.stringify(materia),
  });
}

export async function deleteMateria(id) {
  return request(`/api/materias/${id}`, { method: "DELETE" }); 
}