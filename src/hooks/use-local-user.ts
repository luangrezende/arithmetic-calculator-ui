import type { User } from 'src/models/user';

import { useState, useEffect } from 'react';

export function useLocalUser() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error to get JSON user:', error);
                setUser(null);
            }
        }
    }, []);

    return user;
}

export function useLocalUserToken() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    return { token };
}

