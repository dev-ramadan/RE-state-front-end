
const LIKE_KEY = "liked_properties";

export function getLikesFromStorage(): Record<string, boolean> {
  const data = localStorage.getItem(LIKE_KEY);
  return data ? JSON.parse(data) : {};
}

export function setLikeToStorage(propertyId: string, isLiked: boolean) {
  const likes = getLikesFromStorage();
  likes[propertyId] = isLiked;
  localStorage.setItem(LIKE_KEY, JSON.stringify(likes));
}

export function getLikeFromStorage(propertyId: string): boolean {
  const likes = getLikesFromStorage();
  return likes[propertyId] || false;
}
