export const TOKEN_KEY = "auth_token";
export const REFRESH_TOKEN = "refresh_token";

export function saveAccessToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function saveRefreshToken(token: string) {
  localStorage.setItem(REFRESH_TOKEN, token);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN);
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN);
}
