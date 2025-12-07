import { useAuth } from "../context/AuthContext";

const url = "https://re-estate.runasp.net/api/Like/ToggleLikeProperty"
const commentLikeUrl = "https://re-estate.runasp.net/api/Like/ToggleLikeComment"



export const Like = async (id: any) => {
  try {
    const {token} = useAuth();

    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${url}/${id}`, {
      method: "POST",
      headers: {
        Authorization: token.startsWith("Bearer ")
          ? token
          : `Bearer ${token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-store", 
      },
      
    });
    console.log(response);

    if (!response.ok) {
      throw new Error("Like request failed");
    }

    return await response.json();
  } catch (err) {
    console.error("Like Error:", err);
    throw err;
  }
};

export const commentLike = async (id: any) => {
  try {
    const {token} = useAuth();

    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${commentLikeUrl}/${id}`, {
      method: "POST",
      headers: {
        Authorization: token.startsWith("Bearer ")
          ? token
          : `Bearer ${token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });

    if (!response.ok) {
      throw new Error("Comment like failed");
    }

    return await response.json();
  } catch (err) {
    console.error("Comment Like Error:", err);
    throw err;
  }
};













