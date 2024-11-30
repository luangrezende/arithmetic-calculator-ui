import { useRef } from 'react';

import { Box } from '@mui/material';

import { LoadingButton } from 'src/components/button/loading-button';

import { AuthInputField } from '../shared';
import { AuthTitle } from '../shared/title';
import { ErrorMessage } from '../shared/error-message';
import { AuthFormLayout } from '../shared/auth-form-layout';
import { ForgotPasswordLink } from './forgot-password-link';

import type { SignInFormProps } from './sign-in.types';

export function SignInForm({
    email,
    password,
    loading,
    error,
    loginSuccess,
    onSubmit,
    onFieldChange,
    onSignUp,
    onForgotPassword,
}: SignInFormProps) {
    const emailRef = useRef<{ validateFields: () => boolean }>(null);
    const passwordRef = useRef<{ validateFields: () => boolean }>(null);

    const handleSubmit = () => {
        const isEmailValid = emailRef.current?.validateFields();
        const isPasswordValid = passwordRef.current?.validateFields();

        if (isEmailValid && isPasswordValid) {
            onSubmit();
        }
    };

    return (
        <Box>
            <AuthTitle
                title="Sign in"
                subtitle="Don’t have an account?"
                actionText="Get started"
                onAction={onSignUp}
            />
            <AuthFormLayout>
                <AuthInputField
                    loading={loading}
                    ref={emailRef}
                    name="email"
                    label="Email Address"
                    value={email}
                    type="email"
                    isRequired
                    onChange={(value) => onFieldChange('email', value)}
                />

                <ForgotPasswordLink onClick={onForgotPassword} />

                <AuthInputField
                    loading={loading}
                    ref={passwordRef}
                    name="password"
                    label="Password"
                    value={password}
                    type="password"
                    isRequired
                    onChange={(value) => onFieldChange('password', value)}
                />

                {error && <ErrorMessage message={error} />}

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
            </AuthFormLayout>
        </Box>
    );
}
