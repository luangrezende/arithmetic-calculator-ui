import axios from 'axios';

import { saveTokens } from 'src/utils/auth-manager';
import { saveProfile } from 'src/utils/profile-manager';

import { USER_API_URL, AUTH_ENDPOINTS, USER_ENDPOINTS } from 'src/config/api-config';

import axiosInstance from '../axios/axios-interceptor';


export const registerUser = async (name: string, username: string, password: string, confirmPassword: string) => {
    try {
        const response = await axios.post(
            `${USER_API_URL}${AUTH_ENDPOINTS.REGISTER}`,
            { name, username, password, confirmPassword },
            { validateStatus: (status) => status >= 200 && status < 300 }
        );
        console.log(response);
    } catch (error: any) {
        console.error('Error registering user:', error);
        throw error.response?.data?.data?.error || 'An error occurred during registration.';
    }
};

export const loginUser = () => async (username: string, password: string) => {
    try {
        const response = await axios.post(
            `${USER_API_URL}${AUTH_ENDPOINTS.LOGIN}`,
            { username, password },
            { validateStatus: (status) => status >= 200 && status < 300 }
        );

        const token = response.data?.data?.token;
        const refreshToken = response.data?.data?.refreshToken;
        if (!token || !refreshToken) {
            throw new Error('Authentication failed. No token received.');
        }

        saveTokens(token, refreshToken);

        try {
            const userResult = await getUserProfile();
            saveProfile(userResult.data);
        } catch (error: any) {
            console.error('Error fetching user profile:', error);
            throw new Error('Failed to load user profile. Please try again.');
        }

        return response.data;
    } catch (error: any) {
        console.error('Error logging in:', error);
        throw error.response?.data?.data?.error || 'An error occurred during login.';
    }
};

export const logoutUser = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('RefreshToken not found.');

        const response = await axios.post(
            `${USER_API_URL}${AUTH_ENDPOINTS.LOGOUT}`,
            { refreshToken },
            { validateStatus: (status) => status >= 200 && status < 300 }
        );

        return response.data;
    } catch (error: any) {
        console.error('Error to logout user:', error);
        throw error.response?.data?.data?.error || 'An error occurred while fetching user profile.';
    }
};


export const getUserProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found. Please log in again.');

        const response = await axiosInstance.get(`${USER_ENDPOINTS.PROFILE}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            validateStatus: (status) => status >= 200 && status < 300,
        });

        return response.data;
    } catch (error: any) {
        console.error('Error fetching user profile:', error);
        throw error.response?.data?.data?.error || 'An error occurred while fetching user profile.';
    }
};