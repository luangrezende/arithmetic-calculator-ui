export interface SignUpFormProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    registerSuccess: boolean;
    loading: boolean;
    error: string | null;
    onFieldChange: (field: string, value: string) => void;
    onSubmit: () => void;
    onBackToSignIn: () => void;
}