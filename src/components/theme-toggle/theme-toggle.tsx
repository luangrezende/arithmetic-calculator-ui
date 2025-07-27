import { useThemeMode } from 'src/context/theme-context';

import { Tooltip } from 'src/components/tooltip';
import { Iconify } from 'src/components/iconify';

export function ThemeToggle() {
    const { mode, toggleTheme, isAuthRoute } = useThemeMode();

    if (isAuthRoute) return null;

    const isDark = mode === 'dark';
    const tooltipText = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    const iconName = isDark ? 'solar:sun-bold' : 'solar:moon-bold';
    const iconColor = isDark ? '#eab308' : '#2563eb';

    return (
        <Tooltip content={tooltipText}>
            <button
                type="button"
                onClick={toggleTheme}
                className="w-10 h-10 xl:w-11 xl:h-11 flex items-center justify-center rounded-full bg-slate-100/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-sm transition-all duration-300 ease-out hover:scale-105 active:scale-95 hover:bg-slate-200 dark:hover:bg-slate-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-yellow-500/50 active:outline-none select-none"
                aria-label={tooltipText}
            >
                <Iconify
                    icon={iconName}
                    width={16}
                    sx={{
                        color: iconColor,
                        transition: 'all 0.3s ease-out',
                        width: { xs: 16, xl: 18 },
                        height: { xs: 16, xl: 18 },
                        '&:hover': {
                            transform: isDark ? 'rotate(180deg) scale(1.1)' : 'rotate(-180deg) scale(1.1)'
                        }
                    }}
                />
            </button>
        </Tooltip>
    );
}
