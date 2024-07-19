import { getItem, setItem, deleteItemAsync } from "expo-secure-store";

export function getToken() {
  return getItem("token");
}

export function setToken(token: string) {
  return setItem("token", token);
}

export function deleteToken() {
  return deleteItemAsync("token");
}
