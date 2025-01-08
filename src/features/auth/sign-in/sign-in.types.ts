export interface SignInFormProps {
    email: string;
    password: string;
    loginSuccess: boolean;
    loading: boolean;
    error: string | null;
    onFieldChange: (field: string, value: string) => void;
    onSubmit: () => void;
    onSignUp: () => void;
    onForgotPassword: () => void;
}
