import { TextField } from '@mui/material';

export interface SignInFieldProps {
    name: string;
    label: string;
    value: string;
    error: boolean;
    helperText: string;
    onChange: (value: string) => void;
}

export function SignInField({ name, label, value, error, helperText, onChange }: SignInFieldProps) {
    return (
        <TextField
            fullWidth
            name={name}
            label={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            error={error}
            helperText={helperText}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 3 }}
        />
    );
}
