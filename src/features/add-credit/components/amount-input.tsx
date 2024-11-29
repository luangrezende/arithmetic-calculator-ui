import { InputFieldForm } from 'src/features/shared/input-field';

interface AmountInputProps {
    value: string;
    onChange: (value: string) => void;
    error: boolean;
    helperText: string;
}

export function AmountInput({ value, onChange, error, helperText }: AmountInputProps) {
    return (
        <InputFieldForm
            name="amount"
            label="Amount"
            value={value}
            type="amount"
            onChange={onChange}
            error={error}
            helperText={helperText}
        />
    );
}
