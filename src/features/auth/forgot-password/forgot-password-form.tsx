import { useRef } from 'react';

import { FormButtons } from 'src/features/auth/forgot-password/forgot-password-buttons';

import { AuthTitle } from '../shared/title';
import { AuthFormLayout, AuthInputField } from '../shared';

import type { ForgotPasswordFormProps } from './forgot-password.types';

export function ForgotPasswordForm({
    email,
    loading,
    onSubmit,
    onCancel,
    onFieldChange,
    onBackToSignIn,
}: ForgotPasswordFormProps) {
    const emailRef = useRef<{ validateFields: () => boolean }>(null);

    const handleSubmit = () => {
        const isEmailValid = emailRef.current?.validateFields();

        if (isEmailValid) {
            onSubmit();
        }
    };

    return (
        <AuthFormLayout>
            <AuthTitle
                title="Forgot password"
                subtitle="Enter your email address and we'll send you a link to reset your password."
                actionText=""
                onAction={onBackToSignIn}
            />

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

            <FormButtons onSubmit={handleSubmit} onCancel={onCancel} loading={loading} />
        </AuthFormLayout>
    );
}
