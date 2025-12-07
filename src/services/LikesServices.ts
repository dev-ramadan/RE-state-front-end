const url = "https://re-estate.runasp.net/api/Like/ToggleLikeProperty"
const commentLikeUrl = "https://re-estate.runasp.net/api/Like/ToggleLikeComment"



export const Like = async (propertyId: any) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await fetch(`${url}/${propertyId}`, {
    method: "POST",
    headers: {
      Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Like request failed");
  return response.json();
};

export const commentLike = async (id: any) => {
  try {
    const token = localStorage.getItem("token");
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













