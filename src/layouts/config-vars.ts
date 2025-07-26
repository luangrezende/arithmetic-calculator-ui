import type { Theme } from '@mui/material/styles';

import { varAlpha } from 'src/theme/styles';

export const baseVars = (theme: Theme) => {
    const isDark = theme.palette.mode === 'dark';
    
    return {
        '--layout-nav-bg': isDark ? theme.palette.background.paper : theme.palette.common.white,
        '--layout-nav-zIndex': 1101,
        '--layout-nav-mobile-width': '320px',
        '--layout-nav-item-height': '44px',
        '--layout-nav-item-color': theme.palette.text.secondary,
        '--layout-nav-item-active-color': theme.palette.primary.main,
        '--layout-nav-item-active-bg': isDark 
            ? varAlpha('107 182 255', 0.08) 
            : varAlpha('37 99 235', 0.08),
        '--layout-nav-item-hover-bg': isDark 
            ? varAlpha('107 182 255', 0.16) 
            : varAlpha('37 99 235', 0.16),
        '--layout-header-zIndex': 1100,
        '--layout-header-mobile-height': '64px',
        '--layout-header-desktop-height': '72px',
    };
};
