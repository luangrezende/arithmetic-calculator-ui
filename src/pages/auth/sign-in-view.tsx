import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignInForm } from 'src/routes/components/forms/sign-in/sign-in-form';

import { getTokens } from 'src/utils/auth-manager';
import { validateFieldsSignin } from 'src/utils/validation';

import { loginUser } from 'src/services/api/auth-service';

export default function SignInView() {
    const navigate = useNavigate();
    const login = loginUser();
    const { token } = getTokens();

    const [form, setForm] = useState({ email: '', password: '' });
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({ email: false, password: false });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
            fieldErrors={fieldErrors}
            loading={loading}
            error={error}
            onFieldChange={handleFieldChange}
            onSubmit={handleSubmit}
            onSignUp={() => navigate('/sign-up')}
            onForgotPassword={() => navigate('/forgot-password')}
        />
    );
}
