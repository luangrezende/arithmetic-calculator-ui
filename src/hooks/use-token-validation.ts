import { getTokens } from 'src/utils/auth-manager';
import { isProtectedRoute } from 'src/utils/auth-helpers';

export const checkAuthAccess = (pathname: string): boolean => {
    const { token, refreshToken } = getTokens();
    
    if (isProtectedRoute(pathname) && (!token || !refreshToken)) {
        console.warn(`Access denied to protected route: ${pathname}. Token or refresh token not found.`);
        return false;
    }
    
    return true;
};

export const useTokenValidation = () => {
    const validateToken = (pathname?: string) => {
        const currentPath = pathname || window.location.pathname;
        return checkAuthAccess(currentPath);
    };
    
    const hasValidToken = () => {
        const { token, refreshToken } = getTokens();
        return !!(token && refreshToken);
    };
    
    return {
        validateToken,
        hasValidToken
    };
};
