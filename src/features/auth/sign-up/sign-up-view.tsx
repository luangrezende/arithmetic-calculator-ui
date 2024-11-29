import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignUpForm } from 'src/hooks/use-signup-form';

import { getTokens } from 'src/utils/auth-manager';

import { registerUser } from 'src/services/api/auth-service';

import { AlertSnackbar } from 'src/components/alert-snackbar';

import { SignUpForm } from './sign-up-form';

export default function SignUpView() {
    const navigate = useNavigate();
    const { token } = getTokens();
    const { form, fieldErrors, passwordStrength, handleFieldChange, validateForm } =
        useSignUpForm();

    const [loading, setLoading] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        if (token) navigate('/');
    }, [token, navigate]);

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await registerUser(form.email, form.password, form.name);

            setSnackbarOpen(true);
            setRegisterSuccess(true);
            setTimeout(() => navigate('/sign-in'), 2000);
        } catch (err) {
            setError(err || 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SignUpForm
                name={form.name}
                email={form.email}
                password={form.password}
                confirmPassword={form.confirmPassword}
                passwordStrength={passwordStrength}
                registerSuccess={registerSuccess}
                fieldErrors={fieldErrors}
                loading={loading}
                error={error}
                onFieldChange={handleFieldChange}
                onSubmit={handleSubmit}
                onBackToSignIn={() => navigate('/sign-in')}
            />

            <AlertSnackbar
                open={snackbarOpen}
                message="Account created successfully. Redirecting to login page..."
                onClose={() => setSnackbarOpen(false)}
                severity="success"
            />
        </>
    );
}
