import { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Iconify } from 'src/components/iconify';

export interface SignInPasswordFieldProps {
    value: string;
    error: boolean;
    helperText: string;
    onChange: (value: string) => void;
}

export function SignInPasswordField({
    value,
    error,
    helperText,
    onChange,
}: SignInPasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            fullWidth
            name="password"
            label="Password"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            error={error}
            helperText={helperText}
            InputLabelProps={{ shrink: true }}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                endAdornment: (
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
