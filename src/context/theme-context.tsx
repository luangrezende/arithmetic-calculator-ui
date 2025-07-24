import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { varAlpha } from 'src/theme/styles';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
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

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme-mode') as ThemeMode;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            setMode(savedTheme);
        } else if (systemPrefersDark) {
            setMode('dark');
        }
    }, []);

    const toggleTheme = useCallback(() => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('theme-mode', newMode);
    }, [mode]);

    const theme = createTheme({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    // Light theme
                    primary: {
                        main: '#2563EB',
                        light: '#6BB6FF',
                        dark: '#1E40AF',
                    },
                    secondary: {
                        main: '#7C3AED',
                        light: '#A78BFA',
                        dark: '#5B21B6',
                    },
                    success: {
                        main: '#10B981',
                        light: '#6EE7B7',
                        dark: '#059669',
                    },
                    info: {
                        main: '#10B981',
                        light: '#6EE7B7',
                        dark: '#059669',
                    },
                    warning: {
                        main: '#F59E0B',
                        light: '#FCD34D',
                        dark: '#D97706',
                    },
                    error: {
                        main: '#EF4444',
                        light: '#FCA5A5',
                        dark: '#DC2626',
                    },
                    background: {
                        default: '#FFFFFF',
                        paper: '#FFFFFF',
                    },
                    text: {
                        primary: '#1E293B',
                        secondary: '#64748B',
                    },
                }
                : {
                    // Dark theme
                    primary: {
                        main: '#6BB6FF',
                        light: '#93C5FD',
                        dark: '#2563EB',
                    },
                    secondary: {
                        main: '#A78BFA',
                        light: '#C4B5FD',
                        dark: '#7C3AED',
                    },
                    success: {
                        main: '#34D399',
                        light: '#6EE7B7',
                        dark: '#10B981',
                    },
                    info: {
                        main: '#34D399',
                        light: '#6EE7B7',
                        dark: '#10B981',
                    },
                    warning: {
                        main: '#FBBF24',
                        light: '#FDE68A',
                        dark: '#F59E0B',
                    },
                    error: {
                        main: '#F87171',
                        light: '#FCA5A5',
                        dark: '#EF4444',
                    },
                    background: {
                        default: '#0F172A',
                        paper: '#1E293B',
                    },
                    text: {
                        primary: '#F1F5F9',
                        secondary: '#94A3B8',
                    },
                }),
        },
        shape: {
            borderRadius: 12,
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        background: mode === 'dark' 
                            ? `linear-gradient(135deg, ${varAlpha('15 23 42', 0.95)} 0%, ${varAlpha('30 41 59', 0.8)} 100%)`
                            : `linear-gradient(135deg, ${varAlpha('248 250 252', 0.8)} 0%, ${varAlpha('241 245 249', 0.6)} 100%)`,
                        minHeight: '100vh',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundColor: mode === 'dark' 
                            ? varAlpha('30 41 59', 0.8)
                            : varAlpha('255 255 255', 0.8),
                        backdropFilter: 'blur(10px)',
                        borderRadius: 12,
                        border: `1px solid ${mode === 'dark' 
                            ? varAlpha('100 116 139', 0.1)
                            : varAlpha('100 116 139', 0.2)}`,
                    },
                },
            },
        },
    });

    const contextValue = useMemo(() => ({ mode, toggleTheme }), [mode, toggleTheme]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}
