export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
export const USER_API_URL = API_BASE_URL;
export const OPERATIONS_API_URL = API_BASE_URL;

export const AUTH_ENDPOINTS = {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout', 
    REFRESH: '/api/auth/refresh',
    REGISTER: '/api/auth/register',
};

export const USER_ENDPOINTS = {
    PROFILE: '/api/user/profile',
};

export const OPERATIONS_ENDPOINTS = {
    RECORDS: '/api/operation/records',
    TYPES: '/api/operation/types',
    DASHBOARD: '/api/operation/dashboard',
};

export const ACCOUNT_ENDPOINTS = {
    BALANCE: '/api/user/account/balance',
};
