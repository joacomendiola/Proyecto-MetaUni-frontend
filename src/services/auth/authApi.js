import { request } from "../api/apiClient";

export async function login(email, password) {
  return request("/api/auth/login", { 
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(user) {
  return request("/api/auth/register", { 
    method: "POST",
    body: JSON.stringify(user),
  });
}