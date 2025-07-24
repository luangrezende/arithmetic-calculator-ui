import type { TextFieldProps } from '@mui/material/TextField';
import { forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { varAlpha } from 'src/theme/styles';

export interface ModernInputProps extends Omit<TextFieldProps, 'glassy' | 'rounded'> {
    glassy?: boolean;
    rounded?: boolean;
}

const StyledTextField = styled(TextField)<ModernInputProps>(({ theme, glassy, rounded }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: rounded ? theme.spacing(4) : theme.spacing(1.5),
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow'
        ], {
            duration: theme.transitions.duration.short,
        }),
        
        ...(glassy && {
            background: varAlpha('255 255 255', 0.8),
            backdropFilter: 'blur(10px)',
        }),
        
        '&:hover': {
            boxShadow: `0 4px 12px ${varAlpha('100 116 139', 0.1)}`,
            
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: varAlpha('37 99 235', 0.4),
            },
        },
        
        '&.Mui-focused': {
            boxShadow: `0 0 0 3px ${varAlpha('37 99 235', 0.1)}`,
            
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
                borderWidth: 2,
            },
        },
        
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: varAlpha('203 213 225', 0.3),
            transition: theme.transitions.create(['border-color'], {
                duration: theme.transitions.duration.short,
            }),
        },
    },
    
    '& .MuiInputLabel-root': {
        '&.Mui-focused': {
            color: theme.palette.primary.main,
            fontWeight: 500,
        },
    },
}));

export const ModernInput = forwardRef<HTMLDivElement, ModernInputProps>(
    ({ glassy = false, rounded = false, ...props }, ref) => (
        <StyledTextField
            ref={ref}
            glassy={glassy}
            rounded={rounded}
            {...props}
        />
    )
);

ModernInput.displayName = 'ModernInput';
