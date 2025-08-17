export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
export const USER_API_URL = API_BASE_URL;
export const OPERATIONS_API_URL = API_BASE_URL;

export const AUTH_ENDPOINTS = {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout', 
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
};

export const USER_ENDPOINTS = {
    PROFILE: '/user/profile',
};

export const OPERATIONS_ENDPOINTS = {
    RECORDS: '/operation/records',
    TYPES: '/operation/types',
    DASHBOARD: '/operation/dashboard',
};

export const ACCOUNT_ENDPOINTS = {
    BALANCE: '/user/account/balance',
};
