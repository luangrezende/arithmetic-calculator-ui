import type { Breakpoint } from '@mui/material/styles';

import { useThemeMode } from 'src/context/theme-context';

import { layoutClasses } from '../classes';

export type HeaderSectionProps = {
    layoutQuery: Breakpoint;
    className?: string;
    slots?: {
        leftArea?: React.ReactNode;
        rightArea?: React.ReactNode;
        topArea?: React.ReactNode;
        centerArea?: React.ReactNode;
        bottomArea?: React.ReactNode;
    };
    slotProps?: {
        toolbar?: {
            className?: string;
        };
        container?: {
            maxWidth?: boolean;
            className?: string;
        };
    };
};

export function HeaderSection({
    slots,
    slotProps,
    layoutQuery = 'md',
    className = '',
}: HeaderSectionProps) {
    const { mode } = useThemeMode();

    return (
        <header
            className={`
                relative
                ${mode === 'dark' 
                    ? 'bg-slate-900/95 border-slate-700/50' 
                    : 'bg-white/95 border-slate-200/50'
                }
                backdrop-blur-md border-b
                transition-all duration-200 ease-in-out
                ${layoutClasses.header}
                ${className}
            `}
            style={{
                zIndex: 'var(--layout-header-zIndex)',
            }}
        >
            {slots?.topArea}

            <div
                className={`
                    h-[var(--layout-header-mobile-height)]
                    lg:h-[var(--layout-header-desktop-height)]
                    transition-all duration-200
                    ${slotProps?.toolbar?.className || ''}
                `}
            >
                <div
                    className={`
                        h-full flex items-center
                        ${slotProps?.container?.maxWidth === false ? '' : 'max-w-7xl mx-auto'}
                        ${slotProps?.container?.className || ''}
                    `}
                >
                    {slots?.leftArea}

                    <div className="flex flex-1 justify-center">
                        {slots?.centerArea}
                    </div>

                    {slots?.rightArea}
                </div>
            </div>

            {slots?.bottomArea}
        </header>
    );
}
