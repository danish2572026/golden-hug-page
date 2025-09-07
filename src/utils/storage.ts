export const getUserEmail = (): string | null => {
  return localStorage.getItem("userEmail");
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const getUid = (): string | null => {
  return localStorage.getItem("uid");
};

export const clearAuthStorage = () => {
  localStorage.removeItem("userEmail");
  localStorage.removeItem("access_token");
  localStorage.removeItem("uid");
};
