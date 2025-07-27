import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getTokens } from 'src/utils/auth-manager';

import { useToast } from 'src/contexts/toast-context';

import { ForgotPasswordForm } from './forgot-password-form';

export default function ForgotPasswordView() {
    const navigate = useNavigate();
    const { token } = getTokens();
    const { showToast } = useToast();

    const [form, setForm] = useState({ email: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (token) navigate('/');
    }, [token, navigate]);

    const handleFieldChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleForgotPassword = async () => {
        try {
            setLoading(true);
            showToast(
                'If an account is associated with this email, you will receive a password reset email shortly.',
                'success'
            );

            setError(null);

            setTimeout(() => {
                navigate('/sign-in');
            }, 2000);
        } catch (err) {
            setError(err || 'An unexpected error occurred. Please try again.');
        }
    };

    const handleCancel = () => navigate('/sign-in');

    return (
        <ForgotPasswordForm
                email={form.email}
                onFieldChange={(field, value) => handleFieldChange(field, value)}
                onSubmit={handleForgotPassword}
                onCancel={handleCancel}
                loading={loading}
                error={error}
                onBackToSignIn={handleCancel}
            />
    );
}
