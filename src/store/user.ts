import { d } from "refina";

export const access_token = d.persist(localStorage, "user_store.access_token")("");

export const refresh_token = d.persist(localStorage, "user_store.refresh_token")("");

export function setToken(access: string, refresh: string): void {
  access_token.value = access;
  refresh_token.value = refresh;
}
export function logined(): boolean {
  return access_token.value !== "";
}
export function logout(): void {
  access_token.value = "";
  refresh_token.value = "";
}