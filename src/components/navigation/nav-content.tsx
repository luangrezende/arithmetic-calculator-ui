import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useThemeMode } from 'src/context/theme-context';

import { Scrollbar } from 'src/components/scrollbar';

import { Logo } from '../logo';

import type { NavContentProps } from './nav.types';

export function NavContent({ data, slots }: NavContentProps) {
    const pathname = usePathname();
    const { mode } = useThemeMode();

    return (
        <>
            <div className="mb-16 px-1">
                <Logo />
            </div>

            <h6 className={`mb-3 px-2 text-xs font-medium uppercase tracking-wider ${
                mode === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
                Overview
            </h6>

            {slots?.topArea}

            <Scrollbar fillContent>
                <nav className="flex flex-1 flex-col px-2">
                    <ul className="flex flex-col gap-1">
                        {data.map((item, index) => {
                            const isActive = item.path === pathname;

                            return (
                                <li key={item.title}>
                                    <RouterLink
                                        href={item.path}
                                        className={`
                                            flex items-center gap-3 px-3 py-2.5 rounded-lg
                                            text-sm font-medium transition-all duration-200 ease-out
                                            hover:scale-[1.01] active:scale-[0.99]
                                            ${isActive 
                                                ? mode === 'dark'
                                                    ? 'bg-primary-900/30 text-primary-300 font-semibold shadow-sm'
                                                    : 'bg-primary-50 text-primary-700 font-semibold shadow-sm'
                                                : mode === 'dark'
                                                    ? 'text-slate-300 hover:bg-slate-800/50 hover:text-white hover:shadow-sm'
                                                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:shadow-sm'
                                            }
                                        `}
                                    >
                                        <span className="w-6 h-6 flex items-center justify-center transition-transform duration-200 hover:scale-105">
                                            {item.icon}
                                        </span>
                                        <span className="flex-1">
                                            {item.title}
                                        </span>
                                        {item.info && (
                                            <span>
                                                {item.info}
                                            </span>
                                        )}
                                    </RouterLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </Scrollbar>

            {slots?.bottomArea}
        </>
    );
}
