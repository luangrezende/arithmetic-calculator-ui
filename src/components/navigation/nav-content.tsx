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
        <div className="pt-2">
            <div className="mb-16 px-2">
                <Logo />
            </div>

            <h6 className={`mb-4 px-4 text-xs font-medium uppercase tracking-wider ${
                mode === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
                Menu
            </h6>

            {slots?.topArea}

            <Scrollbar fillContent>
                <nav className="flex flex-1 flex-col px-4">
                    <ul className="flex flex-col gap-2">
                        {data.map((item, index) => {
                            const isActive = item.path === pathname;

                            return (
                                <li key={item.title}>
                                    <RouterLink
                                        href={item.path}
                                        className={`
                                            flex items-center gap-4 px-4 py-3 rounded-xl
                                            text-sm font-medium transition-all duration-200 ease-out
                                            sm:hover:scale-[1.01] active:scale-[0.99]
                                            ${isActive 
                                                ? mode === 'dark'
                                                    ? 'bg-blue-500/20 text-blue-100 font-semibold shadow-md'
                                                    : 'bg-blue-50 text-blue-700 font-semibold shadow-sm'
                                                : mode === 'dark'
                                                    ? 'text-slate-300 sm:hover:bg-slate-800/50 sm:hover:text-white sm:hover:shadow-sm'
                                                    : 'text-slate-500 sm:hover:bg-slate-100 sm:hover:text-slate-500 sm:hover:shadow-sm'
                                            }
                                        `}
                                    >
                                        <span className="w-7 h-7 flex items-center justify-center transition-transform duration-200 sm:hover:scale-105">
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
        </div>
    );
}
