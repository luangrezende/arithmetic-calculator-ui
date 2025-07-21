// API Base URLs from environment variables
export const USER_API_URL = import.meta.env.VITE_USER_API_URL || 'http://localhost:3001/v1/user';
export const OPERATIONS_API_URL = import.meta.env.VITE_OPERATIONS_API_URL || 'http://localhost:3002/v1/operations';

// API Environment
export const API_ENVIRONMENT = import.meta.env.VITE_API_ENVIRONMENT || 'development';

export const AUTH_ENDPOINTS = {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
};

export const USER_ENDPOINTS = {
    PROFILE: '/profile',
};

export const OPERATIONS_ENDPOINTS = {
    RECORDS: '/records',
    TYPES: '/types',
    DASHBOARD: '/dashboard',
};

export const ACCOUNT_ENDPOINTS = {
    BALANCE: '/account/balance',
};
