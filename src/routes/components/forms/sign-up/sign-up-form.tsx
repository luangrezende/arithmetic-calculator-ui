import { Box } from '@mui/material';

import { LoadingButton } from 'src/components/common/loading-button';

import { AuthTitle } from '../../auth/auth-title';
import { ErrorMessage } from '../../common/error-message';
import { InputFieldForm } from '../../common/input-field-form';
import { AuthFormLayout } from '../../common/auth-form-layout';
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
            <AuthTitle
                title="Sign up"
                subtitle="Already have an account?"
                actionText="Sign in"
                onAction={onBackToSignIn}
            />

            <AuthFormLayout>
                <InputFieldForm
                    name="name"
                    label="Full Name"
                    value={name}
                    onChange={(value: string) => onFieldChange('name', value)}
                    error={fieldErrors.name}
                    helperText={fieldErrors.name ? 'Name is required.' : ''}
                />

                <InputFieldForm
                    name="email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(value: string) => onFieldChange('email', value)}
                    error={fieldErrors.email}
                    helperText={fieldErrors.email ? 'Invalid email address.' : ''}
                />

                <InputFieldForm
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(value: string) => onFieldChange('password', value)}
                    error={fieldErrors.password}
                    helperText={fieldErrors.password ? 'Password is required.' : ''}
                />

                {password && <PasswordStrengthIndicator {...passwordStrength} />}

                <InputFieldForm
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(value: string) => onFieldChange('confirmPassword', value)}
                    error={fieldErrors.confirmPassword}
                    helperText={
                        fieldErrors.confirmPassword
                            ? confirmPassword
                                ? 'Passwords do not match.'
                                : 'Confirmation is required.'
                            : ''
                    }
                />

                {error && <ErrorMessage message={error} />}

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
            </AuthFormLayout>
        </Box>
    );
}
