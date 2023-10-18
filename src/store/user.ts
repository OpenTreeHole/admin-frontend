import { d } from "refina";

export const access_token = d.persist(localStorage, "user_store.access_token")("");

export function login(access: string): void {
  access_token.value = access;
}
export function logined(): boolean {
  return access_token.value !== "";
}
export function logout(): void {
  access_token.value = "";
}