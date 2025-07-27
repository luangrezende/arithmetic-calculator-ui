import type { ReactNode } from 'react';

import { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';

import { getUserProfile } from 'src/services/api/auth-service';

interface BalanceContextProps {
    balance: number | null;
    currency: string | null;
    isBalanceLoaded: boolean;
    fetchBalance: () => Promise<void>;
}

const BalanceContext = createContext<BalanceContextProps | undefined>(undefined);

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
    const [balance, setBalance] = useState<number | null>(null);
    const [currency, setCurrency] = useState<string | null>(null);
    const [isBalanceLoaded, setIsBalanceLoaded] = useState(false);

    useEffect(() => {
        try {
            const storedAccount = localStorage.getItem('account');
            if (storedAccount) {
                const account = JSON.parse(storedAccount);
                if (account?.currency) {
                    setCurrency(account.currency);
                }
            }
        } catch (error) {
            console.error('Error loading currency from localStorage:', error);
        }
    }, []);

    const fetchBalance = useCallback(async () => {
        try {
            const userProfile = await getUserProfile();
            const account = userProfile.data?.accounts?.[0];
            const userBalance = account?.balance || 0;
            const userCurrency = account?.currency || 'USD';
            setBalance(userBalance);
            setCurrency(userCurrency);
            setIsBalanceLoaded(true);
        } catch (error) {
            console.error('Failed to fetch balance:', error);
            setIsBalanceLoaded(false);
        }
    }, []);

    const value = useMemo(
        () => ({
            balance,
            currency,
            isBalanceLoaded,
            fetchBalance,
        }),
        [balance, currency, isBalanceLoaded, fetchBalance]
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
