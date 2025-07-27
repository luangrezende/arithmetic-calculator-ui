import { useThemeMode } from 'src/context/theme-context';

import { NavContent } from './nav-content';

import type { NavDesktopProps } from './nav.types';

export function NavDesktop({ data, slots, layoutQuery }: NavDesktopProps) {
    const { mode } = useThemeMode();

    return (
        <div
            className={`
                pt-0 px-3 top-0 left-0 h-screen
                hidden fixed flex-col
                ${mode === 'dark' 
                    ? 'bg-slate-900/95' 
                    : 'bg-white/95'
                }
                backdrop-blur-md
                shadow-xl
                lg:flex
                transition-all duration-200 ease-out
            `}
            style={{
                width: 'var(--layout-nav-vertical-width)',
                zIndex: 'var(--layout-nav-zIndex)',
            }}
        >
            <NavContent data={data} slots={slots} />
        </div>
    );
}
