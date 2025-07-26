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
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme) {
                setMode(savedTheme);
            } else if (systemPrefersDark) {
                setMode('dark');
            }
        }
    }, [isAuthRoute]);

    useEffect(() => {
        const documentElement = document.documentElement;
        
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
            <div className="min-h-screen bg-gradient-to-br from-slate-50/80 to-slate-100/60 dark:from-slate-900/95 dark:to-slate-800/80">
                {children}
            </div>
        </ThemeContext.Provider>
    );
}
