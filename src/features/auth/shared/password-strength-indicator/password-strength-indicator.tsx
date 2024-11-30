import { Box, useTheme, Typography, LinearProgress } from '@mui/material';

import { validatePasswordStrength } from 'src/utils/validation';

import { getPasswordStrengthColor } from './password-strength-indicator.styles';

interface PasswordStrengthIndicatorProps {
    password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
    const theme = useTheme();

    const { score, label } = validatePasswordStrength(password);

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
