import { useState, useEffect } from 'react';

import { TextField, IconButton, InputAdornment } from '@mui/material';

import { validateEmail } from 'src/utils/validation';

import { Iconify } from 'src/components/iconify';

interface InputFieldFormProps {
    name: string;
    label: string;
    value: string;
    type?: string;
    error?: boolean;
    helperText?: string;
    onChange: (value: string) => void;
}

export function InputFieldForm({
    name,
    label,
    value,
    type = 'text',
    error: externalError = false,
    helperText: externalHelperText = '',
    onChange,
}: InputFieldFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState(false);
    const [localHelperText, setLocalHelperText] = useState('');

    useEffect(() => {
        if (externalHelperText) {
            setLocalHelperText(externalHelperText);
        }
    }, [externalHelperText]);

    useEffect(() => {
        setLocalError(externalError);
    }, [externalError]);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const isPasswordField = type === 'password';

    const handleChange = (newValue: string) => {
        onChange(newValue);

        if (type === 'email') {
            const isValidEmail = validateEmail(newValue);
            setLocalError(!isValidEmail);
            setLocalHelperText(isValidEmail ? '' : 'Please enter a valid email address.');
        }
    };

    return (
        <TextField
            fullWidth
            name={name}
            label={label}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            error={localError}
            helperText={localHelperText || externalHelperText}
            InputLabelProps={{ shrink: true }}
            type={isPasswordField && !showPassword ? 'password' : 'text'}
            InputProps={{
                endAdornment: isPasswordField && (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
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
