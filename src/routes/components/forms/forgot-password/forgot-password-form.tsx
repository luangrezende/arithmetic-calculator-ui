import { useState } from 'react';

import { Box, Typography } from '@mui/material';

import { ForgotPasswordInput } from './forgot-password-input';
import { ForgotPasswordButtons } from './forgot-password-buttons';
import { ForgotPasswordSnackbar } from './forgot-password-snackbar';

export interface ForgotPasswordFormProps {
    onSubmit: (email: string) => void;
    onCancel: () => void;
    loading: boolean;
    error: string | null;
}

export function ForgotPasswordForm({
    onSubmit,
    onCancel,
    loading,
    error,
}: ForgotPasswordFormProps) {
    const [email, setEmail] = useState('');
    const [fieldError, setFieldError] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSubmit = () => {
        if (!email.trim()) {
            setFieldError(true);
            return;
        }
        setFieldError(false);
        setSnackbarOpen(false);
        setTimeout(() => onCancel(), 1000);

        try {
            onSubmit(email);
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Error during password recovery request:', err);
            setFieldError(true);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" maxWidth={400} width="100%">
            <Typography variant="h6" sx={{ mb: 2 }}>
                Reset Password
            </Typography>
            <ForgotPasswordInput email={email} fieldError={fieldError} onEmailChange={setEmail} />
            {error && (
                <Box
                    sx={{
                        mb: 2,
                        p: 1,
                        color: 'error.main',
                        backgroundColor: (theme) => theme.palette.error.light,
                        borderRadius: 1,
                        fontSize: '0.875rem',
                        textAlign: 'center',
                    }}
                >
                    {error}
                </Box>
            )}
            <ForgotPasswordButtons onCancel={onCancel} onSubmit={handleSubmit} loading={loading} />
            <ForgotPasswordSnackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)} />
        </Box>
    );
}
