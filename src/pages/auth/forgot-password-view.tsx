import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ForgotPasswordForm } from 'src/routes/components/forms/forgot-password/forgot-password-form';

export default function ForgotPasswordView() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({ email: '' });
    const [, setFieldErrors] = useState({ email: false });

    const handleForgotPassword = async (email: string) => {
        try {
            setLoading(true);
            setError(null);
            setTimeout(() => navigate('/sign-in'), 2000);
        } catch (err) {
            setError('Failed to send password recovery email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleFieldChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setFieldErrors((prev) => ({ ...prev, [field]: !value.trim() }));
    };

    return (
        <ForgotPasswordForm
            onSubmit={handleForgotPassword}
            onCancel={() => navigate('/sign-in')}
            loading={loading}
            error={error}
            onFieldChange={handleFieldChange}
            email={form.email}
            onBackToSignIn={() => navigate('/sign-in')}
        />
    );
}
