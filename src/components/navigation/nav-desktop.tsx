import { useThemeMode } from 'src/context/theme-context';

import { NavContent } from './nav-content';

import type { NavDesktopProps } from './nav.types';

export function NavDesktop({ data, slots, layoutQuery }: NavDesktopProps) {
    const { mode } = useThemeMode();

    return (
        <div
            className={`
                pt-3 px-3 top-0 left-0 h-full
                hidden fixed flex-col
                ${mode === 'dark' 
                    ? 'bg-slate-900/95 border-slate-700/50' 
                    : 'bg-white/95 border-slate-200/50'
                }
                backdrop-blur-md border-r
                z-[1200] w-[--layout-nav-vertical-width]
                lg:flex
                transition-all duration-300 ease-in-out
                animate-in slide-in-from-left-4 fade-in duration-500
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
