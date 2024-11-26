import type { ReactNode } from 'react';

import { useMemo, useState, useEffect, useContext, createContext } from 'react';

interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    status: 'active' | 'inactive';
}

interface AuthContextProps {
    token: string | null;
    user: User | null;
    login: (token: string, userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [user, setUser] = useState<User | null>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const login = (newToken: string, userData: User) => {
        setToken(newToken);
        setUser(userData);
        console.log(user);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const contextValue = useMemo(
        () => ({
            token,
            user,
            login,
            logout,
        }),
        [login, token, user]
    );

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
