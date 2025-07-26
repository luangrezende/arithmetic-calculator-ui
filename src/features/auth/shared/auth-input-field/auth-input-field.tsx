import React, { useState, forwardRef, useImperativeHandle } from 'react';

import { TextField, IconButton, InputAdornment } from '@mui/material';

import { validateEmail } from 'src/utils/validation';

import { Iconify } from 'src/components/iconify';

import type { AuthInputFieldFormProps } from './auth-input-field.types';

export const AuthInputField = forwardRef(
    (
        {
            name,
            label,
            value,
            type = 'text',
            isRequired = false,
            onChange,
            loading = false,
            compareValue,
        }: AuthInputFieldFormProps & { loading?: boolean; compareValue?: string },
        ref: React.Ref<{ validateFields: () => boolean }>
    ) => {
        const [error, setError] = useState(false);
        const [helperText, setHelperText] = useState('');

        const [showPassword, setShowPassword] = useState(false);

        const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

        const validateField = (): boolean => {
            let isValid = true;

            if (isRequired && !value.trim()) {
                setError(true);
                setHelperText(`${label} is required.`);
                isValid = false;
            }

            if (isValid && type === 'email' && value.trim()) {
                if (!validateEmail(value)) {
                    setError(true);
                    setHelperText('Invalid email address.');
                    isValid = false;
                }
            }

            if (isValid && type === 'password' && value.trim()) {
                if (value.length < 6) {
                    setError(true);
                    setHelperText('Password must be at least 6 characters.');
                    isValid = false;
                }
            }

            if (isValid && name === 'confirmPassword' && value.trim()) {
                if (value !== compareValue) {
                    setError(true);
                    setHelperText('Passwords do not match.');
                    isValid = false;
                }
            }

            if (isValid) {
                setError(false);
                setHelperText('');
            }

            return isValid;
        };

        useImperativeHandle(ref, () => ({
            validateFields: validateField,
        }));

        const handleBlur = () => {
            validateField();
        };

        const handleChange = (inputValue: string) => {
            setHelperText('');
            setError(false);
            onChange(inputValue);
        };

        return (
            <TextField
                fullWidth
                name={name}
                label={label}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={error}
                helperText={helperText}
                InputLabelProps={{ shrink: true }}
                type={type === 'password' && !showPassword ? 'password' : 'text'}
                InputProps={{
                    endAdornment: type === 'password' && (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={togglePasswordVisibility}
                                edge="end"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                disabled={loading}
                            >
                                <Iconify
                                    icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                                />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                disabled={loading}
                sx={{ mb: 3 }}
            />
        );
    }
);
