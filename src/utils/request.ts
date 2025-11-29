const API_URL = "https://re-estate.runasp.net";
let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  if (!token) return authToken = null;
  authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
}

export default async function request<T>(endpoint: string, options: RequestInit): Promise<T> {
  const isFormData = options.body instanceof FormData;
  (authToken);
  const { headers: optionHeaders, ...restOptions } = options;
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...optionHeaders,
      ...(authToken ? { Authorization: authToken } : {})
    },
    ...restOptions
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Request failed");
  }
  return response.json();
}
