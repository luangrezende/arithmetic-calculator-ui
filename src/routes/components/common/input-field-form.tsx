import { useState, useEffect } from 'react';

import { TextField, IconButton, InputAdornment } from '@mui/material';

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
    error = false,
    helperText = '',
    onChange,
}: InputFieldFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState(false);
    const [localHelperText, setLocalHelperText] = useState(helperText);

    useEffect(() => {
        if (helperText) {
            setLocalHelperText(helperText);
        }
    }, [helperText]);

    const validateEmail = (email: string): boolean => {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setLocalError(!isValidEmail);
        setLocalHelperText(isValidEmail ? '' : 'Please enter a valid email address.');
        return isValidEmail;
    };

    const handleChange = (newValue: string) => {
        onChange(newValue);

        if (type === 'email') {
            validateEmail(newValue);
        } else {
            setLocalError(false);
            setLocalHelperText('');
        }
    };

    const handleBlur = () => {
        if (type === 'email') {
            validateEmail(value);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const isPasswordField = type === 'password';

    return (
        <TextField
            fullWidth
            name={name}
            label={label}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            error={error || localError}
            helperText={localError ? localHelperText : helperText}
            InputLabelProps={{ shrink: true }}
            type={isPasswordField && !showPassword ? 'password' : 'text'}
            InputProps={{
                endAdornment: isPasswordField && (
                    <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end">
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
