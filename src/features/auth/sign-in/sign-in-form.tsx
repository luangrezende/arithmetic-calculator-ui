import { Box } from '@mui/material';

import { LoadingButton } from 'src/components/button/loading-button';

import { AuthTitle } from '../shared/title';
import { InputFieldForm } from '../../shared/input-field';
import { ErrorMessage } from '../shared/error-message';
import { AuthFormLayout } from '../shared/auth-form-layout';
import { ForgotPasswordLink } from './forgot-password-link';

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
    onForgotPassword: () => void;
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
    onForgotPassword,
}: SignInFormProps) {
    return (
        <Box>
            <AuthTitle
                title="Sign in"
                subtitle="Don’t have an account?"
                actionText="Get started"
                onAction={onSignUp}
            />
            <AuthFormLayout>
                <InputFieldForm
                    name="email"
                    label="Email address"
                    value={email}
                    type="email"
                    error={fieldErrors.email}
                    helperText={fieldErrors.email ? 'Email is required.' : ''}
                    onChange={(value) => onFieldChange('email', value)}
                />

                <ForgotPasswordLink onClick={onForgotPassword} />

                <InputFieldForm
                    name="password"
                    label="Password"
                    value={password}
                    type="password"
                    error={fieldErrors.password}
                    helperText={fieldErrors.password ? 'Password is required.' : ''}
                    onChange={(value) => onFieldChange('password', value)}
                />

                {error && <ErrorMessage message={error} />}

                <LoadingButton
                    fullWidth
                    size="large"
                    color="inherit"
                    variant="contained"
                    onClick={onSubmit}
                    loading={loading}
                    disabled={loginSuccess}
                >
                    Sign in
                </LoadingButton>
            </AuthFormLayout>
        </Box>
    );
}
