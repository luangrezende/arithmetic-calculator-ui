import type { ReactNode } from 'react';

import { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';

import { useAuthRoute } from 'src/hooks/use-auth-route';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
    isAuthRoute: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeMode must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [mode, setMode] = useState<ThemeMode>('light');
    const isAuthRoute = useAuthRoute();

    const effectiveMode = isAuthRoute ? 'light' : mode;

    useEffect(() => {
        if (!isAuthRoute) {
            const savedTheme = localStorage.getItem('theme-mode') as ThemeMode;
            
            if (savedTheme) {
                setMode(savedTheme);
            } else {
                // Default to light mode instead of system preference
                setMode('light');
            }
        }
    }, [isAuthRoute]);

    useEffect(() => {
        const {documentElement} = document;
        
        if (effectiveMode === 'dark') {
            documentElement.classList.add('dark');
            documentElement.style.setProperty('color-scheme', 'dark');
        } else {
            documentElement.classList.remove('dark');
            documentElement.style.setProperty('color-scheme', 'light');
        }
    }, [effectiveMode]);

    const toggleTheme = useCallback(() => {
        if (isAuthRoute) return;
        
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('theme-mode', newMode);
    }, [mode, isAuthRoute]);

    const contextValue = useMemo(() => ({ 
        mode: effectiveMode, 
        toggleTheme, 
        isAuthRoute 
    }), [effectiveMode, toggleTheme, isAuthRoute]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <div className="min-h-screen bg-slate-100 dark:bg-slate-800">
                {children}
            </div>
        </ThemeContext.Provider>
    );
}
