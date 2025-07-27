// Utility para gerenciar redirecionamento de sessão expirada
class SessionManager {
    private static instance: SessionManager;
    private navigationCallback: ((path: string) => void) | null = null;
    private toastCallback: ((message: string, type: 'success' | 'warning' | 'danger', duration?: number) => void) | null = null;
    private isRedirecting = false;

    static getInstance(): SessionManager {
        if (!SessionManager.instance) {
            SessionManager.instance = new SessionManager();
        }
        return SessionManager.instance;
    }

    setNavigationCallback(callback: (path: string) => void): void {
        this.navigationCallback = callback;
    }

    setToastCallback(callback: (message: string, type: 'success' | 'warning' | 'danger', duration?: number) => void): void {
        this.toastCallback = callback;
    }

    redirectToSessionExpired(): void {
        if (!this.isRedirecting) {
            this.isRedirecting = true;
            
            if (this.toastCallback) {
                this.toastCallback(
                    'Your session has expired for security reasons. Redirecting to login...',
                    'warning',
                    4000
                );
            }
            
            setTimeout(() => {
                if (this.navigationCallback) {
                    this.navigationCallback('/session-expired');
                } else {
                    window.location.href = '/session-expired';
                }
            }, 500);
            
            setTimeout(() => {
                this.isRedirecting = false;
            }, 2000);
        }
    }

    redirectToLogin(): void {
        if (!this.isRedirecting) {
            this.isRedirecting = true;
            
            setTimeout(() => {
                if (this.navigationCallback) {
                    this.navigationCallback('/sign-in');
                } else {
                    window.location.href = '/sign-in';
                }
            }, 100);
            
            setTimeout(() => {
                this.isRedirecting = false;
            }, 1000);
        }
    }

    isCurrentlyRedirecting(): boolean {
        return this.isRedirecting;
    }

    reset(): void {
        this.isRedirecting = false;
    }
}

export const sessionManager = SessionManager.getInstance();
