import { useRef, useState } from 'react';

import { Box } from '@mui/material';

import { AuthTitle } from 'src/features/auth/shared/title';
import { ErrorMessage } from 'src/features/auth/shared/error-message';
import { AuthFormLayout } from 'src/features/auth/shared/auth-form-layout';

import { LoadingButton } from 'src/components/button/loading-button';

import { AuthInputField } from '../shared';
import { PasswordStrengthIndicator } from '../shared/password-strength-indicator';

import type { SignUpFormProps } from './sign-up.types';

export function SignUpForm({
    name,
    email,
    password,
    confirmPassword,
    registerSuccess,
    loading,
    error,
    onFieldChange,
    onSubmit,
    onBackToSignIn,
}: SignUpFormProps) {
    const nameRef = useRef<{ validateFields: () => boolean }>(null);
    const emailRef = useRef<{ validateFields: () => boolean }>(null);
    const passwordRef = useRef<{ validateFields: () => boolean }>(null);
    const confirmPasswordRef = useRef<{ validateFields: () => boolean }>(null);

    const handleSubmit = () => {
        const isNameValid = nameRef.current?.validateFields();
        const isEmailValid = emailRef.current?.validateFields();
        const isPasswordValid = passwordRef.current?.validateFields();
        const isConfirmPasswordValid = confirmPasswordRef.current?.validateFields();

        if (password !== confirmPassword) {
            return;
        }

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            onSubmit();
        }
    };

    return (
        <Box>
            <AuthTitle
                title="Sign up"
                subtitle="Already have an account?"
                actionText="Sign in"
                onAction={onBackToSignIn}
            />

            <AuthFormLayout>
                <AuthInputField
                    ref={nameRef}
                    loading={loading}
                    name="name"
                    label="Full Name"
                    value={name}
                    type="text"
                    isRequired
                    onChange={(value) => onFieldChange('name', value)}
                />

                <AuthInputField
                    ref={emailRef}
                    loading={loading}
                    name="email"
                    label="Email Address"
                    value={email}
                    type="email"
                    isRequired
                    onChange={(value) => onFieldChange('email', value)}
                />

                <AuthInputField
                    ref={passwordRef}
                    loading={loading}
                    name="password"
                    label="Password"
                    value={password}
                    type="password"
                    isRequired
                    onChange={(value) => onFieldChange('password', value)}
                />

                {password && <PasswordStrengthIndicator password={password} />}

                <AuthInputField
                    ref={confirmPasswordRef}
                    loading={loading}
                    name="confirmPassword"
                    label="Confirm Password"
                    value={confirmPassword}
                    type="password"
                    isRequired
                    onChange={(value) => onFieldChange('confirmPassword', value)}
                    compareValue={password}
                />

                {error && <ErrorMessage message={error} />}

                <LoadingButton
                    fullWidth
                    size="large"
                    color="inherit"
                    variant="contained"
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={registerSuccess}
                >
                    Sign up
                </LoadingButton>
            </AuthFormLayout>
        </Box>
    );
}
