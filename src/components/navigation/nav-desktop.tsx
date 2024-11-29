import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { varAlpha } from 'src/theme/styles';

import { NavContent } from './nav-content';

import type { NavDesktopProps } from './nav.types';

export function NavDesktop({ sx, data, slots, layoutQuery }: NavDesktopProps) {
    const theme = useTheme();

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
                bgcolor: 'var(--layout-nav-bg)',
                zIndex: 'var(--layout-nav-zIndex)',
                width: 'var(--layout-nav-vertical-width)',
                borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)})`,
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
