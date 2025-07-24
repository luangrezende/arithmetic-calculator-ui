import type { ReactNode } from 'react';

import { useMemo, useState, useContext, useCallback, createContext } from 'react';

import { getUserProfile } from 'src/services/api/auth-service';

interface BalanceContextProps {
    balance: number | null;
    isBalanceLoaded: boolean;
    fetchBalance: () => Promise<void>;
}

const BalanceContext = createContext<BalanceContextProps | undefined>(undefined);

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
    const [balance, setBalance] = useState<number | null>(null);
    const [isBalanceLoaded, setIsBalanceLoaded] = useState(false);

    const fetchBalance = useCallback(async () => {
        try {
            const userProfile = await getUserProfile();
            const userBalance = userProfile.data?.accounts?.[0]?.balance || 0;
            setBalance(userBalance);
            setIsBalanceLoaded(true);
        } catch (error) {
            console.error('Failed to fetch balance:', error);
            setIsBalanceLoaded(false);
        }
    }, []);

    const value = useMemo(
        () => ({
            balance,
            isBalanceLoaded,
            fetchBalance,
        }),
        [balance, isBalanceLoaded, fetchBalance]
    );

    return <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>;
};

export const useBalance = () => {
    const context = useContext(BalanceContext);
    if (!context) {
        throw new Error('useBalance must be used within a BalanceProvider');
    }
    return context;
};
