import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useState } from 'react';

interface SignUpFieldProps {
    name: string;
    label: string;
    value: string;
    type?: string;
    error?: boolean;
    helperText?: string;
    onChange: (value: string) => void;
    showToggle?: boolean; // Para alternar exibição de senha
}

export function SignUpField({
    name,
    label,
    value,
    type = 'text',
    error,
    helperText,
    onChange,
    showToggle = false,
}: SignUpFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

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
            type={showToggle && !showPassword ? 'password' : type}
            InputProps={{
                endAdornment: showToggle && (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            <Iconify
                                icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                            />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            sx={{ mb: 3 }}
        />
    );
}
