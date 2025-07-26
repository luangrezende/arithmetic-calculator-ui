export interface AuthInputFieldFormProps {
    name: string;
    label: string;
    value: string;
    type?: 'text' | 'email' | 'password';
    isRequired?: boolean;
    onChange: (newValue: string) => void;
}