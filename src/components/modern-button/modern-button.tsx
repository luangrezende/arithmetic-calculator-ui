import type { ButtonProps } from '@mui/material/Button';
import { forwardRef } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { varAlpha } from 'src/theme/styles';

export interface ModernButtonProps extends ButtonProps {
    gradient?: boolean;
    glow?: boolean;
    rounded?: boolean;
}

const StyledButton = styled(Button)<ModernButtonProps>(({ theme, gradient, glow, rounded }) => ({
    borderRadius: rounded ? theme.spacing(6) : theme.spacing(1.5),
    textTransform: 'none',
    fontWeight: 600,
    minHeight: 48,
    padding: theme.spacing(1.5, 3),
    transition: theme.transitions.create([
        'background-color',
        'box-shadow',
        'transform',
        'border-color'
    ], {
        duration: theme.transitions.duration.short,
    }),
    
    '&:hover': {
        transform: 'translateY(-1px)',
        boxShadow: theme.customShadows?.z8 || `0 8px 16px 0 ${varAlpha('100 116 139', 0.16)}`,
    },
    
    '&:active': {
        transform: 'translateY(0)',
    },
    
    ...(gradient && {
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        '&:hover': {
            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.darker} 100%)`,
            transform: 'translateY(-2px)',
            boxShadow: `0 8px 25px ${varAlpha('37 99 235', 0.4)}`,
        },
    }),
    
    ...(glow && {
        boxShadow: `0 0 20px ${varAlpha('37 99 235', 0.3)}`,
        '&:hover': {
            boxShadow: `0 0 30px ${varAlpha('37 99 235', 0.5)}`,
        },
    }),
}));

export const ModernButton = forwardRef<HTMLButtonElement, ModernButtonProps>(
    ({ children, gradient = false, glow = false, rounded = false, ...props }, ref) => (
        <StyledButton
            ref={ref}
            gradient={gradient}
            glow={glow}
            rounded={rounded}
            {...props}
        >
            {children}
        </StyledButton>
    )
);

ModernButton.displayName = 'ModernButton';
