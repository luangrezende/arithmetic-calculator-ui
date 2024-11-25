import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignUpForm } from 'src/routes/components/forms/sign-up/sign-up-form';

import { useSignUpForm } from 'src/hooks/use-signup-form';

import { registerUser } from 'src/services/api/auth';

import { AlertSnackbar } from 'src/components/common/alert-snackbar';

export default function SignUpView() {
    const navigate = useNavigate();
    const { form, fieldErrors, passwordStrength, handleFieldChange, validateForm } =
        useSignUpForm();

    const [loading, setLoading] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

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
            console.error('Error during registration:', err);

            if (axios.isAxiosError(err) && err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
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
                message="Account created successfully. Redirecting..."
                onClose={() => setSnackbarOpen(false)}
                severity="success"
            />
        </>
    );
}
