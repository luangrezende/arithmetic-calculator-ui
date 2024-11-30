import { useEffect } from 'react';

import { Drawer, drawerClasses } from '@mui/material';

import { usePathname } from 'src/routes/hooks';

import { NavContent } from './nav-content';

import type { NavMobileProps } from './nav.types';

export function NavMobile({ sx, data, open, slots, onClose }: NavMobileProps) {
    const pathname = usePathname();

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
                    bgcolor: 'var(--layout-nav-bg)',
                    width: 'var(--layout-nav-mobile-width)',
                    ...sx,
                },
            }}
        >
            <NavContent data={data} slots={slots} />
        </Drawer>
    );
}
