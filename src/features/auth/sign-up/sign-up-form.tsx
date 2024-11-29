import { Box } from '@mui/material';

import { AuthTitle } from 'src/features/auth/shared/title';
import { ErrorMessage } from 'src/features/auth/shared/error-message';
import { AuthFormLayout } from 'src/features/auth/shared/auth-form-layout';

import { LoadingButton } from 'src/components/button/loading-button';

import { SignUpInputs } from './sign-up-inputs';

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
                <SignUpInputs
                    name={name}
                    email={email}
                    password={password}
                    confirmPassword={confirmPassword}
                    passwordStrength={passwordStrength}
                    fieldErrors={fieldErrors}
                    onFieldChange={onFieldChange}
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
