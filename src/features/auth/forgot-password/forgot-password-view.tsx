import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getTokens } from 'src/utils/auth-manager';
import { validateEmail } from 'src/utils/validation';

import { ForgotPasswordForm } from './forgot-password-form';

export default function ForgotPasswordView() {
    const navigate = useNavigate();
    const { token } = getTokens();

    const [form, setForm] = useState({ email: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState({ email: false });

    useEffect(() => {
        if (token) navigate('/');
    }, [token, navigate]);

    const handleFieldChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setFieldErrors((prev) => ({ ...prev, [field]: !value.trim() }));
    };

    const handleForgotPassword = async () => {
        const errors = validateEmail(form.email);

        if (Object.values(errors).some((hasError) => hasError)) {
            setFieldErrors({ email: true });
            return;
        }

        try {
            setLoading(true);
            setError(null);

            setTimeout(() => {
                navigate('/sign-in');
            }, 2000);
        } catch (err) {
            setError(err || 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => navigate('/sign-in');

    return (
        <ForgotPasswordForm
            email={form.email}
            fieldErrors={fieldErrors}
            onFieldChange={(field, value) => handleFieldChange(field, value)}
            onSubmit={handleForgotPassword}
            onCancel={handleCancel}
            loading={loading}
            error={error}
            onBackToSignIn={handleCancel}
        />
    );
}
