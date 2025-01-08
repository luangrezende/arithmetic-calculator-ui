import type { ReactNode } from 'react';

import { useMemo, useState, useEffect, useContext, createContext } from 'react';

interface AuthContextProps {
    isBalanceLoaded: boolean;
    isInitializing: boolean;
    isLoaded: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isInitializing, setIsInitializing] = useState(true);
    const [isBalanceLoaded, setIsBalanceLoaded] = useState(false);

    const isLoaded = () => {
        setIsBalanceLoaded(true);
        setIsInitializing(false);
    };

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem('token');
            const storedRefreshToken = localStorage.getItem('refreshToken');
            const storedUser = localStorage.getItem('user');
            const storedAccount = localStorage.getItem('account');

            if (storedToken && storedRefreshToken && storedUser) {
                const parsedUser = JSON.parse(storedUser);
                const parsedAccount = storedAccount
                    ? JSON.parse(storedAccount)
                    : parsedUser.accounts?.[0] || null;

                if (parsedAccount) {
                    isLoaded();
                }
            }
        } catch (error) {
            console.error('Error parsing user or account data:', error);
        } finally {
            setIsInitializing(false);
        }
    }, []);

    const contextValue = useMemo(
        () => ({
            isBalanceLoaded,
            isInitializing,
            isLoaded,
        }),
        [isBalanceLoaded, isInitializing]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {!isInitializing && children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
