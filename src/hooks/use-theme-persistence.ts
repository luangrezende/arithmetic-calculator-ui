import { useEffect, useCallback } from 'react';

type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme-mode';

interface UseThemePersistenceOptions {
    onThemeChange?: (theme: ThemeMode) => void;
    validateTheme?: (theme: string) => boolean;
}

export const useThemePersistence = (
    currentTheme: ThemeMode,
    options: UseThemePersistenceOptions = {}
) => {
    const { onThemeChange, validateTheme = (theme) => theme === 'light' || theme === 'dark' } = options;

    const saveTheme = useCallback((theme: ThemeMode) => {
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
            onThemeChange?.(theme);
        } catch (error) {
            console.warn('Failed to save theme preference:', error);
        }
    }, [onThemeChange]);

    const loadTheme = useCallback((): ThemeMode => {
        try {
            const stored = localStorage.getItem(THEME_STORAGE_KEY);
            return stored && validateTheme(stored) ? (stored as ThemeMode) : 'light';
        } catch (error) {
            console.warn('Failed to load theme preference:', error);
            return 'light';
        }
    }, [validateTheme]);

    const clearTheme = useCallback(() => {
        try {
            localStorage.removeItem(THEME_STORAGE_KEY);
        } catch (error) {
            console.warn('Failed to clear theme preference:', error);
        }
    }, []);

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === THEME_STORAGE_KEY && e.newValue && validateTheme(e.newValue)) {
                onThemeChange?.(e.newValue as ThemeMode);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [onThemeChange, validateTheme]);

    return {
        saveTheme,
        loadTheme,
        clearTheme,
        storageKey: THEME_STORAGE_KEY
    };
};
