import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

import { TextField } from '@mui/material';

import { validateEmail } from 'src/utils/validation';
import { parseAmount, formatCurrency } from 'src/utils/format-number';

import type { InputFieldFormProps } from './input-field.types';

export const InputField = forwardRef(
    (
        {
            name,
            label,
            value,
            type = 'text',
            isRequired = false,
            onChange,
            loading = false,
        }: InputFieldFormProps & { loading?: boolean },
        ref: React.Ref<{ validateFields: () => boolean }>
    ) => {
        const [localValue, setLocalValue] = useState(value);
        const [error, setError] = useState(false);
        const [helperText, setHelperText] = useState('');

        useEffect(() => {
            if (type === 'amount' && (!localValue || !localValue.trim())) {
                const initialValue = formatCurrency('0');
                setLocalValue(initialValue);
                onChange(initialValue);
            }
        }, [type, localValue, onChange]);

        const validateField = (): boolean => {
            let isValid = true;

            if (isRequired && (!localValue || !localValue.trim())) {
                setError(true);
                setHelperText(`${label} is required.`);
                isValid = false;
            }

            if (isValid && type === 'email' && localValue.trim()) {
                if (!validateEmail(localValue)) {
                    setError(true);
                    setHelperText('Invalid email address.');
                    isValid = false;
                }
            }

            if (isValid && type === 'amount' && localValue.trim()) {
                const numericValue = parseAmount(localValue.toString()) || 0;
                if (numericValue <= 1 || numericValue > 500) {
                    setError(true);
                    setHelperText('Amount must be greater than $1 and less than or equal to $500.');
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
            if (type === 'amount') {
                const formattedValue = formatCurrency(inputValue.toString());
                setLocalValue(formattedValue);
                onChange(formattedValue);
            } else {
                setLocalValue(inputValue);
                onChange(inputValue);
            }
        };

        return (
            <TextField
                disabled={loading}
                fullWidth
                name={name}
                label={label}
                value={localValue}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={error}
                helperText={helperText}
                InputLabelProps={{ shrink: true }}
                type={type}
                sx={{ mb: 3 }}
                inputProps={{
                    maxLength: 7,
                }}
            />
        );
    }
);
