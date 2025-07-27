import { useEffect, useState } from 'react';

import { themeManager } from 'src/utils/theme-manager';

import type { ThemeMode } from 'src/utils/theme-manager';

export const useThemeManager = () => {
    const [currentTheme, setCurrentTheme] = useState<ThemeMode>(() => 
        themeManager.getCurrentTheme()
    );

    useEffect(() => {
        const unsubscribe = themeManager.subscribe(setCurrentTheme);
        return unsubscribe;
    }, []);

    const toggleTheme = () => themeManager.toggleTheme();

    const setTheme = (theme: ThemeMode) => {
        themeManager.setTheme(theme);
    };

    const clearTheme = () => {
        themeManager.clearTheme();
    };

    return {
        currentTheme,
        toggleTheme,
        setTheme,
        clearTheme,
        isLight: currentTheme === 'light',
        isDark: currentTheme === 'dark'
    };
};

export const useThemeSync = () => {
    const [synced, setSynced] = useState(false);

    useEffect(() => {
        const handleFocus = () => {
            const currentTheme = themeManager.getCurrentTheme();
            themeManager.setTheme(currentTheme);
            setSynced(true);
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    return { synced };
};