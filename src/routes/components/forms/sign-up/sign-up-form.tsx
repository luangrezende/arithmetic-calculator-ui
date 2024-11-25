import { Box, Typography } from '@mui/material';

import { LoadingButton } from 'src/components/common/loading-button';

import { SignUpField } from './field-field';
import { SignUpTitle } from './sign-up-title';
import { PasswordStrengthIndicator } from './password-strength-indicator';

export interface SignUpFormProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    passwordStrength: { score: number; label: string };
    registerSuccess: boolean;
    fieldErrors: { name: boolean; email: boolean; password: boolean; confirmPassword: boolean };
    loading: boolean;
    error: string | null;
    onFieldChange: (
        field: 'name' | 'email' | 'password' | 'confirmPassword',
        value: string
    ) => void;
    onSubmit: () => void;
    onBackToSignIn: () => void;
}

export function SignUpForm({
    name,
    email,
    password,
    confirmPassword,
    passwordStrength,
    registerSuccess,
    fieldErrors,
    loading,
    error,
    onFieldChange,
    onSubmit,
    onBackToSignIn,
}: SignUpFormProps) {
    return (
        <Box>
            <SignUpTitle onBackToSignIn={onBackToSignIn} />

            <Box
                component="form"
                display="flex"
                flexDirection="column"
                alignItems="center"
                maxWidth={400}
                width="100%"
            >
                <SignUpField
                    name="name"
                    label="Full Name"
                    value={name}
                    onChange={(value: any) => onFieldChange('name', value)}
                    error={fieldErrors.name}
                    helperText={fieldErrors.name ? 'Name is required.' : ''}
                />

                <SignUpField
                    name="email"
                    label="Email Address"
                    value={email}
                    onChange={(value: any) => onFieldChange('email', value)}
                    error={fieldErrors.email}
                    helperText={fieldErrors.email ? 'Email is required.' : ''}
                />

                <SignUpField
                    name="password"
                    label="Password"
                    value={password}
                    onChange={(value: any) => onFieldChange('password', value)}
                    error={fieldErrors.password}
                    helperText={fieldErrors.password ? 'Password is required.' : ''}
                    showToggle
                />

                {password && <PasswordStrengthIndicator {...passwordStrength} />}

                <SignUpField
                    name="confirmPassword"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(value: any) => onFieldChange('confirmPassword', value)}
                    error={fieldErrors.confirmPassword}
                    helperText={
                        fieldErrors.confirmPassword
                            ? confirmPassword
                                ? 'Passwords do not match.'
                                : 'Confirmation is required.'
                            : ''
                    }
                    showToggle
                />

                {error && (
                    <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}

                <LoadingButton
                    fullWidth
                    size="large"
                    color="inherit"
                    variant="contained"
                    onClick={onSubmit}
                    loading={loading}
                    disabled={registerSuccess}
                >
                    Sign up
                </LoadingButton>
            </Box>
        </Box>
    );
}
