import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignInForm } from 'src/routes/components/forms/sign-in/sign-in-form';

import { validateFieldsSignin } from 'src/utils/validation';

import { loginUser } from 'src/services/api/auth';
import { useAuth } from 'src/context/auth-context';

import { AlertSnackbar } from 'src/components/common/alert-snackbar';

export default function SignInView() {
    const { login, token } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: '', password: '' });
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({ email: false, password: false });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        if (token) navigate('/');
    }, [token, navigate]);

    const handleFieldChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setFieldErrors((prev) => ({ ...prev, [field]: !value.trim() }));
    };

    const handleSubmit = async () => {
        const errors = validateFieldsSignin(form);
        if (Object.values(errors).some((hasError) => hasError)) {
            setFieldErrors(errors);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await loginUser(form.email, form.password);

            setSnackbarOpen(true);
            setLoginSuccess(true);

            setTimeout(() => {
                login(response.data.token);
                navigate('/');
            }, 1000);
        } catch (err) {
            console.error('Error during login:', err);

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
            <SignInForm
                email={form.email}
                password={form.password}
                fieldErrors={fieldErrors}
                loading={loading}
                error={error}
                onFieldChange={handleFieldChange}
                onSubmit={handleSubmit}
                onSignUp={() => navigate('/sign-up')}
                loginSuccess={loginSuccess}
            />

            <AlertSnackbar
                open={snackbarOpen}
                message="Login successful! Redirecting..."
                onClose={() => setSnackbarOpen(false)}
                severity="success"
            />
        </>
    );
}