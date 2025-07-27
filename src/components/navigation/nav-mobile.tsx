import { useEffect } from 'react';

import { usePathname } from 'src/routes/hooks';

import { ModernDrawer } from 'src/components/modern-drawer';

import { NavContent } from './nav-content';

import type { NavMobileProps } from './nav.types';

export function NavMobile({ data, open, slots, onClose }: NavMobileProps) {
    const pathname = usePathname();

    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    return (
        <ModernDrawer open={open} onClose={onClose}>
            <NavContent data={data} slots={slots} />
        </ModernDrawer>
    );
}
