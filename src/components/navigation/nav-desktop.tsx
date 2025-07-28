import { NavContent } from './nav-content';

import type { NavDesktopProps } from './nav.types';

export function NavDesktop({ data, slots }: NavDesktopProps) {
    return (
        <div className="fixed top-0 left-0 h-screen w-72 max-w-[85vw] z-[1100] overflow-y-auto overflow-x-hidden pt-6 px-4 bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-2xl hidden lg:block">
            <NavContent data={data} slots={slots} />
        </div>
    );
}
