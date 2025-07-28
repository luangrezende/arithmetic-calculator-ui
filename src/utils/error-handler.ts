import { logout } from "src/utils/auth-manager";
import { sessionManager } from "src/utils/session-manager";

interface ApiError {
    response?: {
        status: number;
        data?: {
            message?: string;
            error?: string;
        };
    };
}

export const handleAuthError = (error: ApiError): void => {
    const { response } = error;
    
    if (!response) return;

    const { status, data } = response;
    const message = data?.message?.toLowerCase() || data?.error?.toLowerCase() || '';

    const sessionExpiredMessages = [
        'token expired',
        'invalid token',
        'unauthorized',
        'session expired',
        'authentication failed',
        'access denied',
        'token inválido',
        'sessão expirada',
        'não autorizado'
    ];

    // Only handle auth errors if they are not 401 (let axios interceptor handle 401 with refresh token logic)
    const isSessionExpired = (status === 403 || sessionExpiredMessages.some(msg => message.includes(msg))) && 
                            status !== 401;

    if (isSessionExpired && !sessionManager.isCurrentlyRedirecting()) {
        console.warn('Session expired or unauthorized access detected:', {
            status,
            message: data?.message || data?.error
        });
        
        logout();
        sessionManager.redirectToSessionExpired();
    }
};

export const createErrorHandler = () => (error: ApiError) => {
    handleAuthError(error);
    return Promise.reject(error);
};
