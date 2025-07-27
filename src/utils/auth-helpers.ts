const PUBLIC_ENDPOINTS = [
    '/auth/sign-in',
    '/auth/register',
    '/auth/login',
    '/auth/refresh',
    '/auth/forgot-password',
    '/auth/reset-password',
];

export const requiresAuthentication = (url?: string): boolean => {
    if (!url) return false;
    
    const normalizedUrl = url.split('?')[0].split('#')[0];
    
    const isPublicEndpoint = PUBLIC_ENDPOINTS.some(endpoint => 
        normalizedUrl.includes(endpoint) || normalizedUrl.endsWith(endpoint)
    );
    
    return !isPublicEndpoint;
};

const PROTECTED_ROUTES = [
    '/dashboard',
    '/operation',
    '/profile',
    '/balance',
    '/account',
];

export const isProtectedRoute = (pathname: string): boolean => 
    PROTECTED_ROUTES.some(route => 
        pathname.startsWith(route) || pathname === '/'
    );
