import axios from "axios";

import { sessionManager } from "src/utils/session-manager";
import { requiresAuthentication } from "src/utils/auth-helpers";
import { logout, getTokens, saveTokens } from "src/utils/auth-manager";

import { USER_API_URL, AUTH_ENDPOINTS } from "src/config/api-config";

const axiosInstance = axios.create({ baseURL: USER_API_URL });

axiosInstance.interceptors.request.use(
    (config) => {
        const needsAuth = requiresAuthentication(config.url);
        
        if (needsAuth) {
            const { token } = getTokens();
            
            if (!token) {
                console.warn('Token not found. Request rejected.');
                return Promise.reject(new Error('Token not found'));
            }
            
            if (!config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { refreshToken } = getTokens();

                if (!refreshToken) {
                    logout();
                    sessionManager.redirectToLogin();
                    throw new Error("Refresh token is missing.");
                }

                const refreshResponse = await axios.post(`${USER_API_URL}${AUTH_ENDPOINTS.REFRESH}`, {
                    refreshToken,
                });

                const newAccessToken = refreshResponse.data?.data?.token;
                const newRefreshToken = refreshResponse.data?.data?.refreshToken;

                if (newAccessToken && newRefreshToken) {
                    saveTokens(newAccessToken, newRefreshToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return await axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                logout();
                sessionManager.redirectToSessionExpired();
            }
        }

        if (error.response?.status === 401) {
            logout();
            sessionManager.redirectToSessionExpired();
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
