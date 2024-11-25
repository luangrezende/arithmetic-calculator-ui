import { useState } from 'react';

import { Box, Link } from '@mui/material';

import { LoadingButton } from 'src/components/common/loading-button';

import { SignInTitle } from './sign-in-title';
import { SignInField } from './sign-in-field';
import { SignInPasswordField } from './sign-in-password-field';
import { ForgotPasswordForm } from '../forgot-password/forgot-password-form';

export interface SignInFormProps {
    email: string;
    password: string;
    loginSuccess: boolean;
    fieldErrors: { email: boolean; password: boolean };
    loading: boolean;
    error: string | null;
    onFieldChange: (field: 'email' | 'password', value: string) => void;
    onSubmit: () => void;
    onSignUp: () => void;
}

export function SignInForm({
    email,
    password,
    loginSuccess,
    fieldErrors,
    loading,
    error,
    onFieldChange,
    onSubmit,
    onSignUp,
}: SignInFormProps) {
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
    const handleForgotPassword = async (typedEmail: string) => {
        console.log(`Forgot password for: ${email}`);
    };

    const handleSubmit = async () => {
        onSubmit();
    };

    if (forgotPasswordOpen) {
        return (
            <ForgotPasswordForm
                onSubmit={handleForgotPassword}
                onCancel={() => setForgotPasswordOpen(false)}
                loading={loading}
                error={error}
            />
        );
    }

    return (
        <Box>
            <SignInTitle onSignUp={onSignUp} />
            <Box
                component="form"
                display="flex"
                flexDirection="column"
                alignItems="center"
                maxWidth={400}
                width="100%"
            >
                <SignInField
                    name="email"
                    label="Email address"
                    value={email}
                    error={fieldErrors.email}
                    helperText={fieldErrors.email ? 'Email is required.' : ''}
                    onChange={(value) => onFieldChange('email', value)}
                />
                <Box display="flex" justifyContent="flex-end" width="100%" sx={{ mb: 1.5 }}>
                    <Link
                        variant="body2"
                        color="inherit"
                        onClick={() => setForgotPasswordOpen(true)}
                    >
                        Forgot password?
                    </Link>
                </Box>

                <SignInPasswordField
                    value={password}
                    error={fieldErrors.password}
                    helperText={fieldErrors.password ? 'Password is required.' : ''}
                    onChange={(value) => onFieldChange('password', value)}
                />

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

                <LoadingButton
                    fullWidth
                    size="large"
                    color="inherit"
                    variant="contained"
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={loginSuccess}
                >
                    Sign in
                </LoadingButton>
            </Box>
        </Box>
    );
}
