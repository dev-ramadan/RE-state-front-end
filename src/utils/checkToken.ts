import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token: string) {
  try {
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (err) {
    return true;
  }
}

export const getRole = async (id: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`https://re-estate.runasp.net/api/UserRole/user-roles/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`

    }
  })
  const role = await res.json();

  return role.data
}

