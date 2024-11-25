import { TextField, Typography } from '@mui/material';

export interface ForgotPasswordInputProps {
    email: string;
    fieldError: boolean;
    onEmailChange: (value: string) => void;
}

export function ForgotPasswordInput({
    email,
    fieldError,
    onEmailChange,
}: ForgotPasswordInputProps) {
    return (
        <>
            <TextField
                fullWidth
                name="email"
                label="Email address"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                error={fieldError}
                helperText={fieldError ? 'Email is required.' : ''}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 1 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                This is a test environment. Password recovery will not work.
            </Typography>
        </>
    );
}
