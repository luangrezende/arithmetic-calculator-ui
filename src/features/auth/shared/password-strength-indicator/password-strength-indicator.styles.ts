import type { Theme } from '@mui/material';

export const getPasswordStrengthColor = (theme: Theme, score: number): string => {
    const colors = [
        theme.palette.error.main,
        theme.palette.warning.main,
        theme.palette.warning.light,
        theme.palette.success.light,
        theme.palette.success.main,
    ];
    return colors[score - 1] || theme.palette.error.main;
};
