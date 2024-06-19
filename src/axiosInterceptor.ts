import axios from "axios";
import { API_URL } from "./constants/environnement";

const axiosI = axios.create({
  baseURL: API_URL,
  // other configurations
});

// Add a response interceptor
axiosI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post("/api/refresh-token", {
          refreshToken,
        });
        const { token } = response.data;

        localStorage.setItem("accessToken", token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default axiosI;
