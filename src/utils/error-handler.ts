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

    const isSessionExpired = status === 401 || 
                            status === 403 || 
                            sessionExpiredMessages.some(msg => message.includes(msg));

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
