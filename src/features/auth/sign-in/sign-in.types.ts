export interface SignInFormProps {
    email: string;
    password: string;
    loginSuccess: boolean;
    fieldErrors: {
        email: boolean;
        password: boolean;
    };
    loading: boolean;
    error: string | null;
    onFieldChange: (field: string, value: string) => void;
    onSubmit: () => void;
    onSignUp: () => void;
    onForgotPassword: () => void;
}
