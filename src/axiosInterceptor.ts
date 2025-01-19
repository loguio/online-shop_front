import axios from "axios";
import { API_URL } from "./constants/environnement";

// Créez une instance Axios
const axiosI = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
});

// Ajoutez un intercepteur pour gérer les erreurs 401
axiosI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axiosI.post(
          "/auth/refresh",
          {}, // Pas besoin de body
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        const { access_token } = response.data;

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axiosI(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosI;
