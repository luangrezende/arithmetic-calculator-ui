import type { CardProps } from '@mui/material/Card';
import { forwardRef } from 'react';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { varAlpha } from 'src/theme/styles';

export interface ModernCardProps extends CardProps {
    hoverable?: boolean;
    glassy?: boolean;
    gradient?: boolean;
    interactive?: boolean;
}

interface StyledCardProps {
    $hoverable?: boolean;
    $glassy?: boolean;
    $gradient?: boolean;
    $interactive?: boolean;
}

const StyledCard = styled(Card)<StyledCardProps>(({ 
    theme, 
    $hoverable: hoverable, 
    $glassy: glassy, 
    $gradient: gradient, 
    $interactive: interactive 
}) => {
    const isDark = theme.palette.mode === 'dark';
    
    return {
        borderRadius: theme.spacing(2),
        border: `1px solid ${isDark 
            ? varAlpha('100 116 139', 0.1) 
            : varAlpha('203 213 225', 0.2)}`,
        background: theme.palette.background.paper,
        transition: theme.transitions.create([
            'box-shadow',
            'transform',
            'border-color',
            'background'
        ], {
            duration: theme.transitions.duration.short,
        }),
        
        ...(glassy && {
            background: isDark 
                ? varAlpha('30 41 59', 0.8)
                : varAlpha('255 255 255', 0.8),
            backdropFilter: 'blur(20px)',
            border: `1px solid ${isDark 
                ? varAlpha('100 116 139', 0.2)
                : varAlpha('203 213 225', 0.3)}`,
        }),
        
        ...(gradient && {
            background: isDark
                ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${varAlpha('100 116 139', 0.02)} 100%)`
                : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${varAlpha('37 99 235', 0.02)} 100%)`,
        }),
        
        ...(hoverable && {
            cursor: 'pointer',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: isDark 
                    ? `0 12px 24px ${varAlpha('0 0 0', 0.4)}`
                    : theme.customShadows?.z16 || `0 12px 24px ${varAlpha('0 0 0', 0.12)}`,
                borderColor: isDark 
                    ? varAlpha('107 182 255', 0.4)
                    : varAlpha('37 99 235', 0.3),
            },
        }),
        
        ...(interactive && {
            cursor: 'pointer',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: isDark 
                    ? `0 8px 16px ${varAlpha('0 0 0', 0.3)}`
                    : theme.customShadows?.z8 || `0 8px 16px ${varAlpha('0 0 0', 0.08)}`,
                borderColor: isDark ? theme.palette.primary.light : theme.palette.primary.light,
                background: gradient 
                    ? (isDark
                        ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${varAlpha('100 116 139', 0.04)} 100%)`
                        : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${varAlpha('37 99 235', 0.04)} 100%)`)
                    : (isDark 
                        ? varAlpha('100 116 139', 0.02)
                        : varAlpha('37 99 235', 0.02)),
            },
            '&:active': {
                transform: 'translateY(0)',
            },
        }),
    };
});

export const ModernCard = forwardRef<HTMLDivElement, ModernCardProps>(
    ({ children, hoverable = false, glassy = false, gradient = false, interactive = false, ...props }, ref) => (
        <StyledCard
            ref={ref}
            $hoverable={hoverable}
            $glassy={glassy}
            $gradient={gradient}
            $interactive={interactive}
            {...props}
        >
            {children}
        </StyledCard>
    )
);

ModernCard.displayName = 'ModernCard';
