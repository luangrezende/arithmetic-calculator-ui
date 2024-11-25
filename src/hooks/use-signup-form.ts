import { useState } from 'react';

import { validateFieldsSignup, validatePasswordStrength } from 'src/utils/validation';

interface FormState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface FieldErrors {
    name: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
}

export function useSignUpForm() {
    const [form, setForm] = useState<FormState>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [passwordStrength, setPasswordStrength] = useState<{ score: number; label: string }>({
        score: 0,
        label: 'Weak',
    });

    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const handleFieldChange = (
        field: 'name' | 'email' | 'password' | 'confirmPassword',
        value: string
    ) => {
        setForm((prev) => ({ ...prev, [field]: value }));

        setFieldErrors((prev) => ({
            ...prev,
            [field]: !value.trim(),
            ...(field === 'password' || field === 'confirmPassword'
                ? {
                      confirmPassword:
                          field === 'password'
                              ? value !== form.confirmPassword
                              : form.password !== value,
                  }
                : {}),
        }));

        if (field === 'password') {
            setPasswordStrength(validatePasswordStrength(value));
        }
    };

    const validateForm = () => {
        const errors = validateFieldsSignup(form);

        errors.confirmPassword = !form.confirmPassword || form.password !== form.confirmPassword;

        setFieldErrors(errors);
        return !Object.values(errors).some((error) => error);
    };

    return { form, fieldErrors, passwordStrength, handleFieldChange, validateForm };
}
