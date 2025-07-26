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
            <div className="mb-16 px-1 animate-in slide-in-from-top-2 fade-in duration-300 group cursor-pointer">
                <div className="transition-all duration-300 group-hover:scale-105 animate-pulse-slow">
                    <Logo />
                </div>
            </div>

            <h6 className={`mb-3 px-2 text-xs font-medium uppercase tracking-wider transition-all duration-200 animate-in slide-in-from-left-2 fade-in delay-100 ${
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
                                <li 
                                    key={item.title}
                                    className="animate-in slide-in-from-left-4 fade-in"
                                    style={{ 
                                        animationDelay: `${150 + (index * 75)}ms`,
                                        animationDuration: '400ms',
                                        animationFillMode: 'backwards'
                                    }}
                                >
                                    <RouterLink
                                        href={item.path}
                                        className={`
                                            flex items-center gap-3 px-3 py-2.5 rounded-lg
                                            text-sm font-medium transition-all duration-200
                                            transform hover:scale-[1.02] active:scale-[0.98]
                                            group relative overflow-hidden
                                            before:absolute before:inset-0 before:bg-gradient-to-r 
                                            before:from-transparent before:via-white/10 before:to-transparent 
                                            before:translate-x-[-100%] before:transition-transform before:duration-700
                                            hover:before:translate-x-[100%]
                                            ${isActive 
                                                ? mode === 'dark'
                                                    ? 'bg-primary-900/30 text-primary-300 font-semibold shadow-md'
                                                    : 'bg-primary-50 text-primary-700 font-semibold shadow-md'
                                                : mode === 'dark'
                                                    ? 'text-slate-300 hover:bg-slate-800/50 hover:text-white hover:shadow-sm'
                                                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:shadow-sm'
                                            }
                                        `}
                                    >
                                        {/* Subtle animation overlay for active state */}
                                        {isActive && (
                                            <div className={`
                                                absolute inset-0 opacity-20 transition-opacity duration-300
                                                ${mode === 'dark' ? 'bg-primary-400' : 'bg-primary-500'}
                                            `} />
                                        )}
                                        
                                        <span className="w-6 h-6 flex items-center justify-center transition-all duration-200 group-hover:scale-110 relative z-10">
                                            {item.icon}
                                        </span>
                                        <span className="flex-1 transition-all duration-200 relative z-10">
                                            {item.title}
                                        </span>
                                        {item.info && (
                                            <span className="transition-all duration-200 transform group-hover:scale-105 relative z-10">
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
