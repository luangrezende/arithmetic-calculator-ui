import { useState, useEffect } from 'react';

import { TextField, IconButton, InputAdornment } from '@mui/material';

import { validateEmail } from 'src/utils/validation';
import { formatCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

interface InputFieldFormProps {
    name: string;
    label: string;
    value: string;
    type?: 'text' | 'email' | 'password' | 'amount';
    error?: boolean;
    helperText?: string;
    onChange: (newValue: string) => void;
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
        setLocalHelperText(helperText);
        setLocalError(error);
    }, [helperText, error]);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleChange = (inputValue: string) => {
        let formattedValue = inputValue;

        if (type === 'email') {
            const isValidEmail = validateEmail(inputValue);
            setLocalError(!isValidEmail);
            setLocalHelperText(isValidEmail ? '' : 'Please enter a valid email address.');
        }

        if (type === 'amount') {
            const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, '')) || 0;
            formattedValue = formatCurrency(numericValue.toString());

            if (numericValue <= 1 || numericValue > 500) {
                setLocalError(true);
                setLocalHelperText(
                    numericValue > 500
                        ? 'The maximum amount you can add is $500.'
                        : 'Please enter a valid amount greater than $1.'
                );
            } else {
                setLocalError(false);
                setLocalHelperText('');
            }
        }

        onChange(formattedValue);
    };

    return (
        <TextField
            fullWidth
            name={name}
            label={label}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            error={localError}
            helperText={localHelperText}
            InputLabelProps={{ shrink: true }}
            type={type === 'password' && !showPassword ? 'password' : 'text'}
            InputProps={{
                endAdornment: type === 'password' && (
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
