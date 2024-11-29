import { Box, useTheme, Typography, LinearProgress } from '@mui/material';

import { getPasswordStrengthColor } from './password-strength-indicator.styles';

import type { PasswordStrengthIndicatorProps } from './password-strength-indicator.types';

export function PasswordStrengthIndicator({ score, label }: PasswordStrengthIndicatorProps) {
    const theme = useTheme();
    const strengthColor = getPasswordStrengthColor(theme, score);

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Password strength: <strong style={{ color: strengthColor }}>{label}</strong>
            </Typography>

            <LinearProgress
                variant="determinate"
                value={(score / 5) * 100}
                sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: theme.palette.grey[300],
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: strengthColor,
                    },
                }}
            />
        </Box>
    );
}
