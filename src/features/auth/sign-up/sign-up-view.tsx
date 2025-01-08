import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getTokens } from 'src/utils/auth-manager';

import { registerUser } from 'src/services/api/auth-service';

import { AlertSnackbar } from 'src/components/alert-snackbar';

import { SignUpForm } from './sign-up-form';

export default function SignUpView() {
    const navigate = useNavigate();
    const { token } = getTokens();

    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        if (token) navigate('/');
    }, [token, navigate]);

    const handleFieldChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);

            await registerUser(form.name, form.email, form.password, form.confirmPassword);

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
                registerSuccess={registerSuccess}
                loading={loading}
                error={error}
                onFieldChange={handleFieldChange}
                onSubmit={handleSubmit}
                onBackToSignIn={() => navigate('/sign-in')}
            />

            <AlertSnackbar
                open={snackbarOpen}
                message="Account created successfully. Redirecting to sign-in page..."
                onClose={() => setSnackbarOpen(false)}
                severity="success"
            />
        </>
    );
}
