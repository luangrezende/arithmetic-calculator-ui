import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignInForm } from 'src/routes/components/forms/sign-in/sign-in-form';

import { validateFieldsSignin } from 'src/utils/validation';

import { useAuth } from 'src/context/auth-context';
import { loginUser, getUserProfile } from 'src/services/api/auth';

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
        console.log(errors);

        if (Object.values(errors).some((hasError) => hasError)) {
            setFieldErrors(errors);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await loginUser(form.email, form.password);
            const userData = await getUserProfile(response.data.data.token);

            setSnackbarOpen(true);
            setLoginSuccess(true);
            setTimeout(() => {
                login(response.data.data.token, userData.data.data);
                navigate('/');
            }, 1000);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.data?.error) {
                setError(err.response.data.data.error);
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
                loginSuccess={loginSuccess}
                fieldErrors={fieldErrors}
                loading={loading}
                error={error}
                onFieldChange={handleFieldChange}
                onSubmit={handleSubmit}
                onSignUp={() => navigate('/sign-up')}
                onForgotPassword={() => navigate('/forgot-password')}
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
