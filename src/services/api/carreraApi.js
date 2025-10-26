import { request } from "./apiClient";

export async function getCarreras() {
  return request("/api/carreras"); 
}

export async function getCarrera(id) {
  return request(`/api/carreras/${id}`); 
}

export async function createCarrera(carrera) {
  return request("/api/carreras", { 
    method: "POST",
    body: JSON.stringify(carrera),
  });
}

export async function updateCarrera(id, carrera) {
  return request(`/api/carreras/${id}`, { 
    method: "PUT",
    body: JSON.stringify(carrera),
  });
}

export async function deleteCarrera(id) {
  return request(`/api/carreras/${id}`, { 
    method: "DELETE" 
  });
}