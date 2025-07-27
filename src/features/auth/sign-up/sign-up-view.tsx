import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getTokens } from 'src/utils/auth-manager';

import { useToast } from 'src/contexts/toast-context';
import { registerUser } from 'src/services/api/auth-service';

import { SignUpForm } from './sign-up-form';

export default function SignUpView() {
    const navigate = useNavigate();
    const { token, refreshToken } = getTokens();
    const { showToast } = useToast();

    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (token && refreshToken) navigate('/');
    }, [token, refreshToken, navigate]);

    const handleFieldChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);

            await registerUser(form.name, form.email, form.password, form.confirmPassword);

            showToast('Account created successfully. Redirecting to sign-in page...', 'success');
            setRegisterSuccess(true);
            setTimeout(() => navigate('/sign-in'), 2000);
        } catch (err) {
            setError(err || 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
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
    );
}
