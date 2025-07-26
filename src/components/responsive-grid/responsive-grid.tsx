import type { ReactNode, CSSProperties } from 'react';

import { forwardRef } from 'react';

export interface ResponsiveGridProps {
    children: ReactNode;
    columns?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
    gap?: number;
    autoFit?: boolean;
    minChildWidth?: string;
    className?: string;
    style?: CSSProperties;
    sx?: any; // Keep for backward compatibility
}

export const ResponsiveGrid = forwardRef<HTMLDivElement, ResponsiveGridProps>(
    ({ 
        children, 
        columns = { xs: 1, md: 2, lg: 3 }, 
        gap = 3, 
        autoFit = false, 
        minChildWidth = '280px',
        className = '',
        style = {},
        sx,
        ...props 
    }, ref) => {
        // Generate grid classes based on columns
        const gridColsClasses = [];
        if (columns.xs) gridColsClasses.push(`grid-cols-${columns.xs}`);
        if (columns.sm) gridColsClasses.push(`sm:grid-cols-${columns.sm}`);
        if (columns.md) gridColsClasses.push(`md:grid-cols-${columns.md}`);
        if (columns.lg) gridColsClasses.push(`lg:grid-cols-${columns.lg}`);
        if (columns.xl) gridColsClasses.push(`xl:grid-cols-${columns.xl}`);

        // Map gap to Tailwind classes
        const gapClassMap: Record<number, string> = {
            1: 'gap-1',
            2: 'gap-2', 
            3: 'gap-3',
            4: 'gap-4',
            5: 'gap-5',
            6: 'gap-6',
        };
        const gapClass = gapClassMap[gap] || 'gap-3';

        const gridStyle: CSSProperties = {
            display: 'grid',
            ...(autoFit && {
                gridTemplateColumns: `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`,
            }),
            ...style
        };

        // Apply sx styles for backward compatibility with MUI
        if (sx) {
            if (sx.mb) {
                gridStyle.marginBottom = `${sx.mb * 8}px`;
            }
            if (sx.mt) {
                gridStyle.marginTop = `${sx.mt * 8}px`;
            }
            if (sx.mx) {
                gridStyle.marginLeft = `${sx.mx * 8}px`;
                gridStyle.marginRight = `${sx.mx * 8}px`;
            }
            if (sx.my) {
                gridStyle.marginTop = `${sx.my * 8}px`;
                gridStyle.marginBottom = `${sx.my * 8}px`;
            }
            if (sx.p) {
                gridStyle.padding = `${sx.p * 8}px`;
            }
        }

        return (
            <div
                ref={ref}
                className={`grid ${autoFit ? '' : gridColsClasses.join(' ')} ${gapClass} ${className}`}
                style={gridStyle}
                {...props}
            >
                {children}
            </div>
        );
    }
);

ResponsiveGrid.displayName = 'ResponsiveGrid';
