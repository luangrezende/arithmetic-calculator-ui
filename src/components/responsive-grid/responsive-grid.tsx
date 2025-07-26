import type { BoxProps } from '@mui/material/Box';

import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export interface ResponsiveGridProps extends BoxProps {
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
}

interface StyledGridProps {
    $columns?: ResponsiveGridProps['columns'];
    $gap?: number;
    $autoFit?: boolean;
    $minChildWidth?: string;
}

const StyledGrid = styled(Box)<StyledGridProps>(({ 
    theme, 
    $columns, 
    $gap = 3, 
    $autoFit, 
    $minChildWidth = '280px' 
}) => ({
    display: 'grid',
    gap: theme.spacing($gap),
    
    ...($autoFit && {
        gridTemplateColumns: `repeat(auto-fit, minmax(${$minChildWidth}, 1fr))`,
    }),
    
    ...(!$autoFit && $columns && {
        gridTemplateColumns: `repeat(${$columns.xs || 1}, 1fr)`,
        
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: `repeat(${$columns.sm || $columns.xs || 1}, 1fr)`,
        },
        
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: `repeat(${$columns.md || $columns.sm || $columns.xs || 1}, 1fr)`,
        },
        
        [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: `repeat(${$columns.lg || $columns.md || $columns.sm || $columns.xs || 1}, 1fr)`,
        },
        
        [theme.breakpoints.up('xl')]: {
            gridTemplateColumns: `repeat(${$columns.xl || $columns.lg || $columns.md || $columns.sm || $columns.xs || 1}, 1fr)`,
        },
    }),
}));

export const ResponsiveGrid = forwardRef<HTMLDivElement, ResponsiveGridProps>(
    ({ children, columns, gap, autoFit, minChildWidth, ...props }, ref) => (
        <StyledGrid
            ref={ref}
            $columns={columns}
            $gap={gap}
            $autoFit={autoFit}
            $minChildWidth={minChildWidth}
            {...props}
        >
            {children}
        </StyledGrid>
    )
);

ResponsiveGrid.displayName = 'ResponsiveGrid';
