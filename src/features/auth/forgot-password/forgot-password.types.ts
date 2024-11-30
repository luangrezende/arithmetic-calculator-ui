export interface ForgotPasswordFormProps {
    email: string;
    loading: boolean;
    error: string | null;
    onSubmit: () => void;
    onCancel: () => void;
    onFieldChange: (field: 'email', value: string) => void;
    onBackToSignIn: () => void;
}

export interface FormButtonsProps {
    onSubmit: () => void;
    onCancel: () => void;
    loading: boolean;
}
