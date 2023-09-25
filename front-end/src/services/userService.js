import httpService from "./httpService";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = "fenestra_token";

setTokenHeader();

export function setTokenHeader() {
  httpService.setCommonHeader("x-auth-token", getJWT());
}

export function createUser(user) {
  return httpService.post("/users", user);
}

export async function loginUser(credentials) {
  const response = await httpService.post("/auth", credentials);
  localStorage.setItem(TOKEN_KEY, response.data.token);
  setTokenHeader();
  return response;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  setTokenHeader();
}

export function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}
export function getAllUsers() {
  return httpService.get("/users");
}
export function deleteUser(id) {
  return httpService.delete(`/users/${id}`);
}

export function getSelectUser(id) {
  return httpService.get(`/users/${id}`);
}

export function updateUser(id, user) {
  return httpService.put(`/users/${id}`, user);
}
export function refreshPassword(id, user) {
  return httpService.put(`/users/refresh-password/${id}`, user);
}

const usersServise = {
  createUser,
  loginUser,
  logout,
  getJWT,
  getUser,
  getAllUsers,
  deleteUser,
  getSelectUser,
  updateUser,
  refreshPassword,
};

export default usersServise;
