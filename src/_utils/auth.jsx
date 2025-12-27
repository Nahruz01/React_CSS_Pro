export function getAuthMode() {
  return localStorage.getItem("auth_mode");
}

export function isAuthenticated() {
  const mode = getAuthMode();
  return mode === "user" || mode === "guest";
}

export function isGuest() {
  return getAuthMode() === "guest";
}
