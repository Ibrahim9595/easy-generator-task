import { fetcher } from "./fetcher";
import { getAccessToken, saveAccessToken, saveRefreshToken } from "./storage";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export type User = { id: string; name: string; email: string };
export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export async function login(email: string, password: string) {
  const res = await fetcher<AuthResponse>(`${API_BASE}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  saveAccessToken(res.accessToken);
  saveRefreshToken(res.refreshToken);

  return res;
}

export async function signup(name: string, email: string, password: string) {
  const res = await fetcher<AuthResponse>(`${API_BASE}/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  return res;
}

export async function getCurrentUser() {
  const token = getAccessToken();
  const res = await fetcher<User>(`${API_BASE}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}
