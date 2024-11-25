import { useState } from 'react';

import { TextField, IconButton, InputAdornment } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export interface AuthTextFieldProps {
    name: string;
    label: string;
    value: string;
    error: boolean;
    helperText: string;
    onChange: (value: string) => void;
    isPassword?: boolean;
}

export function AuthTextField({
    name,
    label,
    value,
    error,
    helperText,
    onChange,
    isPassword = false,
}: AuthTextFieldProps) {
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
            type={isPassword && !showPassword ? 'password' : 'text'}
            InputProps={
                isPassword
                    ? {
                          endAdornment: (
                              <InputAdornment position="end">
                                  <IconButton
                                      onClick={() => setShowPassword(!showPassword)}
                                      edge="end"
                                  >
                                      <Iconify
                                          icon={
                                              showPassword
                                                  ? 'solar:eye-bold'
                                                  : 'solar:eye-closed-bold'
                                          }
                                      />
                                  </IconButton>
                              </InputAdornment>
                          ),
                      }
                    : undefined
            }
            sx={{ mb: 3 }}
        />
    );
}
