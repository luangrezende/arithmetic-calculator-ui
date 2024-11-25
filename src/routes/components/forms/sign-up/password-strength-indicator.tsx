import { Typography } from '@mui/material';

interface PasswordStrengthIndicatorProps {
    score: number;
    label: string;
}

export function PasswordStrengthIndicator({ score, label }: PasswordStrengthIndicatorProps) {
    const passwordStrengthColors = ['#e53935', '#ffb300', '#fdd835', '#43a047', '#2e7d32']; // Vermelho ao verde escuro
    const strengthColor = passwordStrengthColors[score - 1] || '#e53935';

    return (
        <Typography variant="body2" sx={{ mb: 2 }}>
            Password strength: <strong style={{ color: strengthColor }}>{label}</strong>
        </Typography>
    );
}
