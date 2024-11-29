import { Button, CircularProgress } from '@mui/material';

interface LoadingButtonProps {
    children: React.ReactNode;
    loading: boolean;
    onClick: () => void;
    fullWidth?: boolean;
    disabled?: boolean;
    variant?: 'contained' | 'outlined' | 'text';
    size?: 'small' | 'medium' | 'large';
    color?: 'inherit' | 'primary' | 'secondary';
}

export function LoadingButton({
    children,
    loading,
    onClick,
    fullWidth = false,
    disabled = false,
    variant = 'contained',
    size = 'medium',
    color = 'primary',
}: LoadingButtonProps) {
    return (
        <Button
            onClick={onClick}
            fullWidth={fullWidth}
            variant={variant}
            size={size}
            color={color}
            disabled={disabled || loading}
        >
            {loading ? <CircularProgress size={24} /> : children}
        </Button>
    );
}
