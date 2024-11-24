import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

export type SignUpFormProps = {
    name: string;
    email: string;
    password: string;
    showPassword: boolean;
    loading: boolean;
    fieldErrors: { name: boolean; email: boolean; password: boolean };
    error: string | null;
    onFieldChange: (fieldName: 'name' | 'email' | 'password', value: string) => void;
    onTogglePasswordVisibility: () => void;
    onSubmit: () => void;
};

export function SignUpView({
    name,
    email,
    password,
    showPassword,
    loading,
    fieldErrors,
    error,
    onFieldChange,
    onTogglePasswordVisibility,
    onSubmit,
}: SignUpFormProps) {
    return (
        <Box display="flex" flexDirection="column" alignItems="flex-end">
            <TextField
                fullWidth
                name="name"
                label="Full Name"
                value={name}
                onChange={(e) => onFieldChange('name', e.target.value)}
                error={fieldErrors.name}
                helperText={fieldErrors.name ? 'Name is required.' : ''}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
            />

            <TextField
                fullWidth
                name="email"
                label="Email address"
                value={email}
                onChange={(e) => onFieldChange('email', e.target.value)}
                error={fieldErrors.email}
                helperText={fieldErrors.email ? 'Email is required.' : ''}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
            />

            <TextField
                fullWidth
                name="password"
                label="Password"
                value={password}
                onChange={(e) => onFieldChange('password', e.target.value)}
                error={fieldErrors.password}
                helperText={fieldErrors.password ? 'Password is required.' : ''}
                InputLabelProps={{ shrink: true }}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={onTogglePasswordVisibility} edge="end">
                                <Iconify
                                    icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                                />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{ mb: 3 }}
            />

            {error && (
                <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="contained"
                onClick={onSubmit}
                loading={loading}
            >
                Sign up
            </LoadingButton>
        </Box>
    );
}
