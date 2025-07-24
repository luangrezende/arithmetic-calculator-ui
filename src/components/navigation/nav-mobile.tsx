import { useEffect } from 'react';

import { Drawer, drawerClasses } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { usePathname } from 'src/routes/hooks';

import { NavContent } from './nav-content';

import type { NavMobileProps } from './nav.types';

export function NavMobile({ sx, data, open, slots, onClose }: NavMobileProps) {
    const pathname = usePathname();
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    useEffect(() => {
        if (open) {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <Drawer
            open={open}
            onClose={onClose}
            sx={{
                [`& .${drawerClasses.paper}`]: {
                    pt: 2.5,
                    px: 2.5,
                    overflow: 'unset',
                    bgcolor: isDark ? theme.palette.background.paper : 'var(--layout-nav-bg)',
                    width: 'var(--layout-nav-mobile-width)',
                    ...sx,
                },
            }}
        >
            <NavContent data={data} slots={slots} />
        </Drawer>
    );
}
