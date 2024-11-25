import { useState } from 'react';

import { AlertSnackbar } from 'src/components/common/alert-snackbar';

import { AuthTitle } from '../../auth/auth-title';
import { ErrorMessage } from '../../common/error-message';
import { AuthFormLayout } from '../../common/auth-form-layout';
import { InputFieldForm } from '../../common/input-field-form';
import { ForgotPasswordButtons } from './forgot-password-buttons';

export interface ForgotPasswordFormProps {
    onSubmit: (email: string) => void;
    onCancel: () => void;
    onFieldChange: (field: 'email', value: string) => void;
    onBackToSignIn: () => void;
    email: string;
    loading: boolean;
    error: string | null;
}

export function ForgotPasswordForm({
    onSubmit,
    onCancel,
    onFieldChange,
    onBackToSignIn,
    email,
    loading,
    error,
}: ForgotPasswordFormProps) {
    const [fieldError, setFieldError] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSubmit = () => {
        if (!email.trim()) {
            setFieldError(true);
            return;
        }
        setFieldError(false);
        setSnackbarOpen(true);

        try {
            onSubmit(email);
        } catch (err) {
            setFieldError(true);
        }
    };

    return (
        <AuthFormLayout>
            <AuthTitle
                title="Forgot password"
                subtitle="This is a dev env, this feature will not work."
                actionText=""
                onAction={onBackToSignIn}
            />

            <InputFieldForm
                name="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={(value: any) => onFieldChange('email', value)}
                error={fieldError}
                helperText={fieldError ? 'Email is required.' : ''}
            />

            {error && <ErrorMessage message={error} />}

            <ForgotPasswordButtons onCancel={onCancel} onSubmit={handleSubmit} loading={loading} />

            <AlertSnackbar
                open={snackbarOpen}
                message="If an account is associated with this email, you will receive a password reset email shortly."
                onClose={() => setSnackbarOpen(false)}
                severity="success"
            />
        </AuthFormLayout>
    );
}
