import { useThemeMode } from 'src/context/theme-context';

export const useLayoutVars = () => {
    const { mode } = useThemeMode();
    const isDark = mode === 'dark';
    
    return {
        '--layout-nav-bg': isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        '--layout-nav-zIndex': '1100',
        '--layout-nav-mobile-width': '320px',
        '--layout-nav-item-height': '44px',
        '--layout-nav-item-color': isDark ? 'rgb(148, 163, 184)' : 'rgb(100, 116, 139)',
        '--layout-nav-item-active-color': isDark ? 'rgb(107, 182, 255)' : 'rgb(37, 99, 235)',
        '--layout-nav-item-active-bg': isDark 
            ? 'rgba(107, 182, 255, 0.08)' 
            : 'rgba(37, 99, 235, 0.08)',
        '--layout-nav-item-hover-bg': isDark 
            ? 'rgba(107, 182, 255, 0.16)' 
            : 'rgba(37, 99, 235, 0.16)',
        '--layout-header-zIndex': '1050',
        '--layout-header-mobile-height': '60px',
        '--layout-header-desktop-height': '72px',
    };
};

export const getLayoutClasses = () => ({
    nav: 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm',
    header: 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm',
    main: 'bg-slate-100 dark:bg-slate-800',
    paper: 'bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm rounded-xl',
    text: {
        primary: 'text-slate-900 dark:text-slate-100',
        secondary: 'text-slate-600 dark:text-slate-400',
    },
    colors: {
        primary: 'text-blue-600 dark:text-blue-400',
        success: 'text-emerald-600 dark:text-emerald-400',
        warning: 'text-yellow-600 dark:text-yellow-400',
        error: 'text-red-600 dark:text-red-400',
    },
});
