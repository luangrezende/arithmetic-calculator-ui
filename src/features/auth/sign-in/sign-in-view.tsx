import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getTokens } from 'src/utils/auth-manager';

import { loginUser } from 'src/services/api/auth-service';

import { SignInForm } from './sign-in-form';

export function SignInView() {
    const navigate = useNavigate();
    const login = loginUser();
    const { token } = getTokens();

    const [form, setForm] = useState({ email: '', password: '' });
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

            await login(form.email, form.password);

            setLoginSuccess(true);
        } catch (err) {
            setError(err || 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SignInForm
            email={form.email}
            password={form.password}
            loginSuccess={loginSuccess}
            loading={loading}
            error={error}
            onFieldChange={handleFieldChange}
            onSubmit={handleSubmit}
            onSignUp={() => navigate('/sign-up')}
            onForgotPassword={() => navigate('/forgot-password')}
        />
    );
}
