import type { ReactNode } from 'react';
import type { User } from 'src/models/user';
import type { BankAccount } from 'src/models/bank-account';

import { useMemo, useState, useEffect, useContext, createContext } from 'react';

interface AuthContextProps {
    token: string | null;
    user: User | null;
    bankAccount: BankAccount | null;
    login: (token: string, userData: User) => void;
    reloadUserProfile: (userData: User) => void;
    logout: () => void;
    isInitializing: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    const [user, setUser] = useState<User | null>(null);
    const [bankAccount, setAccount] = useState<BankAccount | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);

    const reloadUserProfile = (newUserData: User) => {
        setUser(null);
        setAccount(null);
        localStorage.removeItem('user');
        localStorage.removeItem('account');

        setUser(newUserData);

        localStorage.setItem('user', JSON.stringify(newUserData));

        const defaultAccount = newUserData.accounts?.[0] || null;
        setAccount(defaultAccount);

        if (defaultAccount) {
            localStorage.setItem('account', JSON.stringify(defaultAccount));
        } else {
            localStorage.removeItem('account');
        }
    };

    const login = (newToken: string, userData: User) => {
        setToken(null);
        setUser(null);
        setAccount(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('account');

        setToken(newToken);
        setUser(userData);

        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));

        const defaultAccount = userData.accounts?.[0] || null;
        setAccount(defaultAccount);

        if (defaultAccount) {
            localStorage.setItem('account', JSON.stringify(defaultAccount));
        } else {
            localStorage.removeItem('account');
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setAccount(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('account');
    };

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            const storedAccount = localStorage.getItem('account');

            if (storedToken && storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setToken(storedToken);
                setUser(parsedUser);

                const parsedAccount = storedAccount
                    ? JSON.parse(storedAccount)
                    : parsedUser.accounts?.[0] || null;
                setAccount(parsedAccount);
            }
        } catch (error) {
            console.error('Error parsing user or account data:', error);
            logout();
        } finally {
            setIsInitializing(false);
        }
    }, []);

    const contextValue = useMemo(
        () => ({
            token,
            user,
            bankAccount,
            reloadUserProfile,
            login,
            logout,
            isInitializing,
        }),
        [token, user, bankAccount, isInitializing]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {!isInitializing && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
