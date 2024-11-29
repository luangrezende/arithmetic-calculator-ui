import { InputFieldForm } from 'src/features/auth/shared/input-field';
import { PasswordStrengthIndicator } from 'src/features/auth/shared/password-strength-indicator';

interface SignUpInputsProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    passwordStrength: { score: number; label: string };
    fieldErrors: { name: boolean; email: boolean; password: boolean; confirmPassword: boolean };
    onFieldChange: (
        field: 'name' | 'email' | 'password' | 'confirmPassword',
        value: string
    ) => void;
}

export function SignUpInputs({
    name,
    email,
    password,
    confirmPassword,
    passwordStrength,
    fieldErrors,
    onFieldChange,
}: SignUpInputsProps) {
    return (
        <>
            <InputFieldForm
                name="name"
                label="Full Name"
                value={name}
                onChange={(value: string) => onFieldChange('name', value)}
                error={fieldErrors.name}
                helperText={fieldErrors.name ? 'Name is required.' : ''}
            />

            <InputFieldForm
                name="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={(value: string) => onFieldChange('email', value)}
                error={fieldErrors.email}
                helperText={fieldErrors.email ? 'Invalid email address.' : ''}
            />

            <InputFieldForm
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(value: string) => onFieldChange('password', value)}
                error={fieldErrors.password}
                helperText={fieldErrors.password ? 'Password is required.' : ''}
            />

            {password && <PasswordStrengthIndicator {...passwordStrength} />}

            <InputFieldForm
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(value: string) => onFieldChange('confirmPassword', value)}
                error={fieldErrors.confirmPassword}
                helperText={
                    fieldErrors.confirmPassword
                        ? confirmPassword
                            ? 'Passwords do not match.'
                            : 'Confirmation is required.'
                        : ''
                }
            />
        </>
    );
}
