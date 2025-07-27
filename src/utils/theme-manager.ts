type ThemeMode = 'light' | 'dark';

interface ThemeConfig {
    storageKey: string;
    defaultTheme: ThemeMode;
    enableTransitions: boolean;
}

class ThemeManager {
    private config: ThemeConfig;
    private listeners: Set<(theme: ThemeMode) => void> = new Set();

    constructor(config: Partial<ThemeConfig> = {}) {
        this.config = {
            storageKey: 'theme-mode',
            defaultTheme: 'light',
            enableTransitions: true,
            ...config
        };

        this.initializeTheme();
        this.setupStorageListener();
    }

    private initializeTheme(): void {
        const savedTheme = this.getStoredTheme();
        this.applyTheme(savedTheme);
    }

    private setupStorageListener(): void {
        if (typeof window === 'undefined') return;

        window.addEventListener('storage', (e) => {
            if (e.key === this.config.storageKey && e.newValue) {
                const newTheme = ThemeManager.validateTheme(e.newValue) ? (e.newValue as ThemeMode) : this.config.defaultTheme;
                this.applyTheme(newTheme);
                this.notifyListeners(newTheme);
            }
        });
    }

    private static validateTheme(theme: string): boolean {
        return theme === 'light' || theme === 'dark';
    }

    private applyTheme(theme: ThemeMode): void {
        if (typeof document === 'undefined') return;

        const { documentElement } = document;
        
        if (this.config.enableTransitions) {
            documentElement.style.setProperty('transition', 'background-color 0.3s ease-out, color 0.3s ease-out');
        }

        if (theme === 'dark') {
            documentElement.classList.add('dark');
            documentElement.style.setProperty('color-scheme', 'dark');
        } else {
            documentElement.classList.remove('dark');
            documentElement.style.setProperty('color-scheme', 'light');
        }
    }

    private notifyListeners(theme: ThemeMode): void {
        this.listeners.forEach(listener => listener(theme));
    }

    getStoredTheme(): ThemeMode {
        try {
            const stored = localStorage?.getItem(this.config.storageKey);
            return ThemeManager.validateTheme(stored || '') ? (stored as ThemeMode) : this.config.defaultTheme;
        } catch {
            return this.config.defaultTheme;
        }
    }

    setTheme(theme: ThemeMode): void {
        try {
            localStorage?.setItem(this.config.storageKey, theme);
            this.applyTheme(theme);
            this.notifyListeners(theme);
        } catch (error) {
            console.warn('Failed to save theme preference:', error);
            this.applyTheme(theme);
            this.notifyListeners(theme);
        }
    }

    toggleTheme(): ThemeMode {
        const currentTheme = this.getStoredTheme();
        const newTheme: ThemeMode = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        return newTheme;
    }

    subscribe(listener: (theme: ThemeMode) => void): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    getCurrentTheme(): ThemeMode {
        return this.getStoredTheme();
    }

    clearTheme(): void {
        try {
            localStorage?.removeItem(this.config.storageKey);
            this.applyTheme(this.config.defaultTheme);
            this.notifyListeners(this.config.defaultTheme);
        } catch (error) {
            console.warn('Failed to clear theme preference:', error);
        }
    }
}

export const themeManager = new ThemeManager();

export type { ThemeMode, ThemeConfig };
export { ThemeManager };
