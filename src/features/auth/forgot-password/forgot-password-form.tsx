import { useSnackbar } from 'src/hooks/use-snackbar';

import { InputFieldForm } from 'src/features/shared/input-field';
import { AuthFormLayout } from 'src/features/auth/shared/auth-form-layout';
import { FormButtons } from 'src/features/auth/forgot-password/forgot-password-buttons';

import { AuthTitle } from '../shared/title';
import { FormMessages } from '../shared/form-messages';

import type { ForgotPasswordFormProps } from './forgot-password.types';

export function ForgotPasswordForm({
    email,
    loading,
    error,
    fieldErrors,
    onSubmit,
    onCancel,
    onFieldChange,
    onBackToSignIn,
}: ForgotPasswordFormProps) {
    const { open: snackbarOpen, showSnackbar, closeSnackbar } = useSnackbar();

    const handleSubmit = () => {
        if (!email.trim()) {
            onFieldChange('email', email);
            return;
        }

        onSubmit(email);
        showSnackbar(
            'If an account is associated with this email, you will receive a password reset email shortly.'
        );
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
                label="Email address"
                value={email}
                type="email"
                error={fieldErrors.email}
                helperText={fieldErrors.email ? 'Email is required.' : ''}
                onChange={(value) => onFieldChange('email', value)}
            />

            <FormMessages
                error={error || ''}
                success="If an account is associated with this email, you will receive a password reset email shortly."
                snackbarOpen={snackbarOpen}
                onCloseSnackbar={closeSnackbar}
            />

            <FormButtons onSubmit={handleSubmit} onCancel={onCancel} loading={loading} />
        </AuthFormLayout>
    );
}
