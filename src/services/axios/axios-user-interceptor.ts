import axios from "axios";

import { getTokens, saveTokens, logoutUser } from "src/utils/auth-manager";

import { USER_API_URL, AUTH_ENDPOINTS } from "src/config/api-config";

const axiosUserInstance = axios.create({ baseURL: USER_API_URL });

axiosUserInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { refreshToken } = getTokens();

                if (!refreshToken) throw new Error("Refresh token is missing.");

                const refreshResponse = await axios.post(`${USER_API_URL}${AUTH_ENDPOINTS.REFRESH}`, {
                    refreshToken,
                });

                console.log(refreshResponse);

                const newAccessToken = refreshResponse.data?.data?.token;
                const newRefreshToken = refreshResponse.data?.data?.refreshToken;

                if (newAccessToken && newRefreshToken) {
                    saveTokens(newAccessToken, newRefreshToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return await axiosUserInstance(originalRequest);
                }
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                logoutUser();
            }
        }

        return Promise.reject(error);
    }
);

export default axiosUserInstance;