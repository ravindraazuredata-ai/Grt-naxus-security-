const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getHeaders(token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Login failed");
  }

  return response.json();
}

export async function fetchDevices(token) {
  const response = await fetch(`${API_BASE}/api/devices`, {
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error("Failed to load devices");
  return response.json();
}

export async function fetchAlerts(token) {
  const response = await fetch(`${API_BASE}/api/alerts`, {
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error("Failed to load alerts");
  return response.json();
}

export async function fetchPolicies(token) {
  const response = await fetch(`${API_BASE}/api/policies`, {
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error("Failed to load policies");
  return response.json();
}

export async function fetchNotifications(token) {
  const response = await fetch(`${API_BASE}/api/notifications`, {
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error("Failed to load notifications");
  return response.json();
}

export async function fetchUsers(token) {
  const response = await fetch(`${API_BASE}/api/users`, {
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error("Failed to load users");
  return response.json();
}
