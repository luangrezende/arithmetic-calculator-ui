export interface ForgotPasswordFormProps {
    email: string;
    loading: boolean;
    error: string | null;
    fieldErrors: { email: boolean };
    onSubmit: (email: string) => void;
    onCancel: () => void;
    onFieldChange: (field: 'email', value: string) => void;
    onBackToSignIn: () => void;
}
