export interface InputFieldFormProps {
    name: string;
    label: string;
    value: string;
    type?: 'text' | 'email' | 'amount';
    isRequired?: boolean;
    onChange: (newValue: string) => void;
}