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
                fixed top-0 right-0 w-full
                lg:left-[256px]
                lg:w-[calc(100%-256px)]
                ${mode === 'dark' 
                    ? 'bg-slate-900/95' 
                    : 'bg-white/95'
                }
                backdrop-blur-md
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
                    md:h-[var(--layout-header-desktop-height)]
                    lg:h-[var(--layout-header-desktop-height)]
                    transition-all duration-200
                    ${slotProps?.toolbar?.className || ''}
                `}
            >
                <div
                    className={`
                        h-full flex items-center justify-between
                        ${slotProps?.container?.maxWidth === false ? '' : 'max-w-7xl mx-auto'}
                        ${slotProps?.container?.className || ''}
                    `}
                >
                    <div className="flex items-center flex-shrink-0">
                        {slots?.leftArea}
                    </div>

                    <div className="flex flex-1 justify-center px-4">
                        {slots?.centerArea}
                    </div>

                    <div className="flex items-center flex-shrink-0">
                        {slots?.rightArea}
                    </div>
                </div>
            </div>

            {slots?.bottomArea}
        </header>
    );
}
