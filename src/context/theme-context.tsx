import type { ReactNode } from 'react';
import type { ThemeMode } from 'src/utils/theme-manager';

import { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';

import { useAuthRoute } from 'src/hooks/use-auth-route';

import { themeManager } from 'src/utils/theme-manager';

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
    const [mode, setMode] = useState<ThemeMode>(() => themeManager.getCurrentTheme());
    const isAuthRoute = useAuthRoute();

    const effectiveMode = isAuthRoute ? 'light' : mode;

    useEffect(() => {
        const unsubscribe = themeManager.subscribe((newTheme) => {
            if (!isAuthRoute) {
                setMode(newTheme);
            }
        });

        return unsubscribe;
    }, [isAuthRoute]);

    useEffect(() => {
        if (isAuthRoute && effectiveMode !== 'light') {
            // Temporarily apply light mode for auth routes without persisting
            const { documentElement } = document;
            documentElement.classList.remove('dark');
            documentElement.style.setProperty('color-scheme', 'light');
        } else if (!isAuthRoute) {
            // Re-apply the stored theme when leaving auth routes
            themeManager.setTheme(mode);
        }
    }, [isAuthRoute, effectiveMode, mode]);

    const toggleTheme = useCallback(() => {
        if (isAuthRoute) return;
        
        const newTheme = themeManager.toggleTheme();
        setMode(newTheme);
    }, [isAuthRoute]);

    const contextValue = useMemo(() => ({ 
        mode: effectiveMode, 
        toggleTheme, 
        isAuthRoute 
    }), [effectiveMode, toggleTheme, isAuthRoute]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <div className="min-h-screen bg-slate-100 dark:bg-slate-800 transition-colors duration-300">
                {children}
            </div>
        </ThemeContext.Provider>
    );
}
