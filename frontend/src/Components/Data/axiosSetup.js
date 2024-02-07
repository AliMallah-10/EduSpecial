// AxiosInterceptor.js

import axios from "axios";
import { useAuth } from "./AuthContext";

const AxiosInterceptor = () => {
  const { updateTokens, getAccessToken } = useAuth();

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Request to refresh token
          const response = await axios.post(
            "http://localhost:3000/users/refresh-token",
            {
              refreshToken: getAccessToken(),
            }
          );

          if (response.status === 200) {
            // Update tokens using the context
            updateTokens(response.data.accessToken, response.data.refreshToken);

            // Update the authorization header dynamically
            originalRequest.headers["Authorization"] =
              "Bearer " + response.data.accessToken;

            // Retry the original request
            return axios(originalRequest);
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return null;
};

export default AxiosInterceptor;
