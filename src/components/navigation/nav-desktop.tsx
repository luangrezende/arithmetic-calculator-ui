import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { NavContent } from './nav-content';

import type { NavDesktopProps } from './nav.types';

export function NavDesktop({ sx, data, slots, layoutQuery }: NavDesktopProps) {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box
            sx={{
                pt: 2.5,
                px: 2.5,
                top: 0,
                left: 0,
                height: 1,
                display: 'none',
                position: 'fixed',
                flexDirection: 'column',
                bgcolor: isDark ? theme.palette.background.paper : 'var(--layout-nav-bg)',
                zIndex: 'var(--layout-nav-zIndex)',
                width: 'var(--layout-nav-vertical-width)',
                boxShadow: 'none',
                border: 'none',
                [theme.breakpoints.up(layoutQuery)]: {
                    display: 'flex',
                },
                ...sx,
            }}
        >
            <NavContent data={data} slots={slots} />
        </Box>
    );
}
